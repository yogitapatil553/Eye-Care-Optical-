import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Menu, ExternalLink, ShieldAlert } from "lucide-react";
import { isFirebaseConfigured } from "../../firebase/config";

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const firebaseReady = isFirebaseConfigured();

  return (
    <div className="d-flex min-vh-100 bg-light">
      <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <div className="d-flex flex-column flex-grow-1 overflow-hidden" style={{ minWidth: 0 }}>
        {/* Top Navbar */}
        <header className="navbar navbar-expand bg-white border-bottom px-3 py-2 sticky-top shadow-sm">
          <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary d-lg-none p-1"
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar menu"
              >
                <Menu size={20} />
              </button>
              <h1 className="h6 mb-0 fw-bold text-dark d-none d-sm-block">
                Eye Care Optical – Control Panel
              </h1>
            </div>

            <div className="d-flex align-items-center gap-2">
              {!firebaseReady && (
                <span
                  className="badge bg-warning text-dark d-flex align-items-center gap-1 d-none d-md-flex py-1 px-2"
                  title="Firebase credentials not detected in .env; currently using reactive local store mode"
                >
                  <ShieldAlert size={14} />
                  <span>Local Data Mode</span>
                </span>
              )}
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 rounded-pill px-3"
              >
                <ExternalLink size={14} />
                <span>Visit Storefront</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-grow-1 p-3 p-md-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
