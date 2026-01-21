import useDashboard from "../hooks/useDashboard";
import CaseCard from "../components/CaseCard";

export default function Dashboard() {
    const {
        activeTab,
        setActiveTab,
        cases,
        emergencyCases,
        normalCases,
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

            {activeTab === "OPEN" && (
                <>
                    <h3>
                        Emergency{" "}
                        <span style={{ opacity: 0.6 }}>
                            ({emergencyCases.length})
                        </span>
                    </h3>

                    {emergencyCases.length === 0 && <p>No emergency cases</p>}
                    {emergencyCases.map((c) => (
                        <CaseCard
                            key={c._id}
                            data={c}
                            showClose
                            onClose={closeCase}
                        />
                    ))}

                    <h3>
                        Normal{" "}
                        <span style={{ opacity: 0.6 }}>
                            ({normalCases.length})
                        </span>
                    </h3>

                    {normalCases.length === 0 && <p>No normal cases</p>}
                    {normalCases.map((c) => (
                        <CaseCard
                            key={c._id}
                            data={c}
                            showClose
                            onClose={closeCase}
                        />
                    ))}
                </>
            )}

            {activeTab === "CLOSED" && (
                <>
                    {cases.length === 0 && <p>No cases found</p>}
                    {cases.map((c) => (
                        <CaseCard
                            key={c._id}
                            data={c}
                            showClose={false}
                        />
                    ))}
                </>
            )}


        </div>
    );
}
