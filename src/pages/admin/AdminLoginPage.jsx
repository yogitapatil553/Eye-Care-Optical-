import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Glasses, Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck, Key } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/logo.jpg";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("admin@eyecareoptical.com");
  const [password, setPassword] = useState("eyecare123");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin/dashboard";

  useEffect(() => {
    if (user && isAdmin) {
      navigate(from, { replace: true });
    }
  }, [user, isAdmin, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Failed to sign in. Please check credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center p-3"
      style={{
        background: "linear-gradient(135deg, #0b1f3a 0%, #0d3b66 50%, #00a896 100%)"
      }}
    >
      <div className="card shadow-lg border-0 rounded-4 p-4 p-md-5" style={{ maxWidth: "460px", width: "100%" }}>
        {/* Brand Icon & Heading */}
        <div className="text-center mb-4">
          <div className="d-inline-flex align-items-center justify-content-center p-2 mb-2">
            <img
              src={logoImg}
              alt="Eye Care Optical Logo"
              className="rounded-3 shadow-sm object-fit-contain"
              style={{ maxHeight: "75px", maxWidth: "220px" }}
            />
          </div>
          <h2 className="fw-bold text-dark mb-1">Eye Care Optical</h2>
          <p className="text-muted small mb-0">Authorized Admin Portal & Store Management</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger d-flex align-items-center gap-2 py-2 px-3 small rounded-3 mb-3" role="alert">
            <AlertCircle size={18} className="flex-shrink-0" />
            <div>{error}</div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary mb-1">
              Admin Email / Username
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <Mail size={18} />
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0"
                placeholder="admin@eyecareoptical.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary mb-1">
              Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <Lock size={18} />
              </span>
              <input
                type="password"
                className="form-control border-start-0 ps-0"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold rounded-3 d-flex align-items-center justify-content-center gap-2 mb-3"
            style={{ backgroundColor: "#0d3b66", borderColor: "#0d3b66" }}
            disabled={submitting}
          >
            {submitting ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Demo Credentials Box */}
        <div className="p-3 bg-light rounded-3 border small text-muted mb-4">
          <div className="fw-bold text-dark d-flex align-items-center gap-1 mb-1">
            <Key size={14} className="text-warning" />
            <span>Default / Local Admin Credentials:</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Email:</span>
            <code className="text-primary fw-semibold">admin@eyecareoptical.com</code>
          </div>
          <div className="d-flex justify-content-between">
            <span>Password:</span>
            <code className="text-primary fw-semibold">eyecare123</code>
          </div>
          <div className="mt-1 text-muted" style={{ fontSize: "0.75rem" }}>
            * Connect Firebase credentials in <code>.env</code> for live cloud authentication.
          </div>
        </div>

        {/* Back to Website */}
        <div className="text-center">
          <Link
            to="/"
            className="text-decoration-none small text-muted d-inline-flex align-items-center gap-1 hover-primary"
          >
            <ArrowLeft size={14} />
            <span>Return to Main Website</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
