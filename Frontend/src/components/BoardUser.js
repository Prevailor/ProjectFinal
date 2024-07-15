// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "D:\\ProjectFinal\\Frontend\\src\\BoardUser.css";
 

// const BoardUser = () => {
//   const [selectedOption, setSelectedOption] = useState(""); // State for selected option

//   // Function to handle dropdown change
//   const handleDropdownChange = (event) => {
//     const selectedPage = event.target.value; // Get selected page from dropdown
//     setSelectedOption(selectedPage); // Set selected option state

//     // Navigate to the selected page
//     if (selectedPage === "device") {
//       window.location.href = "/user/view-devices";
//     } else if (selectedPage === "software") {
//       window.location.href = "/user/view-software";
//     }else if (selectedPage === "notification") {
//       window.location.href = "/user/notification";
//     }
//   };

//   return (
//     <div className="container mt-5 board-user-container">
//       <header className="jumbotron board-user-header">
//         <h2 className="text-center">User Dashboard</h2>
//         <div className="form-group mt-3">
//           <label htmlFor="viewSelect">Select View:</label>
//           <select
//             id="viewSelect"
//             value={selectedOption}
//             onChange={handleDropdownChange}
//             className="form-control"
//           >
//             <option value="">Select an option</option>
//             <option value="device">View Devices</option>
//             <option value="software">View Software</option>
//             <option value="notification">notification</option>
//           </select>
//         </div>
//       </header>
//     </div>
//   );
// };

// export default BoardUser;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDesktop, 
  faCogs, 
  faBell, 
  faTachometerAlt,
  faBars
} from '@fortawesome/free-solid-svg-icons';

const BoardUser = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`user-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="user-sidebar">
        <h2 className="user-logo">
          <FontAwesomeIcon icon={faTachometerAlt} /> User Dashboard
        </h2>
        <ul className="user-nav">
          <li className="user-nav-item">
            <Link to="/user/view-devices" className="nav-link">
              <FontAwesomeIcon icon={faDesktop} /> View Devices
            </Link>
          </li>
          <li className="user-nav-item">
            <Link to="/user/view-software" className="nav-link">
              <FontAwesomeIcon icon={faCogs} /> View Software
            </Link>
          </li>
          <li className="user-nav-item">
            <Link to="/user/notification" className="nav-link">
              <FontAwesomeIcon icon={faBell} /> Notifications
            </Link>
          </li>
        </ul>
      </div>
      <div className="user-content">
        <header className="user-header">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <h1 className="user-heading">User Dashboard</h1>
        </header>
        <div className="user-main">
          <p>Welcome to the User Dashboard. Select an option from the sidebar to view different aspects of your account.</p>
        </div>
      </div>
    </div>
  );
};

export default BoardUser;