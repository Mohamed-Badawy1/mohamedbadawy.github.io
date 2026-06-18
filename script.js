// ===== PORTFOLIO INTERACTIONS =====

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initParticles();
    initNavbar();
    initTypingEffect();
    initScrollAnimations();
    initSkillBars();
    initCountUp();
});

// ===== CURSOR GLOW =====
function initCursorGlow() {
    const glow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        glow.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        glow.style.opacity = '0';
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.1;
        glowY += (mouseY - glowY) * 0.1;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();
}

// ===== PARTICLES =====
function initParticles() {
    const container = document.getElementById('particles');
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = Math.random() * 15 + 10 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(particle);
    }
}

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // Active link tracking
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                links.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const element = document.getElementById('typedText');
    const texts = [
        'Software Operations Engineer',
        'Business Application Developer',
        'Software Developer',
        'Problem Solver'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function type() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el, index) => {
        // Add stagger delay to siblings
        const parent = el.parentElement;
        const siblings = parent.querySelectorAll(':scope > .animate-on-scroll');
        const siblingIndex = Array.from(siblings).indexOf(el);
        if (siblingIndex > 0) {
            el.dataset.delay = siblingIndex * 100;
        }

        // Immediately reveal hero section elements with stagger
        if (el.closest('#hero')) {
            const heroEls = document.querySelectorAll('#hero .animate-on-scroll');
            const heroIndex = Array.from(heroEls).indexOf(el);
            setTimeout(() => {
                el.classList.add('visible');
            }, 200 + heroIndex * 150);
        } else {
            observer.observe(el);
        }
    });
}

// ===== SKILL BARS =====
function initSkillBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach((bar, index) => {
                    setTimeout(() => {
                        const width = bar.dataset.width;
                        bar.style.width = width + '%';
                        bar.classList.add('animated');
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-category').forEach(cat => {
        observer.observe(cat);
    });
}

// ===== COUNT UP ANIMATION =====
function initCountUp() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numbers = entry.target.querySelectorAll('.stat-number');
                numbers.forEach(num => {
                    const target = num.dataset.count ? parseInt(num.dataset.count) : null;
                    const gpa = num.dataset.gpa ? parseFloat(num.dataset.gpa) : null;

                    if (target !== null) {
                        animateCount(num, 0, target, 1500);
                    } else if (gpa !== null) {
                        animateCount(num, 0, gpa, 1500, true);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
}

function animateCount(element, start, end, duration, isFloat = false) {
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = start + (end - start) * eased;

        if (isFloat) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
