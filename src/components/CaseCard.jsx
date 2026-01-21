import { useState } from "react";
import { updateCaseNotes, updateCaseOverride } from "../api/doctor.api";


export default function CaseCard({ data, showClose, onClose }) {
    const [notes, setNotes] = useState(data.notes || "");
    const [saving, setSaving] = useState(false);

    const saveNotes = async () => {
        setSaving(true);
        await updateCaseNotes(data._id, notes);
        setSaving(false);
    };

    return (
        <div style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
            <p>Status: {data.status}</p>

            <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Doctor notes..."
                rows={3}
            />

            <button onClick={saveNotes} disabled={saving}>
                {saving ? "Saving..." : "Save Notes"}
            </button>

            {showClose && (
                <button onClick={() => onClose(data._id)}>
                    Mark as Closed
                </button>
            )}

            <button onClick={() => updateCaseOverride(data._id, "EMERGENCY")}>
                Mark Emergency
            </button>

            <button onClick={() => updateCaseOverride(data._id, "NORMAL")}>
                Mark Normal
            </button>

        </div>
    );
}
