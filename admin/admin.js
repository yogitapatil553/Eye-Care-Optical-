/**
 * Eye Care Optical - Admin Panel Engine
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Auth Guard
    if (sessionStorage.getItem("eyecare_admin_auth") !== "true") {
        window.location.href = "login.html";
        return;
    }

    // 2. Setup Navigation
    setupAdminNavigation();

    // 3. Load Initial Views
    updateDashboardStats();
    loadProductsTable();
    loadOffersList();
    loadEnquiriesTable();
    loadStoreSettings();

    // 4. Logout Button
    const logoutBtn = document.getElementById("adminLogoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            sessionStorage.removeItem("eyecare_admin_auth");
            window.location.href = "login.html";
        });
    }

    // 5. Product Form Submissions
    initProductFormModals();

    // 6. Offer Form Submission
    initOfferFormModals();

    // 7. Settings Form
    initSettingsForm();
});

function setupAdminNavigation() {
    const navItems = document.querySelectorAll(".admin-nav-item");
    const sections = document.querySelectorAll(".admin-section-view");

    navItems.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault();
            navItems.forEach(n => n.classList.remove("active"));
            sections.forEach(s => s.classList.add("d-none"));

            this.classList.add("active");
            const targetId = this.getAttribute("data-target");
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove("d-none");
            }
        });
    });
}

function updateDashboardStats() {
    const products = EyeCareStore.getProducts();
    const offers = EyeCareStore.getOffers();
    const enquiries = EyeCareStore.getEnquiries();

    const pCountEl = document.getElementById("statTotalProducts");
    const oCountEl = document.getElementById("statTotalOffers");
    const eCountEl = document.getElementById("statTotalEnquiries");
    const newEnqBadge = document.getElementById("newEnquiriesBadge");

    if (pCountEl) pCountEl.textContent = products.length;
    if (oCountEl) oCountEl.textContent = offers.length;
    if (eCountEl) eCountEl.textContent = enquiries.length;

    const newCount = enquiries.filter(e => e.status === "New").length;
    if (newEnqBadge) {
        newEnqBadge.textContent = newCount > 0 ? `${newCount} New` : "";
    }
}

/**
 * -------------------------------------------------------------
 * PRODUCTS MANAGEMENT
 * -------------------------------------------------------------
 */
function loadProductsTable(filterCategory = "", searchQuery = "") {
    const tableBody = document.getElementById("productsTableBody");
    if (!tableBody) return;

    let products = EyeCareStore.getProducts();

    if (filterCategory) {
        products = products.filter(p => p.category === filterCategory);
    }
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }

    if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No products found.</td></tr>`;
        return;
    }

    let rows = "";
    products.forEach((p, index) => {
        rows += `
        <tr>
            <td class="align-middle fw-semibold">${index + 1}</td>
            <td class="align-middle">
                <img src="${p.image}" alt="${p.name}" class="table-thumb" onerror="this.src='https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=100&q=80'">
            </td>
            <td class="align-middle">
                <div class="fw-bold text-dark">${p.name}</div>
                <small class="text-muted">${p.brand}</small>
            </td>
            <td class="align-middle">
                <span class="badge bg-light text-dark border text-uppercase">${p.category}</span>
            </td>
            <td class="align-middle small">
                <div><strong>Shape:</strong> ${p.shape}</div>
                <div><strong>Material:</strong> ${p.material}</div>
            </td>
            <td class="align-middle fw-bold text-primary">${p.priceRange}</td>
            <td class="align-middle text-end">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="openEditProductModal('${p.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteProduct('${p.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });

    tableBody.innerHTML = rows;

    // Search & Filter listeners
    const searchInput = document.getElementById("adminProductSearch");
    const categorySelect = document.getElementById("adminProductCategoryFilter");
    if (searchInput && !searchInput.dataset.initialized) {
        searchInput.dataset.initialized = "true";
        searchInput.addEventListener("input", () => {
            loadProductsTable(categorySelect ? categorySelect.value : "", searchInput.value.trim());
        });
    }
    if (categorySelect && !categorySelect.dataset.initialized) {
        categorySelect.dataset.initialized = "true";
        categorySelect.addEventListener("change", () => {
            loadProductsTable(categorySelect.value, searchInput ? searchInput.value.trim() : "");
        });
    }
}

