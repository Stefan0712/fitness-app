import axios from "axios";

// Logout function returns a boolean status
export const logoutUser = async () => {
  let frontendCleared = false;
  let backendCleared = false;

  // Clear localStorage
  try {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    frontendCleared = true;
  } catch (e) {
    console.error("Failed to clear local storage", e);
  }

  // Invalidate session/cookie
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/logout`, null, {
      withCredentials: true,
    });
    backendCleared = true;
  } catch (err) {
    console.error("Backend logout failed", err);
  }

  // Return success status
  return {local: frontendCleared, api: backendCleared};
};
export const isLoggedIn = () => {
  const userId = localStorage.getItem("userId");
  return Boolean(userId);
};