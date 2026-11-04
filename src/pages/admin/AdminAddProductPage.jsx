import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, PlusCircle } from "lucide-react";
import ProductForm from "../../components/admin/ProductForm";
import { addProduct } from "../../services/productService";

const AdminAddProductPage = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateProduct = async (productData) => {
    setSubmitting(true);
    setError("");
    try {
      await addProduct(productData);
      navigate("/admin/products", {
        replace: true,
        state: { message: `Product "${productData.name}" created successfully!` }
      });
    } catch (err) {
      setError(err.message || "Failed to create product.");
      setSubmitting(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      {/* Top Header */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <div className="d-flex align-items-center gap-2 mb-1">
            <Link
              to="/admin/products"
              className="btn btn-sm btn-outline-secondary p-1 rounded-2"
              title="Back to products list"
            >
              <ArrowLeft size={16} />
            </Link>
            <h2 className="h4 fw-bold text-dark mb-0">Add New Optical Product</h2>
          </div>
          <p className="text-muted small mb-0 ms-4 ps-1">
            Fill in frame or lens details to publish immediately to the live website
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
          {error}
        </div>
      )}

      {/* Reusable Product Form */}
      <ProductForm
        onSubmit={handleCreateProduct}
        isEditing={false}
        submitting={submitting}
      />
    </div>
  );
};

export default AdminAddProductPage;
