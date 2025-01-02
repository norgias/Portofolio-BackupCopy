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
const navLinks = document.querySelectorAll('#menu a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });

        // Prevent shrinking or collapsing of the menu on desktop
        if (window.innerWidth >= 768) {
            menu.style.display = 'flex';
        } else {
            menu.style.display = 'none';
            menuToggle.classList.remove('active');
        }
    });
});

// JavaScript for Image Sliders
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const prevButton = carousel.querySelector('.carousel-btn.prev');
    const nextButton = carousel.querySelector('.carousel-btn.next');

    let currentIndex = 0;

    const updateCarousel = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
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

