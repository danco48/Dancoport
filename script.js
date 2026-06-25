/**
 * ================================================================
 * Danco Co. — Main Application Script
 * ================================================================
 * All functionality is contained within this single file.
 * No external dependencies beyond Font Awesome & Google Fonts.
 * ================================================================
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ================================================================
  // 1. PRELOADER
  // ================================================================
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', function() {
      setTimeout(function() {
        preloader.classList.add('hidden');
      }, 600);
    });
  }

  // ================================================================
  // 2. TYPING EFFECT (Single, clean implementation)
  // ================================================================
  const typingElement = document.getElementById('typing');
  if (typingElement) {
    const words = ['Design', 'Engineering', 'Mentorship', 'Creative Code', 'Brand Identity'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    function typeEffect() {
      const currentWord = words[wordIndex];
      const isComplete = !isDeleting && charIndex === currentWord.length;
      const isDeleted = isDeleting && charIndex === 0;

      if (isComplete) {
        isDeleting = true;
        typingTimeout = setTimeout(typeEffect, 2000);
        return;
      }

      if (isDeleted) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingTimeout = setTimeout(typeEffect, 400);
        return;
      }

      if (isDeleting) {
        charIndex--;
      } else {
        charIndex++;
      }

      typingElement.textContent = currentWord.slice(0, charIndex);
      typingTimeout = setTimeout(typeEffect, isDeleting ? 60 : 120);
    }

    typeEffect();

    // Cleanup timeout on page unload
    window.addEventListener('beforeunload', function() {
      clearTimeout(typingTimeout);
    });
  }

  // ================================================================
  // 3. MOBILE MENU TOGGLE
  // ================================================================
  const menuToggle = document.getElementById('menuToggle');
  const menu = document.getElementById('menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ================================================================
  // 4. ACTIVE NAVIGATION ON SCROLL
  // ================================================================
  const sections = document.querySelectorAll('section[id], header[id]');

  function setActiveLink() {
    const scrollY = window.scrollY + 120;

    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink);
  setActiveLink();

  // ================================================================
  // 5. NAVBAR SCROLL EFFECT
  // ================================================================
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // ================================================================
  // 6. BACK TO TOP BUTTON
  // ================================================================
  const backToTop = document.getElementById('backToTop');

  function handleBackToTopVisibility() {
    if (window.scrollY > 600) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTopVisibility);
  handleBackToTopVisibility();

  if (backToTop) {
    backToTop.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ================================================================
  // 7. SCROLL REVEAL ANIMATIONS (Intersection Observer)
  // ================================================================
  const revealElements = document.querySelectorAll(
    '.about-card, .service-card, .project-card, .team-card, .testimonial-card, .stat-card, .info-item'
  );

  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObserver.observe(el);
  });

  // ================================================================
  // 8. CONTACT FORM HANDLING
  // ================================================================
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;

      submitBtn.innerHTML = '<span>Sent ✓</span>';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';

      setTimeout(function() {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        contactForm.reset();

        // Optional: show a subtle success message
        const successMsg = document.createElement('p');
        successMsg.textContent = 'Thank you! We\'ll get back to you shortly.';
        successMsg.style.cssText =
          'color: #a78bfa; text-align: center; margin-top: 1rem; font-size: 0.9rem;';
        contactForm.appendChild(successMsg);

        setTimeout(function() {
          successMsg.remove();
        }, 4000);
      }, 2000);
    });
  }

  // ================================================================
  // 9. SMOOTH SCROLL FOR ANCHOR LINKS
  // ================================================================
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ================================================================
  // 10. HERO PARALLAX (Subtle mouse tracking)
  // ================================================================
  const hero = document.querySelector('.hero');

  if (hero) {
    document.addEventListener('mousemove', function(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      hero.style.backgroundPositionX = 50 + x + '%';
      hero.style.backgroundPositionY = 50 + y + '%';
    });
  }

  // ================================================================
  // 11. KEYBOARD ACCESSIBILITY — Close menu on Escape
  // ================================================================
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('active')) {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // ================================================================
  // 12. CONSOLE (Professional branding)
  // ================================================================
  console.log('%c Danco Co. %c Design & Engineering Agency ',
    'background:#7c3aed; color:#fff; padding:6px 12px; border-radius:4px 0 0 4px; font-weight:700;',
    'background:#2563eb; color:#fff; padding:6px 12px; border-radius:0 4px 4px 0; font-weight:400;'
  );
  console.log('✦ Built with precision. © 2026 Danco Co.');

}); // end DOMContentLoaded
