/**
 * Eye Care Optical - Contact Form Handler
 */

document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("generalContactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const phone = document.getElementById("contactPhone").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const category = document.getElementById("contactCategory").value;
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !phone || !message) {
            if (window.showToast) {
                window.showToast("Please fill in your Name, Phone Number, and Enquiry message.", "warning");
            } else {
                alert("Please fill in all required fields.");
            }
            return;
        }

        // Save enquiry to LocalStorage store
        if (typeof EyeCareStore !== "undefined") {
            EyeCareStore.addEnquiry({
                type: "General Enquiry",
                name: name,
                phone: phone,
                email: email || "Not provided",
                category: category || "General Question",
                notes: message
            });
        }

        // Construct WhatsApp message
        const waText = `Hello Eye Care Optical, I sent an enquiry through your website:
- Name: ${name}
- Phone: ${phone}
- Email: ${email || "N/A"}
- Interested In: ${category}
- Message: ${message}`;

        const alertBox = document.getElementById("formSuccessAlert");
        if (alertBox) {
            alertBox.classList.remove("d-none");
            alertBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        contactForm.reset();

        if (window.showToast) {
            window.showToast("Thank you! Your enquiry has been received.", "success");
        }

        // WhatsApp direct link button in confirmation
        const waLinkContainer = document.getElementById("contactWaRedirect");
        if (waLinkContainer && typeof EyeCareStore !== "undefined") {
            const waUrl = EyeCareStore.getWhatsAppUrl(waText);
            waLinkContainer.innerHTML = `
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-success mt-2">
                    <i class="fab fa-whatsapp me-2"></i>Send Message directly on WhatsApp
                </a>
            `;
        }
    });
});
