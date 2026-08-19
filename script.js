/* =========================================================
   DANCO CO. — INTERACTIONS
========================================================= */


/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("open");

        const open =
            mainNav.classList.contains("open");

        menuToggle.setAttribute(
            "aria-label",
            open
                ? "Close menu"
                : "Open menu"
        );

    });


    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener("click", () => {

                mainNav.classList.remove("open");

            });

        });

}


/* =========================================================
   THEME
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("danco-theme");

if (savedTheme === "light") {
    document.body.classList.add("light");
}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("light");

        const theme =
            document.body.classList.contains("light")
                ? "light"
                : "dark";

        localStorage.setItem(
            "danco-theme",
            theme
        );

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: .12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   PROJECT FILTER
========================================================= */

const filters =
    document.querySelectorAll(".filter");

const projects =
    document.querySelectorAll(".project-card");


filters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            filters.forEach(button => {

                button.classList.remove(
                    "active"
                );

            });

            filter.classList.add("active");

            const category =
                filter.dataset.filter;


            projects.forEach(project => {

                const projectCategory =
                    project.dataset.category;


                if (
                    category === "all" ||
                    category === projectCategory
                ) {

                    project.style.display =
                        "";

                    requestAnimationFrame(() => {

                        project.style.opacity =
                            "1";

                        project.style.transform =
                            "translateY(0)";

                    });

                } else {

                    project.style.opacity =
                        "0";

                    project.style.transform =
                        "translateY(15px)";

                    setTimeout(() => {

                        project.style.display =
                            "none";

                    }, 250);

                }

            });

        }
    );

});


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            /*
             * The form uses mailto:njorodancan48@gmail.com.
             *
             * We don't prevent the default submit here.
             * This allows the user's email application
             * to open with the message.
             */

            formMessage.textContent =
                "Opening your email client...";

        }
    );

}


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   PARALLAX 3D BACKGROUND
========================================================= */

const scene =
    document.querySelector(".scene");

if (scene) {

    window.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    .5) * 2;

            const y =
                (event.clientY /
                    window.innerHeight -
                    .5) * 2;


            const cubeOne =
                document.querySelector(".cube-one");

            const cubeTwo =
                document.querySelector(".cube-two");

            const orbOne =
                document.querySelector(".orb-one");

            const orbTwo =
                document.querySelector(".orb-two");


            if (cubeOne) {

                cubeOne.style.marginLeft =
                    `${x * 12}px`;

                cubeOne.style.marginTop =
                    `${y * 12}px`;

            }


            if (cubeTwo) {

                cubeTwo.style.marginLeft =
                    `${x * -8}px`;

                cubeTwo.style.marginTop =
                    `${y * -8}px`;

            }


            if (orbOne) {

                orbOne.style.transform =
                    `translate(${x * 20}px, ${y * 20}px)`;

            }


            if (orbTwo) {

                orbTwo.style.transform =
                    `translate(${x * -15}px, ${y * -15}px)`;

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   ESCAPE CLOSES MENU
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            if (mainNav) {
                mainNav.classList.remove(
                    "open"
                );
            }

        }

    }
);
