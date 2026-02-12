// ============================================
// THEME MANAGEMENT
// ============================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  htmlElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

// ============================================
// SMOOTH SCROLL WITH OFFSET FOR FIXED NAV
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    
    const navHeight = document.querySelector('.nav').offsetHeight;
    const targetPosition = targetElement.offsetTop - navHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function highlightNavOnScroll() {
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Throttle scroll event for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(() => {
      highlightNavOnScroll();
      scrollTimeout = null;
    }, 100);
  }
});

// ============================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// ============================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe project cards, leadership cards, etc. for staggered animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.project, .leadership-card, .skill-category');
  
  animatedElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `all 0.6s ease ${index * 0.1}s`;
    fadeInObserver.observe(element);
  });
});

// ============================================
// PERFORMANCE: REDUCE ANIMATIONS ON SLOW DEVICES
// ============================================

// Detect if device prefers reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.body.classList.add('reduce-motion');
}

// ============================================
// COPY EMAIL ON CLICK (IF EMAIL LINK PRESENT)
// ============================================

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

emailLinks.forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = link.getAttribute('href').replace('mailto:', '');
    
    try {
      await navigator.clipboard.writeText(email);
      
      // Visual feedback
      const originalText = link.textContent;
      link.textContent = 'Email copied!';
      link.style.color = 'var(--color-accent-primary)';
      
      setTimeout(() => {
        link.textContent = originalText;
        link.style.color = '';
      }, 2000);
    } catch (err) {
      // Fallback: open email client
      window.location.href = link.getAttribute('href');
    }
  });
});

// ============================================
// MOBILE MENU TOGGLE (IF IMPLEMENTING HAMBURGER)
// ============================================

// Note: Current design uses visible nav on all screens
// Add this if you want a hamburger menu on mobile:

/*
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav__menu');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close menu when clicking nav links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}
*/

// ============================================
// LAZY LOAD IMAGES (IF NEEDED)
// ============================================

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll('img.lazy');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ============================================
// ANALYTICS TRACKING (PLACEHOLDER)
// ============================================

// Add your analytics code here when ready
// Example: Google Analytics, Plausible, etc.

console.log('Portfolio loaded successfully ✨');
