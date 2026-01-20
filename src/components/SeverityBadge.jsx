export default function SeverityBadge({ severity }) {
    const isEmergency = severity === 2;

    return (
        <span
            className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold text-white
      ${isEmergency ? "bg-red-600" : "bg-green-600"}`}
        >
            {isEmergency ? "EMERGENCY" : "NORMAL"}
        </span>
    );
}
