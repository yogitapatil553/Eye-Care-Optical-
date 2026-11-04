import React, { useState } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  CalendarCheck
} from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";

const ContactPage = ({ onOpenAppointment }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "General Enquiry",
    message: ""
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = DEFAULT_STORE_SETTINGS.whatsapp.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      `*CUSTOMER ENQUIRY*\n` +
      `👤 Name: ${form.name}\n` +
      `📞 Phone: ${form.phone}\n` +
      `📧 Email: ${form.email || "Not provided"}\n` +
      `📌 Subject: ${form.subject}\n` +
      `💬 Message: ${form.message}\n`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
    setSent(true);
  };

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Banner */}
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill mb-2">
            GET IN TOUCH
          </span>
          <h1 className="h2 fw-bold text-dark mb-3">Contact Eye Care Optical Miraj</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "650px", fontSize: "1.05rem" }}>
            Visit our optical stores in Miraj, call for appointments, or send us a quick WhatsApp inquiry.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="row g-4 mb-5">
          {/* Branch 1 */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{ width: "48px", height: "48px", backgroundColor: "#eef5fc", color: "#0d3b66" }}
              >
                <MapPin size={24} />
              </div>
              <h3 className="h6 fw-bold text-dark mb-1">1st Branch (Kisan Chowk)</h3>
              <p className="text-muted small mb-2">{DEFAULT_STORE_SETTINGS.branch1}</p>
              <span className="badge bg-light text-primary border small mt-auto">
                Near Kisan Chowk
              </span>
            </div>
          </div>

          {/* Branch 2 */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{ width: "48px", height: "48px", backgroundColor: "#e6f7f5", color: "#00a896" }}
              >
                <MapPin size={24} />
              </div>
              <h3 className="h6 fw-bold text-dark mb-1">2nd Branch (Dasara Chowk)</h3>
              <p className="text-muted small mb-2">{DEFAULT_STORE_SETTINGS.branch2}</p>
              <span className="badge bg-light text-success border small mt-auto">
                Chhatrapati Shivaji Maharaj Chowk
              </span>
            </div>
          </div>

          {/* Phone & WhatsApp */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{ width: "48px", height: "48px", backgroundColor: "#fdf0ed", color: "#e76f51" }}
              >
                <Phone size={24} />
              </div>
              <h3 className="h6 fw-bold text-dark mb-1">Direct Call & WhatsApp</h3>
              <p className="text-muted small mb-2">
                Call: <strong>{DEFAULT_STORE_SETTINGS.phone}</strong><br />
                Alt: {DEFAULT_STORE_SETTINGS.altPhone}
              </p>
              <a
                href={`tel:${DEFAULT_STORE_SETTINGS.phone.replace(/\s+/g, "")}`}
                className="btn btn-sm btn-outline-primary rounded-pill mt-auto"
              >
                Call Now
              </a>
            </div>
          </div>

          {/* Timings */}
          <div className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-white">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                style={{ width: "48px", height: "48px", backgroundColor: "#fef9c3", color: "#854d0e" }}
              >
                <Clock size={24} />
              </div>
              <h3 className="h6 fw-bold text-dark mb-1">Working Hours</h3>
              <p className="text-muted small mb-2">
                {DEFAULT_STORE_SETTINGS.timings}<br />
                Open All 7 Days
              </p>
              <span className="badge bg-success bg-opacity-10 text-success border small mt-auto">
                Open Today
              </span>
            </div>
          </div>
        </div>

        {/* Enquiry Form & Google Map */}
        <div className="row g-4">
          {/* Form */}
          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5 h-100">
              <h4 className="fw-bold text-dark mb-2">Send an Online Enquiry</h4>
              <p className="text-muted small mb-4">
                Have questions about frame stock, power lenses, or eye testing? Send us your message.
              </p>

              {sent ? (
                <div className="text-center py-4">
                  <CheckCircle2 size={48} className="text-success mb-2" />
                  <h5 className="fw-bold text-dark">Message Forwarded!</h5>
                  <p className="text-muted small mb-3">
                    Your inquiry has been submitted. Our team will contact you shortly.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary rounded-pill px-4"
                    onClick={() => setSent(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Your Name</label>
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="e.g. Rahul Patil"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="row g-2 mb-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-secondary">Phone Number</label>
                      <input
                        type="tel"
                        required
                        className="form-control"
                        placeholder="e.g. 8429117155"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label className="form-label small fw-bold text-secondary">Email (Optional)</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small fw-bold text-secondary">Subject</label>
                    <select
                      className="form-select"
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    >
                      <option>General Optical Enquiry</option>
                      <option>Book Free Eye Test</option>
                      <option>Festival Offer Query</option>
                      <option>Progressive Lens Consultation</option>
                      <option>Spectacle Repair Service</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label small fw-bold text-secondary">Message</label>
                    <textarea
                      rows="4"
                      required
                      className="form-control"
                      placeholder="Tell us what eyewear or optical assistance you require..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100 py-2 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2 text-white shadow-sm"
                    style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
                  >
                    <Send size={18} />
                    <span>Send Message on WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="col-12 col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 bg-white p-4 h-100 d-flex flex-column">
              <h4 className="fw-bold text-dark mb-2">Find Us on Google Maps</h4>
              <p className="text-muted small mb-3">
                Easily get driving or walking directions to our Miraj showrooms.
              </p>
              <div className="rounded-3 overflow-hidden border flex-grow-1" style={{ minHeight: "350px" }}>
                <iframe
                  title="Eye Care Optical Miraj Map"
                  src={DEFAULT_STORE_SETTINGS.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "350px" }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
