import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  Glasses,
  RefreshCw,
  Info,
  SlidersHorizontal
} from "lucide-react";
import ProductCard from "../../components/common/ProductCard";
import ProductDetailsModal from "../../components/common/ProductDetailsModal";
import { getProducts } from "../../services/productService";
import { PRODUCT_CATEGORIES } from "../../data/initialData";

const ProductsPage = ({ initialCategory = "all" }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromQuery = searchParams.get("category") || initialCategory;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);
  const [selectedShape, setSelectedShape] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
    }
  }, [categoryFromQuery]);

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const list = await getProducts(false); // active only
        setProducts(list || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  // Filtered and sorted products
  const displayProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchSearch =
        !searchQuery ||
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === "all" || p.category === selectedCategory;

      const matchShape =
        selectedShape === "all" ||
        p.shape?.toLowerCase() === selectedShape.toLowerCase();

      return matchSearch && matchCategory && matchShape;
    });

    // Sorting
    if (sortBy === "price-low") {
      result.sort((a, b) => {
        const numA = parseInt((a.sellingPrice || "0").replace(/[^0-9]/g, "")) || 0;
        const numB = parseInt((b.sellingPrice || "0").replace(/[^0-9]/g, "")) || 0;
        return numA - numB;
      });
    } else if (sortBy === "price-high") {
      result.sort((a, b) => {
        const numA = parseInt((a.sellingPrice || "0").replace(/[^0-9]/g, "")) || 0;
        const numB = parseInt((b.sellingPrice || "0").replace(/[^0-9]/g, "")) || 0;
        return numB - numA;
      });
    } else if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return result;
  }, [products, searchQuery, selectedCategory, selectedShape, sortBy]);

  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Page Title & Breadcrumb */}
        <div className="text-center mb-4">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill mb-2">
            OPTICAL SHOWROOM CATALOG
          </span>
          <h1 className="h2 fw-bold text-dark mb-2">Eyewear & Optical Products</h1>
          <p className="text-muted small mx-auto" style={{ maxWidth: "650px" }}>
            Explore high-grade spectacle frames, sunglasses, computer blue-block glasses, and contact lenses.
            Try in-store at our <strong>Miraj Kisan Chowk</strong> & <strong>Shivaji Maharaj Chowk</strong> branches.
          </p>
        </div>

        {/* Informational Banner */}
        <div className="alert alert-info border-0 rounded-4 shadow-sm p-3 mb-4 d-flex align-items-center gap-3">
          <Info size={22} className="text-primary flex-shrink-0" />
          <div className="small text-dark">
            <strong>Informational Catalog Notice:</strong> Products are displayed for viewing and trial selection.
            We do not process online transactions. To enquire or reserve a frame, click the <strong>WhatsApp Enquiry</strong> button or visit our showroom.
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="card border-0 shadow-sm rounded-4 bg-white p-3 p-md-4 mb-4">
          <div className="row g-3 align-items-center">
            {/* Search */}
            <div className="col-12 col-md-4">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0">
                  <Search size={16} className="text-muted" />
                </span>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search frames by name or brand..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="col-12 col-sm-6 col-md-3">
              <select
                className="form-select text-capitalize"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSearchParams({ category: e.target.value });
                }}
              >
                <option value="all">All Categories ({products.length})</option>
                {PRODUCT_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Shape Filter */}
            <div className="col-6 col-sm-3 col-md-2">
              <select
                className="form-select"
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
              >
                <option value="all">All Shapes</option>
                <option value="Wayfarer">Wayfarer</option>
                <option value="Rectangle">Rectangle</option>
                <option value="Round">Round</option>
                <option value="Aviator">Aviator</option>
                <option value="Cat-Eye">Cat-Eye</option>
                <option value="Hexagonal">Hexagonal</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="col-6 col-sm-3 col-md-3">
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-muted small mt-2">Loading eyewear catalog...</p>
          </div>
        ) : displayProducts.length === 0 ? (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center bg-white">
            <Glasses size={48} className="text-muted opacity-50 mx-auto mb-3" />
            <h4 className="fw-bold text-dark">No Products Found</h4>
            <p className="text-muted small mb-3">
              We couldn't find any frames matching your selected filters.
            </p>
            <div>
              <button
                type="button"
                className="btn btn-primary rounded-pill px-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSelectedShape("all");
                  setSortBy("default");
                  setSearchParams({});
                }}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <span className="small text-muted">
                Showing <strong>{displayProducts.length}</strong> optical frames
              </span>
            </div>

            <div className="row g-4">
              {displayProducts.map((p) => (
                <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <ProductCard product={p} onSelect={setSelectedProduct} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductsPage;
