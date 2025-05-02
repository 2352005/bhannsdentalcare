document.addEventListener('DOMContentLoaded', () => {
    // Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.innerHTML = navMenu.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Smooth Scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Testimonial Carousel
    const carousel = document.querySelector('.testimonial-carousel');
    const items = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    let currentIndex = 0;

    function showItem(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showItem(currentIndex);
    });

    // Auto-scroll for testimonials
    let autoScroll = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        showItem(currentIndex);
    }, 5000);

    carousel.addEventListener('mouseenter', () => clearInterval(autoScroll));
    carousel.addEventListener('mouseleave', () => {
        autoScroll = setInterval(() => {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        }, 5000);
    });

    // Touch Swipe for Mobile
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            currentIndex = (currentIndex + 1) % items.length;
            showItem(currentIndex);
        } else if (touchEndX - touchStartX > 50) {
            currentIndex = (currentIndex - 1 + items.length) % items.length;
            showItem(currentIndex);
        }
    });
});
