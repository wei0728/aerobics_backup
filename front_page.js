document.addEventListener('DOMContentLoaded', () => {
    showgallery();
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

    // Optional: Auto-slide functionality
    /*
    setInterval(() => {
        if (!isTransitioning) {
            currentIndex++;
            updateSliderPosition();
        }
    }, 5000);
    */

}
