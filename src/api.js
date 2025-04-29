const API_BASE = "https://newsbe-mzva.onrender.com/api";

export const fetchNews = async () => {
  const res = await fetch(`${API_BASE}/news`);
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid Credentials");
  return res.json();
};
