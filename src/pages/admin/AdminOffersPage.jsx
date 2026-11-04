import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Tag,
  Save,
  CheckCircle,
  Eye,
  AlertCircle,
  RefreshCw,
  ExternalLink
} from "lucide-react";
import { getFestivalOffers, updateFestivalOffer } from "../../services/offerService";

const AdminOffersPage = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState(null);
  const [message, setMessage] = useState(null);

  const loadOffers = async () => {
    setLoading(true);
    try {
      const data = await getFestivalOffers(true);
      setOffers(data || []);
    } catch (err) {
      console.error("Failed to fetch festival offers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleFieldChange = (id, field, value) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, [field]: value } : o))
    );
  };

  const handleSaveOffer = async (offer) => {
    setSavingId(offer.id);
    setMessage(null);
    try {
      await updateFestivalOffer(offer.id, {
        title: offer.title.trim(),
        pricing: offer.pricing.trim(),
        originalPrice: (offer.originalPrice || "").trim(),
        tag: (offer.tag || "").trim(),
        description: (offer.description || "").trim(),
        image: (offer.image || "").trim(),
        isActive: offer.isActive !== false
      });
      setMessage({ type: "success", text: `Offer "${offer.title}" updated successfully!` });
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage({ type: "danger", text: err.message || "Failed to update offer." });
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <Tag size={20} className="text-warning" />
            <h2 className="h4 fw-bold text-dark mb-0">Diwali & Dussehra Festival Offers</h2>
          </div>
          <p className="text-muted small mb-0">
            Manage promotional pricing, festive highlights, banner images, and live visibility
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={loadOffers}
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 rounded-3"
            title="Reload offers"
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? "spin" : ""} />
            <span>Refresh</span>
          </button>
          <Link
            to="/offers"
            target="_blank"
            className="btn btn-sm btn-outline-primary rounded-3 d-flex align-items-center gap-1"
          >
            <ExternalLink size={14} />
            <span>View Public Offers Page</span>
          </Link>
        </div>
      </div>

      {message && (
        <div
          className={`alert alert-${message.type} alert-dismissible fade show small py-2 px-3 mb-4 rounded-3`}
          role="alert"
        >
          {message.text}
          <button
            type="button"
            className="btn-close py-2"
            onClick={() => setMessage(null)}
          ></button>
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-2" role="status"></div>
          <p className="text-muted small">Loading festival promotional deals...</p>
        </div>
      ) : (
        <div className="row g-4">
          {offers.map((offer, idx) => (
            <div key={offer.id} className="col-12 col-xl-4">
              <div className="card border-0 shadow-sm rounded-4 bg-white h-100 d-flex flex-column">
                {/* Offer Image Header */}
                <div className="position-relative bg-light rounded-top-4 overflow-hidden" style={{ height: "180px" }}>
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-100 h-100 object-fit-cover"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  <span className="position-absolute top-0 start-0 m-2 badge bg-warning text-dark fw-bold">
                    Offer #{idx + 1}
                  </span>
                  <span
                    className={`position-absolute top-0 end-0 m-2 badge ${
                      offer.isActive !== false ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {offer.isActive !== false ? "Live on Site" : "Hidden"}
                  </span>
                </div>

                <div className="card-body p-4 d-flex flex-column flex-grow-1">
                  {/* Title */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">
                      Offer Title
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm fw-bold"
                      value={offer.title}
                      onChange={(e) => handleFieldChange(offer.id, "title", e.target.value)}
                    />
                  </div>

                  {/* Pricing & Tag */}
                  <div className="row g-2 mb-3">
                    <div className="col-6">
                      <label className="form-label small fw-bold text-secondary">
                        Offer Price / Deal
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm text-primary fw-bold"
                        value={offer.pricing}
                        onChange={(e) => handleFieldChange(offer.id, "pricing", e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <label className="form-label small fw-bold text-secondary">
                        Original Price
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-sm text-muted"
                        value={offer.originalPrice || ""}
                        onChange={(e) => handleFieldChange(offer.id, "originalPrice", e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Promotional Badge / Tag */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">
                      Festival Tag / Badge
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={offer.tag || ""}
                      onChange={(e) => handleFieldChange(offer.id, "tag", e.target.value)}
                    />
                  </div>

                  {/* Image URL */}
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">
                      Banner Image URL
                    </label>
                    <input
                      type="url"
                      className="form-control form-control-sm"
                      value={offer.image || ""}
                      onChange={(e) => handleFieldChange(offer.id, "image", e.target.value)}
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3 flex-grow-1">
                    <label className="form-label small fw-bold text-secondary">
                      Offer Details & Conditions
                    </label>
                    <textarea
                      rows="3"
                      className="form-control form-control-sm"
                      value={offer.description || ""}
                      onChange={(e) => handleFieldChange(offer.id, "description", e.target.value)}
                    ></textarea>
                  </div>

                  {/* Visibility Switch */}
                  <div className="form-check form-switch mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`offer-switch-${offer.id}`}
                      checked={offer.isActive !== false}
                      onChange={(e) => handleFieldChange(offer.id, "isActive", e.target.checked)}
                    />
                    <label className="form-check-label small fw-bold text-dark" htmlFor={`offer-switch-${offer.id}`}>
                      {offer.isActive !== false ? "Offer Active on Store" : "Offer Deactivated"}
                    </label>
                  </div>

                  {/* Save button */}
                  <button
                    type="button"
                    onClick={() => handleSaveOffer(offer)}
                    className="btn btn-primary w-100 rounded-3 d-flex align-items-center justify-content-center gap-1 py-2 fw-semibold"
                    style={{ backgroundColor: "#0d3b66", borderColor: "#0d3b66" }}
                    disabled={savingId === offer.id}
                  >
                    {savingId === offer.id ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status"></span>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save size={16} />
                        <span>Save Offer Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOffersPage;
