import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Glasses,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Menu,
  X,
  CalendarCheck,
  Globe
} from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";
import { useLanguage } from "../../context/LanguageContext";
import logoImg from "../../assets/logo.jpg";

const Header = ({ onOpenAppointment }) => {
  const [navOpen, setNavOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="top-bar text-white py-1 d-none d-lg-block" style={{ backgroundColor: "#07203a", fontSize: "0.82rem" }}>
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <span className="d-flex align-items-center gap-1">
              <MapPin size={14} className="text-info" />
              <span>
                <strong>{t("topBranch1")}</strong> {DEFAULT_STORE_SETTINGS.branch1} &nbsp;|&nbsp;
                <strong>{t("topBranch2")}</strong> {DEFAULT_STORE_SETTINGS.branch2}
              </span>
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span className="d-flex align-items-center gap-1 text-light">
              <Clock size={14} className="text-warning" />
              <span>{t("topTimings")}</span>
            </span>
            <a
              href={`tel:${DEFAULT_STORE_SETTINGS.phone.replace(/\s+/g, "")}`}
              className="text-white text-decoration-none d-flex align-items-center gap-1"
            >
              <Phone size={14} className="text-success" />
              <span>{DEFAULT_STORE_SETTINGS.phone}</span>
            </a>

            {/* Language Switcher in Topbar */}
            <div className="d-inline-flex align-items-center gap-1 ms-2 ps-2 border-start border-secondary border-opacity-50">
              <Globe size={13} className="text-info" />
              <div className="btn-group btn-group-sm rounded-pill overflow-hidden border border-secondary border-opacity-50" style={{ padding: "1px" }}>
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`btn btn-sm py-0 px-2 fw-bold border-0 ${
                    language === "en" ? "btn-info text-dark" : "text-light text-opacity-75"
                  }`}
                  style={{ fontSize: "0.72rem", lineHeight: "1.4" }}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("mr")}
                  className={`btn btn-sm py-0 px-2 fw-bold border-0 ${
                    language === "mr" ? "btn-warning text-dark" : "text-light text-opacity-75"
                  }`}
                  style={{ fontSize: "0.72rem", lineHeight: "1.4" }}
                >
                  मराठी
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="navbar navbar-expand-xl navbar-light bg-white sticky-top shadow-sm py-2">
        <div className="container">
          {/* Logo & Brand */}
          <Link to="/" className="navbar-brand d-flex align-items-center gap-2 m-0">
            <img
              src={logoImg}
              alt="Eye Care Optical Logo"
              className="rounded-2 object-fit-contain shadow-xs"
              style={{ height: "46px", width: "auto" }}
            />
            <div>
              <div className="fw-bold fs-5 lh-1 text-dark" style={{ letterSpacing: "-0.5px" }}>
                Eye Care <span style={{ color: "#00a896" }}>Optical</span>
              </div>
              <small className="text-muted d-block fw-normal" style={{ fontSize: "0.68rem" }}>
                {t("brandSubtitle")}
              </small>
            </div>
          </Link>

          {/* Mobile Right Controls: Language Switcher + Book Button + Hamburger */}
          <div className="d-flex align-items-center gap-2 d-xl-none">
            {/* Mobile Language Switcher */}
            <div className="btn-group btn-group-sm rounded-pill overflow-hidden border" style={{ padding: "1px" }}>
              <button
                type="button"
                onClick={() => setLanguage("en")}
                className={`btn btn-sm py-0 px-2 fw-bold border-0 ${
                  language === "en" ? "btn-primary text-white" : "btn-light text-dark"
                }`}
                style={{ fontSize: "0.7rem", lineHeight: "1.4" }}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage("mr")}
                className={`btn btn-sm py-0 px-2 fw-bold border-0 ${
                  language === "mr" ? "btn-warning text-dark" : "btn-light text-dark"
                }`}
                style={{ fontSize: "0.7rem", lineHeight: "1.4" }}
              >
                मराठी
              </button>
            </div>

            <button
              onClick={onOpenAppointment}
              className="btn btn-sm btn-primary rounded-pill px-2 py-1 text-white fw-bold"
              style={{ backgroundColor: "#00a896", borderColor: "#00a896", fontSize: "0.72rem" }}
            >
              {language === "mr" ? "तपासणी" : "Book"}
            </button>
            <button
              type="button"
              className="navbar-toggler p-1 border-0"
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle navigation"
            >
              {navOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className={`collapse navbar-collapse ${navOpen ? "show" : ""}`} id="mainNav">
            <ul className="navbar-nav mx-auto mb-2 mb-xl-0 gap-1 gap-xl-2 fw-semibold" style={{ fontSize: "0.92rem" }}>
              <li className="nav-item">
                <NavLink to="/" end className="nav-link px-2" onClick={() => setNavOpen(false)}>
                  {t("navHome")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link px-2" onClick={() => setNavOpen(false)}>
                  {t("navAbout")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/products" className="nav-link px-2" onClick={() => setNavOpen(false)}>
                  {t("navProducts")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/eyeglasses" className="nav-link px-2" onClick={() => setNavOpen(false)}>
                  {t("navEyeglasses")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/sunglasses" className="nav-link px-2" onClick={() => setNavOpen(false)}>
                  {t("navSunglasses")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/services" className="nav-link px-2" onClick={() => setNavOpen(false)}>
                  {t("navServices")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/offers" className="nav-link px-2 text-danger fw-bold" onClick={() => setNavOpen(false)}>
                  {t("navOffers")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/brands" className="nav-link px-2" onClick={() => setNavOpen(false)}>
                  {t("navBrands")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/gallery" className="nav-link px-2" onClick={() => setNavOpen(false)}>
                  {t("navGallery")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link px-2" onClick={() => setNavOpen(false)}>
                  {t("navContact")}
                </NavLink>
              </li>
            </ul>

            {/* Right Action CTA & Language Toggle */}
            <div className="d-none d-xl-flex align-items-center gap-2">
              {/* Language Switcher pill in navbar */}
              <div className="btn-group btn-group-sm rounded-pill overflow-hidden border shadow-xs me-1">
                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  className={`btn btn-sm py-1 px-2 fw-bold border-0 ${
                    language === "en" ? "btn-primary text-white" : "btn-light text-dark"
                  }`}
                  style={{ fontSize: "0.78rem" }}
                  title="Switch to English"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage("mr")}
                  className={`btn btn-sm py-1 px-2 fw-bold border-0 ${
                    language === "mr" ? "btn-warning text-dark" : "btn-light text-dark"
                  }`}
                  style={{ fontSize: "0.78rem" }}
                  title="मराठी भाषेत रूपांतरित करा"
                >
                  मराठी
                </button>
              </div>

              <button
                type="button"
                onClick={onOpenAppointment}
                className="btn btn-sm btn-primary rounded-pill px-3 py-2 fw-bold d-flex align-items-center gap-2 shadow-sm text-white"
                style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
              >
                <CalendarCheck size={16} />
                <span>{t("navBookTest")}</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
