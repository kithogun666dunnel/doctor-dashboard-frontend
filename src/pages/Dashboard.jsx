import CaseCard from "../components/CaseCard";
import useDashboard from "../hooks/useDashboard";

export default function Dashboard() {
    const {
        emergencyCases,
        normalCases,
        closedCases,
        loading,
        error,
        closeById,
    } = useDashboard();

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="mx-auto p-6 max-w-3xl">
            <h2 className="mb-2 font-bold text-lg">🚨 Emergency Cases</h2>
            {emergencyCases.map((c) => (
                <CaseCard key={c._id} c={c} onClose={closeById} />
            ))}

            <h2 className="mt-6 mb-2 font-bold text-lg">🟢 Normal Cases</h2>
            {normalCases.map((c) => (
                <CaseCard key={c._id} c={c} onClose={closeById} />
            ))}

            <h2 className="mt-6 mb-2 font-bold text-lg">📁 Closed Cases</h2>
            {closedCases.length === 0 && (
                <p className="text-gray-500 text-sm">No closed cases</p>
            )}
            {closedCases.map((c) => (
                <CaseCard key={c._id} c={c} faded />
            ))}
        </div>
    );
}
