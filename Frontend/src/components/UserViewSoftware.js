// // UserViewSoftware.js

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import RegularUserService from '../services/RegularUserService';
// import AuthService from '../services/auth.service';

// const UserViewSoftware = () => {
//   const [deviceName, setDeviceName] = useState('');
//   const [software, setSoftware] = useState([]);
//   const [devices, setDevices] = useState([]);
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchDevices();
//   }, []);

//   const fetchDevices = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       if (currentUser) {
//         const userId = currentUser.id;
//         const devicesResponse = await RegularUserService.viewDevices(userId);
//         setDevices(devicesResponse);
//       }
//     } catch (error) {
//       console.error('Error fetching devices:', error);
//       alert('An error occurred while fetching devices');
//     }
//   };

//   const fetchSoftwareByDeviceName = async () => {
//     try {
//       const response = await RegularUserService.viewSoftwareByDeviceName(deviceName);
//       setSoftware(response); // Set software state with fetched data
//       setErrorState(false); // Reset error state
//     } catch (error) {
//       console.error('Error fetching software:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch software.'); // Set error message
//     }
//   };

//   const handleRenewalRequest = async (softwareId, softwareName, version) => {
//     try {
//       const softwareDTO = {
//         softwareId,
//         softwareName,
//         version
//       };
//       await RegularUserService.requestRenew(softwareDTO);

//       // Refresh software list after successful renewal request
//       fetchSoftwareByDeviceName();

//       // Show alert with success message
//       alert('Renewal requested successfully!'); // Modify alert as needed

