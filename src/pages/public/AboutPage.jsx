import React from "react";
import { Link } from "react-router-dom";
import {
  Glasses,
  CheckCircle,
  Eye,
  Award,
  Heart,
  Users,
  MapPin,
  CalendarCheck
} from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";

const AboutPage = ({ onOpenAppointment }) => {
  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Banner */}
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill mb-2">
            ABOUT EYE CARE OPTICAL
          </span>
          <h1 className="h2 fw-bold text-dark mb-3">Your Vision, Our Priority in Miraj</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "700px", fontSize: "1.05rem" }}>
            For years, Eye Care Optical has been the most trusted optical destination in Miraj,
            delivering precision vision care, branded eyewear, and friendly spectacle consultations.
          </p>
        </div>

        {/* Story & Vision */}
        <div className="row g-5 align-items-center mb-5">
          <div className="col-12 col-lg-6">
            <h2 className="h4 fw-bold text-dark mb-3">Dedicated to Better Vision Care</h2>
            <p className="text-muted small lh-lg mb-3">
              Established with the mission to bring world-class eye checkups and high-quality optical eyewear to Miraj,
              Eye Care Optical operates two modern showrooms located at <strong>Laxmi Market, Kisan Chowk</strong> and
              <strong> Chhatrapati Shivaji Maharaj Chowk, Dasara Chowk</strong>.
            </p>
            <p className="text-muted small lh-lg mb-4">
              We combine cutting-edge computerized eye testing equipment with an extensive range of spectacle frames,
              sunglasses, contact lenses, and certified digital progressive lenses from global leaders like Essilor,
              Zeiss, Ray-Ban, and Titan.
            </p>

            <div className="row g-3 mb-4">
              <div className="col-6">
                <div className="p-3 bg-white rounded-3 shadow-sm border">
                  <h4 className="h5 fw-bold text-primary mb-1">100%</h4>
                  <small className="text-muted">Authentic Eyewear Brands</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-white rounded-3 shadow-sm border">
                  <h4 className="h5 fw-bold text-success mb-1">15,000+</h4>
                  <small className="text-muted">Satisfied Patients & Customers</small>
                </div>
              </div>
            </div>

            <button
              onClick={onOpenAppointment}
              className="btn btn-primary rounded-pill px-4 py-2 fw-bold text-white shadow-sm"
              style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
            >
              Book an Appointment
            </button>
          </div>

          <div className="col-12 col-lg-6">
            <div className="rounded-4 overflow-hidden shadow-lg border">
              <img
                src="https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80"
                alt="Eye Care Optical Miraj Showroom"
                className="w-100 object-fit-cover"
                style={{ maxHeight: "420px" }}
              />
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3 mx-auto"
                style={{ width: "54px", height: "54px", backgroundColor: "#eef5fc", color: "#0d3b66" }}
              >
                <Eye size={28} />
              </div>
              <h3 className="h5 fw-bold text-dark mb-2">Accurate Vision Testing</h3>
              <p className="text-muted small mb-0">
                Advanced computerized autorefractometer testing and customized trial lens verification for crystal-clear vision.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3 mx-auto"
                style={{ width: "54px", height: "54px", backgroundColor: "#e6f7f5", color: "#00a896" }}
              >
                <Award size={28} />
              </div>
              <h3 className="h5 fw-bold text-dark mb-2">Quality Guarantee</h3>
              <p className="text-muted small mb-0">
                Only durable frames with flexible spring hinges and authentic scratch-resistant anti-glare lens coatings.
              </p>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white text-center">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3 mx-auto"
                style={{ width: "54px", height: "54px", backgroundColor: "#fdf0ed", color: "#e76f51" }}
              >
                <Heart size={28} />
              </div>
              <h3 className="h5 fw-bold text-dark mb-2">Customer Care</h3>
              <p className="text-muted small mb-0">
                Complimentary frame alignments, screw adjustments, ultrasonic lens cleanings, and genuine post-purchase support.
              </p>
            </div>
          </div>
        </div>

        {/* Branches in Miraj */}
        <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5">
          <div className="text-center mb-4">
            <h3 className="fw-bold text-dark mb-2">Our Optical Showrooms in Miraj</h3>
            <p className="text-muted small">Conveniently accessible from all major landmarks in Miraj</p>
          </div>
          <div className="row g-4">
            <div className="col-12 col-md-6">
              <div className="p-4 rounded-3 border bg-light h-100">
                <span className="badge bg-primary text-white mb-2">1st Branch</span>
                <h4 className="h5 fw-bold text-dark mb-2">Kisan Chowk Branch</h4>
                <p className="text-muted small mb-3">{DEFAULT_STORE_SETTINGS.branch1}</p>
                <div className="small text-secondary mb-1">🕒 Open: 10:00 AM - 09:30 PM (7 Days)</div>
                <div className="small text-secondary">📞 Contact: {DEFAULT_STORE_SETTINGS.phone}</div>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="p-4 rounded-3 border bg-light h-100">
                <span className="badge bg-success text-white mb-2">2nd Branch</span>
                <h4 className="h5 fw-bold text-dark mb-2">Dasara Chowk Branch</h4>
                <p className="text-muted small mb-3">{DEFAULT_STORE_SETTINGS.branch2}</p>
                <div className="small text-secondary mb-1">🕒 Open: 10:00 AM - 09:30 PM (7 Days)</div>
                <div className="small text-secondary">📞 Contact: {DEFAULT_STORE_SETTINGS.altPhone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
