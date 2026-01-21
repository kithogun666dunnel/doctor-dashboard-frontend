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
import useVisibility from "./useVisibility";

export default function useDashboard() {
  const [activeTab, setActiveTab] = useState("OPEN");
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isVisible = useVisibility();

  const fetchCases = async (status, showLoader = true) => {
    try {
      if (showLoader) setLoading(true);
      setError(null);
      const data = await getCases(status);
      setCases(data);
    } catch (_) {
      setError("Failed to load cases");
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  const closeCase = async (id) => {
    // optimistic UI
    setCases((prev) => prev.filter((c) => c._id !== id));

    try {
      await closeCaseById(id);
    } catch (_) {
      fetchCases("OPEN", true); // rollback
    }
  };

  // 🔥 LAYER 4.5 — DOCTOR OVERRIDE HAS PRIORITY
  const isEmergency = (c) =>
    c.overrideSeverity
      ? c.overrideSeverity === "EMERGENCY"
      : c.severity === "EMERGENCY";

  const emergencyCases = cases.filter(isEmergency);
  const normalCases = cases.filter((c) => !isEmergency(c));

  useEffect(() => {
    // fetch on tab switch
    fetchCases(activeTab, true);

    // poll only when OPEN tab + page visible
    if (!isVisible || activeTab !== "OPEN") return;

    const interval = setInterval(() => {
      fetchCases("OPEN", false); // silent polling
    }, 15000);

    return () => clearInterval(interval);
  }, [activeTab, isVisible]);

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
