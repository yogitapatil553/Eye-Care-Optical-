import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Tag,
  MessageCircle,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  CheckCircle,
  Flame
} from "lucide-react";
import { getFestivalOffers } from "../../services/offerService";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";

const OffersPage = ({ onOpenAppointment }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getFestivalOffers(false); // active only
        setOffers(data || []);
      } catch (err) {
        console.error("Failed to load offers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Page Banner */}
        <div
          className="rounded-4 p-4 p-md-5 text-white mb-5 text-center position-relative overflow-hidden shadow-sm"
          style={{
            background: "linear-gradient(135deg, #07203a 0%, #0d3b66 50%, #e76f51 100%)"
          }}
        >
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-white bg-opacity-15 text-warning small fw-bold mb-3">
            <Flame size={16} />
            <span>SPECIAL FESTIVE PROMOTIONS</span>
          </div>
          <h1 className="display-5 fw-bold mb-3">Diwali & Dussehra Festive Offers</h1>
          <p className="lead text-light text-opacity-90 mx-auto mb-4" style={{ maxWidth: "650px" }}>
            Celebrate the festive season with crystal-clear vision! Avail exclusive festival deals across our
            two Miraj showroom branches.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <button
              onClick={onOpenAppointment}
              className="btn btn-warning rounded-pill px-4 py-2 fw-bold text-dark shadow-sm"
            >
              Book Free Eye Test
            </button>
            <a
              href={`tel:${DEFAULT_STORE_SETTINGS.phone.replace(/\s+/g, "")}`}
              className="btn btn-outline-light rounded-pill px-4 py-2"
            >
              Call {DEFAULT_STORE_SETTINGS.phone}
            </a>
          </div>
        </div>

        {/* Offers Cards */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-muted small mt-2">Loading festival deals...</p>
          </div>
        ) : (
          <div className="row g-4 mb-5">
            {offers.map((offer) => (
              <div key={offer.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white d-flex flex-column">
                  {/* Image */}
                  <div className="position-relative bg-light" style={{ height: "220px" }}>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    {offer.tag && (
                      <span className="position-absolute top-0 end-0 m-3 badge bg-danger text-white rounded-pill px-3 py-1">
                        {offer.tag}
                      </span>
                    )}
                  </div>

                  <div className="card-body p-4 d-flex flex-column flex-grow-1">
                    <h3 className="h5 fw-bold text-dark mb-2">{offer.title}</h3>
                    <p className="text-muted small mb-3 flex-grow-1">{offer.description}</p>

                    <div className="d-flex align-items-baseline gap-2 mb-4">
                      <span className="fs-3 fw-bold text-primary" style={{ color: "#0d3b66" }}>
                        {offer.pricing}
                      </span>
                      {offer.originalPrice && (
                        <span className="text-muted small text-decoration-line-through">
                          {offer.originalPrice}
                        </span>
                      )}
                    </div>

                    <a
                      href={`https://wa.me/${DEFAULT_STORE_SETTINGS.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                        `Hello Eye Care Optical, I want to inquire about the Festival Offer: "${offer.title}" (${offer.pricing}) at your Miraj branch.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-success w-100 rounded-pill py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
                    >
                      <MessageCircle size={18} />
                      <span>Enquire on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Location Notice */}
        <div className="card border-0 shadow-sm rounded-4 bg-white p-4">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-md-8">
              <h4 className="fw-bold text-dark mb-2">Visit Our Miraj Showrooms to Avail Offers</h4>
              <p className="text-muted small mb-3">
                Offers valid while stock lasts. Frames and lenses fitted by certified optometrists.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 small text-secondary">
                <div>
                  <strong>Branch 1:</strong> {DEFAULT_STORE_SETTINGS.branch1}
                </div>
                <div>
                  <strong>Branch 2:</strong> {DEFAULT_STORE_SETTINGS.branch2}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 text-md-end">
              <button
                onClick={onOpenAppointment}
                className="btn btn-primary rounded-pill px-4 py-2 fw-bold text-white shadow-sm"
                style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
              >
                Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;
