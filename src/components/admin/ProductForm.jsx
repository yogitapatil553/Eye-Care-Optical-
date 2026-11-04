import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Upload,
  Image as ImageIcon,
  Check,
  AlertCircle,
  Eye,
  ArrowLeft,
  Save,
  Tag,
  Glasses
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "../../data/initialData";
import { uploadProductImage, validateImageFile } from "../../services/storageService";

const ProductForm = ({ initialData, onSubmit, isEditing = false, submitting = false }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    category: initialData?.category || "eyeglasses",
    brand: initialData?.brand || "Eye Care Optical",
    shape: initialData?.shape || "Rectangle",
    material: initialData?.material || "Acetate",
    gender: initialData?.gender || "Unisex",
    size: initialData?.size || "Medium (52mm)",
    colors: Array.isArray(initialData?.colors)
      ? initialData.colors.join(", ")
      : initialData?.colors || "Black, Brown, Gold",
    sellingPrice: initialData?.sellingPrice || "",
    originalPrice: initialData?.originalPrice || "",
    offerLabel: initialData?.offerLabel || "",
    shortDescription: initialData?.shortDescription || "",
    description: initialData?.description || "",
    features: Array.isArray(initialData?.features)
      ? initialData.features.join("\n")
      : initialData?.features || "Lightweight & comfortable\nUV400 protection\nDurable hinges",
    image: initialData?.image || "",
    galleryImages: initialData?.galleryImages || [],
    isActive: initialData?.isActive !== false
  });

  const [imageUploadMode, setImageUploadMode] = useState("url"); // 'url' or 'file'
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    // Clear error
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError("");
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setUploadError(validation.error);
      return;
    }

    setUploadingImage(true);
    try {
      const url = await uploadProductImage(file, "products");
      setFormData((prev) => ({ ...prev, image: url }));
      if (validationErrors.image) {
        setValidationErrors((prev) => ({ ...prev, image: "" }));
      }
    } catch (err) {
      setUploadError(err.message || "Failed to upload image.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!formData.name.trim()) errors.name = "Product name is required.";
    if (!formData.category.trim()) errors.category = "Category is required.";
    if (!formData.sellingPrice.trim()) errors.sellingPrice = "Display/Selling price is required.";
    if (!formData.image.trim()) errors.image = "A product image is required.";

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-4">
        {/* Left Column: Form Fields */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
            <h5 className="fw-bold text-dark mb-3">Basic Information</h5>

            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">
                Product Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                className={`form-control ${validationErrors.name ? "is-invalid" : ""}`}
                placeholder="e.g. Ray-Ban Classic Wayfarer Optics"
                value={formData.name}
                onChange={handleChange}
              />
              {validationErrors.name && (
                <div className="invalid-feedback">{validationErrors.name}</div>
              )}
            </div>

            <div className="row g-3 mb-3">
              {/* Category */}
              <div className="col-12 col-sm-6">
                <label className="form-label small fw-bold text-secondary">
                  Category <span className="text-danger">*</span>
                </label>
                <select
                  name="category"
                  className="form-select text-capitalize"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div className="col-12 col-sm-6">
                <label className="form-label small fw-bold text-secondary">
                  Brand Name
                </label>
                <input
                  type="text"
                  name="brand"
                  className="form-control"
                  placeholder="e.g. Ray-Ban, Fastrack, Vogue, Essilor"
                  value={formData.brand}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              {/* Frame Shape */}
              <div className="col-12 col-sm-4">
                <label className="form-label small fw-bold text-secondary">
                  Frame Shape / Type
                </label>
                <input
                  type="text"
                  name="shape"
                  className="form-control"
                  placeholder="e.g. Wayfarer, Round, Aviator, Cat-Eye"
                  value={formData.shape}
                  onChange={handleChange}
                />
              </div>

              {/* Frame Material */}
              <div className="col-12 col-sm-4">
                <label className="form-label small fw-bold text-secondary">
                  Frame Material
                </label>
                <input
                  type="text"
                  name="material"
                  className="form-control"
                  placeholder="e.g. Italian Acetate, Titanium, Metal"
                  value={formData.material}
                  onChange={handleChange}
                />
              </div>

              {/* Gender / Target */}
              <div className="col-12 col-sm-4">
                <label className="form-label small fw-bold text-secondary">
                  Target Gender
                </label>
                <select
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Unisex">Unisex</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
            </div>

            <div className="row g-3 mb-3">
              {/* Frame Size */}
              <div className="col-12 col-sm-6">
                <label className="form-label small fw-bold text-secondary">
                  Frame Size
                </label>
                <input
                  type="text"
                  name="size"
                  className="form-control"
                  placeholder="e.g. Medium (52mm), Narrow, Wide"
                  value={formData.size}
                  onChange={handleChange}
                />
              </div>

              {/* Available Colors */}
              <div className="col-12 col-sm-6">
                <label className="form-label small fw-bold text-secondary">
                  Available Colors (comma separated)
                </label>
                <input
                  type="text"
                  name="colors"
                  className="form-control"
                  placeholder="e.g. Glossy Black, Tortoise, Matte Gold"
                  value={formData.colors}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">
                Short Description (Cards view)
              </label>
              <input
                type="text"
                name="shortDescription"
                className="form-control"
                placeholder="Brief summary for quick preview on cards..."
                value={formData.shortDescription}
                onChange={handleChange}
              />
            </div>

            {/* Full Description */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-secondary">
                Detailed Product Description
              </label>
              <textarea
                name="description"
                rows="4"
                className="form-control"
                placeholder="Detailed specifications, comfort notes, recommended lens pairings..."
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Key Features */}
            <div className="mb-0">
              <label className="form-label small fw-bold text-secondary">
                Key Features (one per line)
              </label>
              <textarea
                name="features"
                rows="3"
                className="form-control"
                placeholder="Ultra-lightweight TR90&#10;Anti-reflective coating compatible&#10;Spring hinges"
                value={formData.features}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Pricing & Offer Label Card */}
          <div className="card border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
            <h5 className="fw-bold text-dark mb-3">Pricing & Promotions</h5>

            <div className="row g-3">
              {/* Selling Price */}
              <div className="col-12 col-sm-4">
                <label className="form-label small fw-bold text-secondary">
                  Selling Price <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="sellingPrice"
                  className={`form-control ${validationErrors.sellingPrice ? "is-invalid" : ""}`}
                  placeholder="e.g. ₹1,499"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                />
                {validationErrors.sellingPrice && (
                  <div className="invalid-feedback">{validationErrors.sellingPrice}</div>
                )}
                <small className="text-muted" style={{ fontSize: "0.72rem" }}>
                  Exact display price (do not invent discounts).
                </small>
              </div>

              {/* Original Price */}
              <div className="col-12 col-sm-4">
                <label className="form-label small fw-bold text-secondary">
                  Original / MRP Price (optional)
                </label>
                <input
                  type="text"
                  name="originalPrice"
                  className="form-control"
                  placeholder="e.g. ₹2,499"
                  value={formData.originalPrice}
                  onChange={handleChange}
                />
                <small className="text-muted" style={{ fontSize: "0.72rem" }}>
                  Crossed-out reference price if applicable.
                </small>
              </div>

              {/* Offer Label */}
              <div className="col-12 col-sm-4">
                <label className="form-label small fw-bold text-secondary">
                  Offer Badge (optional)
                </label>
                <input
                  type="text"
                  name="offerLabel"
                  className="form-control"
                  placeholder="e.g. Diwali Offer, Best Seller"
                  value={formData.offerLabel}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Product Image Card */}
          <div className="card border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
            <h5 className="fw-bold text-dark mb-2">Product Image</h5>
            <p className="text-muted small mb-3">
              Upload a clear photo of the optical frame or paste an image URL. Max 5MB (JPEG, PNG, WebP).
            </p>

            {uploadError && (
              <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
                <AlertCircle size={16} className="me-1" />
                {uploadError}
              </div>
            )}

            {/* Image Mode Tabs */}
            <div className="btn-group btn-group-sm mb-3">
              <button
                type="button"
                className={`btn ${imageUploadMode === "url" ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setImageUploadMode("url")}
              >
                Image URL
              </button>
              <button
                type="button"
                className={`btn ${imageUploadMode === "file" ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setImageUploadMode("file")}
              >
                File Upload
              </button>
            </div>

            {imageUploadMode === "url" ? (
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">
                  Image Direct URL <span className="text-danger">*</span>
                </label>
                <input
                  type="url"
                  name="image"
                  className={`form-control ${validationErrors.image ? "is-invalid" : ""}`}
                  placeholder="https://images.unsplash.com/... or cloud URL"
                  value={formData.image}
                  onChange={handleChange}
                />
                {validationErrors.image && (
                  <div className="invalid-feedback">{validationErrors.image}</div>
                )}
              </div>
            ) : (
              <div className="mb-3">
                <label className="form-label small fw-bold text-secondary">
                  Select Image File (Max 5MB)
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="form-control"
                  onChange={handleFileChange}
                  disabled={uploadingImage}
                />
                {uploadingImage && (
                  <div className="mt-2 text-primary small d-flex align-items-center gap-1">
                    <span className="spinner-border spinner-border-sm" role="status"></span>
                    <span>Processing image...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Visibility / Status Card */}
          <div className="card border-0 shadow-sm rounded-4 bg-white p-4 mb-4">
            <h5 className="fw-bold text-dark mb-2">Publishing Status</h5>
            <div className="form-check form-switch fs-5">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="isActiveSwitch"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
              />
              <label className="form-check-label fs-6 fw-bold text-dark ms-2" htmlFor="isActiveSwitch">
                {formData.isActive ? "Active (Visible on Website)" : "Inactive (Hidden Draft)"}
              </label>
            </div>
            <small className="text-muted d-block mt-1">
              When inactive, this product is immediately hidden from public visitors while remaining editable in your admin catalog.
            </small>
          </div>

          {/* Submit Actions */}
          <div className="d-flex align-items-center gap-3">
            <button
              type="submit"
              className="btn btn-primary fw-bold px-4 py-2 rounded-3 d-flex align-items-center gap-2 shadow-sm"
              style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
              disabled={submitting || uploadingImage}
            >
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm" role="status"></span>
                  <span>Saving Product...</span>
                </>
              ) : (
                <>
                  <Save size={18} />
                  <span>{isEditing ? "Update Product" : "Save Product to Catalog"}</span>
                </>
              )}
            </button>
            <Link to="/admin/products" className="btn btn-outline-secondary rounded-3 px-3">
              Cancel
            </Link>
          </div>
        </div>

        {/* Right Column: Live Card Preview */}
        <div className="col-12 col-lg-4">
          <div className="sticky-top" style={{ top: "90px" }}>
            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 mb-3">
              <div className="d-flex align-items-center gap-2 mb-2 text-primary fw-bold small text-uppercase">
                <Eye size={16} />
                <span>Live Card Preview</span>
              </div>
              <p className="text-muted small mb-3">
                This is how the product will appear to customers on your public website.
              </p>

              {/* Mock Product Card */}
              <div className="card border shadow-sm rounded-3 overflow-hidden">
                <div className="position-relative bg-light text-center" style={{ minHeight: "200px" }}>
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt={formData.name || "Preview"}
                      className="w-100 object-fit-cover"
                      style={{ height: "200px" }}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                  ) : (
                    <div className="d-flex flex-column align-items-center justify-content-center h-100 py-5 text-muted">
                      <Glasses size={48} className="opacity-25 mb-2" />
                      <span className="small">No Image Provided</span>
                    </div>
                  )}

                  {formData.offerLabel && (
                    <span className="position-absolute top-0 start-0 m-2 badge bg-danger text-white">
                      {formData.offerLabel}
                    </span>
                  )}

                  <span className="position-absolute top-0 end-0 m-2 badge bg-dark bg-opacity-75 text-capitalize text-white">
                    {formData.category}
                  </span>
                </div>

                <div className="card-body p-3">
                  <div className="small text-muted mb-1 text-uppercase fw-semibold" style={{ fontSize: "0.72rem" }}>
                    {formData.brand || "Eye Care Optical"} • {formData.shape}
                  </div>
                  <h6 className="fw-bold text-dark mb-1 text-truncate">
                    {formData.name || "Product Name"}
                  </h6>
                  <p className="text-muted small mb-2 text-truncate">
                    {formData.shortDescription || "Short product description will appear here."}
                  </p>

                  <div className="d-flex align-items-baseline gap-2 mb-3">
                    <span className="fw-bold fs-5 text-primary">
                      {formData.sellingPrice || "₹—"}
                    </span>
                    {formData.originalPrice && (
                      <span className="text-muted small text-decoration-line-through">
                        {formData.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success w-100 rounded-pill d-flex align-items-center justify-content-center gap-1"
                    disabled
                  >
                    <span>💬 WhatsApp Enquiry</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
