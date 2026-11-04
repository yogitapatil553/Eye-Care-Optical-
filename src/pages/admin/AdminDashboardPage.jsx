import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Glasses,
  CheckCircle2,
  XCircle,
  PlusCircle,
  Tag,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  ExternalLink,
  Edit,
  Eye
} from "lucide-react";
import { getProducts } from "../../services/productService";
import { getFestivalOffers } from "../../services/offerService";

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodList, offerList] = await Promise.all([
        getProducts(true),
        getFestivalOffers(true)
      ]);
      setProducts(prodList || []);
      setOffers(offerList || []);
    } catch (err) {
      console.error("Dashboard data load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.isActive !== false).length;
  const inactiveProducts = totalProducts - activeProducts;
  const activeOffers = offers.filter((o) => o.isActive !== false).length;

  // Category counts
  const categoryCounts = products.reduce((acc, p) => {
    const cat = p.category || "uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  // 5 most recently updated products
  const recentProducts = [...products]
    .sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0))
    .slice(0, 5);

  return (
    <div className="container-fluid p-0">
      {/* Top Header & Actions */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="h4 fw-bold text-dark mb-1">Store Dashboard</h2>
          <p className="text-muted small mb-0">
            Real-time optical catalog overview, inventory status and quick actions
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={loadData}
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 rounded-3"
            title="Refresh dashboard metrics"
            disabled={loading}
          >
            <RefreshCw size={14} className={loading ? "spin" : ""} />
            <span>Refresh</span>
          </button>
          <Link
            to="/admin/products/add"
            className="btn btn-primary btn-sm d-flex align-items-center gap-1 rounded-3 fw-semibold px-3 shadow-sm"
            style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
          >
            <PlusCircle size={16} />
            <span>Add New Product</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="row g-3 mb-4">
        {/* Total Products */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-muted small fw-semibold text-uppercase">Total Catalog</span>
                <h3 className="fw-bold text-dark my-1">{loading ? "..." : totalProducts}</h3>
                <span className="badge bg-primary bg-opacity-10 text-primary small">
                  All Eyewear
                </span>
              </div>
              <div
                className="p-3 rounded-4 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center"
                style={{ width: "48px", height: "48px" }}
              >
                <Glasses size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Active Products */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-muted small fw-semibold text-uppercase">Live on Website</span>
                <h3 className="fw-bold text-success my-1">{loading ? "..." : activeProducts}</h3>
                <span className="badge bg-success bg-opacity-10 text-success small">
                  Visible to Customers
                </span>
              </div>
              <div
                className="p-3 rounded-4 bg-success bg-opacity-10 text-success d-flex align-items-center justify-content-center"
                style={{ width: "48px", height: "48px" }}
              >
                <CheckCircle2 size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Inactive Products */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-muted small fw-semibold text-uppercase">Inactive / Hidden</span>
                <h3 className="fw-bold text-secondary my-1">{loading ? "..." : inactiveProducts}</h3>
                <span className="badge bg-secondary bg-opacity-10 text-secondary small">
                  Draft or Hidden
                </span>
              </div>
              <div
                className="p-3 rounded-4 bg-secondary bg-opacity-10 text-secondary d-flex align-items-center justify-content-center"
                style={{ width: "48px", height: "48px" }}
              >
                <XCircle size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Festival Offers */}
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-4 h-100 p-3 bg-white">
            <div className="d-flex justify-content-between align-items-start">
              <div>
                <span className="text-muted small fw-semibold text-uppercase">Festival Deals</span>
                <h3 className="fw-bold text-warning my-1">{loading ? "..." : activeOffers}</h3>
                <span className="badge bg-warning bg-opacity-10 text-dark small">
                  Diwali & Dussehra Special
                </span>
              </div>
              <div
                className="p-3 rounded-4 bg-warning bg-opacity-10 text-warning d-flex align-items-center justify-content-center"
                style={{ width: "48px", height: "48px" }}
              >
                <Tag size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Row: Recent Products Table & Category Breakdown */}
      <div className="row g-4">
        {/* Recent Products */}
        <div className="col-12 col-lg-8">
          <div className="card border-0 shadow-sm rounded-4 bg-white h-100">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center p-3 p-md-4 pb-2">
              <div>
                <h5 className="fw-bold text-dark mb-0">Recently Updated Products</h5>
                <small className="text-muted">Latest optical frames and lenses in catalog</small>
              </div>
              <Link
                to="/admin/products"
                className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-1 rounded-pill px-3"
              >
                <span>View All</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0 table-hover">
                  <thead className="table-light text-muted small text-uppercase">
                    <tr>
                      <th className="ps-3 ps-md-4">Product</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th className="text-end pe-3 pe-md-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                          Loading products...
                        </td>
                      </tr>
                    ) : recentProducts.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted">
                          No products found. Click "Add New Product" to get started.
                        </td>
                      </tr>
                    ) : (
                      recentProducts.map((p) => (
                        <tr key={p.id}>
                          <td className="ps-3 ps-md-4">
                            <div className="d-flex align-items-center gap-2">
                              <img
                                src={p.image}
                                alt={p.name}
                                className="rounded-3 border object-fit-cover"
                                style={{ width: "44px", height: "44px" }}
                                onError={(e) => {
                                  e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80";
                                }}
                              />
                              <div className="text-truncate" style={{ maxWidth: "220px" }}>
                                <div className="fw-semibold text-dark text-truncate small">{p.name}</div>
                                <div className="text-muted" style={{ fontSize: "0.72rem" }}>
                                  {p.brand || "Eye Care Optical"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="badge bg-light text-secondary text-capitalize border small">
                              {p.category}
                            </span>
                          </td>
                          <td className="fw-bold text-dark small">{p.sellingPrice}</td>
                          <td>
                            {p.isActive !== false ? (
                              <span className="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 small">
                                Active
                              </span>
                            ) : (
                              <span className="badge bg-secondary-subtle text-secondary border px-2 py-1 small">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="text-end pe-3 pe-md-4">
                            <Link
                              to={`/admin/products/edit/${p.id}`}
                              className="btn btn-sm btn-outline-secondary p-1 rounded-2"
                              title="Edit product"
                            >
                              <Edit size={14} />
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Category Summary & Festival Offers Quick Edit */}
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-column gap-4">
            {/* Category summary card */}
            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 p-md-4">
              <h5 className="fw-bold text-dark mb-1">Catalog Categories</h5>
              <small className="text-muted mb-3 d-block">Breakdown by eyewear classification</small>

              <div className="d-flex flex-column gap-2">
                {Object.keys(categoryCounts).length === 0 ? (
                  <p className="text-muted small">No categories registered yet.</p>
                ) : (
                  Object.entries(categoryCounts).map(([cat, count]) => (
                    <div key={cat} className="d-flex justify-content-between align-items-center py-1 border-bottom border-light">
                      <span className="text-capitalize small fw-semibold text-secondary">
                        {cat.replace("-", " ")}
                      </span>
                      <span className="badge bg-primary bg-opacity-10 text-primary rounded-pill px-2">
                        {count} items
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Festival Offers summary */}
            <div className="card border-0 shadow-sm rounded-4 bg-white p-3 p-md-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="fw-bold text-dark mb-0">Diwali & Dussehra</h5>
                <Link to="/admin/offers" className="btn btn-sm btn-link p-0 text-decoration-none">
                  Edit Offers
                </Link>
              </div>
              <small className="text-muted mb-3 d-block">Manage active festive store promotions</small>

              <div className="d-flex flex-column gap-2">
                {offers.map((offer) => (
                  <div key={offer.id} className="p-2 rounded-3 bg-light border d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold small text-dark">{offer.title}</div>
                      <div className="text-primary fw-bold" style={{ fontSize: "0.8rem" }}>
                        {offer.pricing}
                      </div>
                    </div>
                    <span className={`badge ${offer.isActive !== false ? "bg-success" : "bg-secondary"}`}>
                      {offer.isActive !== false ? "Live" : "Off"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
