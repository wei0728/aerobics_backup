document.addEventListener('DOMContentLoaded', () => {
    showgallery();
    navbar();
});

function showgallery(){
    const gallerySlider = document.getElementById('gallerySlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const images = gallerySlider.getElementsByTagName('img');
    const totalImages = images.length;
    let currentIndex = 1; // Start from the first real image

    // Set the initial position to show the first real image
    gallerySlider.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Flag to prevent multiple rapid clicks
    let isTransitioning = false;

    // Update slider position with transition
    function updateSliderPosition() {
        if (isTransitioning) return;
        isTransitioning = true;
        gallerySlider.style.transition = 'transform 0.5s ease';
        gallerySlider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Handle the end of transition to reset position if needed
    gallerySlider.addEventListener('transitionend', () => {
        isTransitioning = false;
        // If we're at the cloned first image, jump to the real first image
        if (currentIndex === totalImages - 1) {
            gallerySlider.style.transition = 'none';
            currentIndex = 1;
            gallerySlider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        // If we're at the cloned last image, jump to the real last image
        if (currentIndex === 0) {
            gallerySlider.style.transition = 'none';
            currentIndex = totalImages - 2;
            gallerySlider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    });

    // Click previous button
    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex--;
        updateSliderPosition();
    });

    // Click next button
    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        currentIndex++;
        updateSliderPosition();
    });

}

function navbar(){
    let lastScrollTop = 0;
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', function() {
            // 使用 window.scrollY 作為替代
            const currentScroll = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

            if (currentScroll > lastScrollTop) {
                // 向下滾動 - 隱藏導航欄
                navbar.classList.add('hidden');
            } else {
                // 向上滾動 - 顯示導航欄
                navbar.classList.remove('hidden');
            }

            // 防止負值並更新 lastScrollTop
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }, false);
}

