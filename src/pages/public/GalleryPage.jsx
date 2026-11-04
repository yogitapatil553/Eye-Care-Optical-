import React from "react";
import { Camera, MapPin } from "lucide-react";
import { DEFAULT_STORE_SETTINGS } from "../../data/initialData";

const GALLERY_PHOTOS = [
  {
    title: "Optical Showroom Interior",
    category: "Storefront",
    branch: "Kisan Chowk Branch",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Computerized Eye Testing Suite",
    category: "Clinic",
    branch: "Shivaji Maharaj Chowk Branch",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Designer Sunglasses Gallery",
    category: "Eyewear",
    branch: "Kisan Chowk Branch",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Prescription Frame Display Lounge",
    category: "Storefront",
    branch: "Dasara Chowk Branch",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Contact Lens Consultation Desk",
    category: "Consultation",
    branch: "Kisan Chowk Branch",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Lens Dispensing & Fitting Lab",
    category: "Lab",
    branch: "Both Branches",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=800&q=80"
  }
];

const GalleryPage = () => {
  return (
    <div className="py-5 bg-light min-vh-100">
      <div className="container">
        {/* Banner */}
        <div className="text-center mb-5">
          <span className="badge bg-primary bg-opacity-10 text-primary fw-bold px-3 py-1 rounded-pill mb-2">
            PHOTO GALLERY
          </span>
          <h1 className="h2 fw-bold text-dark mb-3">Showroom & Clinic Gallery</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: "650px", fontSize: "1.05rem" }}>
            A glimpse into our modern optical stores, computerized testing suites, and frame collections in Miraj.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="row g-4">
          {GALLERY_PHOTOS.map((photo, i) => (
            <div key={i} className="col-12 col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white h-100">
                <div style={{ height: "240px", overflow: "hidden" }}>
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-100 h-100 object-fit-cover hover-scale transition-all"
                  />
                </div>
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <span className="badge bg-light text-primary border small">{photo.category}</span>
                    <span className="text-muted small d-flex align-items-center gap-1">
                      <MapPin size={12} />
                      {photo.branch}
                    </span>
                  </div>
                  <h5 className="h6 fw-bold text-dark mb-0">{photo.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
