// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initAnimations();
    initCustomCursor();
    initParticles();
    initVideoFallback();
    initMagneticButtons();
    initServiceCards();
    initImageHoverEffects();
    initScrollIndicator();
    initPageTransitions();
});

// Initialize Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Initialize Scroll Effects
function initScrollEffects() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.service-card, .project-item, .intro-text, .intro-image');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
}

// Initialize Animations
function initAnimations() {
    // Animate elements with Intersection Observer
    const animatedElements = document.querySelectorAll('.reveal-text, .image-frame, .service-icon');
    
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize Custom Cursor
function initCustomCursor() {
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');
    
    if (!cursorDot || !cursorOutline) return;
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Outline with delay
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
        
        // Interactive elements effect
        const interactiveElements = document.querySelectorAll('a, button, .nav-toggle, .image-frame, .project-item, .service-card');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'scale(1.5)';
                cursorOutline.style.transform = 'scale(1.5)';
                cursorOutline.style.borderWidth = '1px';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'scale(1)';
                cursorOutline.style.transform = 'scale(1)';
                cursorOutline.style.borderWidth = '2px';
            });
        });
    });
}

// Initialize Particles
function initParticles() {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random properties
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        const colors = ['#008080', '#800000', '#333333', '#FFFFFF'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
        
        // Reset particle after animation completes
        setTimeout(() => {
            particle.remove();
            createParticle(container);
        }, (delay + duration) * 1000);
    }
}

// Video Fallback
function initVideoFallback() {
    const heroVideo = document.getElementById('hero-video');
    if (!heroVideo) return;
    
    // Check if video can play
    heroVideo.addEventListener('error', () => {
        // If video fails to load, set a background image instead
        document.querySelector('.hero').style.backgroundImage = "url('assets/hero-background.jpg')";
        document.querySelector('.hero').style.backgroundSize = 'cover';
        document.querySelector('.hero').style.backgroundPosition = 'center';
    });
}

// Initialize Magnetic Buttons
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.magnetic');
    
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const position = button.getBoundingClientRect();
            const x = e.pageX - position.left - position.width / 2;
            const y = e.pageY - position.top - position.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
        });
        
        button.addEventListener('mouseout', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize Service Cards
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.service-icon').style.transform = 'translateY(-10px) scale(1.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.service-icon').style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize Image Hover Effects
function initImageHoverEffects() {
    const imageFrames = document.querySelectorAll('.image-frame');
    
    imageFrames.forEach(frame => {
        frame.addEventListener('mouseenter', () => {
            const overlay = frame.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        frame.addEventListener('mouseleave', () => {
            const overlay = frame.querySelector('.image-overlay');
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
    });
}

// Initialize Scroll Indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Initialize Page Transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') && !link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Add transition effect
                document.body.classList.add('page-transition');
                
                setTimeout(() => {
                    window.location.href = link.getAttribute('href');
                }, 500);
            }
        });
    });
}

// Parallax Effect for Hero Section
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
}

// Initialize all when DOM is loaded
window.addEventListener('load', () => {
    // Additional initialization after all resources are loaded
    initParallax();
    
    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// Responsive adjustments
window.addEventListener('resize', () => {
    // Reinitialize particles on resize
    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
        particlesContainer.innerHTML = '';
        initParticles();
    }
});

// Utility function for smooth scrolling to anchors
function smoothScrollTo(target, duration = 1000) {
    const targetElement = document.querySelector(target);
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
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
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target !== '#') {
            smoothScrollTo(target);
        }
    });
});

// Add loading animation for page transitions
document.body.classList.add('loaded');

// Initialize any third-party libraries or additional functionality here

console.log('STEYA ENGINEERING website initialized successfully');




/* Add to the end of your existing styles.css file */

/* Services Detailed Section */
.services-detailed {
    padding: 6rem 0;
    position: relative;
    overflow: hidden;
}

.service-category {
    margin-bottom: 6rem;
}

.service-category-header {
    text-align: center;
    margin-bottom: 4rem;
}

.service-category-header h2 {
    margin-bottom: 1rem;
}

.service-category-header h2::after {
    left: 50%;
    transform: translateX(-50%);
}

.service-details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
}

.service-detail-card {
    background: var(--color-white);
    padding: 2.5rem;
    border-radius: 10px;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    overflow: hidden;
    height: 100%;
}

.service-detail-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-hover);
}

.service-detail-icon {
    width: 70px;
    height: 70px;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 128, 128, 0.1);
    border-radius: 50%;
    color: var(--color-teal);
}

.service-detail-icon svg {
    width: 35px;
    height: 35px;
}

.service-detail-card h3 {
    margin-bottom: 1rem;
    color: var(--color-dark);
}

.service-detail-card ul {
    margin-top: 1.5rem;
    padding-left: 1.5rem;
}

.service-detail-card li {
    margin-bottom: 0.5rem;
    position: relative;
    color: var(--color-gray);
}

.service-detail-card li::before {
    content: "•";
    color: var(--color-teal);
    font-weight: bold;
    position: absolute;
    left: -1rem;
}

/* Process Steps */
.process-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.process-step {
    text-align: center;
    padding: 2rem;
    background: var(--color-white);
    border-radius: 10px;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
}

.process-step:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-hover);
}

.step-number {
    width: 50px;
    height: 50px;
    background: var(--color-teal);
    color: var(--color-white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0 auto 1.5rem;
    position: relative;
    z-index: 2;
}

.process-step h3 {
    margin-bottom: 1rem;
    color: var(--color-dark);
}

.process-step p {
    color: var(--color-gray);
    font-size: 0.95rem;
}

/* Enhanced service detail cards */
.service-detail-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    background: linear-gradient(to bottom, var(--color-teal), transparent);
    opacity: 0.1;
    transition: height 0.5s ease;
    z-index: 0;
}

.service-detail-card:hover::before {
    height: 100%;
}

.service-detail-card::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(to right, var(--color-teal), var(--color-maroon));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
}

.service-detail-card:hover::after {
    transform: scaleX(1);
}

/* Responsive Design for Services Page */
@media (max-width: 992px) {
    .service-details-grid {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    
    .process-steps {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    }
}

@media (max-width: 768px) {
    .service-detail-card {
        padding: 2rem;
    }
    
    .process-step {
        padding: 1.5rem;
    }
    
    .service-details-grid {
        grid-template-columns: 1fr;
    }
    
    .process-steps {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 576px) {
    .services-detailed {
        padding: 4rem 0;
    }
    
    .service-category {
        margin-bottom: 4rem;
    }
    
    .service-detail-card {
        padding: 1.5rem;
    }
    
    .process-step {
        padding: 1.2rem;
    }
}
