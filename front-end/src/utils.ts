// src/utils/api.js

async function fetchWithAuth(url: string, options: any = {}) {
  const token = sessionStorage.getItem("sessionId"); // or from localStorage, cookies, etc.

  const mergedOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // or `uid ${token}` if you're not using JWT
    },
  };

  const res = await fetch(url, mergedOptions);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export { fetchWithAuth };
