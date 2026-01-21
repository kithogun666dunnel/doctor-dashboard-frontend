import useDashboard from "../hooks/useDashboard";
import CaseCard from "../components/CaseCard";

export default function Dashboard() {
    const {
        activeTab,
        setActiveTab,
        cases,
        loading,
        closeCase,
    } = useDashboard();

    return (
        <div>
            {/* Tabs */}
            <div style={{ marginBottom: "12px" }}>
                <button
                    onClick={() => setActiveTab("OPEN")}
                    style={{ fontWeight: activeTab === "OPEN" ? "bold" : "normal" }}
                >
                    Open
                </button>

                <button
                    onClick={() => setActiveTab("CLOSED")}
                    style={{ fontWeight: activeTab === "CLOSED" ? "bold" : "normal" }}
                >
                    Closed
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {/* {e && <p style={{ color: "red" }}>{e}</p>} */}

            {!loading && cases.length === 0 && (
                <p>No cases found</p>
            )}

            {cases.map((c) => (
                <CaseCard
                    key={c._id}
                    data={c}
                    showClose={activeTab === "OPEN"}
                    onClose={closeCase}
                />
            ))}
        </div>
    );
}
