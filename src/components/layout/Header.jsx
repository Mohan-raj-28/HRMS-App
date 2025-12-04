import React from "react";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, role, baseRole, overrideRole, setOverrideRole, logout } = useAuth();

  const handleRoleChange = (e) => {
    const value = e.target.value;
    // empty string → clear override → fall back to baseRole
    setOverrideRole(value === "" ? null : value);
  };

  return (
    <header
      style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.5rem",
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
      }}
    >
      {/* Left: Logo + App name */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#1d4ed8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          H
        </div>
        <div>
          <div style={{ fontWeight: 700 }}>HRMS</div>
          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
            Smart Talent & Employee Hub
          </div>
        </div>
      </div>

      {/* Right: user + role switcher + logout */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* User info */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            {user?.email ?? "Guest"}
          </div>
          <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
            Role: {role ?? "UNASSIGNED"}
          </div>
          {baseRole && overrideRole && (
            <div style={{ fontSize: "0.7rem", color: "#9ca3af" }}>
              Base: {baseRole}
            </div>
          )}
        </div>

        {/* Role switcher + Logout */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <select
            value={overrideRole || ""}
            onChange={handleRoleChange}
            className="role-dropdown"
          >
            <option value="">Role: Auto ({baseRole || "none"})</option>
            <option value="MANAGEMENT_ADMIN">Management Admin</option>
            <option value="SENIOR_MANAGER">Senior Manager</option>
            <option value="HR_RECRUITER">HR Recruiter</option>
            <option value="EMPLOYEE">Employee</option>
          </select>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
