const BASE_URL = "http://localhost:5000/api";

export const getNews = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/news${token ? "/personalized" : ""}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!res.ok) {
      throw new Error("Failed to fetch");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
