import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { INITIAL_PRODUCTS } from "../data/initialData";

const LOCAL_STORAGE_PRODUCTS_KEY = "eyecare_optical_products";
const COLLECTION_NAME = "products";

/**
 * Initialize products in local storage if not present
 */
const getLocalProducts = () => {
  const cached = localStorage.getItem(LOCAL_STORAGE_PRODUCTS_KEY);
  if (!cached) {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return [...INITIAL_PRODUCTS];
  }
  try {
    return JSON.parse(cached);
  } catch {
    localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return [...INITIAL_PRODUCTS];
  }
};

const saveLocalProducts = (products) => {
  localStorage.setItem(LOCAL_STORAGE_PRODUCTS_KEY, JSON.stringify(products));
};

/**
 * Validate product payload
 */
export const validateProductData = (data) => {
  const errors = {};
  if (!data.name || !data.name.trim()) {
    errors.name = "Product name is required.";
  }
  if (!data.category || !data.category.trim()) {
    errors.category = "Category is required.";
  }
  if (!data.sellingPrice || !data.sellingPrice.toString().trim()) {
    errors.sellingPrice = "Display/Selling price is required.";
  }
  if (!data.image || !data.image.trim()) {
    errors.image = "Main product image is required.";
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Fetch all products
 * @param {boolean} includeInactive - if false, returns only active products (for public site)
 */
export const getProducts = async (includeInactive = true) => {
  if (isFirebaseConfigured() && db) {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy("updatedAt", "desc"));
      const snapshot = await getDocs(q);
      let list = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));

      // If Firestore is empty on first run, seed with INITIAL_PRODUCTS
      if (list.length === 0) {
        console.info("[Firestore] Initializing Firestore products from initial data...");
        for (const p of INITIAL_PRODUCTS) {
          const { id, ...data } = p;
          await addDoc(collection(db, COLLECTION_NAME), data);
        }
        const freshSnap = await getDocs(q);
        list = freshSnap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data()
        }));
      }

      if (!includeInactive) {
        list = list.filter((p) => p.isActive !== false);
      }
      return list;
    } catch (err) {
      console.warn("[ProductService] Firestore read failed, falling back to local:", err.message);
    }
  }

  // Local storage fallback
  let localList = getLocalProducts();
  if (!includeInactive) {
    localList = localList.filter((p) => p.isActive !== false);
  }
  return localList;
};

/**
 * Get product by ID
 */
export const getProductById = async (id) => {
  if (!id) return null;

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        return { id: snap.id, ...snap.data() };
      }
    } catch (err) {
      console.warn("[ProductService] Firestore getProductById error:", err.message);
    }
  }

  const list = getLocalProducts();
  return list.find((p) => p.id === id) || null;
};

/**
 * Add a new product
 */
export const addProduct = async (productData) => {
  const validation = validateProductData(productData);
  if (!validation.isValid) {
    const errorMsg = Object.values(validation.errors).join(" ");
    throw new Error(errorMsg);
  }

  const timestamp = new Date().toISOString();
  const cleanData = {
    name: productData.name.trim(),
    category: productData.category.trim().toLowerCase(),
    brand: (productData.brand || "Eye Care Optical").trim(),
    shape: (productData.shape || "").trim(),
    material: (productData.material || "").trim(),
    gender: (productData.gender || "Unisex").trim(),
    size: (productData.size || "").trim(),
    colors: Array.isArray(productData.colors)
      ? productData.colors
      : (productData.colors || "").split(",").map((c) => c.trim()).filter(Boolean),
    sellingPrice: productData.sellingPrice.toString().trim(),
    originalPrice: (productData.originalPrice || "").toString().trim(),
    offerLabel: (productData.offerLabel || "").trim(),
    shortDescription: (productData.shortDescription || "").trim(),
    description: (productData.description || "").trim(),
    features: Array.isArray(productData.features)
      ? productData.features
      : (productData.features || "").split("\n").map((f) => f.trim()).filter(Boolean),
    image: productData.image.trim(),
    galleryImages: Array.isArray(productData.galleryImages)
      ? productData.galleryImages.filter(Boolean)
      : [],
    isActive: productData.isActive !== false,
    createdAt: timestamp,
    updatedAt: timestamp
  };

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), cleanData);
      return { id: docRef.id, ...cleanData };
    } catch (err) {
      console.warn("[ProductService] Firestore addDoc failed, using local storage:", err.message);
    }
  }

  const list = getLocalProducts();
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...cleanData
  };
  list.unshift(newProduct);
  saveLocalProducts(list);
  return newProduct;
};

/**
 * Update an existing product
 */
export const updateProduct = async (id, productData) => {
  if (!id) throw new Error("Product ID is required for update.");

  const validation = validateProductData(productData);
  if (!validation.isValid) {
    const errorMsg = Object.values(validation.errors).join(" ");
    throw new Error(errorMsg);
  }

  const timestamp = new Date().toISOString();
  const cleanData = {
    name: productData.name.trim(),
    category: productData.category.trim().toLowerCase(),
    brand: (productData.brand || "Eye Care Optical").trim(),
    shape: (productData.shape || "").trim(),
    material: (productData.material || "").trim(),
    gender: (productData.gender || "Unisex").trim(),
    size: (productData.size || "").trim(),
    colors: Array.isArray(productData.colors)
      ? productData.colors
      : (productData.colors || "").split(",").map((c) => c.trim()).filter(Boolean),
    sellingPrice: productData.sellingPrice.toString().trim(),
    originalPrice: (productData.originalPrice || "").toString().trim(),
    offerLabel: (productData.offerLabel || "").trim(),
    shortDescription: (productData.shortDescription || "").trim(),
    description: (productData.description || "").trim(),
    features: Array.isArray(productData.features)
      ? productData.features
      : (productData.features || "").split("\n").map((f) => f.trim()).filter(Boolean),
    image: productData.image.trim(),
    galleryImages: Array.isArray(productData.galleryImages)
      ? productData.galleryImages.filter(Boolean)
      : [],
    isActive: productData.isActive !== false,
    updatedAt: timestamp
  };

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, cleanData);
      return { id, ...cleanData };
    } catch (err) {
      console.warn("[ProductService] Firestore updateDoc failed, fallback to local:", err.message);
    }
  }

  const list = getLocalProducts();
  const index = list.findIndex((p) => p.id === id);
  if (index === -1) {
    throw new Error(`Product with ID "${id}" was not found.`);
  }

  list[index] = {
    ...list[index],
    ...cleanData,
    id
  };
  saveLocalProducts(list);
  return list[index];
};

/**
 * Delete a product
 */
export const deleteProduct = async (id) => {
  if (!id) throw new Error("Product ID is required for deletion.");

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await deleteDoc(docRef);
      return true;
    } catch (err) {
      console.warn("[ProductService] Firestore deleteDoc failed, fallback to local:", err.message);
    }
  }

  const list = getLocalProducts();
  const filtered = list.filter((p) => p.id !== id);
  saveLocalProducts(filtered);
  return true;
};

/**
 * Toggle active status
 */
export const toggleProductStatus = async (id, currentStatus) => {
  const newStatus = !currentStatus;
  const timestamp = new Date().toISOString();

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        isActive: newStatus,
        updatedAt: timestamp
      });
      return newStatus;
    } catch (err) {
      console.warn("[ProductService] Firestore toggle status failed:", err.message);
    }
  }

  const list = getLocalProducts();
  const index = list.findIndex((p) => p.id === id);
  if (index !== -1) {
    list[index].isActive = newStatus;
    list[index].updatedAt = timestamp;
    saveLocalProducts(list);
  }
  return newStatus;
};
