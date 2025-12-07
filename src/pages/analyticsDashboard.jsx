import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Chart from "react-apexcharts";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8200";

const AnalyticsDashboard = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState({});
  const [hiringFunnel, setHiringFunnel] = useState([]);
  const [department, setDepartment] = useState([]);

  const fetchData = async () => {
    const token = user?.token;
    setSummary(await (await fetch(`${API}/api/analytics/summary`, { headers:{Authorization:`Bearer ${token}`} })).json());
    setHiringFunnel(await (await fetch(`${API}/api/analytics/hiring-funnel`, { headers:{Authorization:`Bearer ${token}`} })).json());
    setDepartment(await (await fetch(`${API}/api/analytics/by-department`, { headers:{Authorization:`Bearer ${token}`} })).json());
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Analytics Overview</h2>

      <div className="analytics-cards">
        <div className="card">Total Employees: {summary.totalEmployees}</div>
        <div className="card">Hired This Month: {summary.hiredThisMonth}</div>
        <div className="card">Active Hiring: {summary.activeHiring}</div>
        <div className="card">Total Applicants: {summary.applicants}</div>
      </div>

      <div className="charts-row">
        <Chart
          type="pie"
          width="400"
          series={hiringFunnel.map(x => x.count)}
          options={{ labels: hiringFunnel.map(x => x._id), title:{text:"Hiring Funnel"} }}
        />

        <Chart
          type="bar"
          width="450"
          series={[{ data: department.map(x => x.count) }]}
          options={{ xaxis:{ categories: department.map(x => x._id) }, title:{text:"Employees by Department"} }}
        />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
