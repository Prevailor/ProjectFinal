

import React, { useState, useEffect } from "react";
import UpdateRoleService from "../services/UpdateRoleService";
import 'D:\\ProjectFinal\\Frontend\\src\\UpdateUserRole.css'

const UpdateUserRole = () => {
  const [selectedUserId, setSelectedUserId] = useState(""); // State for selected user ID
  const [selectedRole, setSelectedRole] = useState(""); // State for selected role ID
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await UpdateRoleService.getalluser();
        setUsers(usersResponse.data);

        const rolesResponse = await UpdateRoleService.getallrole();
        setRoles(rolesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (!selectedUserId || !selectedRole) {
        throw new Error("Please select a user and a role.");
      }

      const response = await UpdateRoleService.updaterolebyuser(
        selectedUserId,
        selectedRole
      );

      console.log("Update Role Response:", response.data);
      alert("Role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      setError("An error occurred while updating the role.");
    }
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
  };

  const handleRoleChange = (e) => {
    const roleId = e.target.value;
    setSelectedRole(roleId);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="cards p-4 rounded">
            <h2 className="mb-4 underline-title">Update User Role</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>User:</label>
                <select
                  className="form-control"
                  value={selectedUserId}
                  onChange={handleUserChange}
                  required
                >
                  <option value="">Select a User</option>
                  {users.map((user) => (
                    <option key={user.userId} value={user.userId}>
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Role:</label>
                <select
                  className="form-control"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  required
                >
                  <option value="">Select a Role</option>
                  {roles.map((role) => (
                    <option key={role.roleId} value={role.roleId}>
                      {role.roleName}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primaryy">
                Update Role
              </button>
            </form>
            {message && <div className="mt-3 alert alert-info">{message}</div>}
            {error && <div className="mt-3 alert alert-danger">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserRole;