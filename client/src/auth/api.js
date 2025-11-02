const API_BASE = "http://localhost:5000";

/* Helper to get the auth token from localStorage */
function getAuthToken() {
  return localStorage.getItem("token");
}

/* Signup */
export async function signupUser(userData) {
  try {
    const response = await fetch(`${API_BASE}/users/signup`, {  // <-- add /signup
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to signup");
    }

    return await response.json();
  } catch (err) {
    console.error("signupUser error:", err);
    return null;
  }
}


/* Login */
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Invalid email or password");
    }

    const data = await response.json();

    // Save token and user to localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return data; // { user, token }
  } catch (err) {
    console.error("loginUser error:", err);
    return null;
  }
}

/* Get user by email (protected) */
export async function getUserByEmail(email) {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_BASE}/users/email/${email}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "User not found");
    }

    return await response.json();
  } catch (err) {
    console.error("getUserByEmail error:", err);
    return null;
  }
}

/* Get all users (protected) */
export async function getAllUsers() {
  try {
    const token = getAuthToken();
    if (!token) throw new Error("Not authenticated");

    const response = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch users");
    }

    return await response.json();
  } catch (err) {
    console.error("getAllUsers error:", err);
    return null;
  }
}

/* Logout */
export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
