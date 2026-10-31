/**
 * Eye Care Optical - Main JavaScript
 * Handles Navigation, Floating Buttons, Appointment Modal, Lightbox & Interactions
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Dynamic Phone & WhatsApp Link Population from Store
    initStoreContactLinks();

    // 2. Sticky Navbar on scroll
    initStickyNavbar();

    // 3. Back to Top Button
    initBackToTop();

    // 4. Appointment Booking Modal & Form Handling
    initAppointmentForm();

    // 5. Gallery Lightbox Handler
    initGalleryLightbox();

    // 6. Offer Coupon Copy Button
    initCouponCopy();
});

/**
 * Update phone, whatsapp and contact info across the page from EyeCareStore
 */
function initStoreContactLinks() {
    if (typeof EyeCareStore === "undefined") return;
    const settings = EyeCareStore.getSettings();

    // Update WhatsApp links
    const waButtons = document.querySelectorAll(".dynamic-whatsapp-link, #floatingWhatsApp");
    waButtons.forEach(btn => {
        btn.href = EyeCareStore.getWhatsAppUrl();
    });

    // Update Phone links
    const phoneButtons = document.querySelectorAll(".dynamic-tel-link, #floatingCall");
    phoneButtons.forEach(btn => {
        btn.href = EyeCareStore.getTelUrl();
    });

    // Update text content where designated
    document.querySelectorAll(".shop-phone-text").forEach(el => el.textContent = settings.phone);
    document.querySelectorAll(".shop-whatsapp-text").forEach(el => el.textContent = settings.whatsapp);
    document.querySelectorAll(".shop-email-text").forEach(el => el.textContent = settings.email);
    document.querySelectorAll(".shop-address-text").forEach(el => el.textContent = settings.address);
    document.querySelectorAll(".shop-timings-text").forEach(el => el.textContent = settings.timings);
}

/**
 * Sticky Navbar styling on scroll
 */
function initStickyNavbar() {
    const navbar = document.querySelector(".site-navbar");
    if (!navbar) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // Close mobile dropdown when a link is clicked
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link:not(.dropdown-toggle)");
    const navbarCollapse = document.querySelector(".navbar-collapse");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        });
    });
}

/**
 * Back to Top Button
 */
function initBackToTop() {
    const backBtn = document.getElementById("backToTop");
    if (!backBtn) return;

    window.addEventListener("scroll", function () {
        if (window.scrollY > 400) {
            backBtn.classList.add("show");
        } else {
            backBtn.classList.remove("show");
        }
    });

    backBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/**
 * Appointment Modal Booking Form Submission
 */
function initAppointmentForm() {
    const form = document.getElementById("appointmentForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("apptName") ? document.getElementById("apptName").value.trim() : "";
        const phone = document.getElementById("apptPhone") ? document.getElementById("apptPhone").value.trim() : "";
        const branch = document.getElementById("apptBranch") ? document.getElementById("apptBranch").value : "1st Branch (Kisan Chowk, Miraj)";
        const service = document.getElementById("apptService") ? document.getElementById("apptService").value : "Eye Test";
        const date = document.getElementById("apptDate") ? document.getElementById("apptDate").value : "Earliest Available";
        const time = document.getElementById("apptTime") ? document.getElementById("apptTime").value : "Convenient Time";
        const notes = document.getElementById("apptNotes") ? document.getElementById("apptNotes").value.trim() : "";

        if (!name || !phone) {
            showToast("Please provide your Name and Contact Number.", "warning");
            return;
        }

        // Store enquiry in LocalStorage
        if (typeof EyeCareStore !== "undefined") {
            EyeCareStore.addEnquiry({
                type: "Appointment Booking",
                name: name,
                phone: phone,
                branch: branch,
                service: service,
                preferredDate: date,
                preferredTime: time,
                notes: notes
            });
        }

        // Construct pre-filled WhatsApp message
        const message = `Hello Eye Care Optical, I would like to book an appointment:
- Name: ${name}
- Phone: ${phone}
- Preferred Branch: ${branch}
- Service: ${service}
- Preferred Date: ${date}
- Preferred Time: ${time}
- Additional Notes: ${notes || "None"}`;

        // Close Modal
        const modalEl = document.getElementById("appointmentModal");
        if (modalEl && typeof bootstrap !== "undefined") {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            if (modalInstance) modalInstance.hide();
        }

        form.reset();
        showToast("Appointment details recorded! Redirecting to WhatsApp to confirm your slot...", "success");

        // Open WhatsApp in new tab after brief delay
        setTimeout(() => {
            const waUrl = EyeCareStore.getWhatsAppUrl(message);
            window.open(waUrl, "_blank");
        }, 1200);
    });
}

/**
 * Gallery Lightbox
 */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll(".gallery-grid-item");
    const lightboxModal = document.getElementById("lightboxModal");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const lightboxClose = document.getElementById("lightboxClose");

    if (!lightboxModal) return;

    galleryItems.forEach(item => {
        item.addEventListener("click", function () {
            const img = this.querySelector("img");
            const caption = this.getAttribute("data-caption") || (this.querySelector("h4") ? this.querySelector("h4").textContent : "Eye Care Optical");
            if (img && lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = caption;
                if (lightboxCaption) lightboxCaption.textContent = caption;
                lightboxModal.classList.add("active");
            }
        });
    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => lightboxModal.classList.remove("active"));
    }

    lightboxModal.addEventListener("click", (e) => {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove("active");
        }
    });
}

/**
 * Copy Coupon Code to Clipboard
 */
function initCouponCopy() {
    document.querySelectorAll(".btn-copy-code").forEach(btn => {
        btn.addEventListener("click", function () {
            const code = this.getAttribute("data-code");
            if (!code) return;
            navigator.clipboard.writeText(code).then(() => {
                showToast(`Coupon code "${code}" copied to clipboard! Mention this in-store or on WhatsApp.`, "success");
            }).catch(() => {
                showToast(`Coupon code: ${code}`, "info");
            });
        });
    });
}

/**
 * Toast notification utility
 */
function showToast(message, type = "info") {
    let toast = document.getElementById("siteToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "siteToast";
        toast.className = "custom-toast";
        document.body.appendChild(toast);
    }

    let icon = "fa-info-circle";
    if (type === "success") icon = "fa-check-circle";
    if (type === "warning") icon = "fa-exclamation-triangle";

    toast.innerHTML = `<i class="fas ${icon} me-2"></i><span>${message}</span>`;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 4000);
}
window.showToast = showToast;
