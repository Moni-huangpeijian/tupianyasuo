document.addEventListener('DOMContentLoaded', function () {
    const productNameInput = document.getElementById('productName');
    const sellingPointsInput = document.getElementById('sellingPoints');
    const priceInput = document.getElementById('price');
    const generateBtn = document.getElementById('generateBtn');

    const posterProduct = document.getElementById('posterProduct');
    const posterCopy = document.getElementById('posterCopy');
    const posterPrice = document.getElementById('posterPrice');

    const copyBtn = document.getElementById('copyBtn');
    const copyFeedback = document.getElementById('copyFeedback');

    function splitSellingPoints(rawText) {
        return rawText
            .split(/[，,、;；\n]/)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    function generateCopy(productName, sellingPoints, price) {
        const opening = `还在犹豫选什么？今天给大家推荐一款我最近超爱的「${productName}」！`;

        const pointsLine = sellingPoints.length > 0
            ? `\n\n它最打动我的地方是：${sellingPoints.map((point) => `✅ ${point}`).join('；')}。`
            : '\n\n它的体验真的很在线，细节很加分。';

        const priceLine = `\n\n现在到手价 ${price}，性价比真的很高，想入手的朋友可以冲一波～`;
        const ending = '\n\n适合自用，也很适合送朋友，评论区欢迎来问我真实感受👇';

        return `${opening}${pointsLine}${priceLine}${ending}`;
    }

    function getNormalizedPrice(price) {
        const cleanPrice = price.trim();
        if (!cleanPrice) return '¥ --';
        return cleanPrice.startsWith('¥') ? cleanPrice : `¥ ${cleanPrice}`;
    }

    generateBtn.addEventListener('click', function () {
        const productName = productNameInput.value.trim();
        const sellingPoints = splitSellingPoints(sellingPointsInput.value);
        const price = priceInput.value.trim();

        if (!productName || !price) {
            copyFeedback.textContent = '请先填写产品名和价格。';
            return;
        }

        const generatedCopy = generateCopy(productName, sellingPoints, price);

        posterProduct.textContent = productName;
        posterCopy.textContent = generatedCopy;
        posterPrice.textContent = getNormalizedPrice(price);
        copyFeedback.textContent = '文案已生成，可直接复制。';
    });

    copyBtn.addEventListener('click', async function () {
        const text = posterCopy.textContent;
        if (!text || text.includes('填写左侧信息后')) {
            copyFeedback.textContent = '请先生成文案再复制。';
            return;
        }

        try {
            await navigator.clipboard.writeText(text);
            copyFeedback.textContent = '已复制到剪贴板。';
        } catch (error) {
            copyFeedback.textContent = '复制失败，请手动复制。';
        }
    });
});
