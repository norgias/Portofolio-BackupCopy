// JavaScript for Navigation Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active'); // Toggle 'active' class
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
});


// Ensure menu displays correctly when resizing window
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        menu.style.display = 'flex';
        menuToggle.classList.remove('active'); // Reset toggle state
    } else {
        menu.style.display = 'none';
    }
});

// JavaScript for Smooth Scrolling
const scrollDuration = 800; // Adjust this value to control scroll speed (in milliseconds)

// Function to handle smooth scrolling
function smoothScroll(targetSection, duration) {
    const targetPosition = targetSection.getBoundingClientRect().top; // Distance from top of viewport
    const startPosition = window.pageYOffset; // Current scroll position
    const distance = targetPosition; // Total distance to scroll
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Ease function for smooth effect
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Add event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault(); // Prevent default anchor behavior
        const targetId = link.getAttribute('href').substring(1); // Get target section ID
        const targetSection = document.getElementById(targetId); // Find target section
        smoothScroll(targetSection, scrollDuration); // Call the smooth scroll function
    });
});

// JS for image slider carousel
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prevButton = carousel.querySelector('.carousel-btn.prev');
    const nextButton = carousel.querySelector('.carousel-btn.next');

    let currentIndex = 0;

    // Adjust the track width dynamically based on items
    const updateCarousel = () => {
        const itemWidth = items[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * (itemWidth + 20)}px)`; // Include gap
    };

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });
});
 
