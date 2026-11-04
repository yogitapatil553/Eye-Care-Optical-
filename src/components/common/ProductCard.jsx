import React from "react";
import { MessageCircle, Eye, Tag, Glasses } from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";

const ProductCard = ({ product, onSelect }) => {
  if (!product) return null;

  const handleWhatsAppEnquiry = (e) => {
    e.stopPropagation();
    const cleanPhone = DEFAULT_STORE_SETTINGS.whatsapp.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello Eye Care Optical, I am interested in "${product.name}" (${product.sellingPrice}). Is this frame available at your Miraj store?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card bg-white position-relative transition-all">
      {/* Top Image & Badges */}
      <div
        className="position-relative bg-light overflow-hidden text-center cursor-pointer"
        style={{ height: "230px" }}
        onClick={() => onSelect && onSelect(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-100 h-100 object-fit-cover transition-transform"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80";
          }}
        />

        {/* Offer badge */}
        {product.offerLabel && (
          <span className="position-absolute top-0 start-0 m-3 badge bg-danger text-white rounded-pill px-3 py-1 shadow-sm">
            {product.offerLabel}
          </span>
        )}

        {/* Category tag */}
        <span className="position-absolute top-0 end-0 m-3 badge bg-dark bg-opacity-75 text-white rounded-pill px-2 py-1 text-capitalize">
          {product.category?.replace("-", " ")}
        </span>

        {/* Quick View overlay */}
        <div className="product-quick-overlay position-absolute bottom-0 start-0 w-100 p-2 d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-sm btn-light bg-white text-dark shadow-sm rounded-pill px-3 d-flex align-items-center gap-1"
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect(product);
            }}
          >
            <Eye size={14} />
            <span>Quick Specs</span>
          </button>
        </div>
      </div>

      {/* Body Details */}
      <div className="card-body p-3 d-flex flex-column">
        {/* Brand & Shape */}
        <div className="d-flex justify-content-between align-items-center mb-1 text-muted small" style={{ fontSize: "0.75rem" }}>
          <span className="fw-semibold text-uppercase text-secondary">
            {product.brand || "Eye Care Optical"}
          </span>
          {product.shape && (
            <span className="badge bg-light text-secondary border">
              {product.shape}
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3
          className="h6 fw-bold text-dark mb-1 text-truncate cursor-pointer hover-primary"
          onClick={() => onSelect && onSelect(product)}
          title={product.name}
        >
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-muted small mb-3 flex-grow-1 line-clamp-2" style={{ fontSize: "0.82rem" }}>
          {product.shortDescription || product.description || "Premium eyewear optical frame."}
        </p>

        {/* Price Row */}
        <div className="d-flex align-items-baseline gap-2 mb-3">
          <span className="fw-bold fs-5 text-primary" style={{ color: "#0d3b66" }}>
            {product.sellingPrice}
          </span>
          {product.originalPrice && (
            <span className="text-muted small text-decoration-line-through">
              {product.originalPrice}
            </span>
          )}
        </div>

        {/* WhatsApp Enquiry Button */}
        <button
          type="button"
          onClick={handleWhatsAppEnquiry}
          className="btn btn-outline-success w-100 rounded-pill d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold small"
        >
          <MessageCircle size={16} />
          <span>WhatsApp Enquiry</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
