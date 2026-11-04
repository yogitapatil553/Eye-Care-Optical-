import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  RefreshCw,
  AlertTriangle,
  ExternalLink,
  Glasses
} from "lucide-react";
import {
  getProducts,
  deleteProduct,
  toggleProductStatus
} from "../../services/productService";
import { PRODUCT_CATEGORIES } from "../../data/initialData";

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Deletion modal state
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);

  const fetchProductsList = async () => {
    setLoading(true);
    try {
      const data = await getProducts(true);
      setProducts(data || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsList();
  }, []);

  // Filtered and searched list
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      const matchesSearch =
        !searchQuery ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id?.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory =
        selectedCategory === "all" || p.category === selectedCategory;

      // Status
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && p.isActive !== false) ||
        (selectedStatus === "inactive" && p.isActive === false);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, searchQuery, selectedCategory, selectedStatus]);

  // Handle status toggle
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = await toggleProductStatus(id, currentStatus);
      setProducts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isActive: newStatus } : item))
      );
      setActionMessage({
        type: "success",
        text: `Product status changed to ${newStatus ? "Active" : "Inactive"}.`
      });
      setTimeout(() => setActionMessage(null), 3000);
    } catch (err) {
      setActionMessage({ type: "danger", text: err.message || "Failed to update status." });
    }
  };

  // Handle confirmed delete
  const confirmDelete = async () => {
    if (!productToDelete) return;
    setDeleting(true);
    try {
      await deleteProduct(productToDelete.id);
      setProducts((prev) => prev.filter((p) => p.id !== productToDelete.id));
      setActionMessage({
        type: "success",
        text: `Product "${productToDelete.name}" deleted successfully.`
      });
      setTimeout(() => setActionMessage(null), 3000);
      setProductToDelete(null);
    } catch (err) {
      setActionMessage({ type: "danger", text: err.message || "Failed to delete product." });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Header bar */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="h4 fw-bold text-dark mb-1">Optical Products Management</h2>
          <p className="text-muted small mb-0">
            Create, edit, activate, deactivate and organize your eyewear catalog
          </p>
        </div>
        <div className="d-flex align-items-center gap-2">
          <button
            onClick={fetchProductsList}
            className="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 rounded-3"
            title="Reload products"
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

      {/* Action Notification Alert */}
      {actionMessage && (
        <div
          className={`alert alert-${actionMessage.type} alert-dismissible fade show small py-2 px-3 mb-3 rounded-3`}
          role="alert"
        >
          {actionMessage.text}
          <button
            type="button"
            className="btn-close py-2"
            onClick={() => setActionMessage(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Filters & Search Card */}
      <div className="card border-0 shadow-sm rounded-4 bg-white p-3 mb-4">
        <div className="row g-2 align-items-center">
          {/* Search */}
          <div className="col-12 col-md-5">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-light border-end-0">
                <Search size={16} className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search by name, brand, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="col-12 col-sm-6 col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-light border-end-0">
                <Filter size={16} className="text-muted" />
              </span>
              <select
                className="form-select border-start-0 text-capitalize"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-12 col-sm-6 col-md-3">
            <select
              className="form-select form-select-sm"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Statuses ({products.length})</option>
              <option value="active">
                Active Only ({products.filter((p) => p.isActive !== false).length})
              </option>
              <option value="inactive">
                Inactive Only ({products.filter((p) => p.isActive === false).length})
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0 table-hover">
            <thead className="table-light text-muted small text-uppercase">
              <tr>
                <th className="ps-3 ps-md-4" style={{ width: "80px" }}>Image</th>
                <th>Product Details</th>
                <th>Category</th>
                <th>Selling Price</th>
                <th>Original Price</th>
                <th>Status</th>
                <th>Updated</th>
                <th className="text-end pe-3 pe-md-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    <div className="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
                    Loading product catalog...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    <Glasses size={40} className="text-muted mb-2 opacity-50" />
                    <h6 className="fw-bold text-dark">No Products Found</h6>
                    <p className="text-muted small mb-3">
                      {searchQuery || selectedCategory !== "all" || selectedStatus !== "all"
                        ? "Try adjusting your search criteria or filters."
                        : "Start adding your optical products to showcase on the website."}
                    </p>
                    <Link
                      to="/admin/products/add"
                      className="btn btn-sm btn-primary rounded-3 px-3"
                      style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
                    >
                      <PlusCircle size={14} className="me-1" />
                      Add First Product
                    </Link>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id}>
                    {/* Thumbnail */}
                    <td className="ps-3 ps-md-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="rounded-3 border object-fit-cover shadow-xs"
                        style={{ width: "54px", height: "54px" }}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80";
                        }}
                      />
                    </td>

                    {/* Details */}
                    <td>
                      <div className="fw-bold text-dark small text-truncate" style={{ maxWidth: "260px" }}>
                        {p.name}
                      </div>
                      <div className="d-flex align-items-center gap-2 mt-1">
                        <span className="badge bg-light text-muted border small" style={{ fontSize: "0.68rem" }}>
                          {p.brand || "Eye Care Optical"}
                        </span>
                        {p.offerLabel && (
                          <span className="badge bg-warning bg-opacity-15 text-dark" style={{ fontSize: "0.68rem" }}>
                            {p.offerLabel}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Category */}
                    <td>
                      <span className="badge bg-light text-primary border text-capitalize small">
                        {p.category}
                      </span>
                    </td>

                    {/* Selling Price */}
                    <td className="fw-bold text-dark small">{p.sellingPrice}</td>

                    {/* Original Price */}
                    <td className="text-muted small text-decoration-line-through">
                      {p.originalPrice || "—"}
                    </td>

                    {/* Status & Quick Toggle */}
                    <td>
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(p.id, p.isActive !== false)}
                        className={`btn btn-sm rounded-pill px-3 py-1 fw-semibold small d-inline-flex align-items-center gap-1 ${
                          p.isActive !== false
                            ? "btn-success bg-opacity-10 text-success border-success"
                            : "btn-secondary bg-opacity-10 text-secondary border-secondary"
                        }`}
                        title="Click to toggle status"
                      >
                        {p.isActive !== false ? (
                          <>
                            <CheckCircle size={12} />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={12} />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>

                    {/* Updated date */}
                    <td className="text-muted small">
                      {p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "—"}
                    </td>

                    {/* Actions */}
                    <td className="text-end pe-3 pe-md-4">
                      <div className="btn-group btn-group-sm">
                        <Link
                          to={`/admin/products/edit/${p.id}`}
                          className="btn btn-outline-secondary"
                          title="Edit Product"
                        >
                          <Edit size={14} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setProductToDelete(p)}
                          className="btn btn-outline-danger"
                          title="Delete Product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer summary */}
        <div className="p-3 bg-light border-top d-flex justify-content-between align-items-center small text-muted">
          <span>
            Showing <strong>{filteredProducts.length}</strong> of <strong>{products.length}</strong> products
          </span>
          <span className="d-none d-sm-inline">
            Active: {products.filter((p) => p.isActive !== false).length} | Inactive:{" "}
            {products.filter((p) => p.isActive === false).length}
          </span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1055 }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold text-danger d-flex align-items-center gap-2">
                  <AlertTriangle size={20} />
                  <span>Confirm Product Deletion</span>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setProductToDelete(null)}
                  disabled={deleting}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body py-3">
                <p className="mb-2">
                  Are you sure you want to permanently delete:
                </p>
                <div className="p-3 bg-light rounded-3 border d-flex align-items-center gap-3">
                  <img
                    src={productToDelete.image}
                    alt={productToDelete.name}
                    className="rounded-2 border object-fit-cover"
                    style={{ width: "48px", height: "48px" }}
                  />
                  <div>
                    <div className="fw-bold text-dark">{productToDelete.name}</div>
                    <small className="text-muted">
                      ID: {productToDelete.id} • {productToDelete.sellingPrice}
                    </small>
                  </div>
                </div>
                <p className="text-danger small mt-2 mb-0">
                  This action cannot be undone. The product will be immediately removed from both the public website and the database.
                </p>
              </div>
              <div className="modal-footer border-0 pt-0">
                <button
                  type="button"
                  className="btn btn-light rounded-3"
                  onClick={() => setProductToDelete(null)}
                  disabled={deleting}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger rounded-3 d-flex align-items-center gap-1"
                  onClick={confirmDelete}
                  disabled={deleting}
                >
                  {deleting ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 size={16} />
                      <span>Yes, Delete Product</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
