import SeverityBadge from "./SeverityBadge";

export default function CaseCard({ c, onClose, faded = false }) {
    return (
        <div
            className={`mb-3 rounded-lg border p-4 shadow-sm
      ${faded ? "bg-gray-50 opacity-70" : "bg-white"}`}
        >
            <div className="flex justify-between items-center">
                <div className="font-semibold">
                    {c.patientName}
                    <SeverityBadge severity={c.severity} />
                </div>

                {onClose && (
                    <button
                        onClick={() => onClose(c._id)}
                        className="bg-gray-900 hover:bg-gray-700 px-3 py-1 rounded text-white text-sm"
                    >
                        Close
                    </button>
                )}
            </div>

            <p className="mt-2 text-gray-700">{c.complaint}</p>

            <div className="mt-2 text-gray-500 text-xs">
                {new Date(c.createdAt).toLocaleString()}
            </div>
        </div>
    );
}
