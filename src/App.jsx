import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";

// Layout & Common
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import FloatingWhatsApp from "./components/common/FloatingWhatsApp";
import AppointmentModal from "./components/common/AppointmentModal";

// Admin Components
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminProductsPage from "./pages/admin/AdminProductsPage";
import AdminAddProductPage from "./pages/admin/AdminAddProductPage";
import AdminEditProductPage from "./pages/admin/AdminEditProductPage";
import AdminOffersPage from "./pages/admin/AdminOffersPage";

// Public Pages
import HomePage from "./pages/public/HomePage";
import ProductsPage from "./pages/public/ProductsPage";
import OffersPage from "./pages/public/OffersPage";
import AboutPage from "./pages/public/AboutPage";
import ServicesPage from "./pages/public/ServicesPage";
import BrandsPage from "./pages/public/BrandsPage";
import GalleryPage from "./pages/public/GalleryPage";
import FaqsPage from "./pages/public/FaqsPage";
import ContactPage from "./pages/public/ContactPage";
import { PrivacyPolicyPage, TermsPage } from "./pages/public/PolicyPages";
import {
  EyeglassesPage,
  SunglassesPage,
  ContactLensesPage,
  ComputerGlassesPage,
  ReadingGlassesPage,
  KidsEyewearPage,
  OpticalLensesPage
} from "./pages/public/CategoryPages";

// Scroll restoration helper
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Public Layout Wrapper
const PublicLayout = ({ children, onOpenAppointment }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header onOpenAppointment={onOpenAppointment} />
      <main className="flex-grow-1">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

function App() {
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const handleOpenAppointment = () => setAppointmentOpen(true);
  const handleCloseAppointment = () => setAppointmentOpen(false);

  return (
    <LanguageProvider>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
        {/* Admin Login (Publicly accessible but separate portal) */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Protected Admin Workspace */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="products" element={<AdminProductsPage />} />
          <Route path="products/add" element={<AdminAddProductPage />} />
          <Route path="products/edit/:id" element={<AdminEditProductPage />} />
          <Route path="offers" element={<AdminOffersPage />} />
        </Route>

        {/* Public Website Routes */}
        <Route
          path="/"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <HomePage onOpenAppointment={handleOpenAppointment} />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <AboutPage onOpenAppointment={handleOpenAppointment} />
            </PublicLayout>
          }
        />
        <Route
          path="/products"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <ProductsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/eyeglasses"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <EyeglassesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/sunglasses"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <SunglassesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact-lenses"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <ContactLensesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/computer-glasses"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <ComputerGlassesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/reading-glasses"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <ReadingGlassesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/kids-eyewear"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <KidsEyewearPage />
            </PublicLayout>
          }
        />
        <Route
          path="/optical-lenses"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <OpticalLensesPage />
            </PublicLayout>
          }
        />
        <Route
          path="/offers"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <OffersPage onOpenAppointment={handleOpenAppointment} />
            </PublicLayout>
          }
        />
        <Route
          path="/services"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <ServicesPage onOpenAppointment={handleOpenAppointment} />
            </PublicLayout>
          }
        />
        <Route
          path="/brands"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <BrandsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/gallery"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <GalleryPage />
            </PublicLayout>
          }
        />
        <Route
          path="/faqs"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <FaqsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <ContactPage onOpenAppointment={handleOpenAppointment} />
            </PublicLayout>
          }
        />
        <Route
          path="/privacy"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <PrivacyPolicyPage />
            </PublicLayout>
          }
        />
        <Route
          path="/terms"
          element={
            <PublicLayout onOpenAppointment={handleOpenAppointment}>
              <TermsPage />
            </PublicLayout>
          }
        />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={appointmentOpen}
        onClose={handleCloseAppointment}
      />
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