function initProductFormModals() {
    const addForm = document.getElementById("addProductForm");
    if (addForm) {
        addForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const newProd = {
                id: "prod-" + Date.now(),
                name: document.getElementById("newProdName").value.trim(),
                brand: document.getElementById("newProdBrand").value.trim(),
                category: document.getElementById("newProdCategory").value,
                shape: document.getElementById("newProdShape").value.trim(),
                material: document.getElementById("newProdMaterial").value.trim(),
                gender: document.getElementById("newProdGender").value,
                size: document.getElementById("newProdSize").value.trim() || "Medium",
                colors: document.getElementById("newProdColors").value.split(",").map(c => c.trim()).filter(Boolean),
                priceRange: document.getElementById("newProdPrice").value.trim(),
                image: document.getElementById("newProdImage").value.trim() || "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
                description: document.getElementById("newProdDesc").value.trim(),
                features: document.getElementById("newProdFeatures").value.split(",").map(f => f.trim()).filter(Boolean),
                isFeatured: document.getElementById("newProdFeatured").checked,
                isBestSeller: document.getElementById("newProdBestSeller").checked,
                inStock: true
            };

            const products = EyeCareStore.getProducts();
            products.unshift(newProd);
            EyeCareStore.saveProducts(products);

            // Hide modal & reset
            const modalEl = document.getElementById("addProductModal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            addForm.reset();

            loadProductsTable();
            updateDashboardStats();
            alert("Product added successfully!");
        });
    }

    const editForm = document.getElementById("editProductForm");
    if (editForm) {
        editForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const id = document.getElementById("editProdId").value;
            let products = EyeCareStore.getProducts();
            const index = products.findIndex(p => p.id === id);

            if (index !== -1) {
                products[index].name = document.getElementById("editProdName").value.trim();
                products[index].brand = document.getElementById("editProdBrand").value.trim();
                products[index].category = document.getElementById("editProdCategory").value;
                products[index].shape = document.getElementById("editProdShape").value.trim();
                products[index].material = document.getElementById("editProdMaterial").value.trim();
                products[index].gender = document.getElementById("editProdGender").value;
                products[index].size = document.getElementById("editProdSize").value.trim();
                products[index].priceRange = document.getElementById("editProdPrice").value.trim();
                products[index].image = document.getElementById("editProdImage").value.trim();
                products[index].description = document.getElementById("editProdDesc").value.trim();
                products[index].isFeatured = document.getElementById("editProdFeatured").checked;
                products[index].isBestSeller = document.getElementById("editProdBestSeller").checked;

                EyeCareStore.saveProducts(products);

                const modalEl = document.getElementById("editProductModal");
                const modal = bootstrap.Modal.getInstance(modalEl);
                if (modal) modal.hide();

                loadProductsTable();
                alert("Product updated successfully!");
            }
        });
    }
}

function openEditProductModal(id) {
    const products = EyeCareStore.getProducts();
    const p = products.find(prod => prod.id === id);
    if (!p) return;

    document.getElementById("editProdId").value = p.id;
    document.getElementById("editProdName").value = p.name;
    document.getElementById("editProdBrand").value = p.brand;
    document.getElementById("editProdCategory").value = p.category;
    document.getElementById("editProdShape").value = p.shape;
    document.getElementById("editProdMaterial").value = p.material;
    document.getElementById("editProdGender").value = p.gender;
    document.getElementById("editProdSize").value = p.size || "Medium";
    document.getElementById("editProdPrice").value = p.priceRange;
    document.getElementById("editProdImage").value = p.image;
    document.getElementById("editProdDesc").value = p.description;
    document.getElementById("editProdFeatured").checked = !!p.isFeatured;
    document.getElementById("editProdBestSeller").checked = !!p.isBestSeller;

    const modal = new bootstrap.Modal(document.getElementById("editProductModal"));
    modal.show();
}

