import React, { useState } from "react";
import {
  CalendarCheck,
  MapPin,
  Clock,
  User,
  Phone,
  CheckCircle2,
  X
} from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";
import { useLanguage } from "../../context/LanguageContext";

const AppointmentModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    branch: "1st Branch: Laxmi Market, Kisan Chowk, Miraj",
    date: "",
    timeSlot: "Morning (10:00 AM - 01:00 PM)",
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = DEFAULT_STORE_SETTINGS.whatsapp.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `*FREE EYE TEST APPOINTMENT REQUEST*\n` +
      `👤 Name: ${formData.name}\n` +
      `📞 Phone: ${formData.phone}\n` +
      `📍 Branch: ${formData.branch}\n` +
      `📅 Date: ${formData.date}\n` +
      `⏰ Slot: ${formData.timeSlot}\n` +
      (formData.notes ? `📝 Note: ${formData.notes}\n` : "") +
      `\nPlease confirm my eye check-up slot.`
    );

    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank");
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.6)", zIndex: 1060 }}
      onClick={handleResetAndClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">
          <div className="modal-header border-0 pb-0">
            <div className="d-flex align-items-center gap-2">
              <div
                className="d-inline-flex align-items-center justify-content-center rounded-3 text-white"
                style={{ width: "36px", height: "36px", backgroundColor: "#00a896" }}
              >
                <CalendarCheck size={20} />
              </div>
              <h5 className="modal-title fw-bold text-dark">{t("modalTitle")}</h5>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={handleResetAndClose}
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            {submitted ? (
              <div className="text-center py-4">
                <CheckCircle2 size={54} className="text-success mb-3" />
                <h4 className="fw-bold text-dark">{t("modalSuccessTitle")}</h4>
                <p className="text-muted small mb-3">
                  {t("modalSuccessMsg")}
                </p>
                <button
                  type="button"
                  className="btn btn-primary rounded-pill px-4"
                  onClick={handleResetAndClose}
                >
                  {t("modalClose")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <p className="text-muted small mb-3">
                  {t("modalSubtitle")}
                </p>

                {/* Name */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">
                    {t("modalName")} <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    placeholder={t("modalNamePlaceholder")}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Phone */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">
                    {t("modalPhone")} <span className="text-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder={t("modalPhonePlaceholder")}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                {/* Branch Selection */}
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">
                    {t("modalBranch")} <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  >
                    <option value="1st Branch: Laxmi Market, Kisan Chowk, Miraj">
                      1st Branch: Laxmi Market, Kisan Chowk, Miraj
                    </option>
                    <option value="2nd Branch: Chhatrapati Shivaji Maharaj Chowk, Dasara Chowk, Miraj">
                      2nd Branch: Chhatrapati Shivaji Maharaj Chowk, Dasara Chowk, Miraj
                    </option>
                  </select>
                </div>

                {/* Date & Time Slot */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-bold text-secondary">
                      {t("modalDate")}
                    </label>
                    <input
                      type="date"
                      required
                      className="form-control"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-bold text-secondary">
                      {t("modalSlot")}
                    </label>
                    <select
                      className="form-select"
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    >
                      <option>Morning (10:00 AM - 01:00 PM)</option>
                      <option>Afternoon (01:00 PM - 05:00 PM)</option>
                      <option>Evening (05:00 PM - 09:00 PM)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-secondary">
                    {t("modalNotes")}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={t("modalNotesPlaceholder")}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 fw-bold rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: "#00a896", borderColor: "#00a896" }}
                >
                  <CalendarCheck size={18} />
                  <span>{t("modalSubmitBtn")}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
