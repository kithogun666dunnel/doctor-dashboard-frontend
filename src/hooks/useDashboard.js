import { useEffect, useState } from "react";
import { fetchDashboard, fetchClosedCases, closeCase } from "../api/doctor.api";

export default function useDashboard() {
  const [emergencyCases, setEmergencyCases] = useState([]);
  const [normalCases, setNormalCases] = useState([]);
  const [closedCases, setClosedCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadDashboard() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchDashboard();
      setEmergencyCases(res.data.emergencyCases);
      setNormalCases(res.data.normalCases);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function loadClosed() {
    const res = await fetchClosedCases();
    setClosedCases(res.data.cases);
  }

  async function closeById(id) {
    await closeCase(id);
    await loadDashboard();
    await loadClosed();
  }

  useEffect(() => {
    loadDashboard();
    loadClosed();
    const interval = setInterval(() => {
      loadDashboard();
      loadClosed();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return {
    emergencyCases,
    normalCases,
    closedCases,
    loading,
    error,
    closeById,
  };
}
