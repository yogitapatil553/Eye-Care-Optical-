/**
 * Eye Care Optical - Products Catalog & Filter Engine
 */

document.addEventListener("DOMContentLoaded", function () {
    // If on pages with product catalog or featured products
    initProductCatalog();
});

function initProductCatalog() {
    if (typeof EyeCareStore === "undefined") return;

    const allProducts = EyeCareStore.getProducts();

    // 1. Check if on Homepage with Featured Container
    const featuredContainer = document.getElementById("featuredProductsGrid");
    if (featuredContainer) {
        renderProducts(allProducts.filter(p => p.isFeatured || p.isBestSeller).slice(0, 8), featuredContainer);
        initCategoryFilterPills(allProducts, featuredContainer);
    }

    // 2. Check if on Master Catalog Page (products.html)
    const masterContainer = document.getElementById("masterProductsGrid");
    if (masterContainer) {
        renderProducts(allProducts, masterContainer);
        setupCatalogFilters(allProducts, masterContainer);
    }

    // 3. Check if on Specific Category Page (e.g. eyeglasses.html, sunglasses.html, etc.)
    const specificContainer = document.getElementById("categoryProductsGrid");
    const categoryName = specificContainer ? specificContainer.getAttribute("data-category") : null;
    if (specificContainer && categoryName) {
        let filteredByCategory = allProducts.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
        renderProducts(filteredByCategory, specificContainer);
        setupCategoryPageFilters(filteredByCategory, specificContainer);
    }
}

/**
 * Render an array of product objects into a container element
 */
