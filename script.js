  
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        updateToggleUI(savedTheme);

        function toggleTheme() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleUI(newTheme);
        }

        function updateToggleUI(theme) {
            themeToggle.classList.remove('light', 'dark');
            themeToggle.classList.add(theme);
        }

        function acceptDisclaimer() {
            const overlay = document.getElementById('disclaimerOverlay');
            overlay.classList.add('hide');
            document.body.classList.remove('disclaimer-active');
            setTimeout(() => overlay.style.display = 'none', 400);
            sessionStorage.setItem('disclaimerAccepted', 'true');
        }

        function exitSite() {
            window.location.href = 'about:blank';
        }

        window.addEventListener('DOMContentLoaded', () => {
            if (sessionStorage.getItem('disclaimerAccepted') === 'true') {
                document.getElementById('disclaimerOverlay').style.display = 'none';
                document.body.classList.remove('disclaimer-active');
            }
        });

        let currentSlide = 0;
        const slides = document.querySelectorAll('.banner-slide');
        const indicators = document.querySelectorAll('.indicator');

        function showSlide(n) {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }

        function nextSlide() { showSlide(currentSlide + 1); }
        function goToSlide(n) { showSlide(n); }

        setInterval(nextSlide, 3000);

        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });

        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    
    
    let currentImageSlide = 0;
    const imageBannerSlides = document.querySelectorAll('.image-banner-slide');
    const imageIndicators = document.querySelectorAll('.image-indicator');

    function showImageSlide(n) {
        // Remove active from all slides and indicators
        imageBannerSlides.forEach(slide => slide.classList.remove('active'));
        imageIndicators.forEach(ind => ind.classList.remove('active'));

        // Calculate slide index
        currentImageSlide = (n + imageBannerSlides.length) % imageBannerSlides.length;

        // Add active to current slide and indicator
        imageBannerSlides[currentImageSlide].classList.add('active');
        imageIndicators[currentImageSlide].classList.add('active');
    }

    function nextImageSlide() {
        showImageSlide(currentImageSlide + 1);
    }

    function prevImageSlide() {
        showImageSlide(currentImageSlide - 1);
    }

    function goToImageSlide(n) {
        showImageSlide(n);
    }

    // Auto-advance slides every 5 seconds
    setInterval(nextImageSlide, 5000);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevImageSlide();
        if (e.key === 'ArrowRight') nextImageSlide();
    });
