export default function CaseCard({ data, showClose, onClose }) {
    return (
        <div style={{ border: "1px solid #ccc", padding: "8px", marginBottom: "8px" }}>
            <p>Status: {data.status}</p>
            <p>{new Date(data.updatedAt).toLocaleString()}</p>

            {showClose && (
                <button onClick={() => onClose(data._id)}>
                    Mark as Closed
                </button>
            )}
        </div>
    );
}
