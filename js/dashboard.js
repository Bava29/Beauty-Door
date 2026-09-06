document.addEventListener("DOMContentLoaded", function () {

    const html = document.documentElement;

    const themeToggles = document.querySelectorAll(".theme-toggle");
    const rtlToggles = document.querySelectorAll(".rtl-toggle");

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


    const savedTheme =
        localStorage.getItem("beauty-door-theme");

    if (savedTheme === "dark") {

        html.classList.add("dark-mode");

    }

    updateThemeIcon();


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


    const savedDirection =
        localStorage.getItem("beauty-door-direction");

    if (savedDirection === "rtl") {

        html.setAttribute("dir", "rtl");

    } else {

        html.setAttribute("dir", "ltr");

    }

    updateRTLIcon();

});

document.addEventListener("DOMContentLoaded", function () {

    const logoutBtn =
        document.getElementById("logoutBtn");

    const logoutModal =
        document.getElementById("logoutModal");

    const closeLogoutModal =
        document.getElementById("closeLogoutModal");

    const cancelLogout =
        document.getElementById("cancelLogout");


    /* Open Logout Popup */

    if (logoutBtn) {

        logoutBtn.addEventListener("click", function () {

            logoutModal.classList.add("active");

        });

    }


    /* Close Popup */

    function closeLogoutPopup() {

        logoutModal.classList.remove("active");

    }


    if (closeLogoutModal) {

        closeLogoutModal.addEventListener(
            "click",
            closeLogoutPopup
        );

    }


    if (cancelLogout) {

        cancelLogout.addEventListener(
            "click",
            closeLogoutPopup
        );

    }


    /* Close by clicking outside */

    if (logoutModal) {

        logoutModal.addEventListener(
            "click",
            function (event) {

                if (event.target === logoutModal) {
                    closeLogoutPopup();
                }

            }
        );

    }

});


/* =========================================================
   BROWSE SERVICES PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const searchInput = document.getElementById("serviceSearch");
    const clearSearch = document.getElementById("clearSearch");

    const categoryButtons = document.querySelectorAll(
        ".browse-category-card"
    );

    const serviceCards = document.querySelectorAll(
        ".browse-service-card"
    );

    const servicesGrid = document.getElementById("servicesGrid");
    const servicesCount = document.getElementById("servicesCount");
    const filterStatus = document.getElementById("filterStatus");
    const noServicesMessage = document.getElementById(
        "noServicesMessage"
    );

    const resetFilters = document.getElementById(
        "resetFilters"
    );


    /* =====================================================
       FILTER STATE
    ===================================================== */

    let selectedCategory = "all";


    /* =====================================================
       FILTER SERVICES
    ===================================================== */

    function filterServices() {

        const searchValue = searchInput.value
            .trim()
            .toLowerCase();

        let visibleCount = 0;


        serviceCards.forEach(function (card) {

            const category = card.dataset.category;
            const serviceName = card.dataset.service.toLowerCase();

            const categoryMatch =
                selectedCategory === "all" ||
                category === selectedCategory;

            const searchMatch =
                searchValue === "" ||
                serviceName.includes(searchValue);

            if (categoryMatch && searchMatch) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        /* Count */

        servicesCount.textContent =
            visibleCount +
            (visibleCount === 1 ? " Service" : " Services");


        /* Status */

        if (searchValue !== "") {

            filterStatus.textContent =
                'Searching for "' +
                searchInput.value.trim() +
                '"';

        } else if (selectedCategory !== "all") {

            filterStatus.textContent =
                "Showing " +
                selectedCategory +
                " services";

        } else {

            filterStatus.textContent =
                "Showing all services";

        }


        /* Empty state */

        if (visibleCount === 0) {

            noServicesMessage.classList.add("show");

            servicesGrid.style.display = "none";

        } else {

            noServicesMessage.classList.remove("show");

            servicesGrid.style.display = "grid";

        }

    }


    /* =====================================================
       CATEGORY BUTTONS
    ===================================================== */

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            categoryButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            button.classList.add("active");

            selectedCategory =
                button.dataset.category;


            filterServices();

        });

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    searchInput.addEventListener(
        "input",
        filterServices
    );


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    clearSearch.addEventListener(
        "click",
        function () {

            searchInput.value = "";

            filterServices();

            searchInput.focus();

        }
    );


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    resetFilters.addEventListener(
        "click",
        function () {

            selectedCategory = "all";

            searchInput.value = "";

            categoryButtons.forEach(
                function (button) {

                    button.classList.remove("active");

                }
            );


            categoryButtons[0].classList.add(
                "active"
            );


            filterServices();

        }
    );


    /* =====================================================
       FAVOURITES
    ===================================================== */

    const favouriteButtons =
        document.querySelectorAll(
            ".service-favourite"
        );


    favouriteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();
                    event.stopPropagation();


                    button.classList.toggle(
                        "active"
                    );


                    const icon =
                        button.querySelector("i");


                    if (
                        button.classList.contains(
                            "active"
                        )
                    ) {

                        icon.classList.remove(
                            "fa-regular"
                        );

                        icon.classList.add(
                            "fa-solid"
                        );

                    } else {

                        icon.classList.remove(
                            "fa-solid"
                        );

                        icon.classList.add(
                            "fa-regular"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       BOOKING MODAL
    ===================================================== */

    const bookingModal =
        document.getElementById(
            "serviceBookingModal"
        );

    const bookingOverlay =
        document.getElementById(
            "bookingOverlay"
        );

    const closeBookingModal =
        document.getElementById(
            "closeBookingModal"
        );

    const openBookingBtn =
        document.getElementById(
            "openBookingBtn"
        );

    const bookingService =
        document.getElementById(
            "bookingService"
        );

    const bookingDate =
        document.getElementById(
            "bookingDate"
        );

    const bookingTime =
        document.getElementById(
            "bookingTime"
        );

    const selectedServiceName =
        document.getElementById(
            "selectedServiceName"
        );


    /* Summary */

    const summaryService =
        document.getElementById(
            "summaryService"
        );

    const summaryDuration =
        document.getElementById(
            "summaryDuration"
        );

    const summaryPrice =
        document.getElementById(
            "summaryPrice"
        );


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openBooking(serviceValue = "") {

        bookingModal.classList.add("show");

        bookingModal.setAttribute(
            "aria-hidden",
            "false"
        );


        if (serviceValue !== "") {

            bookingService.value =
                serviceValue;

        }


        updateBookingSummary();

    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeBooking() {

        bookingModal.classList.remove("show");

        bookingModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    openBookingBtn.addEventListener(
        "click",
        function () {

            openBooking();

        }
    );


    closeBookingModal.addEventListener(
        "click",
        closeBooking
    );


    bookingOverlay.addEventListener(
        "click",
        closeBooking
    );


    /* =====================================================
       SERVICE CARD BOOK BUTTONS
    ===================================================== */

    const serviceBookButtons =
        document.querySelectorAll(
            ".service-book-btn"
        );


    serviceBookButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const card =
                        button.closest(
                            ".browse-service-card"
                        );


                    const serviceName =
                        card.dataset.service;

                    const price =
                        card.dataset.price;

                    const duration =
                        card.dataset.duration;


                    const option =
                        Array.from(
                            bookingService.options
                        ).find(
                            function (item) {

                                return item.value
                                    .startsWith(
                                        serviceName +
                                        "|"
                                    );

                            }
                        );


                    if (option) {

                        bookingService.value =
                            option.value;

                    }


                    openBooking(
                        bookingService.value
                    );

                }
            );

        }
    );


    /* =====================================================
       SERVICE SELECT CHANGE
    ===================================================== */

    bookingService.addEventListener(
        "change",
        updateBookingSummary
    );


    function updateBookingSummary() {

        const value =
            bookingService.value;


        if (!value) {

            selectedServiceName.textContent =
                "Choose a service";

            summaryService.textContent =
                "—";

            summaryDuration.textContent =
                "—";

            summaryPrice.textContent =
                "—";

            return;

        }


        const parts =
            value.split("|");


        const service =
            parts[0];

        const price =
            parts[1];

        const duration =
            parseInt(parts[2], 10);


        selectedServiceName.textContent =
            service;

        summaryService.textContent =
            service;

        summaryPrice.textContent =
            "₹" +
            Number(price).toLocaleString("en-IN");


        if (duration >= 60) {

            const hours =
                Math.floor(duration / 60);

            const minutes =
                duration % 60;

            summaryDuration.textContent =
                hours +
                " hr" +
                (hours > 1 ? "s" : "") +
                (minutes ? " " + minutes + " min" : "");

        } else {

            summaryDuration.textContent =
                duration + " min";

        }

    }


    /* =====================================================
       DATE — MINIMUM TODAY
    ===================================================== */

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    bookingDate.min =
        year +
        "-" +
        month +
        "-" +
        day;


    /* =====================================================
       TIME SLOTS
    ===================================================== */

    const timeSlots =
        document.querySelectorAll(
            ".time-slot"
        );


    timeSlots.forEach(
        function (slot) {

            slot.addEventListener(
                "click",
                function () {

                    timeSlots.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    slot.classList.add(
                        "active"
                    );


                    bookingTime.value =
                        slot.dataset.time;

                }
            );

        }
    );


    /* =====================================================
       QUICK BOOKING SUBMIT
    ===================================================== */

    const quickBookingForm =
        document.getElementById(
            "quickBookingForm"
        );


    const bookingSuccessPopup =
        document.getElementById(
            "bookingSuccessPopup"
        );


    const successMessage =
        document.getElementById(
            "successMessage"
        );


    const goToBookingPage =
        document.getElementById(
            "goToBookingPage"
        );


    quickBookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (!bookingService.value) {

                bookingService.focus();

                return;

            }


            if (!bookingDate.value) {

                bookingDate.focus();

                return;

            }


            if (!bookingTime.value) {

                alert(
                    "Please select a preferred time slot."
                );

                return;

            }


            const serviceName =
                bookingService.value.split("|")[0];


            const formattedDate =
                new Date(
                    bookingDate.value +
                    "T00:00:00"
                ).toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    }
                );


            successMessage.textContent =
                serviceName +
                " selected for " +
                formattedDate +
                " at " +
                bookingTime.value +
                ". Continue to complete your booking.";


            closeBooking();


            bookingSuccessPopup.classList.add(
                "show"
            );

            bookingSuccessPopup.setAttribute(
                "aria-hidden",
                "false"
            );

        }
    );


    /* =====================================================
       CONTINUE TO BOOKING PAGE
    ===================================================== */

    goToBookingPage.addEventListener(
        "click",
        function () {

            window.location.href =
                "d3.html";

        }
    );


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeBooking();

                bookingSuccessPopup.classList.remove(
                    "show"
                );

            }

        }
    );


    /* =====================================================
       LOGOUT
    ===================================================== */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

    const logoutModal =
        document.getElementById(
            "logoutModal"
        );

    const closeLogoutModal =
        document.getElementById(
            "closeLogoutModal"
        );

    const cancelLogout =
        document.getElementById(
            "cancelLogout"
        );


    logoutBtn.addEventListener(
        "click",
        function () {

            logoutModal.classList.add(
                "show"
            );

        }
    );


    closeLogoutModal.addEventListener(
        "click",
        function () {

            logoutModal.classList.remove(
                "show"
            );

        }
    );


    cancelLogout.addEventListener(
        "click",
        function () {

            logoutModal.classList.remove(
                "show"
            );

        }
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    filterServices();
    updateBookingSummary();

});

