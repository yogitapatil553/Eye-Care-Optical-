import React from "react";
import {
  X,
  MessageCircle,
  MapPin,
  Check,
  ShieldCheck,
  Glasses
} from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  const handleWhatsApp = () => {
    const cleanPhone = DEFAULT_STORE_SETTINGS.whatsapp.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `Hello Eye Care Optical, I would like to try "${product.name}" (${product.sellingPrice}) at your Miraj branch. Can you confirm availability?`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1060 }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          {/* Modal Header */}
          <div className="modal-header border-0 pb-0 position-relative">
            <button
              type="button"
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={onClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4 pt-0">
            <div className="row g-4">
              {/* Product Image */}
              <div className="col-12 col-md-5">
                <div className="rounded-4 overflow-hidden border bg-light text-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-100 object-fit-cover"
                    style={{ maxHeight: "320px" }}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                </div>
                {product.offerLabel && (
                  <div className="mt-2 text-center">
                    <span className="badge bg-danger text-white rounded-pill px-3 py-1">
                      {product.offerLabel}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="col-12 col-md-7">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="badge bg-primary bg-opacity-10 text-primary text-capitalize">
                    {product.category?.replace("-", " ")}
                  </span>
                  <span className="text-muted small fw-semibold">
                    {product.brand || "Eye Care Optical"}
                  </span>
                </div>

                <h3 className="h4 fw-bold text-dark mb-2">{product.name}</h3>

                {/* Price */}
                <div className="d-flex align-items-baseline gap-2 mb-3">
                  <span className="fw-bold fs-4 text-primary">
                    {product.sellingPrice}
                  </span>
                  {product.originalPrice && (
                    <span className="text-muted small text-decoration-line-through">
                      MRP {product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Specifications Grid */}
                <div className="row g-2 mb-3 p-3 bg-light rounded-3 small">
                  {product.shape && (
                    <div className="col-6">
                      <span className="text-muted">Shape:</span>{" "}
                      <strong className="text-dark">{product.shape}</strong>
                    </div>
                  )}
                  {product.material && (
                    <div className="col-6">
                      <span className="text-muted">Material:</span>{" "}
                      <strong className="text-dark">{product.material}</strong>
                    </div>
                  )}
                  {product.size && (
                    <div className="col-6">
                      <span className="text-muted">Size:</span>{" "}
                      <strong className="text-dark">{product.size}</strong>
                    </div>
                  )}
                  {product.gender && (
                    <div className="col-6">
                      <span className="text-muted">Gender:</span>{" "}
                      <strong className="text-dark">{product.gender}</strong>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted small mb-3">
                  {product.description || product.shortDescription}
                </p>

                {/* Features List */}
                {product.features && product.features.length > 0 && (
                  <div className="mb-3">
                    <h6 className="fw-bold small text-dark mb-2">Key Highlights:</h6>
                    <ul className="list-unstyled d-flex flex-column gap-1 small text-muted mb-0">
                      {product.features.map((feat, i) => (
                        <li key={i} className="d-flex align-items-start gap-2">
                          <Check size={14} className="text-success mt-1 flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Miraj Branch Notice */}
                <div className="p-2 mb-3 rounded-2 bg-info bg-opacity-10 border border-info border-opacity-25 small text-dark d-flex align-items-start gap-2">
                  <MapPin size={16} className="text-info mt-1 flex-shrink-0" />
                  <div>
                    Available for trial and prescription fitting at both our Miraj branches (Kisan Chowk & Shivaji Maharaj Chowk).
                  </div>
                </div>

                {/* Action Button */}
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="btn btn-success w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2 shadow-sm"
                >
                  <MessageCircle size={18} />
                  <span>Enquire Availability on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
