import React from "react";
import { Link } from "react-router-dom";
import {
  Glasses,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";
import { useLanguage } from "../../context/LanguageContext";
import logoImg from "../../assets/logo.jpg";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="site-footer bg-dark text-white pt-5 pb-3" style={{ backgroundColor: "#061527" }}>
      <div className="container">
        <div className="row g-4 pb-4 border-bottom border-secondary border-opacity-25">
          {/* Col 1: Brand & About */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex align-items-center gap-2 mb-3">
              <img
                src={logoImg}
                alt="Eye Care Optical Logo"
                className="rounded-2 bg-white p-1 object-fit-contain"
                style={{ height: "42px", width: "auto" }}
              />
              <h3 className="h5 fw-bold mb-0 text-white">
                Eye Care <span style={{ color: "#00a896" }}>Optical</span>
              </h3>
            </div>
            <p className="text-light text-opacity-75 small mb-3 lh-base">
              {t("footerAbout")}
            </p>
            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-primary text-white py-2 px-3 rounded-pill small">
                {t("footerBadgeBrands")}
              </span>
              <span className="badge bg-success text-white py-2 px-3 rounded-pill small">
                {t("footerBadgeOpto")}
              </span>
            </div>
          </div>

          {/* Col 2: Showroom Addresses in Miraj */}
          <div className="col-12 col-md-6 col-lg-4">
            <h4 className="h6 fw-bold text-uppercase text-white mb-3" style={{ letterSpacing: "1px" }}>
              {t("footerBranchesHeading")}
            </h4>
            <div className="d-flex flex-column gap-3 small text-light text-opacity-75">
              {/* Branch 1 */}
              <div className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-info flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white d-block">1st Branch (Kisan Chowk):</strong>
                  <span>Laxmi Market, Kisan Chowk, Miraj, Maharashtra</span>
                </div>
              </div>

              {/* Branch 2 */}
              <div className="d-flex align-items-start gap-2">
                <MapPin size={18} className="text-warning flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white d-block">2nd Branch (Dasara Chowk):</strong>
                  <span>Chhatrapati Shivaji Maharaj Chowk, Dasara Chowk, Miraj, Maharashtra</span>
                </div>
              </div>

              {/* Timings */}
              <div className="d-flex align-items-center gap-2 pt-1 border-top border-secondary border-opacity-25">
                <Clock size={16} className="text-warning flex-shrink-0" />
                <span>Open 7 Days: 10:00 AM - 09:30 PM</span>
              </div>

              {/* Phone & Email */}
              <div className="d-flex align-items-center gap-2">
                <Phone size={16} className="text-success flex-shrink-0" />
                <a href={`tel:${DEFAULT_STORE_SETTINGS.phone.replace(/\s+/g, "")}`} className="text-white text-decoration-none">
                  {DEFAULT_STORE_SETTINGS.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="col-6 col-lg-2">
            <h4 className="h6 fw-bold text-uppercase text-white mb-3" style={{ letterSpacing: "1px" }}>
              Eyewear
            </h4>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
              <li>
                <Link to="/eyeglasses" className="text-light text-opacity-75 text-decoration-none hover-white">
                  Eyeglasses
                </Link>
              </li>
              <li>
                <Link to="/sunglasses" className="text-light text-opacity-75 text-decoration-none hover-white">
                  Sunglasses
                </Link>
              </li>
              <li>
                <Link to="/contact-lenses" className="text-light text-opacity-75 text-decoration-none hover-white">
                  Contact Lenses
                </Link>
              </li>
              <li>
                <Link to="/computer-glasses" className="text-light text-opacity-75 text-decoration-none hover-white">
                  Blue Block Glasses
                </Link>
              </li>
              <li>
                <Link to="/reading-glasses" className="text-light text-opacity-75 text-decoration-none hover-white">
                  Reading Glasses
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-warning text-decoration-none fw-semibold">
                  Diwali & Dussehra Offers 🪔
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Shop Info */}
          <div className="col-6 col-lg-2">
            <h4 className="h6 fw-bold text-uppercase text-white mb-3" style={{ letterSpacing: "1px" }}>
              Quick Links
            </h4>
            <ul className="list-unstyled d-flex flex-column gap-2 small mb-0">
              <li>
                <Link to="/about" className="text-light text-opacity-75 text-decoration-none hover-white">
                  About Our Shop
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-light text-opacity-75 text-decoration-none hover-white">
                  Eye Care Services
                </Link>
              </li>
              <li>
                <Link to="/brands" className="text-light text-opacity-75 text-decoration-none hover-white">
                  Eyewear Brands
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-light text-opacity-75 text-decoration-none hover-white">
                  Store Gallery
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-light text-opacity-75 text-decoration-none hover-white">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-opacity-75 text-decoration-none hover-white">
                  Contact & Map
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Admin Link */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center pt-3 gap-2 small text-light text-opacity-50">
          <div>
            © {new Date().getFullYear()} {t("footerCopyright")}
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link to="/privacy" className="text-light text-opacity-50 text-decoration-none hover-white">
              {t("footerPrivacy")}
            </Link>
            <span>•</span>
            <Link to="/terms" className="text-light text-opacity-50 text-decoration-none hover-white">
              {t("footerTerms")}
            </Link>
            <span>•</span>
            {/* Discreet Admin Portal Link as requested */}
            <Link
              to="/admin/login"
              className="text-light text-opacity-50 text-decoration-none hover-white d-inline-flex align-items-center gap-1 border-start ps-3 border-secondary border-opacity-50"
              title="Authorized Store Administration"
            >
              <ShieldCheck size={14} className="text-info" />
              <span>{t("footerAdmin")}</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
