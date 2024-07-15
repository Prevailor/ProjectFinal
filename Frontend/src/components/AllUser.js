// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import UpdateRoleService from "../services/UpdateRoleService";
 
// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
 
//   useEffect(() => {
//     fetchUsers();
//   }, []);
 
//   const fetchUsers = async () => {
//     try {
//       const response = await UpdateRoleService.getalluser();
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
 
//   return (
//     <div className="container mt-5">
//       <h2>User List</h2>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>{user.role.name}</td>
//               <td>
//                 <Link to={`/admin/updateuserrole-management/${user.id}`} className="btn btn-primary">
//                   Update Role
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
 
// export default AllUsers;
 

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UpdateRoleService from "../services/UpdateRoleService";
 
// const AllUsers = () => {
//   const [users, setUsers] = useState([]);
 
//   useEffect(() => {
//     fetchUsers();
//   }, []);
 
//   const fetchUsers = async () => {
//     try {
//       const response = await UpdateRoleService.getalluser();
//       setUsers(response.data);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
 
//   return (
//     <div className="container mt-5">
//       <h2>User List</h2>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Username</th>
//             <th>Email</th>
//             <th>Role</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr key={user.id}>
//               <td>{user.id}</td>
//               <td>{user.username}</td>
//               <td>{user.email}</td>
//               <td>{user.role ? user.role.name : "N/A"}</td> {/* Conditional rendering for user role */}
//               <td>
//                 <Link to={`/admin/updateuserrole-management/${user.id}`} className="btn btn-primary">
//                   Update Role
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
 
// export default AllUsers;

const AllUsers = () => {
  const [users, setUsers] = useState([]); // Initialize users state as an empty array
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UpdateRoleService.getalluser();
        setUsers(response.data); // Assuming response.data is an array of users
        setLoading(false); // Set loading state to false once data is fetched
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again later."); // Set error state in case of error
        setLoading(false); // Ensure loading state is managed in case of error
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message if there's an error
  }

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role ? user.role.name : "N/A"}</td> {/* Conditional rendering for user role */}
              <td>
                <Link to={`/admin/updateuserrole-management/${user.id}`} className="btn btn-primary">
                  Update Role
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;