document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 60,
                behavior: 'smooth'
            });
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Testimonial Slider Auto-Scroll for Mobile
    const slider = document.querySelector('.testimonial-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Auto-scroll for testimonials on mobile
    if (window.innerWidth <= 768) {
        let scrollAmount = 0;
        const scrollSpeed = 1;

        function autoScroll() {
            scrollAmount += scrollSpeed;
            slider.scrollLeft = scrollAmount;
            if (scrollAmount >= slider.scrollWidth - slider.clientWidth) {
                scrollAmount = 0;
            }
            requestAnimationFrame(autoScroll);
        }

        autoScroll();
    }
});