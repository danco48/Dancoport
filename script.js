    (function() {
      // Mobile menu
      const menuButton = document.querySelector('.menu-button');
      const nav = document.querySelector('.site-nav');
      if (menuButton && nav) {
        menuButton.addEventListener('click', function() {
          const open = nav.classList.toggle('open');
          menuButton.setAttribute('aria-expanded', String(open));
          menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        });
        nav.querySelectorAll('a').forEach(function(link) {
          link.addEventListener('click', function() {
            nav.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
            menuButton.setAttribute('aria-label', 'Open menu');
          });
        });
      }
      // Footer year
      const yearSpan = document.getElementById('year');
      if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
      }
    })();
