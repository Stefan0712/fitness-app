import axios from "axios";


export const logoutUser = async () => {

    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/logout`, {withCredentials: true});
        
        console.log("Cookie removed");
    } catch (err) {
        console.error('Logout failed', err);
    }
};