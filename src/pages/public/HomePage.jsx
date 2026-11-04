import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Glasses,
  CheckCircle,
  Eye,
  Shield,
  Award,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  ArrowRight,
  ChevronRight,
  Tag,
  Star,
  Layers,
  Flame,
  Check
} from "lucide-react";
import ProductCard from "../../components/common/ProductCard";
import ProductDetailsModal from "../../components/common/ProductDetailsModal";
import { getProducts } from "../../services/productService";
import { getFestivalOffers } from "../../services/offerService";
import { useLanguage } from "../../context/LanguageContext";
import logoImg from "../../assets/logo.jpg";
import {
  DEFAULT_STORE_SETTINGS,
  PRODUCT_CATEGORIES,
  EYEWEAR_BRANDS,
  SERVICES_LIST
} from "../../data/initialData";

const HomePage = ({ onOpenAppointment }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [festivalOffers, setFestivalOffers] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { language, t } = useLanguage();

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [prods, offers] = await Promise.all([
          getProducts(false), // only active
          getFestivalOffers(false) // only active
        ]);
        setFeaturedProducts(prods.slice(0, 8));
        setFestivalOffers(offers);
      } catch (err) {
        console.error("Home data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  return (
    <>
      {/* Animated Hero Section */}
      <section
        className="hero-section position-relative text-white py-5 d-flex align-items-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #07203a 0%, #0d3b66 55%, #028090 100%)",
          minHeight: "580px"
        }}
      >
        {/* Animated Background Glow Orbs */}
        <div
          className="hero-circle-accent hero-animate-float"
          style={{ width: "350px", height: "350px", top: "-50px", right: "10%" }}
        />
        <div
          className="hero-circle-accent hero-animate-float-reverse"
          style={{ width: "250px", height: "250px", bottom: "-30px", left: "5%" }}
        />

        <div className="container py-4 position-relative" style={{ zIndex: 2 }}>
          <div className="row align-items-center g-5">
            {/* Hero Left Content */}
            <div className="col-12 col-lg-7 hero-fade-in-up">
              {/* Shimmer Badge */}
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill hero-badge-shimmer text-white border border-white border-opacity-25 small mb-3 shadow-xs">
                <Sparkles size={14} className="text-warning" />
                <span>{t("heroBadge")}</span>
              </div>

              {/* Title with Gradient Highlight */}
              <h1 className="display-4 fw-bold lh-sm mb-3">
                {t("heroTitlePrefix")} <br />
                <span style={{ color: "#00a896" }}>{t("heroTitleHighlight")}</span>
              </h1>

              <p className="lead text-light text-opacity-90 mb-4" style={{ maxWidth: "600px", fontSize: "1.1rem" }}>
                {t("heroSubtitle")}
              </p>

              {/* CTA Buttons with Hover & Glow Animation */}
              <div className="d-flex flex-wrap gap-3 mb-4">
                <Link
                  to="/products"
                  className="btn btn-primary px-4 py-3 rounded-pill fw-bold d-inline-flex align-items-center gap-2 shadow-lg text-white hero-glow-card"
                  style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
                >
                  <Glasses size={18} />
                  <span>{t("heroExploreBtn")}</span>
                </Link>
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="btn btn-outline-light px-4 py-3 rounded-pill fw-bold d-inline-flex align-items-center gap-2"
                >
                  <span>{t("heroBookBtn")}</span>
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="row g-3 pt-3 border-top border-white border-opacity-20 text-light text-opacity-80 small">
                <div className="col-4">
                  <strong className="text-white d-block fs-5">{t("heroStatBranches")}</strong>
                  <span>{t("heroStatBranchesSub")}</span>
                </div>
                <div className="col-4">
                  <strong className="text-white d-block fs-5">{t("heroStatCustomers")}</strong>
                  <span>{t("heroStatCustomersSub")}</span>
                </div>
                <div className="col-4">
                  <strong className="text-white d-block fs-5">{t("heroStatLenses")}</strong>
                  <span>{t("heroStatLensesSub")}</span>
                </div>
              </div>
            </div>

            {/* Hero Right Visual with Floating Animated Logo Card */}
            <div className="col-12 col-lg-5 text-center">
              <div className="position-relative d-inline-block hero-animate-float">
                <div className="bg-white p-3 p-md-4 rounded-4 shadow-lg border text-center hero-glow-card">
                  <img
                    src={logoImg}
                    alt="Eye Care Optical Showcase"
                    className="rounded-3 object-fit-contain"
                    style={{ maxHeight: "260px", width: "100%", maxWidth: "340px" }}
                  />
                  <div className="pt-3 border-top border-light mt-3 d-flex justify-content-between align-items-center">
                    <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill">
                      100% Certified Optics
                    </span>
                    <span className="badge bg-success bg-opacity-10 text-success fw-bold px-3 py-1 rounded-pill">
                      Kisan & Shivaji Chowk
                    </span>
                  </div>
                </div>

                {/* Floating Festive Mini-Card */}
                <div
                  className="position-absolute bottom-0 start-0 m-3 p-3 bg-white text-dark rounded-4 shadow-lg text-start hero-animate-float-reverse d-none d-sm-block"
                  style={{ maxWidth: "250px", zIndex: 3 }}
                >
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <span className="badge bg-danger text-white">{t("heroFestivalBadge")}</span>
                    <Flame size={16} className="text-danger" />
                  </div>
                  <div className="fw-bold small text-dark">{t("heroSpecialTitle")}</div>
                  <div className="text-primary fw-bold small">{t("heroSpecialPrice")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATE-OF-THE-ART OPTICAL LAB & ABOUT SECTION (With User's Logo) */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left Column: Official Logo in State-of-the-Art Optical Lab Card */}
            <div className="col-12 col-lg-6">
              <div
                className="position-relative bg-white rounded-4 shadow-lg p-4 text-center d-flex align-items-center justify-content-center border hero-glow-card"
                style={{ minHeight: "380px" }}
              >
                <img
                  src={logoImg}
                  alt="Eye Care Optical Lab Logo"
                  className="rounded-3 shadow-sm object-fit-contain hero-animate-float"
                  style={{ maxHeight: "250px", maxWidth: "90%" }}
                />
                {/* Floating "State-of-the-Art Optical Lab" Badge as requested */}
                <div className="p-3 p-md-4 bg-white rounded-3 shadow position-absolute bottom-0 end-0 m-3 m-md-4 border-start border-4 border-primary text-start">
                  <h5 className="fw-bold text-primary mb-1">{t("labTitle")}</h5>
                  <small className="text-muted">{t("labSubtitle")}</small>
                </div>
              </div>
            </div>

            {/* Right Column: About Details & Checkmarks */}
            <div className="col-12 col-lg-6">
              <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill mb-2">
                {t("aboutSectionBadge")}
              </span>
              <h2 className="fw-bold text-dark mb-3">
                {t("aboutTitle")}
              </h2>
              <p className="text-muted mb-3 lh-base">
                {t("aboutP1")}
              </p>
              <p className="text-muted mb-4 lh-base">
                {t("aboutP2")}
              </p>

              <div className="row g-3 mb-4">
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle size={18} className="text-success flex-shrink-0" />
                    <span className="small fw-semibold text-dark">{t("aboutCheck1")}</span>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle size={18} className="text-success flex-shrink-0" />
                    <span className="small fw-semibold text-dark">{t("aboutCheck2")}</span>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle size={18} className="text-success flex-shrink-0" />
                    <span className="small fw-semibold text-dark">{t("aboutCheck3")}</span>
                  </div>
                </div>
                <div className="col-12 col-sm-6">
                  <div className="d-flex align-items-center gap-2">
                    <CheckCircle size={18} className="text-success flex-shrink-0" />
                    <span className="small fw-semibold text-dark">{t("aboutCheck4")}</span>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-3">
                <Link
                  to="/about"
                  className="btn btn-outline-primary rounded-pill px-4 fw-semibold"
                >
                  {language === "mr" ? "अधिक माहिती वाचा →" : "Read More About Us →"}
                </Link>
                <button
                  type="button"
                  onClick={onOpenAppointment}
                  className="btn btn-primary rounded-pill px-4 fw-bold text-white shadow-sm"
                  style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
                >
                  {t("heroBookBtn")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Festival Special Offers Row (Diwali & Dussehra Special) */}
      <section className="py-5" style={{ backgroundColor: "#fdf8f0" }}>
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge bg-warning text-dark fw-bold px-3 py-1 rounded-pill mb-2">
              {t("offersBadge")}
            </span>
            <h2 className="fw-bold text-dark mb-2">{t("offersTitle")}</h2>
            <p className="text-muted small mx-auto" style={{ maxWidth: "600px" }}>
              {t("offersSubtitle")}
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {festivalOffers.map((offer) => (
              <div key={offer.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden bg-white text-center p-4 position-relative hover-shadow transition-all">
                  {offer.tag && (
                    <span className="badge bg-danger position-absolute top-0 end-0 m-3 rounded-pill px-3 py-1">
                      {offer.tag}
                    </span>
                  )}

                  <div className="rounded-3 overflow-hidden mb-3 mx-auto" style={{ height: "170px", width: "100%" }}>
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-100 h-100 object-fit-cover"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                  </div>

                  <h3 className="h5 fw-bold text-dark mb-1">{offer.title}</h3>
                  <p className="text-muted small mb-3">{offer.description}</p>

                  <div className="d-flex align-items-baseline justify-content-center gap-2 mb-3">
                    <span className="fs-3 fw-bold text-primary" style={{ color: "#0d3b66" }}>
                      {offer.pricing}
                    </span>
                    {offer.originalPrice && (
                      <span className="text-muted text-decoration-line-through small">
                        {offer.originalPrice}
                      </span>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/${DEFAULT_STORE_SETTINGS.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                      `Hello Eye Care Optical, I would like to avail the Festival Offer: "${offer.title}" (${offer.pricing}) at your Miraj branch.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-success rounded-pill fw-semibold py-2 d-flex align-items-center justify-content-center gap-2"
                  >
                    <MessageCircle size={16} />
                    <span>{t("offerEnquireBtn")}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
            <div>
              <span className="text-primary small fw-bold text-uppercase">{t("categoriesBadge")}</span>
              <h2 className="fw-bold text-dark mb-0">{t("categoriesTitle")}</h2>
            </div>
            <Link to="/products" className="btn btn-outline-primary btn-sm rounded-pill px-3">
              {t("viewAllCatalog")}
            </Link>
          </div>

          <div className="row g-3">
            {PRODUCT_CATEGORIES.map((cat) => (
              <div key={cat.id} className="col-6 col-md-4 col-lg-3">
                <Link
                  to={`/products?category=${cat.id}`}
                  className="card border-0 shadow-sm rounded-4 p-3 text-center text-decoration-none h-100 hover-shadow transition-all bg-light"
                >
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 mb-2 mx-auto"
                    style={{ width: "48px", height: "48px", backgroundColor: "#eef5fc", color: "#0d3b66" }}
                  >
                    <Glasses size={24} />
                  </div>
                  <h4 className="h6 fw-bold text-dark mb-1">{cat.name}</h4>
                  <small className="text-muted">{cat.count}</small>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section (Connected to Live Database) */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill mb-2">
              {t("trendingBadge")}
            </span>
            <h2 className="fw-bold text-dark mb-2">{t("trendingTitle")}</h2>
            <p className="text-muted small mx-auto" style={{ maxWidth: "600px" }}>
              {t("trendingSubtitle")}
            </p>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="text-muted small mt-2">Loading eyewear catalog...</p>
            </div>
          ) : (
            <div className="row g-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="col-12 col-sm-6 col-lg-3">
                  <ProductCard product={product} onSelect={setSelectedProduct} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-5">
            <Link
              to="/products"
              className="btn btn-primary px-5 py-3 rounded-pill fw-bold shadow-sm"
              style={{ backgroundColor: "#0d3b66", borderColor: "#0d3b66" }}
            >
              {t("viewFullCollection")} ({featuredProducts.length}+ Products)
            </Link>
          </div>
        </div>
      </section>

      {/* Eye Care Services Highlights */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="text-primary small fw-bold text-uppercase">{t("servicesBadge")}</span>
            <h2 className="fw-bold text-dark mb-2">{t("servicesTitle")}</h2>
            <p className="text-muted small mx-auto" style={{ maxWidth: "600px" }}>
              {t("servicesSubtitle")}
            </p>
          </div>

          <div className="row g-4">
            {SERVICES_LIST.slice(0, 6).map((srv) => (
              <div key={srv.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-4 bg-light">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded-3 mb-3"
                    style={{ width: "48px", height: "48px", backgroundColor: "#00a896", color: "#fff" }}
                  >
                    <CheckCircle size={24} />
                  </div>
                  <h4 className="h6 fw-bold text-dark mb-2">{srv.title}</h4>
                  <p className="text-muted small mb-0">{srv.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-outline-primary btn-sm rounded-pill px-4">
              {t("exploreAllServices")}
            </Link>
          </div>
        </div>
      </section>

      {/* Showroom Location & Map (Miraj Branches) */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-12 col-lg-5">
              <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill mb-2">
                {t("visitBadge")}
              </span>
              <h2 className="fw-bold text-dark mb-3">{t("visitTitle")}</h2>
              <p className="text-muted small mb-4">
                {t("visitSubtitle")}
              </p>

              <div className="d-flex flex-column gap-3 mb-4">
                {/* Branch 1 */}
                <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
                  <div className="d-flex align-items-start gap-2">
                    <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="h6 fw-bold text-dark mb-1">{t("branch1Title")}</h5>
                      <p className="text-muted small mb-1">
                        {DEFAULT_STORE_SETTINGS.branch1}
                      </p>
                      <span className="badge bg-success bg-opacity-10 text-success small">
                        {t("branch1Badge")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Branch 2 */}
                <div className="card border-0 shadow-sm rounded-3 p-3 bg-white">
                  <div className="d-flex align-items-start gap-2">
                    <MapPin size={20} className="text-warning mt-1 flex-shrink-0" />
                    <div>
                      <h5 className="h6 fw-bold text-dark mb-1">{t("branch2Title")}</h5>
                      <p className="text-muted small mb-1">
                        {DEFAULT_STORE_SETTINGS.branch2}
                      </p>
                      <span className="badge bg-info bg-opacity-10 text-info small">
                        {t("branch2Badge")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2">
                <a
                  href={`tel:${DEFAULT_STORE_SETTINGS.phone.replace(/\s+/g, "")}`}
                  className="btn btn-outline-primary rounded-pill px-4 d-flex align-items-center gap-2"
                >
                  <Phone size={16} />
                  <span>{t("topCall")}</span>
                </a>
                <button
                  onClick={onOpenAppointment}
                  className="btn btn-primary rounded-pill px-4 fw-bold text-white"
                  style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
                >
                  {t("navBookTest")}
                </button>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="col-12 col-lg-7">
              <div className="rounded-4 overflow-hidden shadow-sm border bg-white" style={{ minHeight: "380px" }}>
                <iframe
                  title="Eye Care Optical Miraj Map"
                  src={DEFAULT_STORE_SETTINGS.googleMapsEmbedUrl}
                  width="100%"
                  height="380"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default HomePage;
