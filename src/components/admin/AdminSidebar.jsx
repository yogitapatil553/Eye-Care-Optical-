import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Glasses,
  PlusCircle,
  Tag,
  ExternalLink,
  LogOut,
  ShieldCheck,
  X
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logoImg from "../../assets/logo.jpg";

const AdminSidebar = ({ mobileOpen, setMobileOpen }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const closeSidebar = () => {
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="admin-backdrop d-lg-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
          style={{ zIndex: 1040 }}
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`admin-sidebar ${mobileOpen ? "open" : ""}`}
        style={{
          width: "270px",
          background: "#081d36",
          color: "#e2e8f0",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          zIndex: 1045,
          transition: "transform 0.3s ease-in-out"
        }}
      >
        {/* Brand header */}
        <div className="d-flex align-items-center justify-content-between p-3 border-bottom border-secondary border-opacity-25">
          <Link
            to="/admin/dashboard"
            onClick={closeSidebar}
            className="d-flex align-items-center gap-2 text-decoration-none text-white"
          >
            <img
              src={logoImg}
              alt="Eye Care Optical Logo"
              className="rounded-2 bg-white p-1 object-fit-contain"
              style={{ height: "40px", width: "auto" }}
            />
            <div>
              <div className="fw-bold fs-6 lh-1">Eye Care Optical</div>
              <small className="text-info fw-semibold" style={{ fontSize: "0.72rem" }}>
                Admin Portal
              </small>
            </div>
          </Link>
          <button
            type="button"
            className="btn btn-sm text-white d-lg-none"
            onClick={closeSidebar}
            aria-label="Close Sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Current user badge */}
        <div className="px-3 py-2 bg-dark bg-opacity-25 border-bottom border-secondary border-opacity-10">
          <div className="d-flex align-items-center gap-2">
            <div
              className="rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
              style={{ width: "32px", height: "32px", background: "#19528b", fontSize: "0.8rem" }}
            >
              <ShieldCheck size={16} />
            </div>
            <div className="text-truncate" style={{ maxWidth: "180px" }}>
              <div className="small fw-semibold text-white text-truncate">
                {user?.email || "Admin User"}
              </div>
              <span className="badge bg-success bg-opacity-75 text-white" style={{ fontSize: "0.65rem" }}>
                Authorized Admin
              </span>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="p-3 d-flex flex-column gap-1 flex-grow-1">
          <div className="text-uppercase small fw-bold text-muted px-2 py-1" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>
            Management
          </div>

          <NavLink
            to="/admin/dashboard"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none ${
                isActive ? "bg-primary text-white fw-semibold" : "text-light text-opacity-75 hover-link"
              }`
            }
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            end
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none ${
                isActive ? "bg-primary text-white fw-semibold" : "text-light text-opacity-75 hover-link"
              }`
            }
          >
            <Glasses size={18} />
            <span>All Products</span>
          </NavLink>

          <NavLink
            to="/admin/products/add"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none ${
                isActive ? "bg-primary text-white fw-semibold" : "text-light text-opacity-75 hover-link"
              }`
            }
          >
            <PlusCircle size={18} />
            <span>Add New Product</span>
          </NavLink>

          <NavLink
            to="/admin/offers"
            onClick={closeSidebar}
            className={({ isActive }) =>
              `nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none ${
                isActive ? "bg-primary text-white fw-semibold" : "text-light text-opacity-75 hover-link"
              }`
            }
          >
            <Tag size={18} />
            <span>Festival Offers</span>
          </NavLink>

          <div className="text-uppercase small fw-bold text-muted px-2 pt-3 pb-1" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>
            Live Storefront
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none text-light text-opacity-75 hover-link"
          >
            <ExternalLink size={18} />
            <span>View Public Website</span>
          </Link>
        </nav>

        {/* Footer with Logout */}
        <div className="p-3 border-top border-secondary border-opacity-25">
          <button
            onClick={handleLogout}
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 py-2 rounded-3"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
