

 import React, { useState, useEffect } from "react";
 import "D:\\ProjectFinal\\Frontend\\src\\BoardAdmin.css";

// const BoardAdmin = () => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleDropdownChange = (event) => {
//     const selectedPage = event.target.value;
//     setSelectedOption(selectedPage);

//     switch (selectedPage) {
//       case "device":
//         window.location.href = "/admin/device-management";
//         break;
//       case "software":
//         window.location.href = "/admin/software-management";
//         break;
//       case "lifecycleEvent":
//         window.location.href = "/admin/lifecycleEvent-management";
//         break;
//       case "updateuserrole":
//         window.location.href = "/admin/updateuserrole-management";
//         break;
//       case "updatedeviceform":
//         window.location.href = "/admin/updatedeviceform";
//         break;
//       case "deletedeviceform":
//         window.location.href = "/admin/deletedeviceform";
//         break;
//         case "alluser":
//           window.location.href = "/admin/allusers";
//           break;
//       default:
//         // Handle default case if needed
//         break;
//     }
//   };

//   return (
//     <div className="admin-container">
//       <header className="admin-header jumbotron">
//       <h1 className="admin-heading">Admin Dashboard</h1>
//         <label htmlFor="crud" className="admin-dropdown-label">CRUD operations:</label>
//         <select id="crud" className="admin-form-select form-select" value={selectedOption} onChange={handleDropdownChange}>
//           <option value="">Select an option</option>
//           <option value="device">Device Management</option>
//           <option value="software">Software Management</option>
//           <option value="lifecycleEvent">Lifecycle Event Management</option>
//           {/* <option value="alluser">All Users</option> */}
//           <option value="updateuserrole">Update User Role</option>
//           <option value="updatedeviceform">Update Device Form</option>
//           <option value="deletedeviceform">Delete Device Form</option>
//         </select>
//       </header>
//     </div>
//   );
// };

// export default BoardAdmin;

// const BoardAdmin = () => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleDropdownChange = (event) => {
//     const selectedPage = event.target.value;
//     setSelectedOption(selectedPage);

//     switch (selectedPage) {
//       case "device":
//         window.location.href = "/admin/device-management";
//         break;
//       case "software":
//         window.location.href = "/admin/software-management";
//         break;
//       case "lifecycleEvent":
//         window.location.href = "/admin/lifecycleEvent-management";
//         break;
//       case "updateuserrole":
//         window.location.href = "/admin/updateuserrole-management";
//         break;
//       case "updatedeviceform":
//         window.location.href = "/admin/updatedeviceform";
//         break;
//       case "deletedeviceform":
//         window.location.href = "/admin/deletedeviceform";
//         break;
//       case "alluser":
//         window.location.href = "/admin/allusers";
//         break;
//       default:
//         // Handle default case if needed
//         break;
//     }
//   };

//   return (
//     <div className="admin-container">
//       <div className="admin-sidebar">
//         <h2 className="admin-heading"></h2>
//         <ul className="admin-nav">
//           <li className="admin-nav-item" onClick={() => handleDropdownChange({ target: { value: "device" } })}>
//             Device Management
//           </li>
//           <li className="admin-nav-item" onClick={() => handleDropdownChange({ target: { value: "software" } })}>
//             Software Management
//           </li>
//           <li className="admin-nav-item" onClick={() => handleDropdownChange({ target: { value: "lifecycleEvent" } })}>
//             Lifecycle Event Management
//           </li>
//           <li className="admin-nav-item" onClick={() => handleDropdownChange({ target: { value: "updateuserrole" } })}>
//             Update User Role
//           </li>
//           <li className="admin-nav-item" onClick={() => handleDropdownChange({ target: { value: "updatedeviceform" } })}>
//             Update Device Form
//           </li>
//           <li className="admin-nav-item" onClick={() => handleDropdownChange({ target: { value: "deletedeviceform" } })}>
//             Delete Device Form
//           </li>
//           <li className="admin-nav-item" onClick={() => handleDropdownChange({ target: { value: "alluser" } })}>
//             All Users
//           </li>
//         </ul>
//       </div>
//       <div className="admin-content">
//         <header className="admin-header">
//           <h1 className="admin-heading">Admin Dashboard</h1>
//         </header>
//         <div className="admin-main">
//           {/* Main content area */}
//           {/* <p>Main content area goes here...</p> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BoardAdmin;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDesktop, 
  faCogs, 
  faHistory, 
  faUserCog, 
  faEdit, 
  faTrash, 
  faUsers,
  faTachometerAlt,
  faBars
} from '@fortawesome/free-solid-svg-icons';

const BoardAdmin = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNavClick = (value) => {
    setSelectedOption(value);
    window.location.href = `/admin/${value}-management`;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`admin-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="admin-sidebar">
        <h2 className="admin-logo">
          <FontAwesomeIcon icon={faTachometerAlt} /> Admin Panel
        </h2>
        <ul className="admin-nav">
          <li className="admin-nav-item" onClick={() => handleNavClick("device")}>
            <FontAwesomeIcon icon={faDesktop} /> Device Management
          </li>
          <li className="admin-nav-item" onClick={() => handleNavClick("software")}>
            <FontAwesomeIcon icon={faCogs} /> Software Management
          </li>
          <li className="admin-nav-item" onClick={() => handleNavClick("lifecycleEvent")}>
            <FontAwesomeIcon icon={faHistory} /> Lifecycle Event
          </li>
          <li className="admin-nav-item" onClick={() => handleNavClick("updateuserrole")}>
            <FontAwesomeIcon icon={faUserCog} /> Update User Role
          </li>
          <li className="admin-nav-item" onClick={() => handleNavClick("updatedeviceform")}>
            <FontAwesomeIcon icon={faEdit} /> Update Device Form
          </li>
          <li className="admin-nav-item" onClick={() => handleNavClick("deletedeviceform")}>
            <FontAwesomeIcon icon={faTrash} /> Delete Device Form
          </li>
        </ul>
      </div>
      <div className="admin-content">
        <header className="jumbotron">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h1 className="admin-heading">Admin Dashboard</h1>
        </header>
        <div className="admin-main">
          <p>Welcome to the Admin Dashboard. Select an option from the sidebar to manage different aspects of the system.</p>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;