import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import ProductForm from "../../components/admin/ProductForm";
import { getProductById, updateProduct } from "../../services/productService";

const AdminEditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const found = await getProductById(id);
        if (!found) {
          setError(`Product with ID "${id}" was not found.`);
        } else {
          setProduct(found);
        }
      } catch (err) {
        setError(err.message || "Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleUpdateProduct = async (updatedData) => {
    setSubmitting(true);
    setError("");
    try {
      await updateProduct(id, updatedData);
      navigate("/admin/products", {
        replace: true,
        state: { message: `Product "${updatedData.name}" updated successfully!` }
      });
    } catch (err) {
      setError(err.message || "Failed to update product.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary mb-3" role="status"></div>
        <p className="text-muted small">Loading product specifications...</p>
      </div>
    );
  }

  if (!product && error) {
    return (
      <div className="card border-0 shadow-sm rounded-4 p-4 text-center">
        <AlertCircle size={40} className="text-danger mx-auto mb-2" />
        <h5 className="fw-bold text-dark">Product Not Found</h5>
        <p className="text-muted small mb-3">{error}</p>
        <Link to="/admin/products" className="btn btn-primary btn-sm rounded-3">
          Return to Products Catalog
        </Link>
      </div>
    );
  }

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
            <h2 className="h4 fw-bold text-dark mb-0">Edit Optical Product</h2>
          </div>
          <p className="text-muted small mb-0 ms-4 ps-1">
            Updating specifications for <strong className="text-dark">{product?.name}</strong> (ID: {id})
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger py-2 px-3 small rounded-3 mb-3">
          {error}
        </div>
      )}

      {/* Product Form with pre-populated data */}
      {product && (
        <ProductForm
          initialData={product}
          onSubmit={handleUpdateProduct}
          isEditing={true}
          submitting={submitting}
        />
      )}
    </div>
  );
};

export default AdminEditProductPage;
