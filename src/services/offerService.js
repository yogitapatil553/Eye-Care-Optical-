import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "../firebase/config";
import { INITIAL_OFFERS } from "../data/initialData";

const LOCAL_STORAGE_OFFERS_KEY = "eyecare_optical_festival_offers";
const COLLECTION_NAME = "offers";

/**
 * Get cached/local offers
 */
const getLocalOffers = () => {
  const cached = localStorage.getItem(LOCAL_STORAGE_OFFERS_KEY);
  if (!cached) {
    localStorage.setItem(LOCAL_STORAGE_OFFERS_KEY, JSON.stringify(INITIAL_OFFERS));
    return [...INITIAL_OFFERS];
  }
  try {
    return JSON.parse(cached);
  } catch {
    localStorage.setItem(LOCAL_STORAGE_OFFERS_KEY, JSON.stringify(INITIAL_OFFERS));
    return [...INITIAL_OFFERS];
  }
};

const saveLocalOffers = (offers) => {
  localStorage.setItem(LOCAL_STORAGE_OFFERS_KEY, JSON.stringify(offers));
};

/**
 * Fetch all festival offers
 */
export const getFestivalOffers = async (includeInactive = true) => {
  if (isFirebaseConfigured() && db) {
    try {
      const snap = await getDocs(collection(db, COLLECTION_NAME));
      let list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));

      if (list.length === 0) {
        for (const offer of INITIAL_OFFERS) {
          const { id, ...data } = offer;
          await setDoc(doc(db, COLLECTION_NAME, id), data);
        }
        const fresh = await getDocs(collection(db, COLLECTION_NAME));
        list = fresh.docs.map((d) => ({ id: d.id, ...d.data() }));
      }

      if (!includeInactive) {
        list = list.filter((o) => o.isActive !== false);
      }
      return list;
    } catch (err) {
      console.warn("[OfferService] Firestore read failed, using local offers:", err.message);
    }
  }

  let localList = getLocalOffers();
  if (!includeInactive) {
    localList = localList.filter((o) => o.isActive !== false);
  }
  return localList;
};

/**
 * Update an existing offer
 */
export const updateFestivalOffer = async (id, updatedData) => {
  if (!id) throw new Error("Offer ID is required.");

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, updatedData);
      return { id, ...updatedData };
    } catch (err) {
      console.warn("[OfferService] Firestore update failed, fallback to local:", err.message);
    }
  }

  const list = getLocalOffers();
  const index = list.findIndex((o) => o.id === id);
  if (index !== -1) {
    list[index] = { ...list[index], ...updatedData };
    saveLocalOffers(list);
    return list[index];
  }
  throw new Error(`Offer with ID "${id}" was not found.`);
};
