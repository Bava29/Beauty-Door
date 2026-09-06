/* =========================================================
   BEAUTY DOOR HEADER JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* -----------------------------------------------------
       ELEMENTS
    ----------------------------------------------------- */

    const html = document.documentElement;

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    const themeToggles = document.querySelectorAll(".theme-toggle");
    const rtlToggles = document.querySelectorAll(".rtl-toggle");

    const homeDropdown = document.querySelector(".has-dropdown");
    const dropdownToggle = document.querySelector(".dropdown-toggle");


    /* =====================================================
       MOBILE / TABLET MENU
    ===================================================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", function () {

            const isOpen = mainNav.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });

    }


    /* =====================================================
       HOME DROPDOWN — MOBILE / TABLET
    ===================================================== */

    if (dropdownToggle && homeDropdown) {

        dropdownToggle.addEventListener("click", function (event) {

            /*
             * Desktop-la normal hover dropdown.
             * Tablet/mobile-la click dropdown.
             */

            if (window.innerWidth <= 1199) {

                event.preventDefault();

                homeDropdown.classList.toggle("dropdown-open");

            }

        });

    }


    /* =====================================================
       CLOSE MENU WHEN NAV LINK IS CLICKED
    ===================================================== */

    const navLinks = document.querySelectorAll(
        ".nav-menu a:not(.dropdown-toggle)"
    );

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            if (window.innerWidth <= 1199) {

                mainNav.classList.remove("active");
                menuToggle.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove("menu-open");

            }

        });

    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
    ===================================================== */

    document.addEventListener("click", function (event) {

        if (
            window.innerWidth <= 1199 &&
            mainNav &&
            menuToggle &&
            mainNav.classList.contains("active") &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("menu-open");

        }

    });


    /* =====================================================
       DARK MODE
    ===================================================== */

    function updateThemeIcon() {

        const isDark = html.classList.contains("dark-mode");

        themeToggles.forEach(function (button) {

            const icon = button.querySelector("i");

            if (!icon) return;

            if (isDark) {

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

                button.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

            } else {

                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

                button.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

            }

        });

    }


    themeToggles.forEach(function (button) {

        button.addEventListener("click", function () {

            html.classList.toggle("dark-mode");

            const isDark =
                html.classList.contains("dark-mode");

            localStorage.setItem(
                "beauty-door-theme",
                isDark ? "dark" : "light"
            );

            updateThemeIcon();

        });

    });


    /* Load Saved Theme */

    const savedTheme =
        localStorage.getItem("beauty-door-theme");

    if (savedTheme === "dark") {

        html.classList.add("dark-mode");

    }

    updateThemeIcon();


    /* =====================================================
       RTL MODE
    ===================================================== */

    function updateRTLIcon() {

        const isRTL = html.getAttribute("dir") === "rtl";

        rtlToggles.forEach(function (button) {

            if (isRTL) {

                button.setAttribute(
                    "aria-label",
                    "Switch to LTR mode"
                );

            } else {

                button.setAttribute(
                    "aria-label",
                    "Switch to RTL mode"
                );

            }

        });

    }


    rtlToggles.forEach(function (button) {

        button.addEventListener("click", function () {

            const isRTL =
                html.getAttribute("dir") === "rtl";

            if (isRTL) {

                html.setAttribute("dir", "ltr");

                localStorage.setItem(
                    "beauty-door-direction",
                    "ltr"
                );

            } else {

                html.setAttribute("dir", "rtl");

                localStorage.setItem(
                    "beauty-door-direction",
                    "rtl"
                );

            }

            updateRTLIcon();

        });

    });


    /* Load Saved Direction */

    const savedDirection =
        localStorage.getItem("beauty-door-direction");

    if (savedDirection === "rtl") {

        html.setAttribute("dir", "rtl");

    } else {

        html.setAttribute("dir", "ltr");

    }

    updateRTLIcon();


    /* =====================================================
       RESET MOBILE MENU ON RESIZE
    ===================================================== */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 1199) {

            mainNav.classList.remove("active");
            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove("menu-open");

            if (homeDropdown) {
                homeDropdown.classList.remove("dropdown-open");
            }

        }

    });

});

// =========================================
// SCROLL TO TOP
// =========================================

