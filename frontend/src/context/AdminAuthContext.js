"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { loginAdmin, fetchCurrentAdmin, logoutAdmin } from "@/lib/api/auth";
import { getToken, setToken, clearToken } from "@/lib/adminAuth";

const AdminAuthContext = createContext(null);

/**
 * Wraps the whole /admin subtree (see app/admin/layout.js). Hydrates the
 * admin session from a stored JWT on mount, and exposes login/logout for
 * the rest of the dashboard.
 */
export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | authenticated | guest

  useEffect(() => {
    const token = getToken();
    if (!token) {
      // No token to verify — resolve synchronously to "guest" immediately.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStatus("guest");
      return;
    }
    fetchCurrentAdmin()
      .then((data) => {
        setAdmin(data);
        setStatus("authenticated");
      })
      .catch(() => {
        clearToken();
        setStatus("guest");
      });
  }, []);

  const login = useCallback(async (email, password) => {
    const { token, admin: adminData } = await loginAdmin(email, password);
    setToken(token);
    setAdmin(adminData);
    setStatus("authenticated");
    return adminData;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
    } catch {
      // Clearing the local token is enough even if the network call fails.
    }
    clearToken();
    setAdmin(null);
    setStatus("guest");
  }, []);

  const value = useMemo(
    () => ({ admin, status, isAuthenticated: status === "authenticated", login, logout }),
    [admin, status, login, logout]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within an AdminAuthProvider.");
  return ctx;
}
