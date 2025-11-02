const API_BASE = "http://localhost:5000"; // replace with your backend URL

export async function getUser(email) {
  try {
    const response = await fetch(`${API_BASE}/users/${email}`);
    if (!response.ok) throw new Error("User not found");
    return await response.json();
  } catch (err) {
    console.error("getUser error:", err);
    return null;
  }
}

export async function setUser(userData) {
  try {
    const response = await fetch(`${API_BASE}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("Failed to create user");
    return await response.json();
  } catch (err) {
    console.error("setUser error:", err);
    return null;
  }
}