function deleteProduct(id) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    let products = EyeCareStore.getProducts();
    products = products.filter(p => p.id !== id);
    EyeCareStore.saveProducts(products);
    loadProductsTable();
    updateDashboardStats();
}

/**
 * -------------------------------------------------------------
 * OFFERS MANAGEMENT
 * -------------------------------------------------------------
 */
function loadOffersList() {
    const container = document.getElementById("adminOffersGrid");
    if (!container) return;

    const offers = EyeCareStore.getOffers();
    let html = "";
    offers.forEach(o => {
        html += `
        <div class="col-md-6 mb-4">
            <div class="card h-100 shadow-sm border">
                <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <span class="badge bg-warning text-dark fw-bold">${o.discount}</span>
                    <small>${o.validity}</small>
                </div>
                <div class="card-body">
                    <h5 class="fw-bold text-dark">${o.title}</h5>
                    <p class="text-muted small">${o.description}</p>
                    <div class="p-2 bg-light rounded border text-center fw-bold text-primary mb-2">
                        CODE: <code>${o.code}</code>
                    </div>
                    <small class="text-muted d-block">${o.terms}</small>
                </div>
                <div class="card-footer bg-white text-end">
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteOffer('${o.id}')">
                        <i class="fas fa-trash me-1"></i>Delete Offer
                    </button>
                </div>
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
}

function initOfferFormModals() {
    const addOfferForm = document.getElementById("addOfferForm");
    if (addOfferForm) {
        addOfferForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const newOffer = {
                id: "off-" + Date.now(),
                title: document.getElementById("newOfferTitle").value.trim(),
                discount: document.getElementById("newOfferDiscount").value.trim(),
                code: document.getElementById("newOfferCode").value.trim().toUpperCase(),
                description: document.getElementById("newOfferDesc").value.trim(),
                validity: document.getElementById("newOfferValidity").value.trim(),
                terms: document.getElementById("newOfferTerms").value.trim() || "Applicable in store.",
                badgeColor: "bg-primary"
            };

            const offers = EyeCareStore.getOffers();
            offers.unshift(newOffer);
            EyeCareStore.saveOffers(offers);

            const modalEl = document.getElementById("addOfferModal");
            const modal = bootstrap.Modal.getInstance(modalEl);
            if (modal) modal.hide();
            addOfferForm.reset();

            loadOffersList();
            updateDashboardStats();
            alert("Special offer created successfully!");
        });
    }
}

function deleteOffer(id) {
    if (!confirm("Are you sure you want to remove this offer?")) return;
    let offers = EyeCareStore.getOffers();
    offers = offers.filter(o => o.id !== id);
    EyeCareStore.saveOffers(offers);
    loadOffersList();
    updateDashboardStats();
}

/**
 * -------------------------------------------------------------
 * ENQUIRIES & APPOINTMENTS MANAGEMENT
 * -------------------------------------------------------------
 */
function loadEnquiriesTable() {
    const tableBody = document.getElementById("enquiriesTableBody");
    if (!tableBody) return;

    const enquiries = EyeCareStore.getEnquiries();
    if (enquiries.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4 text-muted">No customer enquiries received yet. Test by submitting an appointment or contact form!</td></tr>`;
        return;
    }

    let rows = "";
    enquiries.forEach((e, idx) => {
        const statusBadge = e.status === "New" ? "bg-danger" : (e.status === "Contacted" ? "bg-warning text-dark" : "bg-success");
        const cleanPhone = e.phone.replace(/[^0-9]/g, "");
        const waLink = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(e.name)},%20this%20is%20Eye%20Care%20Optical%20following%20up%20on%20your%20enquiry.`;

        rows += `
        <tr>
            <td class="align-middle fw-semibold">${idx + 1}</td>
            <td class="align-middle">
                <div class="fw-bold">${e.name}</div>
                <small class="text-muted"><i class="fas fa-clock me-1"></i>${e.date}</small>
            </td>
            <td class="align-middle">
                <a href="tel:${cleanPhone}" class="text-decoration-none fw-semibold text-primary">
                    <i class="fas fa-phone-alt me-1"></i>${e.phone}
                </a>
            </td>
            <td class="align-middle">
                <span class="badge bg-light text-primary border">${e.type || 'Enquiry'}</span>
                ${e.service ? `<div class="small text-muted mt-1"><strong>Service:</strong> ${e.service}</div>` : ''}
            </td>
            <td class="align-middle small" style="max-width: 250px;">
                ${e.notes || e.message || 'No additional notes'}
                ${e.preferredDate ? `<div class="text-muted mt-1"><strong>Slot:</strong> ${e.preferredDate} (${e.preferredTime || ''})</div>` : ''}
            </td>
            <td class="align-middle">
                <span class="badge ${statusBadge}">${e.status}</span>
            </td>
            <td class="align-middle text-end">
                <a href="${waLink}" target="_blank" class="btn btn-sm btn-success me-1" title="Reply on WhatsApp">
                    <i class="fab fa-whatsapp"></i>
                </a>
                <button class="btn btn-sm btn-outline-primary me-1" onclick="toggleEnquiryStatus('${e.id}')" title="Change Status">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteCustomerEnquiry('${e.id}')" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `;
    });

    tableBody.innerHTML = rows;
}

