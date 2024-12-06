document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const imageInput = document.getElementById('imageInput');
    const originalImage = document.getElementById('originalImage');
    const compressedImage = document.getElementById('compressedImage');
    const originalSize = document.getElementById('originalSize');
    const compressedSize = document.getElementById('compressedSize');
    const qualitySlider = document.getElementById('quality');
    const qualityValue = document.getElementById('qualityValue');
    const downloadBtn = document.getElementById('downloadBtn');
    const comparisonSection = document.getElementById('comparisonSection');
    const controls = document.getElementById('controls');

    // 处理文件上传
    uploadArea.addEventListener('click', () => imageInput.click());
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#007AFF';
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ddd';
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImage(file);
        }
    });

    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImage(file);
        }
    });

    // 处理图片压缩
    function handleImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage.src = e.target.result;
            originalSize.textContent = formatFileSize(file.size);
            compressImage(e.target.result, qualitySlider.value / 100);
            comparisonSection.style.display = 'flex';
            controls.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    function compressImage(base64, quality) {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            
            const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
            compressedImage.src = compressedBase64;
            
            // 计算压缩后的大小
            const compressedBytes = atob(compressedBase64.split(',')[1]).length;
            compressedSize.textContent = formatFileSize(compressedBytes);
        };
        img.src = base64;
    }

    // 质量滑块控制
    qualitySlider.addEventListener('input', (e) => {
        const quality = e.target.value;
        qualityValue.textContent = quality + '%';
        if (originalImage.src) {
            compressImage(originalImage.src, quality / 100);
        }
    });

    // 下载按钮
    downloadBtn.addEventListener('click', () => {
        if (compressedImage.src) {
            const link = document.createElement('a');
            link.download = 'compressed-image.jpg';
            link.href = compressedImage.src;
            link.click();
        }
    });

    // 文件大小格式化
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}); 