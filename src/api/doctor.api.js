const BASE_URL = "http://localhost:3000";

export async function fetchDashboard({ page = 1, limit = 10 } = {}) {
  const res = await fetch(
    `${BASE_URL}/api/doctor/dashboard?page=${page}&limit=${limit}`,
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to fetch dashboard");
  }

  return res.json();
}

export async function closeCase(caseId) {
  const res = await fetch(`${BASE_URL}/api/doctor/cases/${caseId}/close`, {
    method: "PATCH",
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to close case");
  }

  return res.json();
}
