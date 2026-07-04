/* ============================================
   ALIF FEBRIAN NUGROHO - PORTFOLIO
   JavaScript - Sederhana & Pasti Jalan
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ========== PAGE TRANSITION ==========
    const pageTransition = document.querySelector('.page-transition');
    if (pageTransition) {
        setTimeout(() => {
            pageTransition.classList.add('exit');
        }, 100);
    }

    // ========== NAVBAR SCROLL ==========
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ========== MOBILE MENU ==========
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close menu when link clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ========== SCROLL REVEAL ==========
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            const revealPoint = 100;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // ========== TYPED TEXT ==========
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const texts = [
            'Halo, saya Alif',
            'Selamat datang di portfolio saya',
            'Mari berkenalan lebih dekat',
            'Terima kasih sudah berkunjung'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeText() {
            const currentText = texts[textIndex];

            if (isDeleting) {
                typedElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typedElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                typingSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(typeText, typingSpeed);
        }

        typeText();
    }

    // ========== PARTICLES ==========
    const particlesContainer = document.querySelector('.particles');
    if (particlesContainer) {
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';

            // Add floating animation
            const duration = 10 + Math.random() * 10;
            particle.style.animation = `particleFloat ${duration}s infinite`;

            particlesContainer.appendChild(particle);
        }

        // Add keyframe dynamically
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
                10% { opacity: 0.3; }
                90% { opacity: 0.3; }
                100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ========== QUOTES CAROUSEL ==========
    const quoteItems = document.querySelectorAll('.quote-item');
    const quoteDots = document.querySelectorAll('.quote-dot');
    let currentQuote = 0;

    function showQuote(index) {
        quoteItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
        quoteDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    if (quoteDots.length > 0) {
        quoteDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentQuote = index;
                showQuote(currentQuote);
            });
        });

        // Auto rotate
        setInterval(() => {
            currentQuote = (currentQuote + 1) % quoteItems.length;
            showQuote(currentQuote);
        }, 5000);
    }

    // ========== GALLERY FILTER ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');

            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // ========== LIGHTBOX ==========
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let currentImageIndex = 0;
    const galleryImages = [];

    document.querySelectorAll('.gallery-item').forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            galleryImages.push({
                src: img.getAttribute('src'),
                alt: img.getAttribute('alt')
            });
            item.addEventListener('click', () => openLightbox(index));
        }
    });

    function openLightbox(index) {
        currentImageIndex = index;
        if (lightboxImg) {
            lightboxImg.setAttribute('src', galleryImages[index].src);
            lightboxImg.setAttribute('alt', galleryImages[index].alt);
        }
        if (lightbox) {
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        if (lightboxImg) {
            lightboxImg.setAttribute('src', galleryImages[currentImageIndex].src);
            lightboxImg.setAttribute('alt', galleryImages[currentImageIndex].alt);
        }
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        if (lightboxImg) {
            lightboxImg.setAttribute('src', galleryImages[currentImageIndex].src);
            lightboxImg.setAttribute('alt', galleryImages[currentImageIndex].alt);
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);

    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const formData = {
                name: nameInput ? nameInput.value : '',
                email: emailInput ? emailInput.value : '',
                message: messageInput ? messageInput.value : '',
                date: new Date().toLocaleString('id-ID')
            };

            // Save to localStorage
            let messages = JSON.parse(localStorage.getItem('afn_messages') || '[]');
            messages.push(formData);
            localStorage.setItem('afn_messages', JSON.stringify(messages));

            alert('Pesan berhasil disimpan! Terima kasih, ' + formData.name);
            contactForm.reset();
        });
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
