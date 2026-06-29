document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initCustomCursor();
  initMagneticButtons();
  initScrollAnimations();
  initCounters();
  initProjectFilters();
  initParallaxHero();
  initVideoFallback();
  initPageTransitions();
});

// ===== Navigation =====
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');
  const dropdowns = document.querySelectorAll('.nav-dropdown');

  // Mobile toggle
  if (toggle) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      toggle.classList.toggle('active');
    });
  }

  // Close menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('active');
      toggle.classList.remove('active');
    });
  });

  // Mobile dropdown toggles
  dropdowns.forEach(drop => {
    const link = drop.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        drop.classList.toggle('active');
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ===== Custom Cursor =====
function initCustomCursor() {
  const dot = document.querySelector('[data-cursor-dot]');
  const outline = document.querySelector('[data-cursor-outline]');
  if (!dot || !outline) return;

  let mouseX = 0, mouseY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  const interactives = document.querySelectorAll('a, button, .service-card, .project-item, .image-frame');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1.6)';
      outline.style.transform = 'translate(-50%, -50%) scale(1.6)';
      outline.style.borderColor = 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      outline.style.transform = 'translate(-50%, -50%) scale(1)';
      outline.style.borderColor = 'var(--primary)';
    });
  });

  if ('ontouchstart' in window) {
    dot.style.display = 'none';
    outline.style.display = 'none';
  }
}

// ===== Magnetic Buttons =====
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.magnetic');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const elements = document.querySelectorAll('.service-card, .project-item, .about-text, .about-image, .cta-text');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
}

// ===== Counters =====
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    let current = 0;
    const increment = Math.ceil(target / 60);
    let running = false;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !running) {
        running = true;
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target + suffix;
            clearInterval(interval);
            return;
          }
          counter.textContent = current + suffix;
        }, 30);
      }
    }, { threshold: 0.5 });
    observer.observe(counter);
  });
}

// ===== Project Filters =====
function initProjectFilters() {
  const filters = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-item');

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');

      const value = filter.dataset.filter;
      projects.forEach(project => {
        if (value === 'all' || project.dataset.category === value) {
          project.style.display = 'block';
          setTimeout(() => {
            project.style.opacity = '1';
            project.style.transform = 'scale(1)';
          }, 50);
        } else {
          project.style.opacity = '0';
          project.style.transform = 'scale(0.85)';
          setTimeout(() => {
            project.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ===== Parallax Hero =====
function initParallaxHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  const media = hero.querySelector('.hero-media');
  const content = hero.querySelector('.hero-content');

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (media) media.style.transform = `translateY(${scrolled * 0.4}px) scale(1.05)`;
    if (content) content.style.transform = `translateY(${scrolled * 0.12}px)`;
  }, { passive: true });
}

// ===== Video Fallback =====
function initVideoFallback() {
  const video = document.getElementById('hero-video');
  if (!video) return;
  video.addEventListener('error', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.style.backgroundImage = "url('assets/hero-background.jpg')";
      hero.style.backgroundSize = 'cover';
      hero.style.backgroundPosition = 'center';
    }
  });
}

// ===== Page Transitions =====
function initPageTransitions() {
  const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#') && !href.startsWith('http') && href !== '') {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(20px)';
        setTimeout(() => {
          window.location.href = href;
        }, 400);
      }
    });
  });

  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(20px)';
  document.body.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
  }, 150);
}

console.log('STEYA ENGINEERING — Website initialized.');
