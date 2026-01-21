const BASE_URL = "http://localhost:3000/api";

export const getCases = async (status) => {
  const res = await fetch(`${BASE_URL}/cases?status=${status}`);
  return res.json();
};

export const closeCaseById = async (id) => {
  return fetch(`${BASE_URL}/cases/${id}/close`, {
    method: "POST",
  });
};

export const updateCaseNotes = async (id, notes) => {
  return fetch(`${BASE_URL}/cases/${id}/notes`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ notes }),
  });
};
export const updateCaseOverride = async (id, overrideSeverity) => {
  return fetch(`${BASE_URL}/cases/${id}/override`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ overrideSeverity }),
  });
};

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

export async function fetchClosedCases({ page = 1, limit = 10 } = {}) {
  const res = await fetch(
    `http://localhost:3000/api/doctor/cases/closed?page=${page}&limit=${limit}`,
  );
  if (!res.ok) throw new Error("Failed to fetch closed cases");
  return res.json();
}
