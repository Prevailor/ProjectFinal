


// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
 
// const BoardTechnicalsupport = () => {
//   const [selectedOption, setSelectedOption] = useState("");
 
//   const handleDropdownChange = (event) => {
//     const selectedPage = event.target.value;
//     setSelectedOption(selectedPage);
 
    
//      if (selectedPage === "viewendofsupportdates") {
//       window.location.href = "/technicalsupport/view-end-of-support-dates";
//     }
//      else if (selectedPage === "viewallrequestlogs") {
//       window.location.href = "/technicalsupport/viewallrequestlogs";
//     }
//   };
 
//   return (
//     <div className="container mt-5"> {/* Apply Bootstrap's container class */}
//       <header className="jumbotron">
//         <h2>Technical Support Dashboard</h2>
//         <div className="form-group mt-3"> {/* Apply Bootstrap's form-group class */}
//           <label htmlFor="dashboard">Select Dashboard:</label>
//           <select
//             id="dashboard"
//             value={selectedOption}
//             onChange={handleDropdownChange}
//             className="form-control mt-2" // Apply Bootstrap's form-control and mt-2 classes
//           >
//             <option value="">Select an option</option>
//             <option value="viewendofsupportdates">View End of Support Dates</option>
//             <option value="viewallrequestlogs">View Request Logs</option>
//           </select>
//         </div>
//       </header>
//     </div>
//   );
// };
 
// export default BoardTechnicalsupport;
 

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import "D:\\ProjectFinal\\Frontend\\src\\BoardTechnicalsupport.css"; // Import local CSS file

// const BoardTechnicalsupport = () => {
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleDropdownChange = (event) => {
//     const selectedPage = event.target.value;
//     setSelectedOption(selectedPage);

//     if (selectedPage === "viewendofsupportdates") {
//       window.location.href = "/technicalsupport/view-end-of-support-dates";
//     } else if (selectedPage === "viewallrequestlogs") {
//       window.location.href = "/technicalsupport/viewallrequestlogs";
//     }
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         {/* Sidebar */}
//         <nav className="col-md-3 col-lg-2 d-md-block sidebar">
//           <div className="position-sticky">
//             <ul className="nav flex-column">
//               <li className="nav-item">
//                 <a className="nav-link" href="/technicalsupport/view-end-of-support-dates">
//                   View End of Support Dates
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="/technicalsupport/viewallrequestlogs">
//                   View Request Logs
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         {/* Main content */}
//         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
//           <header className="jumbotron">
//             <h2 className="text-center">Technical Support Dashboard</h2>
//             <div className="form-group mt-3">
//             </div>
//           </header>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default BoardTechnicalsupport;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "D:\\ProjectFinal\\Frontend\\src\\BoardTechnicalsupport.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { 
//   faCalendarAlt, 
//   faClipboardList, 
//   faHeadset,
//   faBars
// } from "@fortawesome/free-solid-svg-icons";

// const BoardTechnicalsupport = () => {
//   const [selectedOption, setSelectedOption] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleNavClick = (page) => {
//     setSelectedOption(page);
//     window.location.href = `/technicalsupport/${page}`;
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className={`container-fluid ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
//       <div className="row">
//         {/* Sidebar */}
//         <nav className={`col-md-3 col-lg-2 d-md-block sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
//           <div className="position-sticky">
//             <ul className="nav flex-column">
//               <li className="nav-item">
//                 <a className="nav-link" onClick={() => handleNavClick("view-end-of-support-dates")}>
//                   <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
//                   View End of Support Dates
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" onClick={() => handleNavClick("viewallrequestlogs")}>
//                   <FontAwesomeIcon icon={faClipboardList} className="me-2" />
//                   View Request Logs
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </nav>

//         {/* Main content */}
//         <main className={`col-md-9 ms-sm-auto col-lg-10 px-md-4 ${sidebarOpen ? '' : 'expanded'}`}>
//           <header className="jumbotron">
//             <button className="sidebar-toggle" onClick={toggleSidebar}>
//               <FontAwesomeIcon icon={faBars} />
//             </button>
//             <h2 className="text-center">
//               <FontAwesomeIcon icon={faHeadset} className="me-3" />
//               Technical Support Dashboard
//             </h2>
//             <div className="form-group mt-3">
//             </div>
//           </header>
//           <div className="dashboard-content">
//             <p>Welcome to the Technical Support Dashboard. Select an option from the sidebar to view different sections.</p>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default BoardTechnicalsupport;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "D:\\ProjectFinal\\Frontend\\src\\BoardTechnicalsupport.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faCalendarAlt, 
  faClipboardList, 
  faHeadset,
  faBars
} from "@fortawesome/free-solid-svg-icons";

const BoardTechnicalsupport = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleNavClick = (page) => {
    setSelectedOption(page);
    window.location.href = `/technicalsupport/${page}`;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`container-fluid ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="row">
        {/* Sidebar */}
        <nav className={`col-md-3 col-lg-2 d-md-block sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
          <div className="position-sticky">
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link" onClick={() => handleNavClick("view-end-of-support-dates")}>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                  <span>View End of Support Dates</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={() => handleNavClick("viewallrequestlogs")}>
                  <FontAwesomeIcon icon={faClipboardList} />
                  <span>View Request Logs</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className={`col-md-9 ms-sm-auto col-lg-10 px-md-4 ${sidebarOpen ? '' : 'expanded'}`}>
          <header className="jumbotron">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faBars} />
            </button>
            <h2 className="admin-heading">
              {/* <FontAwesomeIcon icon={faHeadset} className="me-3" /> */}
              Technical Support Dashboard
            </h2>
          </header>
          <div className="dashboard-content">
            <p>Welcome to the Technical Support Dashboard. Select an option from the sidebar to view different sections.</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BoardTechnicalsupport;