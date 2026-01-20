import { useEffect, useState } from "react";
import { fetchDashboard, closeCase } from "../api/doctor.api";

export default function Dashboard() {
    const [emergencyCases, setEmergencyCases] = useState([]);
    const [normalCases, setNormalCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function loadDashboard() {
        try {
            setLoading(true);
            setError(null);

            const res = await fetchDashboard();
            setEmergencyCases(res.data.emergencyCases);
            setNormalCases(res.data.normalCases);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleClose(caseId) {
        try {
            await closeCase(caseId);
            await loadDashboard(); // 🔁 re-fetch (backend = source of truth)
        } catch (err) {
            alert(err.message);
        }
    }

    useEffect(() => {
        loadDashboard();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>🚨 Emergency Cases</h2>
            {emergencyCases.map((c) => (
                <div key={c._id}>
                    <b>{c.patientName}</b> — {c.complaint}
                    <button onClick={() => handleClose(c._id)}>Close</button>
                </div>
            ))}

            <h2 style={{ marginTop: 30 }}>🟢 Normal Cases</h2>
            {normalCases.map((c) => (
                <div key={c._id}>
                    <b>{c.patientName}</b> — {c.complaint}
                    <button onClick={() => handleClose(c._id)}>Close</button>
                </div>
            ))}
        </div>
    );
}
