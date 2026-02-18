// ===== script.js =====

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ----- PRELOADER -----
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 800); // smooth hide after load
  }

  // ----- TYPING EFFECT -----
  const typingElement = document.getElementById('typing');
  if (typingElement) {
    const words = ['designineer', 'creative coder', 'problem solver', 'mentor'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIndex];
      if (!isDeleting && charIndex <= currentWord.length) {
        typingElement.textContent = currentWord.slice(0, charIndex);
        charIndex++;
      } else if (isDeleting && charIndex >= 0) {
        typingElement.textContent = currentWord.slice(0, charIndex);
        charIndex--;
      }

      if (!isDeleting && charIndex === currentWord.length + 1) {
        isDeleting = true;
        setTimeout(typeEffect, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 300);
      } else {
        setTimeout(typeEffect, isDeleting ? 70 : 120);
      }
    }
    typeEffect();
  }

  // ----- MOBILE MENU TOGGLE -----
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('show');
      menuToggle.classList.toggle('active');
    });

    // close menu on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('show');
        menuToggle.classList.remove('active');
      });
    });
  }

  // ----- ACTIVE NAVIGATION ON SCROLL -----
  const sections = document.querySelectorAll('section[id], header[id]');
  const navItems = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let scrollY = window.scrollY + 100; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // call once on load

  // ----- NAVBAR SCROLL EFFECT (shrink) -----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ----- BACK TO TOP BUTTON -----
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ----- SCROLL REVEAL ANIMATIONS (intersection observer) -----
  const revealElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // optional: unobserve after reveal to improve performance
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => observer.observe(el));

  // ----- FORM HANDLING (prevent default, just simulate) -----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // simple fake success message (pro user feedback)
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>Sent!</span> <i class="fa-regular fa-circle-check"></i>';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        contactForm.reset();
      }, 2500);
    });
  }

  // ----- SMOOTH SCROLL FOR ANCHOR LINKS (native but with offset) -----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80; // navbar height buffer
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ----- PARALLAX / subtle mouse move effect on hero (optional) -----
  const hero = document.querySelector('.hero');
  if (hero) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      hero.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    });
  }

  // ----- IMAGE FALLBACK FOR WHATSAPP ICON (already handled by onerror, but we can also preload) -----
  const waFloat = document.querySelector('.whatsapp-float i');
  // already using font-awesome, so it's fine

  // ----- ADDITIONAL GLOW EFFECT ON PROJECT CARDS (optional hover) -----
  console.log('✨ Danco Designineer — pro mode activated');
});
