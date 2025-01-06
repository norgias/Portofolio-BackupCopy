const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

// Add smooth transition for menu toggle
menu.style.transition = 'max-height 0.4s ease-in-out';
menu.style.overflow = 'hidden';
menu.style.maxHeight = '0px'; // Ensure menu is initially hidden

// Toggle menu for mobile
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    if (menu.style.maxHeight === '0px' || menu.style.maxHeight === '') {
        menu.style.maxHeight = menu.scrollHeight + 'px'; // Expand menu
    } else {
        menu.style.maxHeight = '0px'; // Collapse menu
    }
});

// Handle menu visibility on desktop
const updateMenuVisibility = () => {
    if (window.innerWidth >= 768) {
        menu.style.display = 'flex'; // Show menu on desktop
        menu.style.maxHeight = ''; // Remove max-height restrictions
        menuToggle.style.display = 'none'; // Hide toggle button on desktop
    } else {
        menu.style.display = ''; // Reset to default for mobile
        menu.style.maxHeight = '0px'; // Ensure collapsed state for mobile
        menuToggle.style.display = 'block'; // Show toggle button on mobile
    }
};

// Initialize menu visibility on page load
updateMenuVisibility();

// Update menu visibility on window resize
window.addEventListener('resize', updateMenuVisibility);

// Smooth scrolling functionality
const navLinks = document.querySelectorAll('#menu a');
const scrollDuration = 800;

function smoothScroll(targetSection, duration) {
    const targetPosition = targetSection.offsetTop;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        smoothScroll(targetSection, scrollDuration);
    });
});

const carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prevButton = carousel.querySelector('.carousel-btn.prev');
    const nextButton = carousel.querySelector('.carousel-btn.next');

    let currentIndex = 0;

    // Adjust carousel position
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

    // Ensure carousel position is updated on window resize
    window.addEventListener('resize', updateCarousel);
});

// Load the YouTube API script dynamically
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;

// YouTube Player Initialization
function onYouTubeIframeAPIReady() {
    new YT.Player('player', {
        videoId: 'y5GFBcxyZOQ', // Replace with your video ID
        playerVars: {
            autoplay: 1,       // Start automatically
            mute: 1,           // Mute the video
            loop: 1,           // Enable looping
            playlist: 'y5GFBcxyZOQ', // Required for looping
            controls: 0,       // Hide video controls
            modestbranding: 1, // Minimal YouTube branding
            rel: 0,            // Disable related videos
            showinfo: 0,       // Disable video title and info
            disablekb: 1       // Disable keyboard controls
        },
        events: {
            onReady: function(event) {
                event.target.playVideo(); // Ensure the video starts playing
            }
        }
    });
}
