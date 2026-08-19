document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     MOBILE NAVIGATION
  ------------------------- */

  const menuButton = document.querySelector(".menu-button");
  const nav = document.querySelector(".site-nav");

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const isOpen = nav.classList.toggle("open");

      menuButton.classList.toggle("open", isOpen);

      menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      document.body.classList.toggle(
        "no-scroll",
        isOpen
      );

    });


    nav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");
        menuButton.classList.remove("open");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

        menuButton.setAttribute(
          "aria-label",
          "Open navigation"
        );

        document.body.classList.remove("no-scroll");

      });

    });

  }


  /* -------------------------
     FOOTER YEAR
  ------------------------- */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* -------------------------
     SCROLL REVEALS
  ------------------------- */

  const revealElements =
    document.querySelectorAll(".reveal");

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            observer.unobserve(entry.target);

          }

        });

      },
      {
        threshold: 0.12
      }
    );


  revealElements.forEach(element => {
    observer.observe(element);
  });


  /* -------------------------
     CUSTOM CURSOR
  ------------------------- */

  const cursorDot =
    document.querySelector(".cursor-dot");

  const cursorRing =
    document.querySelector(".cursor-ring");


  if (
    cursorDot &&
    cursorRing &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;


    window.addEventListener("mousemove", event => {

      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left =
        `${mouseX}px`;

      cursorDot.style.top =
        `${mouseY}px`;

    });


    function animateCursor() {

      ringX +=
        (mouseX - ringX) * 0.14;

      ringY +=
        (mouseY - ringY) * 0.14;

      cursorRing.style.left =
        `${ringX}px`;

      cursorRing.style.top =
        `${ringY}px`;

      requestAnimationFrame(
        animateCursor
      );

    }


    animateCursor();


    const interactive =
      document.querySelectorAll(
        "a, button, .service, .person, .project"
      );


    interactive.forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {
          cursorRing.classList.add("active");
        }
      );


      element.addEventListener(
        "mouseleave",
        () => {
          cursorRing.classList.remove("active");
        }
      );

    });

  }


  /* -------------------------
     MAGNETIC BUTTON
  ------------------------- */

  const magnetic =
    document.querySelector(".magnetic");


  if (
    magnetic &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    magnetic.addEventListener(
      "mousemove",
      event => {

        const rect =
          magnetic.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        magnetic.style.transform =
          `translate(${x * 0.12}px, ${y * 0.12}px)`;

      }
    );


    magnetic.addEventListener(
      "mouseleave",
      () => {

        magnetic.style.transform =
          "translate(0,0)";

      }
    );

  }


  /* -------------------------
     PARALLAX HERO CORE
  ------------------------- */

  const heroVisual =
    document.querySelector(".hero-visual");

  const core =
    document.querySelector(".core");


  if (
    heroVisual &&
    core &&
    window.matchMedia("(pointer:fine)").matches
  ) {

    heroVisual.addEventListener(
      "mousemove",
      event => {

        const rect =
          heroVisual.getBoundingClientRect();

        const x =
          (event.clientX - rect.left)
          / rect.width
          - 0.5;

        const y =
          (event.clientY - rect.top)
          / rect.height
          - 0.5;

        core.style.transform =
          `translate(${x * 25}px, ${y * 25}px)`;

      }
    );


    heroVisual.addEventListener(
      "mouseleave",
      () => {

        core.style.transform =
          "translate(0,0)";

      }
    );

  }

});