//     } catch (error) {
//       console.error('Error requesting renewal:', error);
//       // Handle error as needed
//       alert('Failed to request renewal.'); // Show error message to user
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     if (deviceName.trim() === '') {
//       setErrorState(true);
//       setErrorMessage('Please enter a device name.');
//       return;
//     }
//     fetchSoftwareByDeviceName();
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">View Software by Device Name</h2>
//       <form onSubmit={handleFormSubmit} className="mb-4">
//         <div className="form-group">
//           <label htmlFor="deviceName">Select Device:</label>
//           <select
//             className="form-select"
//             id="deviceName"
//             value={deviceName}
//             onChange={(e) => setDeviceName(e.target.value)}
//           >
//             <option value="">Select Device</option>
//             {devices.map(device => (
//               <option key={device.deviceId} value={device.deviceName}>{device.deviceName}</option>
//             ))}
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Search Software
//         </button>
//       </form>
//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <table className="table mt-4">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>License Key</th>
//             <th>Version</th>
//             <th>Purchase Date</th>
//             <th>Expiration Date</th>
//             <th>Support End Date</th>
//             <th>Date of Last Renewal</th>
//             <th>Status</th>
//             <th>Action</th> {/* New column for action button */}
//           </tr>
//         </thead>
//         <tbody>
//           {software.map(softwareItem => (
//             <tr key={softwareItem.softwareId}>
//               <td>{softwareItem.softwareName}</td>
//               <td>{softwareItem.licenseKey}</td>
//               <td>{softwareItem.version}</td>
//               <td>{softwareItem.purchaseDate}</td>
//               <td>{softwareItem.expirationDate}</td>
//               <td>{softwareItem.supportEndDate}</td>
//               <td>{softwareItem.dateOfLastRenewal}</td>
//               <td>{softwareItem.status}</td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-success"
//                   onClick={() => handleRenewalRequest(softwareItem.softwareId, softwareItem.softwareName, softwareItem.version)}
//                 >
//                   Request Renewal
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserViewSoftware;

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import RegularUserService from '../services/RegularUserService';
// import AuthService from '../services/auth.service';

// const UserViewSoftware = () => {
//   const [deviceName, setDeviceName] = useState('');
//   const [software, setSoftware] = useState([]);
//   const [devices, setDevices] = useState([]);
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchDevices();
//   }, []);

//   const fetchDevices = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       if (currentUser) {
//         const userId = currentUser.id;
//         const devicesResponse = await RegularUserService.viewDevices(userId);
//         setDevices(devicesResponse);
//       }
//     } catch (error) {
//       console.error('Error fetching devices:', error);
//       alert('An error occurred while fetching devices');
//     }
//   };

//   const fetchSoftwareByDeviceName = async () => {
//     try {
//       const response = await RegularUserService.viewSoftwareByDeviceName(deviceName);
//       const updatedSoftware = response.map(softwareItem => ({
//         ...softwareItem,
//         countdown: calculateCountdown(softwareItem.expirationDate)
//       }));
//       setSoftware(updatedSoftware);
//       setErrorState(false); // Reset error state
//     } catch (error) {
//       console.error('Error fetching software:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch software.'); // Set error message
//     }
//   };

//   const calculateCountdown = (expirationDate) => {
//     if (expirationDate) {
//       const expirationDateObj = new Date(expirationDate);
//       const now = new Date();
//       const timeDifference = expirationDateObj - now;

//       if (timeDifference > 0) {
//         const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//         const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

//         return {
//           days: daysLeft,
//           hours: hoursLeft,
//           minutes: minutesLeft
//         };
//       }
//     }
//     return null;
//   };

//   const handleRenewalRequest = async (softwareId, softwareName, version) => {
//     try {
//       const softwareDTO = {
//         softwareId,
//         softwareName,
//         version
//       };
//       await RegularUserService.requestRenew(softwareDTO);

//       // Refresh software list after successful renewal request
//       fetchSoftwareByDeviceName();

//       // Show alert with success message
//       alert('Renewal requested successfully!'); // Modify alert as needed

//     } catch (error) {
//       console.error('Error requesting renewal:', error);
//       // Handle error as needed
//       alert('Failed to request renewal.'); // Show error message to user
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     if (deviceName.trim() === '') {
//       setErrorState(true);
//       setErrorMessage('Please enter a device name.');
//       return;
//     }
//     fetchSoftwareByDeviceName();
//   };

//   return (
//     <div className="user-view-software">
//       <h2 className="mb-4">View Software by Device Name</h2>
//       <form onSubmit={handleFormSubmit} className="mb-4">
//         <div className="form-group">
//           <label htmlFor="deviceName">Select Device:</label>
//           <select
//             className="form-select"
//             id="deviceName"
//             value={deviceName}
//             onChange={(e) => setDeviceName(e.target.value)}
//           >
//             <option value="">Select Device</option>
//             {devices.map(device => (
//               <option key={device.deviceId} value={device.deviceName}>{device.deviceName}</option>
//             ))}
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Search Software
//         </button>
//       </form>
//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <div className="table-responsive">
//         <table className="table mt-4">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>License Key</th>
//               <th>Version</th>
//               <th>Purchase Date</th>
//               <th>Expiration Date</th>
//               <th>Support End Date</th>
//               <th>Date of Last Renewal</th>
//               <th>Status</th>
//               <th>Action</th> {/* New column for action button */}
//               <th>Countdown</th>
//             </tr>
//           </thead>
//           <tbody>
//             {software.map(softwareItem => (
//               <tr key={softwareItem.softwareId}>
//                 <td>{softwareItem.softwareName}</td>
//                 <td>{softwareItem.licenseKey}</td>
//                 <td>{softwareItem.version}</td>
//                 <td>{softwareItem.purchaseDate}</td>
//                 <td>{softwareItem.expirationDate}</td>
//                 <td>{softwareItem.supportEndDate}</td>
//                 <td>{softwareItem.dateOfLastRenewal}</td>
//                 <td>{softwareItem.status}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-success"
//                     onClick={() => handleRenewalRequest(softwareItem.softwareId, softwareItem.softwareName, softwareItem.version)}
//                   >
//                     Request Renewal
//                   </button>
//                 </td>
//                 <td>
//                   {softwareItem.countdown && (
//                     <>
//                       {softwareItem.countdown.years && (
//                         <span>{softwareItem.countdown.years} years </span>
//                       )}
//                       {softwareItem.countdown.months && (
//                         <span>{softwareItem.countdown.months} months </span>
//                       )}
//                       {softwareItem.countdown.days && (
//                         <span>{softwareItem.countdown.days} days </span>
//                       )}
//                       {softwareItem.countdown.hours && (
//                         <span>{softwareItem.countdown.hours} hours </span>
//                       )}
//                       {softwareItem.countdown.minutes && (
//                         <span>{softwareItem.countdown.minutes} minutes</span>
//                       )}
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserViewSoftware;

// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import RegularUserService from '../services/RegularUserService';
// import AuthService from '../services/auth.service';
// import 'D:\\ProjectFinal\\Frontend\\src\\UserViewSoftware.css'; // Import your custom styles

// const UserViewSoftware = () => {
//   const [deviceName, setDeviceName] = useState('');
//   const [software, setSoftware] = useState([]);
//   const [devices, setDevices] = useState([]);
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchDevices();
//   }, []);

//   const fetchDevices = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       if (currentUser) {
//         const userId = currentUser.id;
//         const devicesResponse = await RegularUserService.viewDevices(userId);
//         setDevices(devicesResponse);
//       }
//     } catch (error) {
//       console.error('Error fetching devices:', error);
//       alert('An error occurred while fetching devices');
//     }
//   };

//   const fetchSoftwareByDeviceName = async () => {
//     try {
//       const response = await RegularUserService.viewSoftwareByDeviceName(deviceName);
//       const updatedSoftware = response.map(softwareItem => ({
//         ...softwareItem,
//         softwareCountdown: calculateCountdown(softwareItem.expirationDate)
//       }));
//       setSoftware(updatedSoftware);
//       setErrorState(false); // Reset error state
//     } catch (error) {
//       console.error('Error fetching software:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch software.'); // Set error message
//     }
//   };

//   const calculateCountdown = (expirationDate) => {
//     if (expirationDate) {
//       const expirationDateObj = new Date(expirationDate);
//       const now = new Date();
//       const timeDifference = expirationDateObj - now;

//       if (timeDifference > 0) {
//         const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//         const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

//         if (daysLeft >= 365) {
//           const yearsLeft = Math.floor(daysLeft / 365);
//           return {
//             years: yearsLeft
//           };
//         } else if (daysLeft >= 30) {
//           const monthsLeft = Math.floor(daysLeft / 30);
//           return {
//             months: monthsLeft
//           };
//         } else if (daysLeft > 0) {
//           return {
//             days: daysLeft,
//             hours: hoursLeft,
//             minutes: minutesLeft
//           };
//         } else if (hoursLeft > 0) {
//           return {
//             hours: hoursLeft,
//             minutes: minutesLeft
//           };
//         } else {
//           return {
//             minutes: minutesLeft
//           };
//         }
//       }
//     }
//     return null;
//   };

//   const handleRenewalRequest = async (softwareId, softwareName, version) => {
//     try {
//       const softwareDTO = {
//         softwareId,
//         softwareName,
//         version
//       };
//       await RegularUserService.requestRenew(softwareDTO);

//       // Refresh software list after successful renewal request
//       fetchSoftwareByDeviceName();

//       // Show alert with success message
//       alert('Renewal requested successfully!'); // Modify alert as needed

//     } catch (error) {
//       console.error('Error requesting renewal:', error);
//       // Handle error as needed
//       alert('Failed to request renewal.'); // Show error message to user
//     }
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     if (deviceName.trim() === '') {
//       setErrorState(true);
//       setErrorMessage('Please enter a device name.');
//       return;
//     }
//     fetchSoftwareByDeviceName();
//   };

//   return (
//     <div className="user-view-software">
//       <h2 className="mb-4">View Software by Device Name</h2>
//       <form onSubmit={handleFormSubmit} className="mb-4 search-section">
//   <div className="form-group mb-3">
//     <label htmlFor="deviceName" className="form-label">Select Device:</label>
//     <select
//       className="form-select"
//       id="deviceName"
//       value={deviceName}
//       onChange={(e) => setDeviceName(e.target.value)}
//     >
//       <option value="">Select Device</option>
//       {devices.map(device => (
//         <option key={device.deviceId} value={device.deviceName}>{device.deviceName}</option>
//       ))}
//     </select>
//   </div>
//   <button type="submit" className="btn btn-primarys">
//     Search Software
//   </button>
// </form>

//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <div className="table-responsive">
//         <table className="table mt-4 view-devices-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>License Key</th>
//               <th>Version</th>
//               <th>Purchase Date</th>
//               <th>Expiration Date</th>
//               <th>Support End Date</th>
//               <th>Date of Last Renewal</th>
//               <th>Status</th>
//               <th>Action</th>
//               <th>Countdown</th>
//             </tr>
//           </thead>
//           <tbody>
//             {software.map(softwareItem => (
//               <tr key={softwareItem.softwareId}>
//                 <td>{softwareItem.softwareName}</td>
//                 <td>{softwareItem.licenseKey}</td>
//                 <td>{softwareItem.version}</td>
//                 <td>{softwareItem.purchaseDate}</td>
//                 <td>{softwareItem.expirationDate}</td>
//                 <td>{softwareItem.supportEndDate}</td>
//                 <td>{softwareItem.dateOfLastRenewal}</td>
//                 <td>{softwareItem.status}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-success"
//                     onClick={() => handleRenewalRequest(softwareItem.softwareId, softwareItem.softwareName, softwareItem.version)}
//                   >
//                     Request Renewal
//                   </button>
//                 </td>
//                 <td>
//                   <div className="countdown-container">
//                     {softwareItem.softwareCountdown && (
//                       <>
//                         {softwareItem.softwareCountdown.years && (
//                           <div className="countdown-item">
//                             <span className="countdown-value">{softwareItem.softwareCountdown.years} years</span>
//                           </div>
//                         )}
//                         {softwareItem.softwareCountdown.months && (
//                           <div className="countdown-item">
//                             <span className="countdown-value">{softwareItem.softwareCountdown.months} months</span>
//                           </div>
//                         )}
//                         {softwareItem.softwareCountdown.days && (
//                           <div className="countdown-item">
//                             <span className="countdown-value">{softwareItem.softwareCountdown.days} days</span>
//                           </div>
//                         )}
//                         {softwareItem.softwareCountdown.hours && (
//                           <div className="countdown-item">
//                             <span className="countdown-value">{softwareItem.softwareCountdown.hours} hours</span>
//                           </div>
//                         )}
//                         {softwareItem.softwareCountdown.minutes && (
//                           <div className="countdown-item">
//                             <span className="countdown-value">{softwareItem.softwareCountdown.minutes} minutes</span>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserViewSoftware;
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Import Chart.js for creating charts
import 'bootstrap/dist/css/bootstrap.min.css';
import RegularUserService from '../services/RegularUserService'; // Adjust path as per your project structure
import AuthService from '../services/auth.service'; // Adjust path as per your project structure
import 'D:\\ProjectFinal\\Frontend\\src\\UserViewSoftware.css'; // Ensure this path matches your CSS file

// const UserViewSoftware = () => {
//   const [deviceName, setDeviceName] = useState('');
//   const [software, setSoftware] = useState([]);
//   const [devices, setDevices] = useState([]);
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [selectedSoftware, setSelectedSoftware] = useState(null); // Track selected software
//   const [showSoftwareChart, setShowSoftwareChart] = useState(false); // Control chart visibility

//   useEffect(() => {
//     fetchDevices();
//   }, []);

//   // Fetch devices for the logged-in user
//   const fetchDevices = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       if (currentUser) {
//         const userId = currentUser.id;
//         const devicesResponse = await RegularUserService.viewDevices(userId);
//         setDevices(devicesResponse);
//       }
//     } catch (error) {
//       console.error('Error fetching devices:', error);
//       alert('An error occurred while fetching devices');
//     }
//   };

//   // Fetch software based on the selected device name
//   const fetchSoftwareByDeviceName = async () => {
//     try {
//       const response = await RegularUserService.viewSoftwareByDeviceName(deviceName);
//       const updatedSoftware = response.map(softwareItem => ({
//         ...softwareItem,
//         softwareCountdown: calculateCountdown(softwareItem.expirationDate)
//       }));
//       setSoftware(updatedSoftware);
//       setErrorState(false); // Reset error state
//     } catch (error) {
//       console.error('Error fetching software:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch software.'); // Set error message
//     }
//   };

//   // Calculate countdown based on expiration date
//   // Calculate countdown based on expiration date
// const calculateCountdown = (expirationDate) => {
//   if (expirationDate) {
//     const expirationDateObj = new Date(expirationDate);
//     const now = new Date();
//     const timeDifference = expirationDateObj - now;

//     if (timeDifference > 0) {
//       const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
//       const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes

//       if (daysLeft >= 365) {
//         const yearsLeft = Math.floor(daysLeft / 365);
//         return {
//           years: yearsLeft
//         };
//       } else if (daysLeft >= 30) {
//         const monthsLeft = Math.floor(daysLeft / 30);
//         return {
//           months: monthsLeft
//         };
//       } else if (daysLeft > 0) {
//         return {
//           days: daysLeft,
//           hours: hoursLeft,
//           minutes: minutesLeft
//         };
//       } else if (hoursLeft > 0) {
//         return {
//           hours: hoursLeft,
//           minutes: minutesLeft
//         };
//       } else {
//         return {
//           minutes: minutesLeft
//         };
//       }
//     }
//   }
//   return null;
// };


//   // Handle renewal request for a specific software item
//   const handleRenewalRequest = async (softwareId, softwareName, version) => {
//     try {
//       const softwareDTO = {
//         softwareId,
//         softwareName,
//         version
//       };
//       await RegularUserService.requestRenew(softwareDTO);

//       // Refresh software list after successful renewal request
//       fetchSoftwareByDeviceName();

//       // Show alert with success message
//       alert('Renewal requested successfully!'); // Modify alert as needed

//     } catch (error) {
//       console.error('Error requesting renewal:', error);
//       // Handle error as needed
//       alert('Failed to request renewal.'); // Show error message to user
//     }
//   };

//   // Handle form submission to fetch software by device name
//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     if (deviceName.trim() === '') {
//       setErrorState(true);
//       setErrorMessage('Please enter a device name.');
//       return;
//     }
//     fetchSoftwareByDeviceName();
//   };

//   // Render software countdown chart when a software item is selected
//   // Render software countdown chart when a software item is selected
// const renderSoftwareCountdownChart = () => {
//   if (!selectedSoftware || !showSoftwareChart) return;

//   const labels = [selectedSoftware.softwareName];
//   const countdownData = calculateCountdown(selectedSoftware.expirationDate);

//   const data = [];

//   if (countdownData.years) {
//     data.push(countdownData.years);
//   }

//   if (countdownData.months) {
//     data.push(countdownData.months);
//   }

//   if (countdownData.days) {
//     data.push(countdownData.days);
//   }

//   const ctx = document.getElementById('softwareCountdownChart');

//   // Check if chart instance already exists and destroy it
//   if (Chart.getChart(ctx)) {
//     Chart.getChart(ctx).destroy();
//   }

//   new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: labels,
//       datasets: [{
//         label: 'Time until Expiration',
//         data: data,
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           display: false
//         },
//         title: {
//           display: true,
//           text: 'Software Countdown to Expiration'
//         }
//       },
//       scales: {
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: 'Time'
//           }
//         },
//         x: {
//           title: {
//             display: true,
//             text: 'Software'
//           }
//         }
//       }
//     }
//   });
// };


//   useEffect(() => {
//     renderSoftwareCountdownChart(); // Render chart on component load
//   }, [selectedSoftware, showSoftwareChart]);

//   // Toggle chart visibility on software item click
//   const handleSoftwareClick = (softwareItem) => {
//     if (selectedSoftware && selectedSoftware.softwareId === softwareItem.softwareId) {
//       setSelectedSoftware(null); // Deselect if already selected
//       setShowSoftwareChart(false); // Hide chart
//     } else {
//       setSelectedSoftware(softwareItem); // Select software item
//       setShowSoftwareChart(true); // Show chart
//     }
//   };

//   return (
//     <div className="user-view-software">
//       <h2 className="mb-4">View Software by Device Name</h2>
//       <form onSubmit={handleFormSubmit} className="mb-4">
//         <div className="form-group mb-33">
//           <label htmlFor="deviceName" className="form-label">Select Device:</label>
//           <select
//             className="form-select"
//             id="deviceName"
//             value={deviceName}
//             onChange={(e) => setDeviceName(e.target.value)}
//           >
//             <option value="">Select Device</option>
//             {devices.map(device => (
//               <option key={device.deviceId} value={device.deviceName}>{device.deviceName}</option>
//             ))}
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primarys">
//           Search Software
//         </button>
//       </form>

//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}

//       <div className="table-responsive">
//         <table className="table mt-4">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>License Key</th>
//               <th>Version</th>
//               <th>Purchase Date</th>
//               <th>Expiration Date</th>
//               <th>Support End Date</th>
//               <th>Date of Last Renewal</th>
//               <th>Status</th>
//               <th>Action</th>
//               <th>Countdown</th>
//             </tr>
//           </thead>
//           <tbody>
//             {software.map(softwareItem => (
//               <tr key={softwareItem.softwareId} onClick={() => handleSoftwareClick(softwareItem)} style={{ cursor: 'pointer' }}>
//                 <td>{softwareItem.softwareName}</td>
//                 <td>{softwareItem.licenseKey}</td>
//                 <td>{softwareItem.version}</td>
//                 <td>{softwareItem.purchaseDate}</td>
//                 <td>{softwareItem.expirationDate}</td>
//                 <td>{softwareItem.supportEndDate}</td>
//                 <td>{softwareItem.dateOfLastRenewal}</td>
//                 <td>{softwareItem.status}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-success"
//                     onClick={() => handleRenewalRequest(softwareItem.softwareId, softwareItem.softwareName, softwareItem.version)}
//                   >
//                     Request Renewal
//                   </button>
//                 </td>
//                 <td>
//                   <div className="countdown-container">
//                     {softwareItem.softwareCountdown && (
//                       <>
//                         {softwareItem.softwareCountdown.years && (
//                           <div className="countdown-item">
//                             <span className="countdown-value">{softwareItem.softwareCountdown.years} years</span>
//                           </div>
//                         )}
//                         {softwareItem.softwareCountdown.months && (
//                           <div className="countdown-item">
//                             <span className="countdown-value">{softwareItem.softwareCountdown.months} months</span>
//                           </div>
//                         )}
//                         {softwareItem.softwareCountdown.days && (
//                           <div className="countdown-item">
//                             <span className="countdown-value">{softwareItem.softwareCountdown.days} days</span>
//                           </div>
//                         )}
//                         {softwareItem.softwareCountdown.hours && (
//                           <div className="countdown-item">
//                             <span className="countdown-value">{softwareItem.softwareCountdown.hours} hours</span>
//                           </div>
//                         )}
//                         {softwareItem.softwareCountdown.minutes && (
//                           <div className="countdown-item">
//                             <span className="countdown-value">{softwareItem.softwareCountdown.minutes} minutes</span>
//                           </div>
//                         )}
//                       </>
//                     )}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showSoftwareChart && selectedSoftware && (
//         <div className="chart-container">
//           <canvas id="softwareCountdownChart" 
//           // width="400"
//           // height="200"
//             width="5"
//             height="1"
//           ></canvas>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserViewSoftware;

const UserViewSoftware = () => {
  const [deviceName, setDeviceName] = useState('');
  const [software, setSoftware] = useState([]);
  const [devices, setDevices] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedSoftwareId, setSelectedSoftwareId] = useState(null); // Track selected software ID
  const [showSoftwareChart, setShowSoftwareChart] = useState(false); // Control chart visibility

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      if (currentUser) {
        const userId = currentUser.id;
        const devicesResponse = await RegularUserService.viewDevices(userId);
        setDevices(devicesResponse);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
      alert('An error occurred while fetching devices');
    }
  };

  const fetchSoftwareByDeviceName = async () => {
    try {
      const response = await RegularUserService.viewSoftwareByDeviceName(deviceName);
      const updatedSoftware = response.map(softwareItem => ({
        ...softwareItem,
        softwareCountdown: calculateCountdown(softwareItem.expirationDate)
      }));
      setSoftware(updatedSoftware);
      setErrorState(false); // Reset error state
    } catch (error) {
      console.error('Error fetching software:', error);
      setErrorState(true);
      setErrorMessage('Failed to fetch software.'); // Set error message
    }
  };

  const calculateCountdown = (expirationDate) => {
    if (expirationDate) {
      const expirationDateObj = new Date(expirationDate);
      const now = new Date();
      const timeDifference = expirationDateObj - now;
  
      if (timeDifference > 0) {
        const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)); // Calculate minutes
  
        if (daysLeft >= 365) {
          const yearsLeft = Math.floor(daysLeft / 365);
          return {
            years: yearsLeft
          };
        } else if (daysLeft >= 30) {
          const monthsLeft = Math.floor(daysLeft / 30);
          return {
            months: monthsLeft
          };
        } else if (daysLeft > 0) {
          return {
            days: daysLeft,
            hours: hoursLeft,
            minutes: minutesLeft
          };
        } else if (hoursLeft > 0) {
          return {
            hours: hoursLeft,
            minutes: minutesLeft
          };
        } else {
          return {
            minutes: minutesLeft
          };
        }
      }
    }
    return null;
  };
  
  

  const handleRenewalRequest = async (softwareId, softwareName, version) => {
    try {
      const softwareDTO = {
        softwareId,
        softwareName,
        version
      };
      await RegularUserService.requestRenew(softwareDTO);

      // Refresh software list after successful renewal request
      fetchSoftwareByDeviceName();

      // Show alert with success message
      alert('Renewal requested successfully!');

    } catch (error) {
      console.error('Error requesting renewal:', error);
      alert('Failed to request renewal.');
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (deviceName.trim() === '') {
      setErrorState(true);
      setErrorMessage('Please enter a device name.');
      return;
    }
    fetchSoftwareByDeviceName();
  };

  const renderSoftwareCountdownChart = (softwareItem) => {
    const countdownData = calculateCountdown(softwareItem.expirationDate);

    const labels = [];
    const data = [];

    if (countdownData.years !== undefined) {
      labels.push('Years');
      data.push(countdownData.years);
    }
    if (countdownData.months !== undefined) {
      labels.push('Months');
      data.push(countdownData.months);
    }
    if (countdownData.days !== undefined) {
      labels.push('Days');
      data.push(countdownData.days);
    }
    // Omitting hours and minutes

    const ctx = document.getElementById(`softwareCountdownChart-${softwareItem.softwareId}`);

    if (!ctx) return;

    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Time until Expiration',
          data: data,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Software Countdown to Expiration'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Time'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Units'
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    if (selectedSoftwareId !== null && showSoftwareChart) {
      const selectedSoftwareItem = software.find(item => item.softwareId === selectedSoftwareId);
      if (selectedSoftwareItem) {
        renderSoftwareCountdownChart(selectedSoftwareItem);
      }
    }
  }, [selectedSoftwareId, showSoftwareChart]);

  const handleSoftwareClick = (softwareItem) => {
    if (selectedSoftwareId === softwareItem.softwareId) {
      setSelectedSoftwareId(null);
      setShowSoftwareChart(false);
    } else {
      setSelectedSoftwareId(softwareItem.softwareId);
      setShowSoftwareChart(true);
    }
  };

  return (
    <div className="user-view-software">
      <h2 className="text-center mt-5 mb-3 underline">View Software by Device Name</h2>
      <form onSubmit={handleFormSubmit} className="mb-4">
        <div className="form-group mb-3">
          <label htmlFor="deviceName" className="form-label">Select Device:</label>
          <select
            className="form-select"
            id="deviceName"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
          >
            <option value="">Select Device</option>
            {devices.map(device => (
              <option key={device.deviceId} value={device.deviceName}>{device.deviceName}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primaryy">
          Search Software
        </button>
      </form>

      {errorState && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="table-responsive">
        <table className="table mt-44">
          <thead>
            <tr>
              <th>Name</th>
              <th>License Key</th>
              <th>Version</th>
              <th>Purchase Date</th>
              <th>Expiration Date</th>
              <th>Support End Date</th>
              <th>Date of Last Renewal</th>
              <th>Status</th>
              <th>Action</th>
              <th>Countdown</th>
            </tr>
          </thead>
          <tbody>
            {software.map(softwareItem => (
              <React.Fragment key={softwareItem.softwareId}>
                <tr onClick={() => handleSoftwareClick(softwareItem)} style={{ cursor: 'pointer' }}>
                  <td>{softwareItem.softwareName}</td>
                  <td>{softwareItem.licenseKey}</td>
                  <td>{softwareItem.version}</td>
                  <td>{softwareItem.purchaseDate}</td>
                  <td>{softwareItem.expirationDate}</td>
                  <td>{softwareItem.supportEndDate}</td>
                  <td>{softwareItem.dateOfLastRenewal}</td>
                  <td>{softwareItem.status}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleRenewalRequest(softwareItem.softwareId, softwareItem.softwareName, softwareItem.version)}
                    >
                      Request Renewal
                    </button>
                  </td>
                  <td>
                    <div className="countdown-container">
                      {softwareItem.softwareCountdown && (
                        <>
                          {softwareItem.softwareCountdown.years && (
                            <div className="countdown-item">
                              <span className="countdown-value">{softwareItem.softwareCountdown.years} years</span>
                            </div>
                          )}
                          {softwareItem.softwareCountdown.months && (
                            <div className="countdown-item">
                              <span className="countdown-value">{softwareItem.softwareCountdown.months} months</span>
                            </div>
                          )}
                          {softwareItem.softwareCountdown.days && (
                            <div className="countdown-item">
                              <span className="countdown-value">{softwareItem.softwareCountdown.days} days</span>
                            </div>
                          )}
                          {softwareItem.softwareCountdown.hours && (
                            <div className="countdown-item">
                              <span className="countdown-value">{softwareItem.softwareCountdown.hours} hours</span>
                            </div>
                          )}
                          {softwareItem.softwareCountdown.minutes && (
                            <div className="countdown-item">
                              <span className="countdown-value">{softwareItem.softwareCountdown.minutes} minutes</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </td>
                </tr>
                {selectedSoftwareId === softwareItem.softwareId && showSoftwareChart && (
                  <tr>
                    <td colSpan="10">
                      <div className="chart-container">
                        <canvas id={`softwareCountdownChart-${softwareItem.softwareId}`}
                        // width="400"
                          // height="200"
                          width="5"
                          height="1"></canvas>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserViewSoftware;