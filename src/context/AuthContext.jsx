import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase";

// Email → base role (fallback when no override is selected)
const deriveBaseRole = (email) => {
  if (!email) return "EMPLOYEE";
  const lower = email.toLowerCase();

  if (lower.includes("admin")) return "MANAGEMENT_ADMIN";
  if (lower.includes("manager") || lower.includes("lead")) return "SENIOR_MANAGER";
  if (lower.includes("hr") || lower.includes("recruit")) return "HR_RECRUITER";

  return "EMPLOYEE";
};

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Role that comes from email / backend
  const [baseRole, setBaseRole] = useState(null);

  // UI override for testing (MANAGEMENT_ADMIN / SENIOR_MANAGER / HR_RECRUITER / EMPLOYEE)
  const [overrideRole, setOverrideRole] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser?.email) {
        const derived = deriveBaseRole(firebaseUser.email);
        setBaseRole(derived);
      } else {
        setBaseRole(null);
      }

      // keep overrideRole as-is; this is user-selected in UI
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setOverrideRole(null); // clear override on logout
  };

  // Effective role used by the rest of the app
  const role = overrideRole || baseRole;

  const value = {
    user,
    role,
    baseRole,        // optional: if you want to show what backend thinks
    overrideRole,
    setOverrideRole, // we'll use this in the header dropdown
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};
