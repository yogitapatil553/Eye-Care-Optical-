import React from "react";
import { Link } from "react-router-dom";
import { Award, Glasses, ArrowRight } from "lucide-react";
import { EYEWEAR_BRANDS } from "../../data/initialData";

const BrandsPage = () => {
  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Banner */}
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill mb-2">
            100% GENUINE AUTHENTICITY
          </span>
          <h1 className="h2 fw-bold text-dark mb-3">Premium Eyewear & Lens Brands</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "680px", fontSize: "1.05rem" }}>
            We are authorized dealers for leading national and international eyewear, sunglass,
            and ophthalmic lens manufacturers in Miraj.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="row g-4 mb-5">
          {EYEWEAR_BRANDS.map((b) => (
            <div key={b.id} className="col-12 col-md-6 col-lg-3">
              <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white text-center d-flex flex-column">
                <div
                  className="rounded-3 p-3 bg-light d-flex align-items-center justify-content-center mb-3 mx-auto"
                  style={{ width: "90px", height: "90px" }}
                >
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-h-100 max-w-100 object-fit-contain"
                    style={{ maxHeight: "60px", maxWidth: "80px" }}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  <Glasses size={32} className="text-muted opacity-50" />
                </div>
                <h3 className="h6 fw-bold text-dark mb-1">{b.name}</h3>
                <span className="badge bg-light text-primary border mx-auto mb-2 text-capitalize small">
                  {b.tier} Collection
                </span>
                <p className="text-muted small mb-3 flex-grow-1">{b.description}</p>
                <Link
                  to={`/products?brand=${encodeURIComponent(b.name)}`}
                  className="btn btn-outline-primary btn-sm rounded-pill mt-auto"
                >
                  View Collection
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsPage;