function renderProducts(productsList, container) {
    if (!container) return;

    if (!productsList || productsList.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="p-4 bg-white rounded-3 border">
                    <i class="fas fa-glasses text-muted mb-3" style="font-size: 3rem;"></i>
                    <h4 class="fw-bold text-dark">No Eyewear Found</h4>
                    <p class="text-muted mb-3">No products match your selected filter criteria. Try clearing some filters or searching for something else.</p>
                    <button class="btn btn-outline-primary btn-sm px-4 rounded-pill" onclick="resetAllFilters()">Reset Filters</button>
                </div>
            </div>
        `;
        return;
    }

    let html = "";
    productsList.forEach(prod => {
        const waMsg = `Hello Eye Care Optical, I am interested in:
- Product: ${prod.name}
- Brand: ${prod.brand}
- Price Guide: ${prod.priceRange}
Please let me know if this model is available in store for trial.`;
        const waUrl = EyeCareStore.getWhatsAppUrl(waMsg);

        html += `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="product-card">
                <div class="product-badge-wrap">
                    ${prod.isBestSeller ? '<span class="badge-prod-bestseller"><i class="fas fa-fire me-1"></i>Best Seller</span>' : ''}
                    ${prod.isFeatured && !prod.isBestSeller ? '<span class="badge-prod-featured"><i class="fas fa-star me-1"></i>Featured</span>' : ''}
                </div>
                <div class="product-img-box">
                    <img src="${prod.image}" alt="${prod.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80'">
                    <button class="product-quickview-btn" onclick="openProductQuickView('${prod.id}')">
                        <i class="fas fa-eye me-1"></i>Quick View
                    </button>
                </div>
                <div class="product-info">
                    <span class="product-brand">${prod.brand}</span>
                    <h3 class="product-name" title="${prod.name}">${prod.name}</h3>
                    <div class="product-specs">
                        <span class="spec-chip">${prod.shape}</span>
                        <span class="spec-chip">${prod.material}</span>
                        <span class="spec-chip">${prod.gender}</span>
                    </div>
                    <div class="product-price-guide">
                        <span class="text-muted small fw-normal">Indicative:</span> ${prod.priceRange}
                    </div>
                    <div class="product-actions">
                        <button class="btn-prod-details" onclick="openProductQuickView('${prod.id}')">
                            Details
                        </button>
                        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-prod-wa" title="Enquire on WhatsApp">
                            <i class="fab fa-whatsapp"></i> Enquire
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
}

/**
 * Filter pills on Homepage (All, Eyeglasses, Sunglasses, Screen Glasses, Kids)
 */
function initCategoryFilterPills(allProducts, container) {
    const filterPills = document.querySelectorAll(".home-filter-pill");
    filterPills.forEach(pill => {
        pill.addEventListener("click", function () {
            filterPills.forEach(p => p.classList.remove("active", "btn-primary"));
            filterPills.forEach(p => p.classList.add("btn-outline-secondary"));

            this.classList.add("active", "btn-primary");
            this.classList.remove("btn-outline-secondary");

            const cat = this.getAttribute("data-category");
            if (cat === "all") {
                renderProducts(allProducts.filter(p => p.isFeatured || p.isBestSeller).slice(0, 8), container);
            } else {
                const filtered = allProducts.filter(p => p.category === cat);
                renderProducts(filtered, container);
            }
        });
    });
}

/**
 * Master Catalog Filter Setup (products.html)
 */
function setupCatalogFilters(allProducts, container) {
    const searchInput = document.getElementById("catalogSearch");
    const categoryCheckboxes = document.querySelectorAll(".filter-category-checkbox");
    const shapeCheckboxes = document.querySelectorAll(".filter-shape-checkbox");
    const genderCheckboxes = document.querySelectorAll(".filter-gender-checkbox");
    const sortSelect = document.getElementById("sortProducts");
    const resultCountEl = document.getElementById("resultCount");

    function applyFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const selectedCategories = Array.from(categoryCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const selectedShapes = Array.from(shapeCheckboxes).filter(cb => cb.checked).map(cb => cb.value);
        const selectedGenders = Array.from(genderCheckboxes).filter(cb => cb.checked).map(cb => cb.value);

        let filtered = allProducts.filter(p => {
            // Search query
            const matchQuery = !query || 
                p.name.toLowerCase().includes(query) || 
                p.brand.toLowerCase().includes(query) || 
                p.shape.toLowerCase().includes(query) || 
                p.material.toLowerCase().includes(query);

            // Category
            const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);

            // Shape
            const matchShape = selectedShapes.length === 0 || selectedShapes.includes(p.shape);

            // Gender
            const matchGender = selectedGenders.length === 0 || selectedGenders.includes(p.gender);

            return matchQuery && matchCategory && matchShape && matchGender;
        });

        // Sorting
        if (sortSelect && sortSelect.value) {
            const val = sortSelect.value;
            if (val === "name-asc") {
                filtered.sort((a, b) => a.name.localeCompare(b.name));
            } else if (val === "brand") {
                filtered.sort((a, b) => a.brand.localeCompare(b.brand));
            }
        }

        if (resultCountEl) {
            resultCountEl.textContent = filtered.length;
        }

        renderProducts(filtered, container);
    }

    if (searchInput) searchInput.addEventListener("input", applyFilters);
    categoryCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
    shapeCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
    genderCheckboxes.forEach(cb => cb.addEventListener("change", applyFilters));
    if (sortSelect) sortSelect.addEventListener("change", applyFilters);

    window.resetAllFilters = function() {
        if (searchInput) searchInput.value = "";
        categoryCheckboxes.forEach(cb => cb.checked = false);
        shapeCheckboxes.forEach(cb => cb.checked = false);
        genderCheckboxes.forEach(cb => cb.checked = false);
        if (sortSelect) sortSelect.value = "default";
        applyFilters();
    };
}

/**
 * Specific Category Filter Setup
 */
function setupCategoryPageFilters(categoryProducts, container) {
    const searchInput = document.getElementById("categorySearch");
    const shapeSelect = document.getElementById("filterShape");
    const genderSelect = document.getElementById("filterGender");

    function applyCategoryFilters() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const shape = shapeSelect ? shapeSelect.value : "";
        const gender = genderSelect ? genderSelect.value : "";

        let filtered = categoryProducts.filter(p => {
            const matchQuery = !query || p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query);
            const matchShape = !shape || p.shape === shape;
            const matchGender = !gender || p.gender === gender;
            return matchQuery && matchShape && matchGender;
        });

        renderProducts(filtered, container);
    }

    if (searchInput) searchInput.addEventListener("input", applyCategoryFilters);
    if (shapeSelect) shapeSelect.addEventListener("change", applyCategoryFilters);
    if (genderSelect) genderSelect.addEventListener("change", applyCategoryFilters);
}

/**
 * Open Product Quick View Modal
 */
