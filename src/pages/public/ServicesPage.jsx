import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, CalendarCheck, Phone, Wrench, Eye, Shield } from "lucide-react";
import { SERVICES_LIST, DEFAULT_STORE_SETTINGS } from "../../data/initialData";

const ServicesPage = ({ onOpenAppointment }) => {
  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Banner */}
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill mb-2">
            PROFESSIONAL EYE CARE
          </span>
          <h1 className="h2 fw-bold text-dark mb-3">Our Optical & Eye Care Services</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "680px", fontSize: "1.05rem" }}>
            Comprehensive vision care by qualified optometrists. From computerized refractive error testing
            to custom progressive lens fitting and precision frame repairs in Miraj.
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4 mb-5">
          {SERVICES_LIST.map((srv) => (
            <div key={srv.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white d-flex flex-column">
                <div
                  className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                  style={{ width: "50px", height: "50px", backgroundColor: "#eef5fc", color: "#0d3b66" }}
                >
                  <Eye size={26} />
                </div>
                <h3 className="h5 fw-bold text-dark mb-2">{srv.title}</h3>
                <p className="text-muted small mb-3 flex-grow-1">{srv.description}</p>
                <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                  <span className="badge bg-success bg-opacity-10 text-success small">
                    ✓ Available at both branches
                  </span>
                  <button
                    onClick={onOpenAppointment}
                    className="btn btn-sm btn-link text-decoration-none p-0 fw-semibold text-primary"
                  >
                    Book Slot →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div
          className="rounded-4 p-4 p-md-5 text-white text-center shadow-sm"
          style={{ background: "linear-gradient(135deg, #0d3b66, #00a896)" }}
        >
          <h3 className="fw-bold mb-2">Need an Instant Eye Checkup or Spectacle Adjustment?</h3>
          <p className="text-light text-opacity-90 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
            Walk into our Kisan Chowk or Dasara Chowk showroom in Miraj today or schedule your free consultation slot online.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <button
              onClick={onOpenAppointment}
              className="btn btn-light rounded-pill px-4 py-2 fw-bold text-dark"
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
      </div>
    </div>
  );
};

export default ServicesPage;