function toggleEnquiryStatus(id) {
    EyeCareStore.markEnquiryContacted(id);
    loadEnquiriesTable();
    updateDashboardStats();
}

function deleteCustomerEnquiry(id) {
    if (!confirm("Delete this customer enquiry record?")) return;
    EyeCareStore.deleteEnquiry(id);
    loadEnquiriesTable();
    updateDashboardStats();
}

/**
 * -------------------------------------------------------------
 * STORE SETTINGS
 * -------------------------------------------------------------
 */
function loadStoreSettings() {
    const s = EyeCareStore.getSettings();
    if (!document.getElementById("setShopName")) return;

    document.getElementById("setShopName").value = s.shopName;
    document.getElementById("setTagline").value = s.tagline;
    document.getElementById("setPhone").value = s.phone;
    document.getElementById("setWhatsapp").value = s.whatsapp;
    document.getElementById("setEmail").value = s.email;
    document.getElementById("setAddress").value = s.address;
    document.getElementById("setTimings").value = s.timings;
}

function initSettingsForm() {
    const form = document.getElementById("storeSettingsForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const updated = {
            shopName: document.getElementById("setShopName").value.trim(),
            tagline: document.getElementById("setTagline").value.trim(),
            phone: document.getElementById("setPhone").value.trim(),
            whatsapp: document.getElementById("setWhatsapp").value.trim(),
            email: document.getElementById("setEmail").value.trim(),
            address: document.getElementById("setAddress").value.trim(),
            timings: document.getElementById("setTimings").value.trim(),
            googleMapsEmbedUrl: DEFAULT_SETTINGS.googleMapsEmbedUrl,
            googleMapsDirectionsUrl: DEFAULT_SETTINGS.googleMapsDirectionsUrl
        };

        EyeCareStore.saveSettings(updated);
        alert("Store settings saved! All website pages now display these updated details.");
    });

    // Reset default button
    const resetBtn = document.getElementById("resetDefaultsBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", function () {
            if (confirm("Reset all products, offers, and settings to original defaults? This will erase custom additions.")) {
                localStorage.removeItem("eyecare_products");
                localStorage.removeItem("eyecare_offers");
                localStorage.removeItem("eyecare_settings");
                location.reload();
            }
        });
    }

    // Export JSON Backup
    const exportBtn = document.getElementById("exportBackupBtn");
    if (exportBtn) {
        exportBtn.addEventListener("click", function () {
            const backup = {
                settings: EyeCareStore.getSettings(),
                products: EyeCareStore.getProducts(),
                offers: EyeCareStore.getOffers(),
                enquiries: EyeCareStore.getEnquiries()
            };
            const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `eyecare_backup_${Date.now()}.json`;
            a.click();
        });
    }
}

// Global functions for inline HTML calls
window.openEditProductModal = openEditProductModal;
window.deleteProduct = deleteProduct;
window.deleteOffer = deleteOffer;
window.toggleEnquiryStatus = toggleEnquiryStatus;
window.deleteCustomerEnquiry = deleteCustomerEnquiry;