function openProductQuickView(productId) {
    if (typeof EyeCareStore === "undefined") return;
    const allProducts = EyeCareStore.getProducts();
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    let modalEl = document.getElementById("productDetailsModal");
    if (!modalEl) {
        // Create modal on the fly if not already in DOM
        modalEl = document.createElement("div");
        modalEl.id = "productDetailsModal";
        modalEl.className = "modal fade";
        modalEl.tabIndex = -1;
        modalEl.setAttribute("aria-hidden", "true");
        modalEl.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content" id="productModalContent">
                </div>
            </div>
        `;
        document.body.appendChild(modalEl);
    }

    const waMsg = `Hello Eye Care Optical, I would like to enquire about:
- Product: ${product.name}
- Brand: ${product.brand}
- Category: ${product.category}
- Frame Shape: ${product.shape}
- Frame Material: ${product.material}
- Price Guide: ${product.priceRange}
Can I try this frame at your shop?`;
    const waUrl = EyeCareStore.getWhatsAppUrl(waMsg);

    const colorsList = product.colors && product.colors.length 
        ? product.colors.map(c => `<span class="badge bg-light text-dark border me-1">${c}</span>`).join("")
        : '<span class="text-muted small">Standard Assorted Colors</span>';

    const featuresList = product.features && product.features.length
        ? product.features.map(f => `<li><i class="fas fa-check-circle text-success me-2"></i>${f}</li>`).join("")
        : '';

    const contentEl = modalEl.querySelector(".modal-content");
    contentEl.innerHTML = `
        <div class="modal-header">
            <div>
                <span class="badge bg-primary text-uppercase mb-1">${product.category.replace("-", " ")}</span>
                <h4 class="modal-title mb-0">${product.name}</h4>
                <small class="text-muted">Brand: <strong>${product.brand}</strong></small>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row align-items-center">
                <div class="col-md-6 text-center mb-3 mb-md-0">
                    <div class="p-3 bg-light rounded-3 border">
                        <img src="${product.image}" alt="${product.name}" class="img-fluid rounded-3" style="max-height: 280px; object-fit: contain;">
                    </div>
                    <div class="mt-2 text-center">
                        <small class="text-muted"><i class="fas fa-shield-alt text-teal me-1"></i>100% Genuine Branded Optical Product</small>
                    </div>
                </div>
                <div class="col-md-6">
                    <p class="text-muted mb-3">${product.description}</p>
                    
                    <div class="row g-2 mb-3 small">
                        <div class="col-6"><strong>Shape:</strong> ${product.shape}</div>
                        <div class="col-6"><strong>Material:</strong> ${product.material}</div>
                        <div class="col-6"><strong>Gender:</strong> ${product.gender}</div>
                        <div class="col-6"><strong>Frame Size:</strong> ${product.size || 'Medium'}</div>
                    </div>

                    <div class="mb-3">
                        <label class="small fw-bold text-muted d-block mb-1">Available Colors / Variants:</label>
                        <div>${colorsList}</div>
                    </div>

                    ${featuresList ? `
                    <div class="mb-3">
                        <label class="small fw-bold text-muted d-block mb-1">Key Features:</label>
                        <ul class="list-unstyled small mb-0">${featuresList}</ul>
                    </div>` : ''}

                    <div class="p-3 bg-light rounded-2 border mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-muted small">Estimated Price Range:</span>
                            <span class="h5 fw-bold text-primary mb-0">${product.priceRange}</span>
                        </div>
                        <small class="text-muted d-block mt-1" style="font-size: 0.72rem;">*Final price depends on prescription power and lens coating selection.</small>
                    </div>

                    <div class="d-grid gap-2">
                        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-success btn-lg">
                            <i class="fab fa-whatsapp me-2"></i>Enquire on WhatsApp
                        </a>
                        <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#appointmentModal" data-bs-dismiss="modal">
                            <i class="fas fa-calendar-check me-2"></i>Book Free Eye Test & Trial
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer bg-light justify-content-between">
            <span class="small text-muted"><i class="fas fa-store me-1"></i>Available for trial at both Miraj branches (Kisan Chowk & Shivaji Maharaj Chowk)</span>
            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    `;

    const bsModal = new bootstrap.Modal(modalEl);
    bsModal.show();
}

window.openProductQuickView = openProductQuickView;
