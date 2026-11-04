import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, FileText } from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";

export const PrivacyPolicyPage = () => {
  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5">
          <div className="d-flex align-items-center gap-2 mb-3 text-primary">
            <ShieldCheck size={28} />
            <h1 className="h3 fw-bold text-dark mb-0">Privacy Policy</h1>
          </div>
          <p className="text-muted small">Last updated: October 2026 • Eye Care Optical, Miraj</p>
          <hr />

          <h5 className="fw-bold text-dark mt-4">1. Informational Website</h5>
          <p className="text-muted small lh-lg">
            This website is solely an informational platform for Eye Care Optical (located in Miraj, Maharashtra)
            to showcase optical frames, prescription lenses, optometrist services, and festival promotions.
            We do not collect payment details, credit card numbers, or conduct online financial transactions.
          </p>

          <h5 className="fw-bold text-dark mt-4">2. Information We Receive</h5>
          <p className="text-muted small lh-lg">
            When you submit an appointment booking or general inquiry via WhatsApp or our contact forms,
            we may receive your name, contact phone number, and branch preference purely to confirm your slot
            or assist with your optical requirements.
          </p>

          <h5 className="fw-bold text-dark mt-4">3. Data Protection</h5>
          <p className="text-muted small lh-lg">
            We value your confidentiality. Your contact information is never sold, traded, or shared with third-party marketing agencies.
          </p>

          <h5 className="fw-bold text-dark mt-4">4. Showroom Inquiries</h5>
          <p className="text-muted small lh-lg">
            For questions regarding eye care records or prescription trials, you can visit us at:
            <br />
            <strong>1st Branch:</strong> {DEFAULT_STORE_SETTINGS.branch1}
            <br />
            <strong>2nd Branch:</strong> {DEFAULT_STORE_SETTINGS.branch2}
          </p>
        </div>
      </div>
    </div>
  );
};

export const TermsPage = () => {
  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="card border-0 shadow-sm rounded-4 bg-white p-4 p-md-5">
          <div className="d-flex align-items-center gap-2 mb-3 text-primary">
            <FileText size={28} />
            <h1 className="h3 fw-bold text-dark mb-0">Terms & Conditions</h1>
          </div>
          <p className="text-muted small">Last updated: October 2026 • Eye Care Optical, Miraj</p>
          <hr />

          <h5 className="fw-bold text-dark mt-4">1. Catalog & Pricing</h5>
          <p className="text-muted small lh-lg">
            All prices and discounts displayed on this website are indicative showroom prices maintained by the store administration.
            Actual frame trials, personalized lens parameter customisation (such as pupillary distance and pantoscopic tilt),
            and prescription fittings are finalized in person at our Miraj showrooms.
          </p>

          <h5 className="fw-bold text-dark mt-4">2. Festival Offers</h5>
          <p className="text-muted small lh-lg">
            Festival offers (including Diwali & Dussehra promotions such as Unbreakable Blue Block at ₹499, Fixed Goggles at ₹99,
            and Progressive Frames at 50% OFF) are subject to stock availability and applicable showroom terms.
          </p>

          <h5 className="fw-bold text-dark mt-4">3. Informational Nature</h5>
          <p className="text-muted small lh-lg">
            This website does not function as an e-commerce shopping cart. Products cannot be ordered or paid for online.
            Customers are encouraged to visit our stores or connect via WhatsApp for genuine frame trials.
          </p>
        </div>
      </div>
    </div>
  );
};
