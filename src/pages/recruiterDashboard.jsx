import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8200";

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [candidates, setCandidates] = useState(null);

  const fetchCandidates = () => {
    fetch(`${API_BASE}/api/recruiter/candidates?email=${user?.email}`)
      .then(r => r.json())
      .then(setCandidates)
      .catch(() => setCandidates({ error: "Failed to load candidates" }));
  };

  useEffect(() => {
    if (user?.email) fetchCandidates();
  }, [user?.email]);

  const updateStage = async (candidateId, stage) => {
    await fetch(`${API_BASE}/api/recruiter/update-stage`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateId, stage })
    });
    fetchCandidates();
  };

  if (!candidates) return <div>Loading...</div>;
  if (candidates.error) return <div style={{ color: "red" }}>{candidates.error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Recruitment Dashboard ({candidates.count} candidates)</h2>

      <table style={{ width: "100%", marginTop: "1rem", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f3f4f6" }}>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Stage</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {candidates.candidates.map((c) => (
            <tr key={c._id} style={{ borderBottom: "1px solid #ddd" }}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.role}</td>
              <td>{c.stage}</td>
              <td>
                <select
                  value={c.stage}
                  onChange={(e) => updateStage(c._id, e.target.value)}
                >
                  <option>Applied</option>
                  <option>Screened</option>
                  <option>Interview</option>
                  <option>Offered</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruiterDashboard;
