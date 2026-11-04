import React from "react";
import { MessageCircle } from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";

const FloatingWhatsApp = () => {
  const handleClick = () => {
    const cleanPhone = DEFAULT_STORE_SETTINGS.whatsapp.replace(/[^0-9]/g, "");
    const text = encodeURIComponent(
      "Hello Eye Care Optical, I would like to inquire about eyeglasses, eye testing and current offers at your Miraj showroom."
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, "_blank");
  };

  return (
    <div
      className="position-fixed"
      style={{
        bottom: "24px",
        right: "24px",
        zIndex: 1030
      }}
    >
      <button
        onClick={handleClick}
        className="btn btn-success rounded-circle shadow-lg d-flex align-items-center justify-content-center p-3 text-white border-0"
        style={{
          width: "58px",
          height: "58px",
          backgroundColor: "#25D366"
        }}
        title="Chat on WhatsApp with Eye Care Optical Miraj"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
