import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage, isFirebaseConfigured } from "../firebase/config";

// Allowed MIME types
const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml"
];

// 5 MB max file size
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Validate an image file before upload
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: "No file selected." };
  }
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type "${file.type}". Allowed formats: JPEG, PNG, WebP.`
    };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds 5MB limit. Selected size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`
    };
  }
  return { valid: true };
};

/**
 * Converts a File to a Base64 data URL
 */
export const fileToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

/**
 * Upload an image file to Firebase Storage (or fallback to Data URL)
 * @param {File} file - The file object
 * @param {string} folder - Destination folder, defaults to 'products'
 * @returns {Promise<string>} Download URL or Data URL
 */
export const uploadProductImage = async (file, folder = "products") => {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  // If Firebase is configured and storage instance is available
  if (isFirebaseConfigured() && storage) {
    try {
      const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileName = `${folder}/${Date.now()}_${sanitizedName}`;
      const storageRef = ref(storage, fileName);

      const snapshot = await uploadBytes(storageRef, file, {
        contentType: file.type,
        customMetadata: {
          uploadedAt: new Date().toISOString()
        }
      });

      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (err) {
      console.warn("[Storage] Firebase storage upload failed, falling back to local data URL:", err);
      return await fileToDataUrl(file);
    }
  }

  // Fallback: Local Data URL
  return await fileToDataUrl(file);
};

/**
 * Delete an image from Firebase Storage if it's a Firebase Storage URL
 * @param {string} imageUrl
 */
export const deleteProductImage = async (imageUrl) => {
  if (!imageUrl || !isFirebaseConfigured() || !storage) return;

  try {
    if (imageUrl.includes("firebasestorage.googleapis.com")) {
      const storageRef = ref(storage, imageUrl);
      await deleteObject(storageRef);
    }
  } catch (error) {
    console.warn("[Storage] Could not delete image from Firebase:", error.message);
  }
};