/* =========================================================
   BEAUTY DOOR — BOOK A SERVICE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const serviceOptions = document.querySelectorAll(".booking-service-option");
    const timeOptions = document.querySelectorAll(".booking-time-option");

    const serviceDate = document.getElementById("serviceDate");

    const customerName = document.getElementById("customerName");
    const customerPhone = document.getElementById("customerPhone");
    const customerAddress = document.getElementById("customerAddress");
    const bookingNotes = document.getElementById("bookingNotes");

    const summaryServiceName = document.getElementById("summaryServiceName");
    const summaryDate = document.getElementById("summaryDate");
    const summaryTime = document.getElementById("summaryTime");
    const summaryDuration = document.getElementById("summaryDuration");
    const summaryPrice = document.getElementById("summaryPrice");

    const confirmServiceBtn = document.getElementById("confirmServiceBtn");


    /* =====================================================
       BOOKING STATE
    ===================================================== */

    let selectedService = {
        name: "Haircut & Styling",
        category: "Hair",
        price: "499",
        duration: "45"
    };

    let selectedTime = "";


    /* =====================================================
       SET MINIMUM DATE
    ===================================================== */

    if (serviceDate) {

        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");

        const todayString = `${year}-${month}-${day}`;

        serviceDate.min = todayString;
    }


    /* =====================================================
       SERVICE SELECTION
    ===================================================== */

    serviceOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            /* Remove active state */
            serviceOptions.forEach(function (item) {
                item.classList.remove("active");
            });

            /* Add active state */
            this.classList.add("active");


            /* Get service information */
            selectedService = {
                name: this.dataset.service,
                category: this.dataset.category,
                price: this.dataset.price,
                duration: this.dataset.duration
            };


            /* Update summary */
            updateServiceSummary();

        });

    });


    /* =====================================================
       UPDATE SERVICE SUMMARY
    ===================================================== */

    function updateServiceSummary() {

        if (summaryServiceName) {
            summaryServiceName.textContent = selectedService.name;
        }

        if (summaryDuration) {
            summaryDuration.textContent =
                `${selectedService.duration} minutes`;
        }

        if (summaryPrice) {
            summaryPrice.textContent =
                `₹${formatPrice(selectedService.price)}`;
        }

    }


    /* =====================================================
       FORMAT PRICE
    ===================================================== */

    function formatPrice(price) {

        const number = Number(price);

        return number.toLocaleString("en-IN");

    }


    /* =====================================================
       TIME SLOT SELECTION
    ===================================================== */

    timeOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            /* Remove active state */
            timeOptions.forEach(function (item) {
                item.classList.remove("active");
            });

            /* Add active state */
            this.classList.add("active");

            /* Store selected time */
            selectedTime = this.dataset.time;

            /* Update summary */
            if (summaryTime) {
                summaryTime.textContent = selectedTime;
            }

        });

    });


    /* =====================================================
       DATE SELECTION
    ===================================================== */

    if (serviceDate) {

        serviceDate.addEventListener("change", function () {

            clearFieldError(serviceDate);

            if (!this.value) {

                summaryDate.textContent = "Not selected";

                return;
            }

            summaryDate.textContent =
                formatDate(this.value);

        });

    }


    /* =====================================================
       FORMAT DATE
    ===================================================== */

    function formatDate(dateValue) {

        const date = new Date(dateValue + "T00:00:00");

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

    }


    /* =====================================================
       CLEAR ERROR WHEN USER TYPES
    ===================================================== */

    const formFields = [
        customerName,
        customerPhone,
        customerAddress,
        bookingNotes
    ];

    formFields.forEach(function (field) {

        if (!field) return;

        field.addEventListener("input", function () {
            clearFieldError(this);
        });

    });


    /* =====================================================
       VALIDATION
    ===================================================== */

    function validateBooking() {

        let isValid = true;

        clearAllErrors();


        /* Customer name */

        if (!customerName || customerName.value.trim() === "") {

            showFieldError(
                customerName,
                "Please enter your full name."
            );

            isValid = false;
        }


        /* Phone */

        if (!customerPhone || customerPhone.value.trim() === "") {

            showFieldError(
                customerPhone,
                "Please enter your phone number."
            );

            isValid = false;

        } else {

            const phoneNumber =
                customerPhone.value.replace(/\D/g, "");

            if (phoneNumber.length < 10) {

                showFieldError(
                    customerPhone,
                    "Please enter a valid phone number."
                );

                isValid = false;
            }

        }


        /* Address */

        if (!customerAddress ||
            customerAddress.value.trim() === "") {

            showFieldError(
                customerAddress,
                "Please enter your home address."
            );

            isValid = false;
        }


        /* Date */

        if (!serviceDate || !serviceDate.value) {

            showFieldError(
                serviceDate,
                "Please select your visit date."
            );

            isValid = false;
        }


        /* Time */

        if (!selectedTime) {

            showTimeError();

            isValid = false;
        }


        return isValid;

    }


    /* =====================================================
       SHOW FIELD ERROR
    ===================================================== */

    function showFieldError(field, message) {

        if (!field) return;

        field.classList.add("input-error");

        const parent = field.closest(".booking-form-group");

        if (!parent) {

            if (field === serviceDate) {
                createDateError(message);
            }

            return;
        }


        let existingError =
            parent.querySelector(".booking-error-message");

        if (!existingError) {

            existingError =
                document.createElement("small");

            existingError.className =
                "booking-error-message";

            parent.appendChild(existingError);
        }

        existingError.textContent = message;

    }


    /* =====================================================
       DATE ERROR
    ===================================================== */

    function createDateError(message) {

        const parent =
            serviceDate.closest(".booking-date-selection");

        if (!parent) return;

        let error =
            parent.querySelector(".booking-error-message");

        if (!error) {

            error = document.createElement("small");

            error.className =
                "booking-error-message";

            error.style.display = "block";
            error.style.marginTop = "8px";

            parent.appendChild(error);
        }

        error.textContent = message;

    }


    /* =====================================================
       TIME ERROR
    ===================================================== */

    function showTimeError() {

        const timeContainer =
            document.querySelector(".booking-time-selection");

        if (!timeContainer) return;

        let error =
            timeContainer.querySelector(".booking-error-message");

        if (!error) {

            error = document.createElement("small");

            error.className =
                "booking-error-message";

            error.style.display = "block";
            error.style.marginTop = "8px";

            timeContainer.appendChild(error);
        }

        error.textContent =
            "Please select a preferred time slot.";

    }


    /* =====================================================
       CLEAR FIELD ERROR
    ===================================================== */

    function clearFieldError(field) {

        if (!field) return;

        field.classList.remove("input-error");

        const parent =
            field.closest(".booking-form-group");

        if (parent) {

            const error =
                parent.querySelector(".booking-error-message");

            if (error) {
                error.remove();
            }

        }


        if (field === serviceDate) {

            const dateParent =
                field.closest(".booking-date-selection");

            if (dateParent) {

                const error =
                    dateParent.querySelector(
                        ".booking-error-message"
                    );

                if (error) {
                    error.remove();
                }

            }

        }

    }


    /* =====================================================
       CLEAR ALL ERRORS
    ===================================================== */

    function clearAllErrors() {

        document
            .querySelectorAll(".input-error")
            .forEach(function (field) {

                field.classList.remove("input-error");

            });


        document
            .querySelectorAll(".booking-error-message")
            .forEach(function (error) {

                error.remove();

            });

    }


    /* =====================================================
       CONFIRM BOOKING
    ===================================================== */

    if (confirmServiceBtn) {

        confirmServiceBtn.addEventListener("click", function () {

            if (!validateBooking()) {

                /* Scroll to first error */
                const firstError =
                    document.querySelector(".input-error");

                if (firstError) {

                    firstError.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

                return;
            }


            /* Button loading state */

            const originalButtonContent =
                confirmServiceBtn.innerHTML;

            confirmServiceBtn.disabled = true;

            confirmServiceBtn.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Confirming Booking...
            `;


            /* Small processing delay */

            setTimeout(function () {

                saveBooking();

                confirmServiceBtn.disabled = false;

                confirmServiceBtn.innerHTML =
                    originalButtonContent;

                showBookingSuccess();

            }, 900);

        });

    }


    /* =====================================================
       SAVE BOOKING
    ===================================================== */

    function saveBooking() {

        const booking = {

            id: "BD-" + Date.now(),

            service: selectedService.name,

            category: selectedService.category,

            price: Number(selectedService.price),

            duration: Number(selectedService.duration),

            date: serviceDate.value,

            formattedDate: formatDate(serviceDate.value),

            time: selectedTime,

            customerName:
                customerName.value.trim(),

            customerPhone:
                customerPhone.value.trim(),

            customerAddress:
                customerAddress.value.trim(),

            notes:
                bookingNotes
                    ? bookingNotes.value.trim()
                    : "",

            status: "Confirmed",

            createdAt:
                new Date().toISOString()

        };


        let bookings = [];

        try {

            bookings =
                JSON.parse(
                    localStorage.getItem("beautyDoorBookings")
                ) || [];

        } catch (error) {

            bookings = [];

        }


        bookings.unshift(booking);


        localStorage.setItem(
            "beautyDoorBookings",
            JSON.stringify(bookings)
        );


        /* Also store latest booking */

        localStorage.setItem(
            "beautyDoorLatestBooking",
            JSON.stringify(booking)
        );

    }


    /* =====================================================
       SUCCESS POPUP
    ===================================================== */

    function showBookingSuccess() {

        const existingPopup =
            document.getElementById("bookingSuccessPopup");

        if (existingPopup) {
            existingPopup.remove();
        }


        const popup =
            document.createElement("div");

        popup.id = "bookingSuccessPopup";

        popup.innerHTML = `

            <div class="booking-success-overlay">

                <div class="booking-success-card">

                    <button
                        type="button"
                        class="booking-success-close"
                        aria-label="Close">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div class="booking-success-icon">
                        <i class="fa-solid fa-check"></i>
                    </div>

                    <span class="booking-success-label">
                        BOOKING CONFIRMED
                    </span>

                    <h2>
                        Your Beauty Visit is Booked!
                    </h2>

                    <p>
                        Your ${escapeHTML(selectedService.name)}
                        has been successfully scheduled.
                    </p>

                    <div class="booking-success-details">

                        <div>
                            <span>
                                <i class="fa-regular fa-calendar"></i>
                                Date
                            </span>

                            <strong>
                                ${formatDate(serviceDate.value)}
                            </strong>
                        </div>

                        <div>
                            <span>
                                <i class="fa-regular fa-clock"></i>
                                Time
                            </span>

                            <strong>
                                ${escapeHTML(selectedTime)}
                            </strong>
                        </div>

                        <div>
                            <span>
                                <i class="fa-solid fa-indian-rupee-sign"></i>
                                Starting Price
                            </span>

                            <strong>
                                ₹${formatPrice(selectedService.price)}
                            </strong>
                        </div>

                    </div>

                    <div class="booking-success-actions">

                        <button
                            type="button"
                            class="booking-success-primary"
                            id="viewBookingBtn">

                            View My Bookings

                            <i class="fa-solid fa-arrow-right"></i>

                        </button>

                        <button
                            type="button"
                            class="booking-success-secondary"
                            id="closeSuccessBtn">

                            Done

                        </button>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(popup);


        /* Prevent background scroll */

        document.body.style.overflow = "hidden";


        /* Close buttons */

        const closeButton =
            popup.querySelector(".booking-success-close");

        const closeSuccessButton =
            popup.querySelector("#closeSuccessBtn");

        const viewBookingButton =
            popup.querySelector("#viewBookingBtn");


        closeButton.addEventListener(
            "click",
            closeSuccessPopup
        );

        closeSuccessButton.addEventListener(
            "click",
            closeSuccessPopup
        );


        viewBookingButton.addEventListener(
            "click",
            function () {

                window.location.href = "d4.html";

            }
        );


        /* Click outside */

        const overlay =
            popup.querySelector(".booking-success-overlay");

        overlay.addEventListener(
            "click",
            function (event) {

                if (event.target === overlay) {
                    closeSuccessPopup();
                }

            }
        );

    }


    /* =====================================================
       CLOSE SUCCESS POPUP
    ===================================================== */

    function closeSuccessPopup() {

        const popup =
            document.getElementById(
                "bookingSuccessPopup"
            );

        if (popup) {
            popup.remove();
        }

        document.body.style.overflow = "";

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       INITIAL SUMMARY
    ===================================================== */

    updateServiceSummary();

});

/* =========================================================
   BEAUTY DOOR — MY BOOKINGS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".booking-filter-btn");

    const bookingItems =
        document.querySelectorAll(".booking-history-item");

    const emptyState =
        document.getElementById("bookingHistoryEmpty");


    /* =====================================================
       LOAD LOCAL BOOKINGS
    ===================================================== */

    let storedBookings = [];

    try {
        storedBookings =
            JSON.parse(
                localStorage.getItem("beautyDoorBookings")
            ) || [];
    } catch (error) {
        storedBookings = [];
    }


    /* =====================================================
       ADD NEW BOOKINGS FROM LOCAL STORAGE
    ===================================================== */

    if (storedBookings.length > 0) {
        addStoredBookings(storedBookings);
    }


    /* =====================================================
       FILTER BOOKINGS
    ===================================================== */

    function applyFilter(filter) {

        const currentItems =
            document.querySelectorAll(".booking-history-item");

        let visibleCount = 0;

        currentItems.forEach(function (item) {

            const status =
                item.dataset.status;

            if (
                filter === "all" ||
                status === filter
            ) {

                item.style.display = "grid";

                visibleCount++;

            } else {

                item.style.display = "none";

            }

        });


        /* Empty state */

        if (emptyState) {

            if (visibleCount === 0) {
                emptyState.classList.add("show");
            } else {
                emptyState.classList.remove("show");
            }

        }

    }


    /* =====================================================
       FILTER BUTTON CLICK
    ===================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            this.classList.add("active");

            const filter =
                this.dataset.filter || "all";

            applyFilter(filter);

        });

    });


    /* =====================================================
       VIEW BOOKING
    ===================================================== */

    document.addEventListener("click", function (event) {

        const viewButton =
            event.target.closest(".history-view-btn");

        if (!viewButton) return;

        const bookingName =
            viewButton.dataset.booking;

        const booking =
            findBooking(bookingName);

        showBookingDetails(booking);

    });


    /* =====================================================
       MANAGE BOOKING
    ===================================================== */

    document.addEventListener("click", function (event) {

        const manageButton =
            event.target.closest(".manage-booking-btn");

        if (!manageButton) return;

        const bookingName =
            manageButton.dataset.booking;

        const booking =
            findBooking(bookingName);

        showManagePopup(booking);

    });


    /* =====================================================
       FIND BOOKING
    ===================================================== */

    function findBooking(serviceName) {

        const stored =
            storedBookings.find(function (booking) {

                return booking.service === serviceName;

            });

        if (stored) {
            return stored;
        }


        /* Default booking data */

        const defaultBookings = {

            "Glow Facial": {
                service: "Glow Facial",
                category: "Skin Care",
                date: "Sep 08, 2026",
                time: "10:00 AM",
                duration: "60 minutes",
                price: 799,
                beautician: "Meera",
                rating: "4.9",
                status: "Confirmed"
            },

            "Haircut & Styling": {
                service: "Haircut & Styling",
                category: "Hair",
                date: "Aug 28, 2026",
                time: "11:00 AM",
                duration: "45 minutes",
                price: 499,
                beautician: "Priya",
                rating: "4.8",
                status: "Completed"
            },

            "Nail Art": {
                service: "Nail Art",
                category: "Nails",
                date: "Aug 21, 2026",
                time: "03:00 PM",
                duration: "50 minutes",
                price: 699,
                beautician: "Meera",
                rating: "4.9",
                status: "Completed"
            },

            "Hair Spa": {
                service: "Hair Spa",
                category: "Hair",
                date: "Aug 14, 2026",
                time: "02:00 PM",
                duration: "60 minutes",
                price: 899,
                beautician: "Priya",
                rating: "4.8",
                status: "Completed"
            },

            "Waxing Care": {
                service: "Waxing Care",
                category: "Skin",
                date: "Aug 05, 2026",
                time: "04:00 PM",
                duration: "40 minutes",
                price: 599,
                beautician: "Anu",
                rating: "4.7",
                status: "Cancelled"
            }

        };


        return (
            defaultBookings[serviceName] || {
                service: serviceName,
                category: "Beauty Service",
                date: "Not available",
                time: "Not available",
                duration: "Not available",
                price: 0,
                beautician: "Beauty Professional",
                rating: "4.9",
                status: "Confirmed"
            }
        );

    }


    /* =====================================================
       BOOKING DETAILS POPUP
    ===================================================== */

    function showBookingDetails(booking) {

        closeExistingPopup();


        const popup =
            document.createElement("div");

        popup.className =
            "my-booking-popup";

        popup.innerHTML = `

            <div class="my-booking-overlay">

                <div class="my-booking-modal">

                    <button
                        type="button"
                        class="my-booking-close">

                        <i class="fa-solid fa-xmark"></i>

                    </button>


                    <div class="my-booking-modal-icon">

                        <i class="fa-solid fa-calendar-check"></i>

                    </div>


                    <span class="my-booking-modal-label">
                        BOOKING DETAILS
                    </span>


                    <h2>
                        ${escapeHTML(booking.service)}
                    </h2>


                    <p class="my-booking-modal-category">
                        ${escapeHTML(booking.category)}
                    </p>


                    <div class="my-booking-detail-box">

                        <div>

                            <span>
                                <i class="fa-regular fa-calendar"></i>
                                Date
                            </span>

                            <strong>
                                ${escapeHTML(booking.date)}
                            </strong>

                        </div>


                        <div>

                            <span>
                                <i class="fa-regular fa-clock"></i>
                                Time
                            </span>

                            <strong>
                                ${escapeHTML(booking.time)}
                            </strong>

                        </div>


                        <div>

                            <span>
                                <i class="fa-solid fa-hourglass-half"></i>
                                Duration
                            </span>

                            <strong>
                                ${escapeHTML(booking.duration)}
                            </strong>

                        </div>


                        <div>

                            <span>
                                <i class="fa-solid fa-user"></i>
                                Professional
                            </span>

                            <strong>
                                ${escapeHTML(booking.beautician)}
                            </strong>

                        </div>


                        <div>

                            <span>
                                <i class="fa-solid fa-indian-rupee-sign"></i>
                                Price
                            </span>

                            <strong>
                                ₹${formatPrice(booking.price)}
                            </strong>

                        </div>


                        <div>

                            <span>
                                <i class="fa-solid fa-circle-check"></i>
                                Status
                            </span>

                            <strong class="popup-status ${getStatusClass(booking.status)}">
                                ${escapeHTML(booking.status)}
                            </strong>

                        </div>

                    </div>


                    <div class="my-booking-modal-actions">

                        ${booking.status === "Completed"
                ? `
                                <button
                                    type="button"
                                    class="popup-primary-btn book-again-btn"
                                    data-service="${escapeHTML(booking.service)}">

                                    <i class="fa-solid fa-rotate-right"></i>

                                    Book Again

                                </button>
                            `
                : `
                                <a
                                    href="d5.html"
                                    class="popup-primary-btn">

                                    <i class="fa-solid fa-location-dot"></i>

                                    Track Visit

                                </a>
                            `
            }


                        <button
                            type="button"
                            class="popup-secondary-btn close-popup-btn">

                            Close

                        </button>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(popup);

        document.body.style.overflow = "hidden";

        openPopupAnimation(popup);

    }


    /* =====================================================
       MANAGE POPUP
    ===================================================== */

    function showManagePopup(booking) {

        closeExistingPopup();


        const popup =
            document.createElement("div");

        popup.className =
            "my-booking-popup";


        popup.innerHTML = `

            <div class="my-booking-overlay">

                <div class="my-booking-modal manage-modal">

                    <button
                        type="button"
                        class="my-booking-close">

                        <i class="fa-solid fa-xmark"></i>

                    </button>


                    <div class="my-booking-modal-icon">

                        <i class="fa-solid fa-sliders"></i>

                    </div>


                    <span class="my-booking-modal-label">
                        MANAGE APPOINTMENT
                    </span>


                    <h2>
                        ${escapeHTML(booking.service)}
                    </h2>


                    <p>
                        What would you like to do with your
                        upcoming beauty appointment?
                    </p>


                    <div class="manage-options">


                        <button
                            type="button"
                            class="manage-option"
                            data-action="reschedule">

                            <span class="manage-option-icon">

                                <i class="fa-regular fa-calendar"></i>

                            </span>

                            <span>

                                <strong>
                                    Reschedule Visit
                                </strong>

                                <small>
                                    Choose a different date or time
                                </small>

                            </span>

                            <i class="fa-solid fa-chevron-right"></i>

                        </button>


                        <button
                            type="button"
                            class="manage-option cancel-option"
                            data-action="cancel">

                            <span class="manage-option-icon">

                                <i class="fa-regular fa-calendar-xmark"></i>

                            </span>

                            <span>

                                <strong>
                                    Cancel Booking
                                </strong>

                                <small>
                                    Cancel your upcoming appointment
                                </small>

                            </span>

                            <i class="fa-solid fa-chevron-right"></i>

                        </button>


                    </div>


                    <button
                        type="button"
                        class="popup-secondary-btn close-popup-btn">

                        Keep My Booking

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(popup);

        document.body.style.overflow = "hidden";

        openPopupAnimation(popup);


        /* Manage actions */

        popup.querySelectorAll(".manage-option")
            .forEach(function (option) {

                option.addEventListener(
                    "click",
                    function () {

                        const action =
                            this.dataset.action;

                        if (action === "reschedule") {

                            window.location.href = "d3.html";

                        }

                        if (action === "cancel") {

                            showCancelConfirmation(booking);

                        }

                    }
                );

            });

    }


    /* =====================================================
       CANCEL CONFIRMATION
    ===================================================== */

    function showCancelConfirmation(booking) {

        closeExistingPopup();


        const popup =
            document.createElement("div");

        popup.className =
            "my-booking-popup";


        popup.innerHTML = `

            <div class="my-booking-overlay">

                <div class="my-booking-modal cancel-modal">

                    <div class="cancel-warning-icon">

                        <i class="fa-solid fa-calendar-xmark"></i>

                    </div>


                    <span class="my-booking-modal-label cancel-label">
                        CANCEL BOOKING
                    </span>


                    <h2>
                        Cancel this appointment?
                    </h2>


                    <p>
                        Your ${escapeHTML(booking.service)}
                        appointment will be cancelled.
                        This action cannot be undone.
                    </p>


                    <div class="cancel-booking-info">

                        <strong>
                            ${escapeHTML(booking.service)}
                        </strong>

                        <span>
                            ${escapeHTML(booking.date)}
                            ·
                            ${escapeHTML(booking.time)}
                        </span>

                    </div>


                    <div class="my-booking-modal-actions">

                        <button
                            type="button"
                            class="popup-cancel-btn"
                            id="confirmCancelBtn">

                            Yes, Cancel

                        </button>


                        <button
                            type="button"
                            class="popup-secondary-btn close-popup-btn">

                            Keep Booking

                        </button>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(popup);

        document.body.style.overflow = "hidden";

        openPopupAnimation(popup);


        const confirmButton =
            popup.querySelector("#confirmCancelBtn");


        confirmButton.addEventListener(
            "click",
            function () {

                cancelBooking(booking);

            }
        );

    }


    /* =====================================================
       CANCEL BOOKING
    ===================================================== */

    function cancelBooking(booking) {

        /* Update stored booking */

        storedBookings =
            storedBookings.map(function (item) {

                if (
                    item.service === booking.service &&
                    item.status !== "Completed"
                ) {

                    return {
                        ...item,
                        status: "Cancelled"
                    };

                }

                return item;

            });


        localStorage.setItem(
            "beautyDoorBookings",
            JSON.stringify(storedBookings)
        );


        closeExistingPopup();

        showCancelSuccess();

    }


    /* =====================================================
       CANCEL SUCCESS
    ===================================================== */

    function showCancelSuccess() {

        const popup =
            document.createElement("div");

        popup.className =
            "my-booking-popup";


        popup.innerHTML = `

            <div class="my-booking-overlay">

                <div class="my-booking-modal">

                    <div class="my-booking-modal-icon">

                        <i class="fa-solid fa-check"></i>

                    </div>


                    <span class="my-booking-modal-label">
                        BOOKING CANCELLED
                    </span>


                    <h2>
                        Appointment Cancelled
                    </h2>


                    <p>
                        Your appointment has been cancelled
                        successfully.
                    </p>


                    <button
                        type="button"
                        class="popup-primary-btn close-popup-btn">

                        Done

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(popup);

        document.body.style.overflow = "hidden";

        openPopupAnimation(popup);


        popup.querySelector(".close-popup-btn")
            .addEventListener(
                "click",
                function () {

                    location.reload();

                }
            );

    }


    /* =====================================================
       BOOK AGAIN
    ===================================================== */

    document.addEventListener("click", function (event) {

        const button =
            event.target.closest(".book-again-btn");

        if (!button) return;

        const service =
            button.dataset.service;

        localStorage.setItem(
            "beautyDoorBookAgain",
            service
        );

        window.location.href = "d3.html";

    });


    /* =====================================================
       CLOSE POPUP
    ===================================================== */

    document.addEventListener("click", function (event) {

        const closeButton =
            event.target.closest(".close-popup-btn");

        if (closeButton) {
            closeExistingPopup();
        }


        const closeIcon =
            event.target.closest(".my-booking-close");

        if (closeIcon) {
            closeExistingPopup();
        }

    });


    /* =====================================================
       OVERLAY CLICK
    ===================================================== */

    document.addEventListener("click", function (event) {

        const overlay =
            event.target.closest(".my-booking-overlay");

        if (
            overlay &&
            event.target === overlay
        ) {

            closeExistingPopup();

        }

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeExistingPopup();

        }

    });


    /* =====================================================
       CLOSE EXISTING POPUP
    ===================================================== */

    function closeExistingPopup() {

        const popup =
            document.querySelector(".my-booking-popup");

        if (popup) {
            popup.remove();
        }

        document.body.style.overflow = "";

    }


    /* =====================================================
       POPUP ANIMATION
    ===================================================== */

    function openPopupAnimation(popup) {

        requestAnimationFrame(function () {

            popup.classList.add("show");

        });

    }


    /* =====================================================
       ADD STORED BOOKINGS
    ===================================================== */

    function addStoredBookings(bookings) {

        const list =
            document.querySelector(".booking-history-list");

        if (!list) return;


        /*
         * Don't duplicate services already
         * displayed in the static HTML.
         */

        const existingNames =
            Array.from(
                document.querySelectorAll(
                    ".booking-history-item .history-service-info strong"
                )
            ).map(function (element) {

                return element.textContent.trim();

            });


        bookings.forEach(function (booking) {

            if (
                existingNames.includes(
                    booking.service
                )
            ) {
                return;
            }


            const item =
                createBookingHistoryItem(booking);

            list.prepend(item);

        });


        updateBookingCounts();

    }


    /* =====================================================
       CREATE HISTORY ITEM
    ===================================================== */

    function createBookingHistoryItem(booking) {

        const item =
            document.createElement("div");

        const normalizedStatus =
            normalizeStatus(booking.status);


        item.className =
            "booking-history-item";

        item.dataset.status =
            normalizedStatus;


        const icon =
            getServiceIcon(booking.category);


        item.innerHTML = `

            <div class="history-service-icon">

                <i class="${icon}"></i>

            </div>


            <div class="history-service-info">

                <strong>
                    ${escapeHTML(booking.service)}
                </strong>

                <span>
                    ${escapeHTML(booking.category)}
                    ·
                    ${escapeHTML(String(booking.duration))} min
                </span>

            </div>


            <div class="history-date">

                <span>
                    DATE
                </span>

                <strong>
                    ${escapeHTML(
            booking.formattedDate ||
            booking.date
        )}
                </strong>

            </div>


            <div class="history-beautician">

                <span>
                    PROFESSIONAL
                </span>

                <strong>
                    ${escapeHTML(
            booking.beautician ||
            "Assigned Soon"
        )}
                </strong>

            </div>


            <div class="history-price">

                <strong>
                    ₹${formatPrice(booking.price)}
                </strong>

            </div>


            <span class="history-status ${normalizedStatus}">
                ${escapeHTML(
            capitalizeStatus(booking.status)
        )}
            </span>


            <button
                type="button"
                class="history-view-btn"
                data-booking="${escapeHTML(booking.service)}">

                View

                <i class="fa-solid fa-chevron-right"></i>

            </button>

        `;


        return item;

    }


    /* =====================================================
       UPDATE COUNTS
    ===================================================== */

    function updateBookingCounts() {

        const items =
            document.querySelectorAll(
                ".booking-history-item"
            );


        let upcoming = 0;
        let completed = 0;
        let cancelled = 0;


        items.forEach(function (item) {

            const status =
                item.dataset.status;

            if (status === "upcoming") {
                upcoming++;
            }

            if (status === "completed") {
                completed++;
            }

            if (status === "cancelled") {
                cancelled++;
            }

        });


        const total =
            upcoming +
            completed +
            cancelled;


        const statCards =
            document.querySelectorAll(
                ".booking-stat-card"
            );


        if (statCards.length >= 4) {

            const numbers = [
                upcoming,
                completed,
                cancelled,
                total
            ];


            statCards.forEach(function (
                card,
                index
            ) {

                const number =
                    card.querySelector(
                        ".booking-stat-content strong"
                    );

                if (number) {
                    number.textContent =
                        numbers[index];
                }

            });

        }


        const historyCount =
            document.querySelector(
                ".booking-history-count"
            );

        if (historyCount) {

            historyCount.textContent =
                `${total} Bookings`;

        }

    }


    /* =====================================================
       SERVICE ICON
    ===================================================== */

    function getServiceIcon(category) {

        const value =
            String(category).toLowerCase();


        if (value.includes("hair")) {
            return "fa-solid fa-scissors";
        }

        if (value.includes("skin")) {
            return "fa-solid fa-spa";
        }

        if (value.includes("nail")) {
            return "fa-solid fa-hand-sparkles";
        }

        if (value.includes("bridal")) {
            return "fa-solid fa-crown";
        }

        return "fa-solid fa-spa";

    }


    /* =====================================================
       STATUS NORMALIZATION
    ===================================================== */

    function normalizeStatus(status) {

        const value =
            String(status)
                .toLowerCase()
                .trim();


        if (
            value.includes("cancel")
        ) {
            return "cancelled";
        }

        if (
            value.includes("complete")
        ) {
            return "completed";
        }

        return "upcoming";

    }


    /* =====================================================
       STATUS CLASS
    ===================================================== */

    function getStatusClass(status) {

        return normalizeStatus(status);

    }


    /* =====================================================
       CAPITALIZE STATUS
    ===================================================== */

    function capitalizeStatus(status) {

        const value =
            String(status).toLowerCase();


        if (value === "cancelled") {
            return "Cancelled";
        }

        if (value === "completed") {
            return "Completed";
        }

        return "Upcoming";

    }


    /* =====================================================
       FORMAT PRICE
    ===================================================== */

    function formatPrice(price) {

        const number =
            Number(price) || 0;

        return number.toLocaleString("en-IN");

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    updateBookingCounts();

    applyFilter("all");

});

