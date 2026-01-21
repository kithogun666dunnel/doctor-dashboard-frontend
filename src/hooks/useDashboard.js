// import { useEffect, useState } from "react";
// import { fetchDashboard, fetchClosedCases, closeCase } from "../api/doctor.api";

// export default function useDashboard() {
//   const [emergencyCases, setEmergencyCases] = useState([]);
//   const [normalCases, setNormalCases] = useState([]);
//   const [closedCases, setClosedCases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   async function loadDashboard() {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await fetchDashboard();
//       setEmergencyCases(res.data.emergencyCases);
//       setNormalCases(res.data.normalCases);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function loadClosed() {
//     const res = await fetchClosedCases();
//     setClosedCases(res.data.cases);
//   }

//   async function closeById(id) {
//     await closeCase(id);
//     await loadDashboard();
//     await loadClosed();
//   }

//   useEffect(() => {
//     loadDashboard();
//     loadClosed();
//     const interval = setInterval(() => {
//       loadDashboard();
//       loadClosed();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   return {
//     emergencyCases,
//     normalCases,
//     closedCases,
//     loading,
//     error,
//     closeById,
//   };
// }

import { useEffect, useState } from "react";
import { getCases, closeCaseById } from "../api/doctor.api";

export default function useDashboard() {
  const [activeTab, setActiveTab] = useState("OPEN");
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCases = async (status) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getCases(status);
      setCases(data);
    } catch (e) {
      setError("Failed to load cases");
    } finally {
      setLoading(false);
    }
  };

  const closeCase = async (id) => {
    // optimistic UI
    setCases((prev) => prev.filter((c) => c._id !== id));

    try {
      await closeCaseById(id);
    } catch (e) {
      fetchCases("OPEN"); // rollback
    }
  };
  const emergencyCases = cases.filter((c) => c.severity === "EMERGENCY");

  const normalCases = cases.filter((c) => c.severity !== "EMERGENCY");

  useEffect(() => {
    fetchCases(activeTab);
  }, [activeTab]);

  return {
    activeTab,
    setActiveTab,
    cases,
    emergencyCases,
    normalCases,
    loading,
    error,
    closeCase,
  };
}
