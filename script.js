/* =========================================================
   DANCO CO. — MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("open");

        const isOpen = mainNav.classList.contains("open");

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            mainNav.classList.remove("open");
        });
    });
}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("danco-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const theme = document.body.classList.contains("dark")
            ? "dark"
            : "light";

        localStorage.setItem("danco-theme", theme);
    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.12
    }
);

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   PROJECT FILTERS
========================================================= */

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        filters.forEach(button => {
            button.classList.remove("active");
        });

        filter.classList.add("active");

        const category = filter.dataset.filter;

        projects.forEach(project => {

            const projectCategory = project.dataset.category;

            if (
                category === "all" ||
                category === projectCategory
            ) {

                project.style.display = "";

                setTimeout(() => {
                    project.style.opacity = "1";
                    project.style.transform = "translateY(0)";
                }, 20);

            } else {

                project.style.opacity = "0";
                project.style.transform = "translateY(15px)";

                setTimeout(() => {
                    project.style.display = "none";
                }, 250);

            }

        });

    });

});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", event => {

        event.preventDefault();

        const name = contactForm
            .querySelector('[name="name"]')
            .value
            .trim();

        if (!name) {
            formMessage.textContent = "Please enter your name.";
            return;
        }

        formMessage.textContent =
            `Thanks, ${name}. Your message is ready to send.`;

        contactForm.reset();

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navLinks.forEach(link => {
                    link.classList.remove("active");
                });

                const activeLink = document.querySelector(
                    `.main-nav a[href="#${entry.target.id}"]`
                );

                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================================
   SMOOTH HEADER EFFECT
========================================================= */

const header = document.querySelector(".site-header");

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    },
    {
        passive: true
    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

const yearElements = document.querySelectorAll("[data-year]");

yearElements.forEach(element => {
    element.textContent = new Date().getFullYear();
});


/* =========================================================
   KEYBOARD ACCESSIBILITY
========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        if (mainNav) {
            mainNav.classList.remove("open");
        }

    }

});
