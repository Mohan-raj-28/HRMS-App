import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8200";

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`${API_BASE}/api/employee/dashboard?email=${user.email}`)
      .then(r => r.json())
      .then(setData)
      .catch(() => setData({ error: "Failed to load dashboard" }));
  }, [user?.email]);

  if (!data) return <div>Loading...</div>;
  if (data.error) return <div style={{ color: "red" }}>{data.error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Welcome, {data.name}</h2>

      <section>
        <h3>Attendance</h3>
        <p>{data.attendance?.length} days recorded</p>
      </section>

      <section>
        <h3>Leaves</h3>
        <p>{data.leaves?.length} leave requests</p>
      </section>

      <section>
        <h3>Payroll</h3>
        <p>Latest payout: {data.payroll?.at(-1)?.amount ?? "N/A"}</p>
      </section>

      <section>
        <h3>Performance</h3>
        <p>Rating: {data.performance?.rating ?? "Not reviewed yet"}</p>
      </section>
    </div>
  );
};

export default EmployeeDashboard;
