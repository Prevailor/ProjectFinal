

import axios from "axios";
import authHeader from "./auth-header";

const ADMIN_URL = "http://localhost:8080/api/admin";

const updaterolebyuser = (userId, roleId) => {
  const data = {
    userId: userId,
    roleId: roleId,
    // Set other attributes to null if necessary
    username: null,
    email: null,
    role: null,
    password: null,
    devices: [],
    notifications: []
  };

  return axios.put(`${ADMIN_URL}/users/updaterole?userId=${userId}`, data, {
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
  });
};

const getalluser = () => {
  return axios.get(`${ADMIN_URL}/getallusers`, {
    headers: {
      ...authHeader(),
    },
  });
};

const getallrole = () => {
  return axios.get(`${ADMIN_URL}/getallroles`, {
    headers: {
      ...authHeader(),
    },
  });
};

const UpdateRoleService = {
  updaterolebyuser,
  getalluser,
  getallrole,
};

export default UpdateRoleService;
