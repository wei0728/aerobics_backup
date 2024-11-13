// front_page.js

document.addEventListener('DOMContentLoaded', () => {
    const gallerySlider = document.getElementById('gallerySlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const images = gallerySlider.getElementsByTagName('img');
    const totalImages = images.length;
    let currentIndex = 0;

    // 設定滑動的寬度（假設所有圖片寬度相同）
    const sliderWidth = gallerySlider.clientWidth;

    // 更新滑動位置
    function updateSliderPosition() {
        gallerySlider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // 點擊上一張按鈕
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSliderPosition();
            updateButtonState();
        }
    });

    // 點擊下一張按鈕
    nextBtn.addEventListener('click', () => {
        currentIndex ++;
        console.log(currentIndex);
        console.log(totalImages);
        if (currentIndex <=
            
            
            
            
            
            
            totalImages) {
            updateSliderPosition();
            updateButtonState();
        }
        else {
            currentIndex = 0;
            updateSliderPosition();
            updateButtonState();
        }
    });

    // 更新按鈕的啟用/禁用狀態
    function updateButtonState() {
        // 當在第一張時禁用上一張按鈕
        if (currentIndex === 0) {
            prevBtn.disabled = true;
            prevBtn.style.opacity = '0.5';
            prevBtn.style.cursor = 'not-allowed';
        } else {
            prevBtn.disabled = false;
            prevBtn.style.opacity = '1';
            prevBtn.style.cursor = 'pointer';
        }

        // 當在最後一張時禁用下一張按鈕
        if (currentIndex === totalImages - 1) {
            nextBtn.disabled = true;
            nextBtn.style.opacity = '0.5';
            nextBtn.style.cursor = 'not-allowed';
        } else {
            nextBtn.disabled = false;
            nextBtn.style.opacity = '1';
            nextBtn.style.cursor = 'pointer';
        }
    }

    // 初始化按鈕狀態
    updateButtonState();


    /*setInterval(() => {
        if (currentIndex < totalImages - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // 回到第一張
        }
        updateSliderPosition();
        updateButtonState();
    }, 5000);*/
});
