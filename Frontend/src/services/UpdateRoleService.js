import axios from "axios";
import authHeader from "./auth-header";
 
const BASE_URL = "http://localhost:8080/api/admin";
 
const updateUserRole = async (userId, newRole) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/updaterole`, {
        userId: userId,
        role: newRole
      }, {
        headers: authHeader()
      });
      return response.data;
    } catch (err) {
      throw err;
    }
};
 
 
 const UpdateRoleService={
    updateUserRole,
 
 };
 
 export default UpdateRoleService;