/* =========================================================
   BEAUTY DOOR — TRACK MY VISIT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const callButtons = document.querySelectorAll(".call-beautician-btn");
    const messageButtons = document.querySelectorAll(".message-beautician-btn");
    const copyBookingButton = document.querySelector(".copy-booking-id");
    const profileButton = document.querySelector(".profile-action-btn");
    const supportButton = document.querySelector(".support-btn");
    const rescheduleButton = document.querySelector(".reschedule-btn");
    const cancelButton = document.querySelector(".cancel-visit-btn");


    /* =====================================================
       CURRENT BOOKING DATA
    ====================================================== */

    const defaultBooking = {
        id: "BD-20260908-1042",
        service: "Glow Facial",
        date: "Sep 08, 2026",
        time: "10:00 AM",
        duration: "60 Minutes",
        price: "₹799",
        beautician: "Meera",
        role: "Skin Specialist",
        rating: "4.9",
        status: "On The Way"
    };

    let currentBooking = { ...defaultBooking };


    /* =====================================================
       LOAD LATEST BOOKING FROM LOCAL STORAGE
    ====================================================== */

    try {

        const savedBooking = localStorage.getItem("beautyDoorLatestBooking");

        if (savedBooking) {

            const booking = JSON.parse(savedBooking);

            currentBooking = {
                ...defaultBooking,
                ...booking
            };

            updateBookingDetails();

        }

    } catch (error) {

        console.warn("Unable to load booking data.", error);

    }


    /* =====================================================
       UPDATE PAGE WITH BOOKING DATA
    ====================================================== */

    function updateBookingDetails() {

        const serviceName = document.querySelector(
            ".live-status-content h3"
        );

        const serviceMeta = document.querySelector(
            ".visit-meta-row span:nth-child(3)"
        );

        const dateMeta = document.querySelector(
            ".visit-meta-row span:nth-child(1)"
        );

        const timeMeta = document.querySelector(
            ".visit-meta-row span:nth-child(2)"
        );

        const detailService = document.querySelector(
            ".visit-detail-item:nth-child(1) strong"
        );

        const detailDuration = document.querySelector(
            ".visit-detail-item:nth-child(2) strong"
        );

        const detailPrice = document.querySelector(
            ".visit-detail-item:nth-child(3) strong"
        );

        const bookingIdText = document.querySelector(
            ".booking-id-row > strong"
        );


        if (serviceName && currentBooking.service) {
            serviceName.textContent =
                `Your Beautician Is On The Way`;
        }


        if (serviceMeta && currentBooking.service) {
            serviceMeta.innerHTML =
                `<i class="fa-solid fa-spa"></i>
                 ${escapeHTML(currentBooking.service)}`;
        }


        if (dateMeta && currentBooking.date) {
            dateMeta.innerHTML =
                `<i class="fa-regular fa-calendar"></i>
                 ${escapeHTML(formatBookingDate(currentBooking.date))}`;
        }


        if (timeMeta && currentBooking.time) {
            timeMeta.innerHTML =
                `<i class="fa-regular fa-clock"></i>
                 ${escapeHTML(currentBooking.time)}`;
        }


        if (detailService && currentBooking.service) {
            detailService.textContent = currentBooking.service;
        }


        if (detailDuration && currentBooking.duration) {

            let duration = currentBooking.duration;

            if (
                typeof duration === "number" ||
                !String(duration).toLowerCase().includes("minute")
            ) {
                duration = `${duration} Minutes`;
            }

            detailDuration.textContent = duration;
        }


        if (detailPrice && currentBooking.price) {

            let price = currentBooking.price;

            if (!String(price).includes("₹")) {
                price = `₹${price}`;
            }

            detailPrice.textContent = price;
        }


        if (bookingIdText && currentBooking.id) {

            const copyButton = bookingIdText.querySelector(
                ".copy-booking-id"
            );

            bookingIdText.textContent = currentBooking.id;

            if (copyButton) {
                bookingIdText.appendChild(copyButton);
            }

        }


        if (copyBookingButton && currentBooking.id) {
            copyBookingButton.dataset.bookingId =
                currentBooking.id;
        }

    }


    /* =====================================================
       DATE FORMATTER
    ====================================================== */

    function formatBookingDate(dateValue) {

        if (!dateValue) {
            return defaultBooking.date;
        }

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return dateValue;
        }

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric"
        });

    }


    /* =====================================================
       CALL BEAUTICIAN
    ====================================================== */

    callButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            showInfoPopup(
                "Call Beautician",
                `You can contact ${currentBooking.beautician || "Meera"} directly for your active visit.`,
                "fa-solid fa-phone"
            );

        });

    });


    /* =====================================================
       MESSAGE BEAUTICIAN
    ====================================================== */

    messageButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            showMessagePopup();

        });

    });


    /* =====================================================
       COPY BOOKING ID
    ====================================================== */

    if (copyBookingButton) {

        copyBookingButton.addEventListener("click", function () {

            const bookingId =
                this.dataset.bookingId ||
                currentBooking.id;

            copyText(bookingId);

            const originalIcon = this.innerHTML;

            this.innerHTML =
                `<i class="fa-solid fa-check"></i>`;

            this.setAttribute(
                "aria-label",
                "Booking ID copied"
            );

            setTimeout(() => {

                this.innerHTML = originalIcon;

                this.setAttribute(
                    "aria-label",
                    "Copy booking ID"
                );

            }, 1600);

        });

    }


    /* =====================================================
       VIEW BEAUTICIAN PROFILE
    ====================================================== */

    if (profileButton) {

        profileButton.addEventListener("click", function () {

            showProfilePopup();

        });

    }


    /* =====================================================
       CONTACT SUPPORT
    ====================================================== */

    if (supportButton) {

        supportButton.addEventListener("click", function () {

            showSupportPopup();

        });

    }


    /* =====================================================
       RESCHEDULE
    ====================================================== */

    if (rescheduleButton) {

        rescheduleButton.addEventListener("click", function () {

            showReschedulePopup();

        });

    }


    /* =====================================================
       CANCEL VISIT
    ====================================================== */

    if (cancelButton) {

        cancelButton.addEventListener("click", function () {

            showCancelPopup();

        });

    }


    /* =====================================================
       GENERIC INFO POPUP
    ====================================================== */

    function showInfoPopup(title, message, icon) {

        removeExistingPopup();

        const popup = document.createElement("div");

        popup.className = "track-popup-overlay";

        popup.innerHTML = `
            <div class="track-popup-card">

                <button
                    type="button"
                    class="track-popup-close"
                    aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="track-popup-icon">
                    <i class="${icon}"></i>
                </div>

                <span class="track-popup-eyebrow">
                    BEAUTY DOOR
                </span>

                <h3>${escapeHTML(title)}</h3>

                <p>${escapeHTML(message)}</p>

                <button
                    type="button"
                    class="track-popup-primary">
                    Okay
                </button>

            </div>
        `;

        document.body.appendChild(popup);

        attachPopupEvents(popup);

    }


    /* =====================================================
       MESSAGE POPUP
    ====================================================== */

    function showMessagePopup() {

        removeExistingPopup();

        const popup = document.createElement("div");

        popup.className = "track-popup-overlay";

        popup.innerHTML = `
            <div class="track-popup-card message-popup-card">

                <button
                    type="button"
                    class="track-popup-close"
                    aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="track-popup-icon">
                    <i class="fa-regular fa-comment-dots"></i>
                </div>

                <span class="track-popup-eyebrow">
                    MESSAGE BEAUTICIAN
                </span>

                <h3>Message ${escapeHTML(
            currentBooking.beautician || "Meera"
        )}</h3>

                <p>
                    Send a quick message to your beautician
                    about today's visit.
                </p>

                <textarea
                    class="track-message-input"
                    id="trackMessageInput"
                    rows="4"
                    placeholder="Type your message..."></textarea>

                <button
                    type="button"
                    class="track-popup-primary"
                    id="sendTrackMessage">
                    <i class="fa-regular fa-paper-plane"></i>
                    Send Message
                </button>

            </div>
        `;

        document.body.appendChild(popup);

        attachPopupEvents(popup);

        const sendButton =
            popup.querySelector("#sendTrackMessage");

        const messageInput =
            popup.querySelector("#trackMessageInput");

        if (sendButton) {

            sendButton.addEventListener("click", function () {

                const message =
                    messageInput.value.trim();

                if (!message) {

                    messageInput.classList.add(
                        "track-input-error"
                    );

                    messageInput.focus();

                    return;

                }

                this.innerHTML =
                    `<i class="fa-solid fa-check"></i> Message Sent`;

                this.disabled = true;

                setTimeout(() => {

                    removeExistingPopup();

                }, 1000);

            });

        }

    }


    /* =====================================================
       BEAUTICIAN PROFILE POPUP
    ====================================================== */

    function showProfilePopup() {

        removeExistingPopup();

        const popup = document.createElement("div");

        popup.className = "track-popup-overlay";

        popup.innerHTML = `
            <div class="track-popup-card beautician-popup-card">

                <button
                    type="button"
                    class="track-popup-close"
                    aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="popup-profile-image">
                    <img
                        src="images/beautician-meera.jpg"
                        alt="${escapeHTML(
            currentBooking.beautician || "Meera"
        )}">
                </div>

                <span class="track-popup-eyebrow">
                    BEAUTY PROFESSIONAL
                </span>

                <h3>
                    ${escapeHTML(
            currentBooking.beautician || "Meera"
        )}
                </h3>

                <span class="popup-profile-role">
                    ${escapeHTML(
            currentBooking.role || "Skin Specialist"
        )}
                </span>

                <div class="popup-profile-rating">
                    <i class="fa-solid fa-star"></i>
                    ${escapeHTML(
            currentBooking.rating || "4.9"
        )}
                    <span>· 128 Reviews</span>
                </div>

                <p>
                    A professional beauty specialist dedicated
                    to providing comfortable and personalized
                    at-home beauty experiences.
                </p>

                <button
                    type="button"
                    class="track-popup-primary">
                    Close Profile
                </button>

            </div>
        `;

        document.body.appendChild(popup);

        attachPopupEvents(popup);

    }


    /* =====================================================
       SUPPORT POPUP
    ====================================================== */

    function showSupportPopup() {

        removeExistingPopup();

        const popup = document.createElement("div");

        popup.className = "track-popup-overlay";

        popup.innerHTML = `
            <div class="track-popup-card support-popup-card">

                <button
                    type="button"
                    class="track-popup-close"
                    aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="track-popup-icon">
                    <i class="fa-solid fa-headset"></i>
                </div>

                <span class="track-popup-eyebrow">
                    CUSTOMER SUPPORT
                </span>

                <h3>How Can We Help?</h3>

                <p>
                    Our support team is ready to assist you
                    with your active beauty visit.
                </p>

                <div class="support-popup-actions">

                    <button type="button">
                        <i class="fa-solid fa-phone"></i>
                        <span>
                            <strong>Call Support</strong>
                            <small>+91 98765 43210</small>
                        </span>
                    </button>

                    <button type="button">
                        <i class="fa-regular fa-comment-dots"></i>
                        <span>
                            <strong>Live Chat</strong>
                            <small>Usually replies instantly</small>
                        </span>
                    </button>

                </div>

                <button
                    type="button"
                    class="track-popup-primary">
                    Close
                </button>

            </div>
        `;

        document.body.appendChild(popup);

        attachPopupEvents(popup);

    }


    /* =====================================================
       RESCHEDULE POPUP
    ====================================================== */

    function showReschedulePopup() {

        removeExistingPopup();

        const popup = document.createElement("div");

        popup.className = "track-popup-overlay";

        popup.innerHTML = `
            <div class="track-popup-card reschedule-popup-card">

                <button
                    type="button"
                    class="track-popup-close"
                    aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="track-popup-icon">
                    <i class="fa-regular fa-calendar"></i>
                </div>

                <span class="track-popup-eyebrow">
                    RESCHEDULE VISIT
                </span>

                <h3>Choose A New Date</h3>

                <p>
                    Select another date for your beauty visit.
                </p>

                <div class="track-form-group">

                    <label for="rescheduleDate">
                        Preferred Date
                    </label>

                    <input
                        type="date"
                        id="rescheduleDate"
                        class="track-popup-input">

                </div>

                <div class="track-form-group">

                    <label for="rescheduleTime">
                        Preferred Time
                    </label>

                    <select
                        id="rescheduleTime"
                        class="track-popup-input">

                        <option value="">
                            Select a time
                        </option>

                        <option>09:00 AM</option>
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                        <option>06:00 PM</option>

                    </select>

                </div>

                <button
                    type="button"
                    class="track-popup-primary"
                    id="confirmReschedule">
                    Confirm New Schedule
                </button>

            </div>
        `;

        document.body.appendChild(popup);

        attachPopupEvents(popup);


        const dateInput =
            popup.querySelector("#rescheduleDate");

        const confirmButton =
            popup.querySelector("#confirmReschedule");

        if (dateInput) {

            dateInput.min =
                new Date().toISOString().split("T")[0];

        }


        if (confirmButton) {

            confirmButton.addEventListener("click", function () {

                const date =
                    popup.querySelector("#rescheduleDate").value;

                const time =
                    popup.querySelector("#rescheduleTime").value;

                if (!date || !time) {

                    if (!date) {
                        popup.querySelector(
                            "#rescheduleDate"
                        ).classList.add("track-input-error");
                    }

                    if (!time) {
                        popup.querySelector(
                            "#rescheduleTime"
                        ).classList.add("track-input-error");
                    }

                    return;

                }

                this.innerHTML =
                    `<i class="fa-solid fa-check"></i>
                     Schedule Updated`;

                this.disabled = true;

                setTimeout(() => {

                    removeExistingPopup();

                    showInfoPopup(
                        "Visit Rescheduled",
                        "Your new visit schedule has been saved successfully.",
                        "fa-regular fa-calendar-check"
                    );

                }, 800);

            });

        }

    }


    /* =====================================================
       CANCEL POPUP
    ====================================================== */

    function showCancelPopup() {

        removeExistingPopup();

        const popup = document.createElement("div");

        popup.className = "track-popup-overlay";

        popup.innerHTML = `
            <div class="track-popup-card cancel-popup-card">

                <button
                    type="button"
                    class="track-popup-close"
                    aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <div class="track-popup-icon cancel-popup-icon">
                    <i class="fa-solid fa-xmark"></i>
                </div>

                <span class="track-popup-eyebrow">
                    CANCEL BOOKING
                </span>

                <h3>Cancel This Visit?</h3>

                <p>
                    Are you sure you want to cancel your
                    ${escapeHTML(
            currentBooking.service || "beauty service"
        )} appointment?
                </p>

                <div class="cancel-warning">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span>
                        Cancellation may be subject to the
                        Beauty Door cancellation policy.
                    </span>
                </div>

                <div class="cancel-popup-actions">

                    <button
                        type="button"
                        class="cancel-keep-btn">
                        Keep Booking
                    </button>

                    <button
                        type="button"
                        class="cancel-confirm-btn">
                        Cancel Visit
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(popup);

        attachPopupEvents(popup);


        const keepButton =
            popup.querySelector(".cancel-keep-btn");

        const confirmButton =
            popup.querySelector(".cancel-confirm-btn");


        if (keepButton) {

            keepButton.addEventListener("click", function () {

                removeExistingPopup();

            });

        }


        if (confirmButton) {

            confirmButton.addEventListener("click", function () {

                this.innerHTML =
                    `<i class="fa-solid fa-spinner fa-spin"></i>
                     Cancelling...`;

                this.disabled = true;

                setTimeout(() => {

                    cancelCurrentBooking();

                }, 900);

            });

        }

    }


    /* =====================================================
       CANCEL CURRENT BOOKING
    ====================================================== */

    function cancelCurrentBooking() {

        try {

            const savedBooking =
                localStorage.getItem("beautyDoorLatestBooking");

            if (savedBooking) {

                const booking =
                    JSON.parse(savedBooking);

                booking.status = "Cancelled";

                localStorage.setItem(
                    "beautyDoorLatestBooking",
                    JSON.stringify(booking)
                );

            }

        } catch (error) {

            console.warn(
                "Unable to update booking status.",
                error
            );

        }


        removeExistingPopup();

        showCancelSuccessPopup();

    }


    /* =====================================================
       CANCEL SUCCESS POPUP
    ====================================================== */

    function showCancelSuccessPopup() {

        const popup = document.createElement("div");

        popup.className = "track-popup-overlay";

        popup.innerHTML = `
            <div class="track-popup-card">

                <div class="track-popup-success-icon">
                    <i class="fa-solid fa-check"></i>
                </div>

                <span class="track-popup-eyebrow">
                    BOOKING UPDATED
                </span>

                <h3>Visit Cancelled</h3>

                <p>
                    Your beauty visit has been cancelled successfully.
                </p>

                <button
                    type="button"
                    class="track-popup-primary"
                    id="cancelDoneBtn">
                    Done
                </button>

            </div>
        `;

        document.body.appendChild(popup);


        const doneButton =
            popup.querySelector("#cancelDoneBtn");

        if (doneButton) {

            doneButton.addEventListener("click", function () {

                removeExistingPopup();

                updatePageAfterCancellation();

            });

        }

    }


    /* =====================================================
       UPDATE PAGE AFTER CANCELLATION
    ====================================================== */

    function updatePageAfterCancellation() {

        const liveBadge =
            document.querySelector(".live-status-badge");

        const liveHeading =
            document.querySelector(".live-status-content h3");

        const liveDescription =
            document.querySelector(".live-status-content p");

        const arrivalCard =
            document.querySelector(".arrival-card");

        const liveActions =
            document.querySelector(".live-visit-actions");


        if (liveBadge) {

            liveBadge.innerHTML =
                `<i class="fa-solid fa-circle"></i> CANCELLED`;

        }


        if (liveHeading) {
            liveHeading.textContent =
                "Your Visit Has Been Cancelled";
        }


        if (liveDescription) {

            liveDescription.textContent =
                "This booking is no longer active. You can book a new beauty service whenever you're ready.";

        }


        if (arrivalCard) {

            arrivalCard.innerHTML = `
                <span class="arrival-label">
                    BOOKING STATUS
                </span>

                <strong>—</strong>

                <span class="arrival-minutes">
                    Cancelled
                </span>

                <small>
                    <i class="fa-solid fa-circle-check"></i>
                    Visit cancelled successfully
                </small>
            `;

        }


        if (liveActions) {

            liveActions.innerHTML = `
                <button
                    type="button"
                    class="track-action-btn"
                    id="bookNewVisitBtn">
                    <i class="fa-solid fa-plus"></i>
                    Book New Service
                </button>
            `;

            const newBookingButton =
                document.querySelector("#bookNewVisitBtn");

            if (newBookingButton) {

                newBookingButton.addEventListener(
                    "click",
                    function () {

                        window.location.href = "d3.html";

                    }
                );

            }

        }

    }


    /* =====================================================
       POPUP EVENTS
    ====================================================== */

    function attachPopupEvents(popup) {

        const closeButton =
            popup.querySelector(".track-popup-close");

        const primaryButton =
            popup.querySelector(".track-popup-primary");


        if (closeButton) {

            closeButton.addEventListener("click", function () {

                removeExistingPopup();

            });

        }


        if (primaryButton) {

            primaryButton.addEventListener("click", function () {

                removeExistingPopup();

            });

        }


        popup.addEventListener("click", function (event) {

            if (event.target === popup) {

                removeExistingPopup();

            }

        });

    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            removeExistingPopup();

        }

    });


    /* =====================================================
       REMOVE POPUP
    ====================================================== */

    function removeExistingPopup() {

        const existingPopup =
            document.querySelector(".track-popup-overlay");

        if (existingPopup) {

            existingPopup.remove();

        }

    }


    /* =====================================================
       COPY TEXT
    ====================================================== */

    function copyText(text) {

        if (navigator.clipboard) {

            navigator.clipboard.writeText(text)
                .catch(() => fallbackCopy(text));

        } else {

            fallbackCopy(text);

        }

    }


    function fallbackCopy(text) {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);

        textarea.select();

        try {
            document.execCommand("copy");
        } catch (error) {
            console.warn("Copy failed.", error);
        }

        textarea.remove();

    }


    /* =====================================================
       ESCAPE HTML
    ====================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});

/* =========================================================
   BEAUTY DOOR — MY REVIEWS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const openReviewBtn =
        document.querySelector("#openReviewBtn");

    const reviewRecentVisitBtn =
        document.querySelector("#reviewRecentVisitBtn");

    const shareWriteReviewBtn =
        document.querySelector("#shareWriteReviewBtn");

    const ratingContainer =
        document.querySelector("#recentRating");

    const ratingSelectedText =
        document.querySelector("#ratingSelectedText");

    const filterButtons =
        document.querySelectorAll(".review-filter-btn");

    const reviewList =
        document.querySelector("#reviewsList");

    const emptyState =
        document.querySelector("#reviewsEmptyState");

    const resetFilterBtn =
        document.querySelector("#resetReviewFilter");

    const reviewTotalCount =
        document.querySelector("#reviewTotalCount");


    /* =====================================================
       DATA
    ====================================================== */

    const defaultReviews = [
        {
            id: "review-1",
            service: "Glow Facial",
            rating: 5,
            text: "The facial was very relaxing and the service was excellent. Meera was professional, friendly, and made the whole experience really comfortable.",
            beautician: "Meera",
            date: "Sep 08, 2026"
        },
        {
            id: "review-2",
            service: "Haircut & Styling",
            rating: 5,
            text: "Loved the styling and professional service. The haircut turned out exactly the way I wanted.",
            beautician: "Priya",
            date: "Aug 28, 2026"
        },
        {
            id: "review-3",
            service: "Nail Art",
            rating: 4,
            text: "Beautiful work and arrived on time. I really liked the final nail design and attention to detail.",
            beautician: "Meera",
            date: "Aug 21, 2026"
        },
        {
            id: "review-4",
            service: "Hair Spa",
            rating: 5,
            text: "My hair feels so much healthier after the treatment. The service was smooth, professional, and worth every rupee.",
            beautician: "Priya",
            date: "Aug 14, 2026"
        }
    ];


    let reviews = loadReviews();

    let selectedRating = 0;

    let editingReviewId = null;

    let activeFilter = "all";


    /* =====================================================
       LOAD REVIEWS
    ====================================================== */

    function loadReviews() {

        try {

            const savedReviews =
                localStorage.getItem("beautyDoorReviews");

            if (savedReviews) {

                const parsedReviews =
                    JSON.parse(savedReviews);

                if (Array.isArray(parsedReviews)) {
                    return parsedReviews;
                }

            }

        } catch (error) {

            console.warn(
                "Unable to load reviews.",
                error
            );

        }

        return [...defaultReviews];
    }


    /* =====================================================
       SAVE REVIEWS
    ====================================================== */

    function saveReviews() {

        try {

            localStorage.setItem(
                "beautyDoorReviews",
                JSON.stringify(reviews)
            );

        } catch (error) {

            console.warn(
                "Unable to save reviews.",
                error
            );

        }

    }


    /* =====================================================
       INITIALIZE PAGE
    ====================================================== */

    renderReviews();

    updateReviewStats();


    /* =====================================================
       RECENT VISIT STAR RATING
    ====================================================== */

    if (ratingContainer) {

        const ratingStars =
            ratingContainer.querySelectorAll(".rating-star");


        ratingStars.forEach(function (star) {

            star.addEventListener("mouseenter", function () {

                const hoverRating =
                    Number(this.dataset.rating);

                highlightStars(
                    hoverRating,
                    false
                );

            });


            star.addEventListener("mouseleave", function () {

                highlightStars(
                    selectedRating,
                    false
                );

            });


            star.addEventListener("click", function () {

                selectedRating =
                    Number(this.dataset.rating);

                highlightStars(
                    selectedRating,
                    true
                );

                updateSelectedRatingText();

            });

        });

    }


    /* =====================================================
       HIGHLIGHT STARS
    ====================================================== */

    function highlightStars(rating, selected) {

        const stars =
            document.querySelectorAll(
                "#recentRating .rating-star"
            );


        stars.forEach(function (star) {

            const starRating =
                Number(star.dataset.rating);

            const icon =
                star.querySelector("i");


            if (starRating <= rating) {

                star.classList.add("selected");

                if (icon) {
                    icon.className =
                        "fa-solid fa-star";
                }

            } else {

                star.classList.remove("selected");

                if (icon) {
                    icon.className =
                        "fa-regular fa-star";
                }

            }

        });

    }


    /* =====================================================
       RATING TEXT
    ====================================================== */

    function updateSelectedRatingText() {

        if (!ratingSelectedText) {
            return;
        }


        const ratingText = {

            1: "Not satisfied",

            2: "Needs improvement",

            3: "It was okay",

            4: "Great experience",

            5: "Loved it!"

        };


        ratingSelectedText.textContent =
            ratingText[selectedRating] ||
            "Select a rating";

    }


    /* =====================================================
       OPEN WRITE REVIEW POPUP
    ====================================================== */

    function openWriteReviewPopup() {

        editingReviewId = null;

        selectedRating = 0;

        showReviewPopup();

    }


    if (openReviewBtn) {

        openReviewBtn.addEventListener(
            "click",
            openWriteReviewPopup
        );

    }


    if (reviewRecentVisitBtn) {

        reviewRecentVisitBtn.addEventListener(
            "click",
            openWriteReviewPopup
        );

    }


    if (shareWriteReviewBtn) {

        shareWriteReviewBtn.addEventListener(
            "click",
            openWriteReviewPopup
        );

    }


    /* =====================================================
       REVIEW POPUP
    ====================================================== */

    function showReviewPopup(existingReview = null) {

        removePopup();

        editingReviewId =
            existingReview
                ? existingReview.id
                : null;


        selectedRating =
            existingReview
                ? Number(existingReview.rating)
                : 0;


        const popup =
            document.createElement("div");

        popup.className =
            "reviews-popup-overlay";


        popup.innerHTML = `
            <div class="reviews-popup-card">

                <button
                    type="button"
                    class="reviews-popup-close"
                    aria-label="Close">
                    <i class="fa-solid fa-xmark"></i>
                </button>


                <div class="reviews-popup-icon">
                    <i class="fa-regular fa-pen-to-square"></i>
                </div>


                <span class="reviews-popup-eyebrow">
                    ${existingReview
                ? "EDIT YOUR FEEDBACK"
                : "SHARE YOUR EXPERIENCE"}
                </span>


                <h3>
                    ${existingReview
                ? "Update Your Review"
                : "How Was Your Visit?"}
                </h3>


                <p class="reviews-popup-description">
                    ${existingReview
                ? "Make changes to your feedback and save your updated review."
                : "Tell us about your Beauty Door experience."}
                </p>


                <div class="review-popup-field">

                    <label>
                        Service
                    </label>

                    <select
                        id="reviewServiceInput"
                        class="review-popup-input">

                        <option value="Glow Facial">
                            Glow Facial
                        </option>

                        <option value="Haircut & Styling">
                            Haircut & Styling
                        </option>

                        <option value="Nail Art">
                            Nail Art
                        </option>

                        <option value="Hair Spa">
                            Hair Spa
                        </option>

                        <option value="Waxing Care">
                            Waxing Care
                        </option>

                        <option value="Classic Manicure">
                            Classic Manicure
                        </option>

                        <option value="Luxury Pedicure">
                            Luxury Pedicure
                        </option>

                    </select>

                </div>


                <div class="review-popup-field">

                    <label>
                        Your Rating
                    </label>

                    <div
                        class="popup-rating-stars"
                        id="popupRatingStars">

                        <button
                            type="button"
                            class="popup-rating-star"
                            data-rating="1">
                            <i class="fa-regular fa-star"></i>
                        </button>

                        <button
                            type="button"
                            class="popup-rating-star"
                            data-rating="2">
                            <i class="fa-regular fa-star"></i>
                        </button>

                        <button
                            type="button"
                            class="popup-rating-star"
                            data-rating="3">
                            <i class="fa-regular fa-star"></i>
                        </button>

                        <button
                            type="button"
                            class="popup-rating-star"
                            data-rating="4">
                            <i class="fa-regular fa-star"></i>
                        </button>

                        <button
                            type="button"
                            class="popup-rating-star"
                            data-rating="5">
                            <i class="fa-regular fa-star"></i>
                        </button>

                    </div>

                    <span
                        class="popup-rating-text"
                        id="popupRatingText">
                        Select a rating
                    </span>

                </div>


                <div class="review-popup-field">

                    <div class="review-label-row">

                        <label for="reviewTextInput">
                            Your Review
                        </label>

                        <span id="reviewCharacterCount">
                            0 / 300
                        </span>

                    </div>


                    <textarea
                        id="reviewTextInput"
                        class="review-popup-textarea"
                        maxlength="300"
                        rows="5"
                        placeholder="Tell us what you loved about your visit..."></textarea>

                </div>


                <div
                    class="review-popup-error"
                    id="reviewPopupError">
                </div>


                <button
                    type="button"
                    class="reviews-popup-submit"
                    id="submitReviewBtn">

                    <i class="fa-regular fa-paper-plane"></i>

                    ${existingReview
                ? "Update Review"
                : "Submit Review"}

                </button>

            </div>
        `;


        document.body.appendChild(popup);


        /* -------------------------------------------------
           Set Existing Values
        ------------------------------------------------- */

        const serviceInput =
            popup.querySelector("#reviewServiceInput");

        const textInput =
            popup.querySelector("#reviewTextInput");


        if (existingReview) {

            serviceInput.value =
                existingReview.service;

            textInput.value =
                existingReview.text;

        }


        /* -------------------------------------------------
           Popup Rating
        ------------------------------------------------- */

        const popupStars =
            popup.querySelectorAll(
                ".popup-rating-star"
            );


        popupStars.forEach(function (star) {

            star.addEventListener(
                "mouseenter",
                function () {

                    highlightPopupStars(
                        Number(this.dataset.rating)
                    );

                }
            );


            star.addEventListener(
                "mouseleave",
                function () {

                    highlightPopupStars(
                        selectedRating
                    );

                }
            );


            star.addEventListener(
                "click",
                function () {

                    selectedRating =
                        Number(this.dataset.rating);

                    highlightPopupStars(
                        selectedRating
                    );

                    updatePopupRatingText();

                }
            );

        });


        highlightPopupStars(selectedRating);

        updatePopupRatingText();


        /* -------------------------------------------------
           Character Counter
        ------------------------------------------------- */

        const characterCount =
            popup.querySelector(
                "#reviewCharacterCount"
            );


        if (textInput && characterCount) {

            updateCharacterCount();

            textInput.addEventListener(
                "input",
                updateCharacterCount
            );

        }


        function updateCharacterCount() {

            const length =
                textInput.value.length;

            characterCount.textContent =
                `${length} / 300`;

        }


        /* -------------------------------------------------
           Submit
        ------------------------------------------------- */

        const submitButton =
            popup.querySelector(
                "#submitReviewBtn"
            );


        submitButton.addEventListener(
            "click",
            function () {

                submitReview(
                    popup,
                    serviceInput,
                    textInput,
                    submitButton
                );

            }
        );


        /* -------------------------------------------------
           Close
        ------------------------------------------------- */

        attachReviewPopupEvents(popup);

    }


    /* =====================================================
       POPUP STAR HIGHLIGHT
    ====================================================== */

    function highlightPopupStars(rating) {

        const stars =
            document.querySelectorAll(
                "#popupRatingStars .popup-rating-star"
            );


        stars.forEach(function (star) {

            const value =
                Number(star.dataset.rating);

            const icon =
                star.querySelector("i");


            if (value <= rating) {

                star.classList.add("selected");

                if (icon) {
                    icon.className =
                        "fa-solid fa-star";
                }

            } else {

                star.classList.remove("selected");

                if (icon) {
                    icon.className =
                        "fa-regular fa-star";
                }

            }

        });

    }


    /* =====================================================
       POPUP RATING TEXT
    ====================================================== */

    function updatePopupRatingText() {

        const ratingText =
            document.querySelector(
                "#popupRatingText"
            );


        if (!ratingText) {
            return;
        }


        const texts = {

            1: "Not satisfied",

            2: "Needs improvement",

            3: "It was okay",

            4: "Great experience",

            5: "Excellent!"

        };


        ratingText.textContent =
            texts[selectedRating] ||
            "Select a rating";

    }


    /* =====================================================
       SUBMIT REVIEW
    ====================================================== */

    function submitReview(
        popup,
        serviceInput,
        textInput,
        submitButton
    ) {

        const errorBox =
            popup.querySelector(
                "#reviewPopupError"
            );


        const service =
            serviceInput.value;

        const text =
            textInput.value.trim();


        /* Validation */

        if (!selectedRating) {

            showPopupError(
                errorBox,
                "Please select a rating."
            );

            return;

        }


        if (!text) {

            showPopupError(
                errorBox,
                "Please write a short review."
            );

            textInput.focus();

            return;

        }


        if (text.length < 10) {

            showPopupError(
                errorBox,
                "Please write at least 10 characters."
            );

            textInput.focus();

            return;

        }


        /* Loading */

        submitButton.disabled = true;

        submitButton.innerHTML =
            `<i class="fa-solid fa-spinner fa-spin"></i>
             Saving...`;


        setTimeout(function () {

            if (editingReviewId) {

                updateExistingReview(
                    service,
                    text
                );

            } else {

                createNewReview(
                    service,
                    text
                );

            }


            saveReviews();

            renderReviews();

            updateReviewStats();

            removePopup();

            showSuccessPopup(
                editingReviewId
                    ? "Review Updated"
                    : "Review Submitted",
                editingReviewId
                    ? "Your review has been updated successfully."
                    : "Thank you for sharing your Beauty Door experience."
            );


            editingReviewId = null;

        }, 700);

    }


    /* =====================================================
       CREATE REVIEW
    ====================================================== */

    function createNewReview(
        service,
        text
    ) {

        const newReview = {

            id:
                `review-${Date.now()}`,

            service:
                service,

            rating:
                selectedRating,

            text:
                text,

            beautician:
                "Meera",

            date:
                formatToday()

        };


        reviews.unshift(newReview);

    }


    /* =====================================================
       UPDATE REVIEW
    ====================================================== */

    function updateExistingReview(
        service,
        text
    ) {

        const index =
            reviews.findIndex(
                review =>
                    review.id === editingReviewId
            );


        if (index === -1) {
            return;
        }


        reviews[index].service =
            service;

        reviews[index].rating =
            selectedRating;

        reviews[index].text =
            text;

    }


    /* =====================================================
       FILTER REVIEWS
    ====================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                activeFilter =
                    this.dataset.filter || "all";


                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                this.classList.add("active");

                renderReviews();

            }
        );

    });


    /* =====================================================
       RENDER REVIEWS
    ====================================================== */

    function renderReviews() {

        if (!reviewList) {
            return;
        }


        reviewList.innerHTML = "";


        const filteredReviews =
            reviews.filter(function (review) {

                if (activeFilter === "all") {
                    return true;
                }

                return String(review.rating) ===
                    String(activeFilter);

            });


        if (!filteredReviews.length) {

            if (emptyState) {
                emptyState.classList.add("show");
            }

            return;

        }


        if (emptyState) {
            emptyState.classList.remove("show");
        }


        filteredReviews.forEach(
            function (review) {

                reviewList.appendChild(
                    createReviewElement(review)
                );

            }
        );


        attachReviewActions();

    }


    /* =====================================================
       CREATE REVIEW ELEMENT
    ====================================================== */

    function createReviewElement(review) {

        const article =
            document.createElement("article");


        article.className =
            "review-item";


        article.dataset.rating =
            review.rating;

        article.dataset.reviewId =
            review.id;


        const icon =
            getServiceIcon(review.service);


        article.innerHTML = `

            <div class="review-service-icon">
                <i class="${icon}"></i>
            </div>


            <div class="review-main-content">

                <div class="review-top-row">

                    <div>

                        <span class="review-service-name">
                            ${escapeHTML(review.service)}
                        </span>

                        <div class="review-rating">
                            ${createStars(review.rating)}
                        </div>

                    </div>


                    <span class="review-date">
                        ${escapeHTML(review.date)}
                    </span>

                </div>


                <p class="review-text">
                    ${escapeHTML(review.text)}
                </p>


                <div class="review-bottom-row">

                    <span class="review-beautician">
                        <i class="fa-solid fa-user"></i>
                        ${escapeHTML(
            review.beautician || "Meera"
        )}
                    </span>


                    <div class="review-actions">

                        <button
                            type="button"
                            class="edit-review-btn"
                            data-review-id="${review.id}">

                            <i class="fa-regular fa-pen-to-square"></i>
                            Edit

                        </button>


                        <button
                            type="button"
                            class="delete-review-btn"
                            data-review-id="${review.id}"
                            aria-label="Delete review">

                            <i class="fa-regular fa-trash-can"></i>

                        </button>

                    </div>

                </div>

            </div>
        `;


        return article;

    }


    /* =====================================================
       CREATE STARS
    ====================================================== */

    function createStars(rating) {

        let html = "";


        for (let i = 1; i <= 5; i++) {

            if (i <= rating) {

                html +=
                    `<i class="fa-solid fa-star"></i>`;

            } else {

                html +=
                    `<i class="fa-regular fa-star"></i>`;

            }

        }


        return html;

    }


    /* =====================================================
       SERVICE ICON
    ====================================================== */

    function getServiceIcon(service) {

        const name =
            String(service).toLowerCase();


        if (
            name.includes("haircut") ||
            name.includes("styling")
        ) {
            return "fa-solid fa-scissors";
        }


        if (
            name.includes("nail") ||
            name.includes("manicure") ||
            name.includes("pedicure")
        ) {
            return "fa-solid fa-hand-sparkles";
        }


        if (
            name.includes("facial") ||
            name.includes("spa") ||
            name.includes("waxing")
        ) {
            return "fa-solid fa-spa";
        }


        return "fa-solid fa-spa";

    }


    /* =====================================================
       REVIEW ACTIONS
    ====================================================== */

    function attachReviewActions() {

        const editButtons =
            document.querySelectorAll(
                ".edit-review-btn"
            );


        const deleteButtons =
            document.querySelectorAll(
                ".delete-review-btn"
            );


        editButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const reviewId =
                        this.dataset.reviewId;

                    const review =
                        reviews.find(
                            item =>
                                item.id === reviewId
                        );


                    if (review) {

                        showReviewPopup(review);

                    }

                }
            );

        });


        deleteButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const reviewId =
                        this.dataset.reviewId;

                    showDeletePopup(reviewId);

                }
            );

        });

    }


    /* =====================================================
       DELETE CONFIRMATION
    ====================================================== */

    function showDeletePopup(reviewId) {

        const review =
            reviews.find(
                item =>
                    item.id === reviewId
            );


        if (!review) {
            return;
        }


        removePopup();


        const popup =
            document.createElement("div");


        popup.className =
            "reviews-popup-overlay";


        popup.innerHTML = `

            <div class="reviews-popup-card delete-review-popup">

                <button
                    type="button"
                    class="reviews-popup-close"
                    aria-label="Close">

                    <i class="fa-solid fa-xmark"></i>

                </button>


                <div class="delete-popup-icon">

                    <i class="fa-regular fa-trash-can"></i>

                </div>


                <span class="reviews-popup-eyebrow delete-eyebrow">
                    DELETE REVIEW
                </span>


                <h3>
                    Delete This Review?
                </h3>


                <p class="reviews-popup-description">
                    Are you sure you want to remove your review
                    for ${escapeHTML(review.service)}?
                </p>


                <div class="delete-review-actions">

                    <button
                        type="button"
                        class="keep-review-btn">

                        Keep Review

                    </button>


                    <button
                        type="button"
                        class="confirm-delete-review-btn">

                        Delete Review

                    </button>

                </div>

            </div>

        `;


        document.body.appendChild(popup);


        attachReviewPopupEvents(popup);


        const keepButton =
            popup.querySelector(
                ".keep-review-btn"
            );


        const deleteButton =
            popup.querySelector(
                ".confirm-delete-review-btn"
            );


        keepButton.addEventListener(
            "click",
            function () {

                removePopup();

            }
        );


        deleteButton.addEventListener(
            "click",
            function () {

                this.disabled = true;

                this.innerHTML =
                    `<i class="fa-solid fa-spinner fa-spin"></i>
                     Deleting...`;


                setTimeout(function () {

                    reviews =
                        reviews.filter(
                            item =>
                                item.id !== reviewId
                        );


                    saveReviews();

                    renderReviews();

                    updateReviewStats();

                    removePopup();

                    showSuccessPopup(
                        "Review Deleted",
                        "Your review has been removed successfully."
                    );

                }, 600);

            }
        );

    }


    /* =====================================================
       SUCCESS POPUP
    ====================================================== */

    function showSuccessPopup(
        title,
        message
    ) {

        removePopup();


        const popup =
            document.createElement("div");


        popup.className =
            "reviews-popup-overlay";


        popup.innerHTML = `

            <div class="reviews-popup-card success-review-popup">

                <div class="review-success-icon">
                    <i class="fa-solid fa-check"></i>
                </div>


                <span class="reviews-popup-eyebrow success-eyebrow">
                    BEAUTY DOOR
                </span>


                <h3>
                    ${escapeHTML(title)}
                </h3>


                <p class="reviews-popup-description">
                    ${escapeHTML(message)}
                </p>


                <button
                    type="button"
                    class="reviews-popup-submit"
                    id="reviewSuccessDone">

                    Done

                </button>

            </div>

        `;


        document.body.appendChild(popup);


        const doneButton =
            popup.querySelector(
                "#reviewSuccessDone"
            );


        doneButton.addEventListener(
            "click",
            function () {

                removePopup();

            }
        );

    }


    /* =====================================================
       UPDATE REVIEW STATISTICS
    ====================================================== */

    function updateReviewStats() {

        if (!reviews.length) {

            if (reviewTotalCount) {
                reviewTotalCount.textContent =
                    "0 Reviews";
            }

            return;

        }


        const total =
            reviews.length;


        const totalRating =
            reviews.reduce(
                (sum, review) =>
                    sum + Number(review.rating),
                0
            );


        const average =
            (totalRating / total).toFixed(1);


        if (reviewTotalCount) {

            reviewTotalCount.textContent =
                `${total} Reviews`;

        }


        const overallNumber =
            document.querySelector(
                ".overall-rating-number"
            );


        const totalReviewText =
            document.querySelector(
                ".total-review-text"
            );


        const overallStars =
            document.querySelector(
                ".overall-stars"
            );


        if (overallNumber) {

            overallNumber.innerHTML =
                `${average}
                 <small>/ 5</small>`;

        }


        if (totalReviewText) {

            totalReviewText.textContent =
                `Based on ${total} reviews`;

        }


        if (overallStars) {

            overallStars.innerHTML =
                createStars(
                    Math.round(average)
                );

        }


        updateRatingBars();

    }


    /* =====================================================
       UPDATE RATING BARS
    ====================================================== */

    function updateRatingBars() {

        const counts = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0
        };


        reviews.forEach(function (review) {

            const rating =
                Number(review.rating);

            if (counts[rating] !== undefined) {

                counts[rating]++;

            }

        });


        const rows =
            document.querySelectorAll(
                ".rating-bar-row"
            );


        rows.forEach(function (row) {

            const numberElement =
                row.querySelector(
                    ".rating-number"
                );


            const countElement =
                row.querySelector(
                    ":scope > strong"
                );


            const bar =
                row.querySelector(
                    ".rating-bar span"
                );


            if (!numberElement) {
                return;
            }


            const rating =
                Number(
                    numberElement.textContent.trim()
                );


            const count =
                counts[rating] || 0;


            const percentage =
                reviews.length
                    ? (count / reviews.length) * 100
                    : 0;


            if (countElement) {

                countElement.textContent =
                    count;

            }


            if (bar) {

                bar.style.width =
                    `${percentage}%`;

            }

        });

    }


    /* =====================================================
       RESET FILTER
    ====================================================== */

    if (resetFilterBtn) {

        resetFilterBtn.addEventListener(
            "click",
            function () {

                activeFilter = "all";


                filterButtons.forEach(
                    function (button) {

                        button.classList.remove(
                            "active"
                        );

                        if (
                            button.dataset.filter ===
                            "all"
                        ) {
                            button.classList.add(
                                "active"
                            );
                        }

                    }
                );


                renderReviews();

            }
        );

    }


    /* =====================================================
       POPUP EVENTS
    ====================================================== */

    function attachReviewPopupEvents(popup) {

        const closeButton =
            popup.querySelector(
                ".reviews-popup-close"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    removePopup();

                }
            );

        }


        popup.addEventListener(
            "click",
            function (event) {

                if (event.target === popup) {

                    removePopup();

                }

            }
        );

    }


    /* =====================================================
       ERROR MESSAGE
    ====================================================== */

    function showPopupError(
        errorBox,
        message
    ) {

        if (!errorBox) {
            return;
        }


        errorBox.textContent =
            message;


        errorBox.classList.add(
            "show"
        );

    }


    /* =====================================================
       REMOVE POPUP
    ====================================================== */

    function removePopup() {

        const popup =
            document.querySelector(
                ".reviews-popup-overlay"
            );


        if (popup) {
            popup.remove();
        }

    }


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                removePopup();

            }

        }
    );


    /* =====================================================
       TODAY FORMAT
    ====================================================== */

    function formatToday() {

        return new Date().toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        );

    }


    /* =====================================================
       ESCAPE HTML
    ====================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});

/* =========================================================
   BEAUTY DOOR — INVOICES PAGE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
    ===================================================== */

    const invoiceRows =
        document.querySelectorAll(".invoice-row");

    const filterButtons =
        document.querySelectorAll(".invoice-filter-btn");

    const searchInput =
        document.getElementById("invoiceSearch");

    const clearSearchBtn =
        document.getElementById("clearInvoiceSearch");

    const resultCount =
        document.getElementById("invoiceResultCount");

    const emptyState =
        document.getElementById("invoiceEmptyState");

    const resetFiltersBtn =
        document.getElementById("resetInvoiceFilters");


    /* =====================================================
       FILTER STATE
    ===================================================== */

    let selectedFilter = "all";


    /* =====================================================
       FILTER + SEARCH INVOICES
    ===================================================== */

    function filterInvoices() {

        const searchValue =
            searchInput
                ? searchInput.value.trim().toLowerCase()
                : "";

        let visibleCount = 0;


        invoiceRows.forEach(function (row) {

            const status =
                row.dataset.status
                    ? row.dataset.status.toLowerCase()
                    : "";

            const invoiceNumber =
                row.dataset.invoice
                    ? row.dataset.invoice.toLowerCase()
                    : "";

            const service =
                row.dataset.service
                    ? row.dataset.service.toLowerCase()
                    : "";

            const statusMatch =
                selectedFilter === "all" ||
                status === selectedFilter;

            const searchMatch =
                searchValue === "" ||
                invoiceNumber.includes(searchValue) ||
                service.includes(searchValue);


            if (statusMatch && searchMatch) {

                row.style.display = "grid";

                visibleCount++;

            } else {

                row.style.display = "none";

            }

        });


        /* =================================================
           RESULT COUNT
        ================================================= */

        if (resultCount) {

            resultCount.textContent =
                visibleCount +
                (visibleCount === 1
                    ? " Invoice"
                    : " Invoices");

        }


        /* =================================================
           EMPTY STATE
        ================================================= */

        if (emptyState) {

            if (visibleCount === 0) {

                emptyState.classList.add("show");

            } else {

                emptyState.classList.remove("show");

            }

        }


        /* =================================================
           CLEAR SEARCH BUTTON
        ================================================= */

        if (clearSearchBtn) {

            if (searchValue !== "") {

                clearSearchBtn.classList.add("show");

            } else {

                clearSearchBtn.classList.remove("show");

            }

        }

    }


    /* =====================================================
       FILTER BUTTONS
    ===================================================== */

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (item) {

                item.classList.remove("active");

            });


            this.classList.add("active");


            selectedFilter =
                this.dataset.filter || "all";


            filterInvoices();

        });

    });


    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterInvoices
        );

    }


    /* =====================================================
       CLEAR SEARCH
    ===================================================== */

    if (clearSearchBtn) {

        clearSearchBtn.addEventListener(
            "click",
            function () {

                if (!searchInput) return;

                searchInput.value = "";

                filterInvoices();

                searchInput.focus();

            }
        );

    }


    /* =====================================================
       RESET FILTERS
    ===================================================== */

    if (resetFiltersBtn) {

        resetFiltersBtn.addEventListener(
            "click",
            function () {

                selectedFilter = "all";


                if (searchInput) {

                    searchInput.value = "";

                }


                filterButtons.forEach(
                    function (button) {

                        button.classList.remove("active");

                    }
                );


                const allButton =
                    document.querySelector(
                        '.invoice-filter-btn[data-filter="all"]'
                    );

                if (allButton) {

                    allButton.classList.add("active");

                }


                filterInvoices();

            }
        );

    }


    /* =========================================================
       VIEW INVOICE POPUP
    ========================================================= */

    const invoicePopup =
        document.getElementById("invoicePopup");

    const closeInvoicePopup =
        document.getElementById("closeInvoicePopup");

    const viewInvoiceButtons =
        document.querySelectorAll(".view-invoice-btn");


    const invoicePopupTitle =
        document.getElementById("invoicePopupTitle");

    const popupInvoiceService =
        document.getElementById("popupInvoiceService");

    const popupInvoiceAmount =
        document.getElementById("popupInvoiceAmount");

    const popupInvoiceDate =
        document.getElementById("popupInvoiceDate");

    const popupInvoiceDuration =
        document.getElementById("popupInvoiceDuration");

    const popupInvoiceBeautician =
        document.getElementById("popupInvoiceBeautician");

    const popupInvoiceTotal =
        document.getElementById("popupInvoiceTotal");

    const downloadInvoiceBtn =
        document.getElementById("downloadInvoiceBtn");


    /* =====================================================
       OPEN INVOICE POPUP
    ===================================================== */

    function openInvoicePopup(row) {

        if (!invoicePopup || !row) return;


        const invoice =
            row.dataset.invoice || "—";

        const service =
            row.dataset.service || "—";

        const date =
            row.dataset.date || "—";

        const amount =
            Number(row.dataset.amount || 0);

        const beautician =
            row.dataset.beautician || "—";

        const duration =
            row.dataset.duration || "—";


        /* Update popup */

        if (invoicePopupTitle) {
            invoicePopupTitle.textContent = invoice;
        }

        if (popupInvoiceService) {
            popupInvoiceService.textContent = service;
        }

        if (popupInvoiceAmount) {

            popupInvoiceAmount.textContent =
                "₹" +
                amount.toLocaleString("en-IN");

        }

        if (popupInvoiceDate) {
            popupInvoiceDate.textContent = date;
        }

        if (popupInvoiceDuration) {
            popupInvoiceDuration.textContent = duration;
        }

        if (popupInvoiceBeautician) {
            popupInvoiceBeautician.textContent = beautician;
        }

        if (popupInvoiceTotal) {

            popupInvoiceTotal.textContent =
                "₹" +
                amount.toLocaleString("en-IN");

        }


        /* Store selected invoice */

        invoicePopup.dataset.invoice =
            invoice;


        invoicePopup.dataset.service =
            service;


        invoicePopup.dataset.amount =
            amount;


        invoicePopup.classList.add("show");

        invoicePopup.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    /* =====================================================
       VIEW BUTTONS
    ===================================================== */

    viewInvoiceButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    this.closest(".invoice-row");

                openInvoicePopup(row);

            }
        );

    });


    /* =====================================================
       CLOSE INVOICE POPUP
    ===================================================== */

    function closeInvoicePopupFunction() {

        if (!invoicePopup) return;

        invoicePopup.classList.remove("show");

        invoicePopup.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    if (closeInvoicePopup) {

        closeInvoicePopup.addEventListener(
            "click",
            closeInvoicePopupFunction
        );

    }


    /* Close by clicking overlay */

    if (invoicePopup) {

        invoicePopup.addEventListener(
            "click",
            function (event) {

                if (event.target === invoicePopup) {

                    closeInvoicePopupFunction();

                }

            }
        );

    }


    /* =====================================================
       DOWNLOAD INVOICE
    ===================================================== */

    if (downloadInvoiceBtn) {

        downloadInvoiceBtn.addEventListener(
            "click",
            function () {

                const invoice =
                    invoicePopup.dataset.invoice || "Invoice";

                const service =
                    invoicePopup.dataset.service || "Beauty Door";

                const amount =
                    Number(
                        invoicePopup.dataset.amount || 0
                    );


                /*
                 * Front-end demo download.
                 * Creates a simple invoice text file.
                 */

                const invoiceContent =

                    `BEAUTY DOOR
--------------------------------
INVOICE

Invoice Number : ${invoice}
Service        : ${service}
Amount         : ₹${amount.toLocaleString("en-IN")}

Payment Status : Paid
Payment Method : UPI

Thank you for choosing Beauty Door.
--------------------------------`;


                const blob =
                    new Blob(
                        [invoiceContent],
                        {
                            type: "text/plain"
                        }
                    );


                const url =
                    URL.createObjectURL(blob);


                const link =
                    document.createElement("a");


                link.href = url;

                link.download =
                    invoice + ".txt";


                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(url);

            }
        );

    }


    /* =====================================================
       DOWNLOAD STATEMENT
    ===================================================== */

    const downloadStatementBtn =
        document.getElementById(
            "downloadStatementBtn"
        );


    if (downloadStatementBtn) {

        downloadStatementBtn.addEventListener(
            "click",
            function () {

                const visibleInvoices =
                    Array.from(invoiceRows)
                        .filter(function (row) {

                            return row.style.display !== "none";

                        });


                if (visibleInvoices.length === 0) {

                    alert(
                        "There are no invoices available to download."
                    );

                    return;

                }


                let statement =

                    `BEAUTY DOOR
================================
PAYMENT STATEMENT
================================

`;


                visibleInvoices.forEach(
                    function (row) {

                        const invoice =
                            row.dataset.invoice || "—";

                        const service =
                            row.dataset.service || "—";

                        const date =
                            row.dataset.date || "—";

                        const amount =
                            Number(
                                row.dataset.amount || 0
                            );

                        const status =
                            row.dataset.status || "—";


                        statement +=

                            `Invoice : ${invoice}
Service : ${service}
Date    : ${date}
Amount  : ₹${amount.toLocaleString("en-IN")}
Status  : ${status.toUpperCase()}
--------------------------------
`;

                    }
                );


                statement +=

                    `
Thank you for choosing Beauty Door.
`;


                const blob =
                    new Blob(
                        [statement],
                        {
                            type: "text/plain"
                        }
                    );


                const url =
                    URL.createObjectURL(blob);


                const link =
                    document.createElement("a");


                link.href = url;

                link.download =
                    "Beauty-Door-Payment-Statement.txt";


                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(url);

            }
        );

    }


    /* =========================================================
       SUPPORT POPUP
    ========================================================= */

    const invoiceSupportBtn =
        document.getElementById(
            "invoiceSupportBtn"
        );

    const invoiceSupportPopup =
        document.getElementById(
            "invoiceSupportPopup"
        );

    const closeInvoiceSupportPopup =
        document.getElementById(
            "closeInvoiceSupportPopup"
        );


    /* Open Support Popup */

    if (invoiceSupportBtn && invoiceSupportPopup) {

        invoiceSupportBtn.addEventListener(
            "click",
            function () {

                invoiceSupportPopup.classList.add(
                    "show"
                );

                invoiceSupportPopup.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.style.overflow =
                    "hidden";

            }
        );

    }


    /* Close Support Popup */

    function closeSupportPopup() {

        if (!invoiceSupportPopup) return;

        invoiceSupportPopup.classList.remove(
            "show"
        );

        invoiceSupportPopup.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";

    }


    if (closeInvoiceSupportPopup) {

        closeInvoiceSupportPopup.addEventListener(
            "click",
            closeSupportPopup
        );

    }


    /* Close support popup by overlay */

    if (invoiceSupportPopup) {

        invoiceSupportPopup.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    invoiceSupportPopup
                ) {

                    closeSupportPopup();

                }

            }
        );

    }


    /* =========================================================
       ESC KEY
    ========================================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            closeInvoicePopupFunction();

            closeSupportPopup();

        }
    );


    /* =========================================================
       INITIALIZE
    ========================================================= */

    filterInvoices();

});


/* =========================================================
   SIDEBAR MENU TOGGLE
   TABLET + MOBILE ONLY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const sidebar =
        document.getElementById("dashboardSidebar");

    const menuToggle =
        document.getElementById("sidebarMenuToggle");

    const closeToggle =
        document.getElementById("sidebarCloseToggle");

    const overlay =
        document.getElementById("sidebarOverlay");


    /* Stop if elements are missing */

    if (!sidebar || !menuToggle) {
        console.warn("Sidebar toggle elements not found.");
        return;
    }


    /* =====================================================
       OPEN SIDEBAR
    ===================================================== */

    function openSidebar() {

        sidebar.classList.add("sidebar-open");

        if (overlay) {
            overlay.classList.add("show");
        }

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close sidebar"
        );

        const icon =
            menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        }

    }


    /* =====================================================
       CLOSE SIDEBAR
    ===================================================== */

    function closeSidebar() {

        sidebar.classList.remove("sidebar-open");

        if (overlay) {
            overlay.classList.remove("show");
        }

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open sidebar"
        );

        const icon =
            menuToggle.querySelector("i");

        if (icon) {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    }


    /* =====================================================
       TOGGLE BUTTON
    ===================================================== */

    menuToggle.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            if (
                sidebar.classList.contains(
                    "sidebar-open"
                )
            ) {

                closeSidebar();

            } else {

                openSidebar();

            }

        }
    );


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (closeToggle) {

        closeToggle.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                closeSidebar();

            }
        );

    }


    /* =====================================================
       OVERLAY
    ===================================================== */

    if (overlay) {

        overlay.addEventListener(
            "click",
            closeSidebar
        );

    }


    /* =====================================================
       SIDEBAR LINKS
       Your actual class is .sidebar-link
    ===================================================== */

    const sidebarLinks =
        sidebar.querySelectorAll(".sidebar-link");

    sidebarLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeSidebar();

            }
        );

    });

    const mobileControls =
        sidebar.querySelectorAll("[data-mobile-control]");

    mobileControls.forEach(function (control) {

        control.addEventListener("click", function () {

            const desktopTarget =
                document.querySelector(
                    "." +
                        control.dataset.mobileControl +
                        "-btn, .header-profile"
                );

            const target =
                desktopTarget &&
                window.getComputedStyle(desktopTarget).display !== "none"
                    ? desktopTarget
                    : control;

            closeSidebar();

            if (target) {
                target.focus();
            }

        });

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                closeSidebar();

            }

        }
    );


    /* =====================================================
       DESKTOP RESET
    ===================================================== */

    function checkDesktop() {

        if (window.innerWidth >= 1200) {

            closeSidebar();

        }

    }

    window.addEventListener(
        "resize",
        checkDesktop
    );


    checkDesktop();

});
