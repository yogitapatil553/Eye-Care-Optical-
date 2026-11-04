import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";

const FAQS_LIST = [
  {
    q: "Do I need an appointment for an eye test?",
    a: "Walk-ins are always warmly welcomed at both our Kisan Chowk and Shivaji Maharaj Chowk branches in Miraj! However, you can also book your slot online or via WhatsApp to avoid waiting during peak festive hours."
  },
  {
    q: "How long does a computerized eye check-up take?",
    a: "A comprehensive computerized eye examination typically takes only 10 to 15 minutes. It includes automated refraction, visual acuity testing, and trial frame verification with our optometrist."
  },
  {
    q: "What are your two showroom branch addresses in Miraj?",
    a: "Our 1st Branch is located at Laxmi Market, Kisan Chowk, Miraj. Our 2nd Branch is located at Chhatrapati Shivaji Maharaj Chowk, Dasara Chowk, Miraj. Both branches are open 7 days a week from 10:00 AM to 09:30 PM."
  },
  {
    q: "Can you fit new lenses into my existing frame?",
    a: "Yes! If your frame is in good condition, we can accurately measure your optical centers and fit brand new single vision, blue-cut, photochromic, or progressive lenses into your existing frame."
  },
  {
    q: "Are the festival offers available at both branches?",
    a: "Yes, our Diwali & Dussehra special offers (Unbreakable Blue Block at ₹499, Fixed Goggles at ₹99, and Progressive Frames at 50% OFF) are available across both of our Miraj branches while stocks last."
  },
  {
    q: "How do I enquire about a frame I saw on this website?",
    a: "Simply click the 'WhatsApp Enquiry' button on any product card. This will open a prefilled WhatsApp chat with our store team so we can confirm current stock and trial availability."
  }
];

const FaqsPage = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Banner */}
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h1 className="h2 fw-bold text-dark mb-3">Optical Queries & Assistance</h1>
          <p className="lead text-muted mx-auto" style={{ fontSize: "1.05rem" }}>
            Got questions about eye tests, lens coatings, festival offers, or store locations? Here are quick answers.
          </p>
        </div>

        {/* Accordion FAQ Items */}
        <div className="d-flex flex-column gap-3 mb-5">
          {FAQS_LIST.map((faq, idx) => (
            <div key={idx} className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
              <button
                type="button"
                className="btn w-100 p-4 text-start d-flex justify-content-between align-items-center bg-transparent border-0"
                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
              >
                <span className="fw-bold text-dark h6 mb-0 pe-3">{faq.q}</span>
                {openIdx === idx ? (
                  <ChevronUp size={20} className="text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown size={20} className="text-muted flex-shrink-0" />
                )}
              </button>
              {openIdx === idx && (
                <div className="px-4 pb-4 pt-0 text-muted small lh-lg border-top border-light">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions? */}
        <div className="card border-0 shadow-sm rounded-4 bg-white p-4 text-center">
          <h4 className="fw-bold text-dark mb-2">Still Have Questions?</h4>
          <p className="text-muted small mb-3">
            Our friendly optical optometrists in Miraj are happy to help you with spectacle powers or frames selection.
          </p>
          <div>
            <a
              href={`https://wa.me/${DEFAULT_STORE_SETTINGS.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-success rounded-pill px-4 py-2 fw-bold d-inline-flex align-items-center gap-2"
            >
              <MessageCircle size={18} />
              <span>Chat with Us on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqsPage;
