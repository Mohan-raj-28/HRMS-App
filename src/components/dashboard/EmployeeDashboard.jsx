import React from "react";

const Card = ({ title, value, subtitle }) => (
  <div
    style={{
      padding: "1rem",
      borderRadius: "0.75rem",
      background: "#ffffff",
      boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
      flex: 1,
      minWidth: "180px",
    }}
  >
    <div style={{ fontSize: "0.8rem", color: "#6b7280" }}>{title}</div>
    <div style={{ marginTop: "0.35rem", fontSize: "1.2rem", fontWeight: 700 }}>
      {value}
    </div>
    {subtitle && (
      <div style={{ marginTop: "0.25rem", fontSize: "0.75rem", color: "#9ca3af" }}>
        {subtitle}
      </div>
    )}
  </div>
);

const EmployeeDashboard = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <section style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Card title="My Attendance (This Month)" value="95%" subtitle="Excellent consistency" />
        <Card title="Leaves Remaining" value="7" subtitle="3 Casual · 4 Sick" />
        <Card title="Last Payroll" value="₹ 75,000" subtitle="Credited on 30 Nov" />
      </section>

      <section
        style={{
          padding: "1rem",
          borderRadius: "0.75rem",
          background: "#ffffff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>My Recent Activity</div>
        <ul style={{ fontSize: "0.85rem", color: "#4b5563", paddingLeft: "1rem" }}>
          <li>✅ Checked in at 9:01 AM today</li>
          <li>✅ Performance review for Q3 completed</li>
          <li>🕒 Leave request pending approval (12–13 Dec)</li>
        </ul>
      </section>

      <section
        style={{
          padding: "1rem",
          borderRadius: "0.75rem",
          background: "#ffffff",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>My Performance Trend</div>
        <div
          style={{
            borderRadius: "0.5rem",
            border: "1px dashed #d1d5db",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem",
            color: "#9ca3af",
          }}
        >
          [Personal Performance Chart Placeholder]
        </div>
      </section>
    </div>
  );
};

export default EmployeeDashboard;
