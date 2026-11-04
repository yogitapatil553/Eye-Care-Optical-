import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "../firebase/config";

const LOCAL_STORAGE_AUTH_KEY = "eyecare_admin_auth_user";

// Default admin allowlist (can be overridden by VITE_ADMIN_EMAILS env variable comma-separated)
const ENV_ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/**
 * Checks whether an email is an authorized administrator
 */
export const checkIsAdmin = async (email, uid = null) => {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();

  // 1. Check environment variable allowlist if configured
  if (ENV_ADMIN_EMAILS.length > 0 && ENV_ADMIN_EMAILS.includes(cleanEmail)) {
    return true;
  }

  // 2. Check Firestore "admins" collection if Firebase configured
  if (isFirebaseConfigured() && db && uid) {
    try {
      const adminDocRef = doc(db, "admins", uid);
      const snap = await getDoc(adminDocRef);
      if (snap.exists() && snap.data()?.isAdmin === true) {
        return true;
      }
    } catch (err) {
      console.warn("[Auth] Error reading admin collection:", err.message);
    }
  }

  // 3. Fallback for offline demo mode or if no env allowlist specified
  if (cleanEmail === "admin@eyecareoptical.com" || cleanEmail === "admin") {
    return true;
  }

  // If ENV_ADMIN_EMAILS is not set, allow signed-in users on Firebase or local dev
  if (ENV_ADMIN_EMAILS.length === 0) {
    return true;
  }

  return false;
};

/**
 * Sign in admin user
 */
export const loginAdmin = async (email, password) => {
  if (!email || !password) {
    throw new Error("Please enter both email and password.");
  }

  const cleanEmail = email.trim();

  // If Firebase Auth is configured
  if (isFirebaseConfigured() && auth) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, cleanEmail, password);
      const user = userCredential.user;
      const authorized = await checkIsAdmin(user.email, user.uid);
      if (!authorized) {
        await signOut(auth);
        throw new Error("Access denied: Your account is not authorized as an Administrator.");
      }
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "Store Administrator",
        isAdmin: true
      };
    } catch (firebaseErr) {
      if (firebaseErr.code === "auth/invalid-credential" || firebaseErr.code === "auth/user-not-found" || firebaseErr.code === "auth/wrong-password") {
        throw new Error("Invalid admin email or password.");
      }
      throw new Error(firebaseErr.message || "Failed to sign in.");
    }
  }

  // Fallback / Offline development mode:
  // Allows testing the admin portal locally without internet/Firebase setup
  if ((cleanEmail.toLowerCase() === "admin@eyecareoptical.com" || cleanEmail === "admin") && password === "eyecare123") {
    const localUser = {
      uid: "local-admin-01",
      email: "admin@eyecareoptical.com",
      displayName: "Eye Care Administrator",
      isAdmin: true
    };
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(localUser));
    return localUser;
  }

  throw new Error("Invalid username/email or password. (For local testing, use: admin@eyecareoptical.com / eyecare123)");
};

/**
 * Logout admin
 */
export const logoutAdmin = async () => {
  if (isFirebaseConfigured() && auth) {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn("[Auth] Firebase signout error:", err);
    }
  }
  localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
};

/**
 * Get currently authenticated admin user
 */
export const getCurrentAdminUser = () => {
  if (isFirebaseConfigured() && auth && auth.currentUser) {
    return {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      displayName: auth.currentUser.displayName || "Administrator",
      isAdmin: true
    };
  }
  const cached = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
    }
  }
  return null;
};

/**
 * Subscribe to auth state changes
 */
export const subscribeToAuthChanges = (callback) => {
  if (isFirebaseConfigured() && auth) {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isAdmin = await checkIsAdmin(user.email, user.uid);
        if (isAdmin) {
          callback({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || "Administrator",
            isAdmin: true
          });
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }

  // For offline/local storage:
  const localUser = getCurrentAdminUser();
  callback(localUser);
  return () => {};
};