const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {

    const tabs = document.querySelectorAll(".services-pricing-tab");
    const rows = document.querySelectorAll(".services-pricing-row");

    tabs.forEach(function (tab) {

        tab.addEventListener("click", function () {

            const category = this.dataset.category;

            tabs.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            rows.forEach(function (row) {

                if (
                    category === "all" ||
                    row.dataset.category === category
                ) {
                    row.style.display = "grid";
                } else {
                    row.style.display = "none";
                }

            });

        });

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const options = document.querySelectorAll(".services-match-option");

    const title = document.getElementById("matchTitle");
    const description = document.getElementById("matchDescription");
    const services = document.getElementById("matchServices");
    const result = document.querySelector(".services-match-result");


    /* =========================
       BEAUTY MATCH DATA
    ========================= */

    const matchData = {

        everyday: {
            title: "Everyday Beauty Edit",
            description:
                "A simple combination for feeling fresh, polished and ready for your day.",
            services: [
                "Glow Facial",
                "Hair Styling",
                "Manicure"
            ]
        },

        date: {
            title: "Date Night Beauty Edit",
            description:
                "A polished beauty combination designed for a little extra confidence and glow.",
            services: [
                "Glow Facial",
                "Hair Styling",
                "Nail Art"
            ]
        },

        occasion: {
            title: "Special Occasion Edit",
            description:
                "Get beautifully prepared for celebrations, events and moments worth remembering.",
            services: [
                "Party Makeup",
                "Hair Styling",
                "Manicure"
            ]
        },

        bridal: {
            title: "Bridal Beauty Edit",
            description:
                "A thoughtful beauty combination created to help you feel your most beautiful on your special day.",
            services: [
                "Bridal Makeup",
                "Hair Styling",
                "Glow Facial"
            ]
        }

    };


    /* =========================
       UPDATE RESULT
    ========================= */

    function updateBeautyMatch(matchKey) {

        const data = matchData[matchKey];

        if (!data) {
            return;
        }


        /* Update heading */

        title.textContent = data.title;


        /* Update description */

        description.textContent = data.description;


        /* Clear existing services */

        services.innerHTML = "";


        /* Add recommended services */

        data.services.forEach(function (service) {

            const span = document.createElement("span");

            span.textContent = service;

            services.appendChild(span);

        });


        /* =========================
           SHOW LEFT SIDE POPUP
        ========================= */

        if (result) {

            result.classList.remove("show");

            /*
             * Small delay allows the content
             * to update before popup animation starts.
             */

            setTimeout(function () {
                result.classList.add("show");
            }, 50);

        }

    }


    /* =========================
       OPTION CLICK
    ========================= */

    options.forEach(function (option) {

        option.addEventListener("click", function () {

            const matchKey = this.dataset.match;


            /* Remove active from all */

            options.forEach(function (item) {
                item.classList.remove("active");
            });


            /* Add active to selected option */

            this.classList.add("active");


            /* Update popup */

            updateBeautyMatch(matchKey);

        });

    });


    /* =========================
       INITIAL STATE
    ========================= */

    const activeOption = document.querySelector(
        ".services-match-option.active"
    );


    if (activeOption) {

        const initialMatch = activeOption.dataset.match;

        updateBeautyMatch(initialMatch);

    }


    /* =========================
       CLOSE POPUP WHEN CLICKING
       BOOK THIS EXPERIENCE
    ========================= */

    const bookButton = document.querySelector(
        ".services-match-button"
    );


    if (bookButton) {

        bookButton.addEventListener("click", function () {

            if (result) {
                result.classList.remove("show");
            }

        });

    }


    /* =========================
       ESCAPE KEY CLOSE
    ========================= */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && result) {

            result.classList.remove("show");

        }

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const items = document.querySelectorAll(
        ".services-goodtoknow-item"
    );

    items.forEach(function (item) {

        const trigger = item.querySelector(
            ".services-goodtoknow-trigger"
        );

        trigger.addEventListener("click", function () {

            items.forEach(function (otherItem) {

                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                }

            });

            item.classList.toggle("active");

        });

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const options = document.querySelectorAll(
        ".howworks-service-option"
    );

    const title = document.getElementById(
        "howworksServiceTitle"
    );

    const description = document.getElementById(
        "howworksServiceDescription"
    );


    /* =========================
       SERVICE DATA
    ========================= */

    const serviceData = {

        hair: {
            title: "Hair Care",
            description:
                "Refresh your look with professional hair care, styling and treatments delivered comfortably to your home."
        },

        skin: {
            title: "Skin Care",
            description:
                "Give your skin the care it deserves with relaxing facials, cleanups and thoughtful skin rituals at home."
        },

        nails: {
            title: "Nail Care",
            description:
                "Enjoy beautifully finished nails with professional manicure, pedicure and nail art services at your doorstep."
        },

        occasion: {
            title: "Special Occasion",
            description:
                "Get ready for celebrations and important moments with professional makeup, bridal and event beauty services at home."
        }

    };


    /* =========================
       OPTION CLICK
    ========================= */

    options.forEach(function (option) {

        option.addEventListener("click", function () {

            const serviceKey = this.dataset.service;

            const data = serviceData[serviceKey];

            if (!data) {
                return;
            }


            /* Remove active state */

            options.forEach(function (item) {
                item.classList.remove("active");
            });


            /* Add active state */

            this.classList.add("active");


            /* Update result */

            title.textContent = data.title;

            description.textContent = data.description;


            /* Small result animation */

            const result =
                document.querySelector(
                    ".howworks-service-result"
                );

            if (result) {

                result.style.opacity = "0";
                result.style.transform = "translateY(8px)";

                setTimeout(function () {

                    result.style.opacity = "1";
                    result.style.transform =
                        "translateY(0)";

                }, 120);

            }

        });

    });

});
