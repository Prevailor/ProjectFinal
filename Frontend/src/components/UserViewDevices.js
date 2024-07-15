// import React, { useState, useEffect } from 'react';
// import RegularUserService from '../services/RegularUserService';
// import 'bootstrap/dist/css/bootstrap.min.css'; 
// import AuthService from '../services/auth.service';

// const UserViewDevices = () => {
//   const [devices, setDevices] = useState([]);
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState('name'); 

//   useEffect(() => {
//     fetchUserDevices(); 
//   }, []);


//   const fetchUserDevices = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser(); 
//       const response = await RegularUserService.viewDevices(currentUser.id);
//       setDevices(response);
//       setErrorState(false); 
//     } catch (error) {
//       console.error('Error fetching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch devices.'); 
//     }
//   };

//   // Function to handle replacement request
//   const handleReplacementRequest = async (device) => {
//     try {
//       const replaceDTO = {
//         deviceId: device.deviceId,
//         deviceName: device.deviceName,
//         deviceType: device.deviceType
//       };
//       const response = await RegularUserService.requestReplacement(replaceDTO);

//       // Update devices state without modifying dateOfLastReplacement
//       const updatedDevices = devices.map(d => {
//         if (d.deviceId === device.deviceId) {
//           return {
//             ...d
//           };
//         }
//         return d;
//       });
//       setDevices(updatedDevices);

//       // Show alert with response message
//       alert('Replacement requested successfully!'); // Modify alert as needed

//       console.log('Request Replacement Response:', response); // Log response from backend

//     } catch (error) {
//       console.error('Error requesting replacement:', error);
//       // Handle error as needed
//       alert('Failed to request replacement.'); // Show error message to user
//     }
//   };

//   // Function to handle search based on selected search type
//   const handleSearch = async () => {
//     try {
//       if (searchTerm.trim() === '') {
//         fetchUserDevices(); // Reset to original devices list
//         return;
//       }

//       let response;
//       switch (searchType) {
//         case 'name':
//           response = await RegularUserService.searchDevicesByName(searchTerm);
//           break;
//         case 'status':
//           response = await RegularUserService.searchDevicesByStatus(searchTerm);
//           break;
//         case 'type':
//           response = await RegularUserService.searchDevicesByType(searchTerm);
//           break;
//         default:
//           return;
//       }
//       setDevices(response); // Update devices state with search result
//       setErrorState(false); // Reset error state
//     } catch (error) {
//       console.error('Error searching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to search devices.'); // Set error message
//     }
//   };

//   // Function to handle Enter key press
//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">View Devices</h2>
//       <div className="mb-3">
//         <select
//           className="form-select"
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//         >
//           <option value="name">Search by Name</option>
//           <option value="status">Search by Status</option>
//           <option value="type">Search by Type</option>
//         </select>
//         <input
//           type="text"
//           className="form-control mt-2"
//           placeholder={`Enter ${searchType === 'name' ? 'Device Name' : searchType === 'status' ? 'Status' : 'Device Type'}`}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={handleKeyPress} // Call handleKeyPress on key press
//         />
//         <button className="btn btn-primary mt-2" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <table className="table mt-4">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Purchase Date</th>
//             <th>End Of Life</th>
//             <th>End of Support Date</th>
//             <th>Status</th>
//             <th>Last Replacement Date</th> {/* New column for dateOfLastReplacement */}
//             <th>Action</th> {/* New column for Action button */}
//           </tr>
//         </thead>
//         <tbody>
//           {devices.map(device => (
//             <tr key={device.deviceId}>
//               <td>{device.deviceName}</td>
//               <td>{device.deviceType}</td>
//               <td>{device.purchaseDate}</td>
//               <td>{device.endOfLife}</td>
//               <td>{device.endOfSupportDate}</td>
//               <td>{device.status}</td>
//               <td>{device.dateOfLastReplacement}</td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-primary"
//                   onClick={() => handleReplacementRequest(device)}
//                 >
//                   Request Replacement
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserViewDevices;


// import React, { useState, useEffect } from 'react';
// import RegularUserService from '../services/RegularUserService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import AuthService from '../services/auth.service';

// const UserViewDevices = () => {
//   const [devices, setDevices] = useState([]);
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState('name');

//   useEffect(() => {
//     fetchUserDevices();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(updateCountdowns, 1000);
//     return () => clearInterval(interval);
//   }, [devices]);

//   const fetchUserDevices = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       const response = await RegularUserService.viewDevices(currentUser.id);
//       setDevices(response);
//       setErrorState(false);
//     } catch (error) {
//       console.error('Error fetching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch devices.');
//     }
//   };

//   const updateCountdowns = () => {
//     const updatedDevices = devices.map(device => {
//       if (device.endOfLife) {
//         const endOfLifeDate = new Date(device.endOfLife).getTime();
//         const now = new Date().getTime();
//         const timeDifference = endOfLifeDate - now;
        
//         if (timeDifference > 0) {
//           const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          
//           if (daysLeft <= 30) {
//             const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
//             const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//             const nextDay = new Date(now);
//             nextDay.setDate(nextDay.getDate() + 1);
//             const nextDayStart = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate()).getTime();
//             const daysRemaining = Math.floor((endOfLifeDate - nextDayStart) / (1000 * 60 * 60 * 24));

//             return {
//               ...device,
//               countdown: {
//                 days: daysRemaining,
//                 hours: hoursLeft,
//                 minutes: minutesLeft
//               }
//             };
//           } else if (daysLeft <= 90) {
//             return {
//               ...device,
//               countdown: {
//                 days: daysLeft
//               }
//             };
//           } else if (daysLeft <= 365) {
//             const monthsLeft = Math.floor(daysLeft / 30);
//             return {
//               ...device,
//               countdown: {
//                 months: monthsLeft
//               }
//             };
//           } else {
//             const yearsLeft = Math.floor(daysLeft / 365);
//             return {
//               ...device,
//               countdown: {
//                 years: yearsLeft
//               }
//             };
//           }
//         }
//       }
//       return device;
//     });
//     setDevices(updatedDevices);
//   };

//   const handleReplacementRequest = async (device) => {
//     try {
//       const replaceDTO = {
//         deviceId: device.deviceId,
//         deviceName: device.deviceName,
//         deviceType: device.deviceType
//       };
//       const response = await RegularUserService.requestReplacement(replaceDTO);

//       const updatedDevices = devices.map(d => {
//         if (d.deviceId === device.deviceId) {
//           return {
//             ...d,
//             dateOfLastReplacement: new Date().toISOString().split('T')[0]
//           };
//         }
//         return d;
//       });
//       setDevices(updatedDevices);

//       alert('Replacement requested successfully!');

//       console.log('Request Replacement Response:', response);

//     } catch (error) {
//       console.error('Error requesting replacement:', error);
//       alert('Failed to request replacement.');
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       if (searchTerm.trim() === '') {
//         fetchUserDevices();
//         return;
//       }

//       let response;
//       switch (searchType) {
//         case 'name':
//           response = await RegularUserService.searchDevicesByName(searchTerm);
//           break;
//         case 'status':
//           response = await RegularUserService.searchDevicesByStatus(searchTerm);
//           break;
//         case 'type':
//           response = await RegularUserService.searchDevicesByType(searchTerm);
//           break;
//         default:
//           return;
//       }
//       setDevices(response);
//       setErrorState(false);
//     } catch (error) {
//       console.error('Error searching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to search devices.');
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const renderCountdown = (device) => {
//     const { countdown } = device;
//     if (countdown !== undefined) {
//       if (countdown.hours !== undefined) {
//         if (countdown.days === 0) {
//           return (
//             <span className="text-danger">
//               {`${countdown.hours}h ${countdown.minutes}m left`}
//             </span>
//           );
//         } else {
//           return (
//             <span className="text-danger">
//               {`${countdown.days}d ${countdown.hours}h ${countdown.minutes}m left`}
//             </span>
//           );
//         }
//       } else if (countdown.days !== undefined) {
//         return <span className="text-danger">{`${countdown.days}d left`}</span>;
//       } else if (countdown.months !== undefined) {
//         return <span className="text-danger">{`${countdown.months} months left`}</span>;
//       } else if (countdown.years !== undefined) {
//         return <span className="text-danger">{`${countdown.years} years left`}</span>;
//       }
//     }
//     return <span className="text-muted">No end of life set</span>;
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">View Devices</h2>
//       <div className="mb-3">
//         <select
//           className="form-select"
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//         >
//           <option value="name">Search by Name</option>
//           <option value="status">Search by Status</option>
//           <option value="type">Search by Type</option>
//         </select>
//         <input
//           type="text"
//           className="form-control mt-2"
//           placeholder={`Enter ${searchType === 'name' ? 'Device Name' : searchType === 'status' ? 'Status' : 'Device Type'}`}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <button className="btn btn-primary mt-2" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <table className="table mt-4">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Type</th>
//             <th>Purchase Date</th>
//             <th>End Of Life</th>
//             <th>End of Support Date</th>
//             <th>Status</th>
//             <th>Last Replacement Date</th>
//             <th>Action</th>
//             <th>Countdown</th>
//           </tr>
//         </thead>
//         <tbody>
//           {devices.map(device => (
//             <tr key={device.deviceId}>
//               <td>{device.deviceName}</td>
//               <td>{device.deviceType}</td>
//               <td>{device.purchaseDate}</td>
//               <td>{device.endOfLife}</td>
//               <td>{device.endOfSupportDate}</td>
//               <td>{device.status}</td>
//               <td>{device.dateOfLastReplacement}</td>
//               <td>
//                 <button
//                   className="btn btn-sm btn-primary"
//                   onClick={() => handleReplacementRequest(device)}
//                 >
//                   Request Replacement
//                 </button>
//               </td>
//               <td>{renderCountdown(device)}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserViewDevices;


import React, { useState, useEffect } from 'react';
import RegularUserService from '../services/RegularUserService';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../services/auth.service';
import 'D:\\ProjectFinal\\Frontend\\src\\UserViewDevices.css'; // Import your custom styles

// const UserViewDevices = () => {
//   const [devices, setDevices] = useState([]);
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState('name');
//   const [colorClass, setColorClass] = useState('');

//   useEffect(() => {
//     fetchUserDevices();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(updateCountdowns, 1000);
//     return () => clearInterval(interval);
//   }, [devices]);

//   const fetchUserDevices = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       const response = await RegularUserService.viewDevices(currentUser.id);
//       setDevices(response);
//       setErrorState(false);
//     } catch (error) {
//       console.error('Error fetching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch devices.');
//     }
//   };

//   const updateCountdowns = () => {
//     const updatedDevices = devices.map(device => {
//       if (device.endOfLife) {
//         const endOfLifeDate = new Date(device.endOfLife).getTime();
//         const now = new Date().getTime();
//         const timeDifference = endOfLifeDate - now;
        
//         if (timeDifference > 0) {
//           const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          
//           if (daysLeft <= 30) {
//             const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
//             const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//             const nextDay = new Date(now);
//             nextDay.setDate(nextDay.getDate() + 1);
//             const nextDayStart = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate()).getTime();
//             const daysRemaining = Math.floor((endOfLifeDate - nextDayStart) / (1000 * 60 * 60 * 24));

//             return {
//               ...device,
//               countdown: {
//                 days: daysRemaining,
//                 hours: hoursLeft,
//                 minutes: minutesLeft
//               }
//             };
//           } else if (daysLeft <= 90) {
//             return {
//               ...device,
//               countdown: {
//                 days: daysLeft
//               }
//             };
//           } else if (daysLeft <= 365) {
//             const monthsLeft = Math.floor(daysLeft / 30);
//             return {
//               ...device,
//               countdown: {
//                 months: monthsLeft
//               }
//             };
//           } else {
//             const yearsLeft = Math.floor(daysLeft / 365);
//             return {
//               ...device,
//               countdown: {
//                 years: yearsLeft
//               }
//             };
//           }
//         }
//       }
//       return device;
//     });
//     setDevices(updatedDevices);
//     updateColorClass(); // Update color class on every interval update
//   };

//   const handleReplacementRequest = async (device) => {
//     try {
//       const replaceDTO = {
//         deviceId: device.deviceId,
//         deviceName: device.deviceName,
//         deviceType: device.deviceType
//       };
//       const response = await RegularUserService.requestReplacement(replaceDTO);

//       const updatedDevices = devices.map(d => {
//         if (d.deviceId === device.deviceId) {
//           return {
//             ...d,
//             dateOfLastReplacement: new Date().toISOString().split('T')[0]
//           };
//         }
//         return d;
//       });
//       setDevices(updatedDevices);

//       alert('Replacement requested successfully!');

//       console.log('Request Replacement Response:', response);

//     } catch (error) {
//       console.error('Error requesting replacement:', error);
//       alert('Failed to request replacement.');
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       if (searchTerm.trim() === '') {
//         fetchUserDevices();
//         return;
//       }

//       let response;
//       switch (searchType) {
//         case 'name':
//           response = await RegularUserService.searchDevicesByName(searchTerm);
//           break;
//         case 'status':
//           response = await RegularUserService.searchDevicesByStatus(searchTerm);
//           break;
//         case 'type':
//           response = await RegularUserService.searchDevicesByType(searchTerm);
//           break;
//         default:
//           return;
//       }
//       setDevices(response);
//       setErrorState(false);
//     } catch (error) {
//       console.error('Error searching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to search devices.');
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const renderCountdown = (device) => {
//     const { countdown } = device;
//     if (countdown !== undefined) {
//       return (
//         <div className="countdown-container">
//           {countdown.years !== undefined && (
//             <span className={`countdown-item years ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.years} ${countdown.years === 1 ? 'year' : 'years'}`}
//             </span>
//           )}
//           {countdown.months !== undefined && (
//             <span className={`countdown-item months ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.months} ${countdown.months === 1 ? 'month' : 'months'}`}
//             </span>
//           )}
//           {countdown.days !== undefined && (
//             <span className={`countdown-item days ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.days} ${countdown.days === 1 ? 'day' : 'days'}`}
//             </span>
//           )}
//           {countdown.hours !== undefined && (
//             <span className={`countdown-item hours ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.hours} ${countdown.hours === 1 ? 'hour' : 'hours'}`}
//             </span>
//           )}
//           {countdown.minutes !== undefined && (
//             <span className={`countdown-item minutes ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.minutes} ${countdown.minutes === 1 ? 'minute' : 'minutes'}`}
//             </span>
//           )}
//         </div>
//       );
//     }
//     return <span className="text-muted">No end of life set</span>;
//   };

//   const updateColorClass = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();

//     // Swap colors every hour and minute
//     if (hours % 2 === 0 && minutes === 0) {
//       setColorClass('calendar-green-1');
//     } else if (hours % 2 === 0 && minutes !== 0) {
//       setColorClass('calendar-green-2');
//     } else if (hours % 2 !== 0 && minutes === 0) {
//       setColorClass('calendar-green-3');
//     } else {
//       setColorClass('calendar-green-4');
//     }
//   };

//   return (
//     <div className="view-devices-container">
//       <h2 className="mb-4">View Devices</h2>
//       <div className="search-section mb-3">
//         <select
//           className="form-select"
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//         >
//           <option value="name">Search by Name</option>
//           <option value="status">Search by Status</option>
//           <option value="type">Search by Type</option>
//         </select>
//         <input
//           type="text"
//           className="form-control mt-2"
//           placeholder={searchType === 'name' ? 'Device Name' : searchType === 'status' ? 'Status' : 'Device Type'}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <button className="btn btn-primary mt-2 view-devices-btn" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <div className="table-responsive">
//         <table className="table view-devices-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Purchase Date</th>
//               <th>End Of Life</th>
//               <th>End of Support Date</th>
//               <th>Status</th>
//               <th>Last Replacement Date</th>
//               <th>Action</th>
//               <th>Countdown</th>
//             </tr>
//           </thead>
//           <tbody>
//             {devices.map(device => (
//               <tr key={device.deviceId}>
//                 <td>{device.deviceName}</td>
//                 <td>{device.deviceType}</td>
//                 <td>{device.purchaseDate}</td>
//                 <td>{device.endOfLife}</td>
//                 <td>{device.endOfSupportDate}</td>
//                 <td>{device.status}</td>
//                 <td>{device.dateOfLastReplacement}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-primary"
//                     onClick={() => handleReplacementRequest(device)}
//                   >
//                     Request Replacement
//                   </button>
//                 </td>
//                 <td>{renderCountdown(device)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserViewDevices;

import Chart from 'chart.js/auto'; // Import Chart.js



// const UserViewDevices = () => {
//   const [devices, setDevices] = useState([]);
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState('name');
//   const [colorClass, setColorClass] = useState('');
//   const [selectedDevice, setSelectedDevice] = useState(null); // State to track selected device
//   const [showCharts, setShowCharts] = useState(false); // State to control chart visibility

//   useEffect(() => {
//     fetchUserDevices();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(updateCountdowns, 1000);
//     return () => clearInterval(interval);
//   }, [devices]);

//   const fetchUserDevices = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       const response = await RegularUserService.viewDevices(currentUser.id);
//       setDevices(response);
//       setErrorState(false);
//     } catch (error) {
//       console.error('Error fetching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch devices.');
//     }
//   };

//   const updateCountdowns = () => {
//     const updatedDevices = devices.map(device => {
//       if (device.endOfLife) {
//         const endOfLifeDate = new Date(device.endOfLife).getTime();
//         const now = new Date().getTime();
//         const timeDifference = endOfLifeDate - now;

//         if (timeDifference > 0) {
//           const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

//           if (daysLeft <= 30) {
//             const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
//             const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//             const nextDay = new Date(now);
//             nextDay.setDate(nextDay.getDate() + 1);
//             const nextDayStart = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate()).getTime();
//             const daysRemaining = Math.floor((endOfLifeDate - nextDayStart) / (1000 * 60 * 60 * 24));

//             return {
//               ...device,
//               countdown: {
//                 days: daysRemaining,
//                 hours: hoursLeft,
//                 minutes: minutesLeft
//               }
//             };
//           } else if (daysLeft <= 90) {
//             return {
//               ...device,
//               countdown: {
//                 days: daysLeft
//               }
//             };
//           } else if (daysLeft <= 365) {
//             const monthsLeft = Math.floor(daysLeft / 30);
//             return {
//               ...device,
//               countdown: {
//                 months: monthsLeft
//               }
//             };
//           } else {
//             const yearsLeft = Math.floor(daysLeft / 365);
//             return {
//               ...device,
//               countdown: {
//                 years: yearsLeft
//               }
//             };
//           }
//         }
//       }
//       return device;
//     });
//     setDevices(updatedDevices);
//     updateColorClass(); // Update color class on every interval update
//   };

//   const handleReplacementRequest = async (device) => {
//     try {
//       const replaceDTO = {
//         deviceId: device.deviceId,
//         deviceName: device.deviceName,
//         deviceType: device.deviceType
//       };
//       const response = await RegularUserService.requestReplacement(replaceDTO);

//       const updatedDevices = devices.map(d => {
//         if (d.deviceId === device.deviceId) {
//           return {
//             ...d,
//             dateOfLastReplacement: new Date().toISOString().split('T')[0]
//           };
//         }
//         return d;
//       });
//       setDevices(updatedDevices);

//       alert('Replacement requested successfully!');

//       console.log('Request Replacement Response:', response);

//     } catch (error) {
//       console.error('Error requesting replacement:', error);
//       alert('Failed to request replacement.');
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       if (searchTerm.trim() === '') {
//         fetchUserDevices();
//         return;
//       }

//       let response;
//       switch (searchType) {
//         case 'name':
//           response = await RegularUserService.searchDevicesByName(searchTerm);
//           break;
//         case 'status':
//           response = await RegularUserService.searchDevicesByStatus(searchTerm);
//           break;
//         case 'type':
//           response = await RegularUserService.searchDevicesByType(searchTerm);
//           break;
//         default:
//           return;
//       }
//       setDevices(response);
//       setErrorState(false);
//     } catch (error) {
//       console.error('Error searching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to search devices.');
//     }
//   };

//   const handleDeviceClick = (device) => {
//     if (selectedDevice && selectedDevice.deviceId === device.deviceId) {
//       setSelectedDevice(null); // Deselect the device if it's already selected
//       setShowCharts(false); // Hide charts when deselecting the device
//     } else {
//       setSelectedDevice(device);
//       setShowCharts(true); // Display charts once a device is selected
//     }
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const renderCountdown = (device) => {
//     const { countdown } = device;
//     if (countdown !== undefined) {
//       return (
//         <div className="countdown-container">
//           {countdown.years !== undefined && (
//             <span className={`countdown-item years ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.years} ${countdown.years === 1 ? 'year' : 'years'}`}
//             </span>
//           )}
//           {countdown.months !== undefined && (
//             <span className={`countdown-item months ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.months} ${countdown.months === 1 ? 'month' : 'months'}`}
//             </span>
//           )}
//           {countdown.days !== undefined && (
//             <span className={`countdown-item days ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.days} ${countdown.days === 1 ? 'day' : 'days'}`}
//             </span>
//           )}
//           {countdown.hours !== undefined && (
//             <span className={`countdown-item hours ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.hours} ${countdown.hours === 1 ? 'hour' : 'hours'}`}
//             </span>
//           )}
//           {countdown.minutes !== undefined && (
//             <span className={`countdown-item minutes ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.minutes} ${countdown.minutes === 1 ? 'minute' : 'minutes'}`}
//             </span>
//           )}
//         </div>
//       );
//     }
//     return <span className="text-muted">No end of life set</span>;
//   };

//   const updateColorClass = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();

//     // Swap colors every hour and minute
//     if (hours % 2 === 0 && minutes === 0) {
//       setColorClass('calendar-green-1');
//     } else if (hours % 2 === 0 && minutes !== 0) {
//       setColorClass('calendar-green-2');
//     } else if (hours % 2 !== 0 && minutes === 0) {
//       setColorClass('calendar-green-3');
//     } else {
//       setColorClass('calendar-green-4');
//     }
//   };

//   // Function to render device countdown chart
//   const renderDeviceCountdownChart = () => {
//     if (!selectedDevice || !showCharts) return; // Render chart only if device is selected and showCharts is true

//     const labels = [selectedDevice.deviceName];
//     const data = [selectedDevice.countdown?.days || 0]; // Use days countdown as an example

//     const ctx = document.getElementById('deviceCountdownChart');

//     // Check if chart instance already exists and destroy it
//     if (Chart.getChart(ctx)) {
//       Chart.getChart(ctx).destroy();
//     }

//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: [{
//           label: 'Days until End of Life',
//           data: data,
//           backgroundColor: 'rgba(54, 162, 235, 0.6)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             display: false
//           },
//           title: {
//             display: true,
//             text: 'Device Countdown to End of Life'
//           }
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: 'Days'
//             }
//           },
//           x: {
//             title: {
//               display: true,
//               text: 'Devices'
//             }
//           }
//         }
//       }
//     });
//   };

//   // Function to initialize or update charts
//   const initializeCharts = () => {
//     if (selectedDevice && showCharts) {
//       renderDeviceCountdownChart();
//     }
//   };

//   // useEffect to initialize or update charts when selectedDevice or showCharts change
//   useEffect(() => {
//     initializeCharts();
//   }, [selectedDevice, showCharts]);

//   return (
//     <div className="view-devices-container">
//       <h2 className="mb-4">View Devices</h2>
//       <div className="search-section mb-3">
//         <select
//           className="form-select"
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//         >
//           <option value="name">Search by Name</option>
//           <option value="status">Search by Status</option>
//           <option value="type">Search by Type</option>
//         </select>
//         <input
//           type="text"
//           className="form-control mt-2"
//           placeholder={searchType === 'name' ? 'Device Name' : searchType === 'status' ? 'Status' : 'Device Type'}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <button className="btn btn-primary mt-2 view-devices-btn" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <div className="table-responsive">
//         <table className="table view-devices-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Purchase Date</th>
//               <th>End Of Life</th>
//               <th>End of Support Date</th>
//               <th>Status</th>
//               <th>Last Replacement Date</th>
//               <th>Action</th>
//               <th>Countdown</th>
//             </tr>
//           </thead>
//           <tbody>
//             {devices.map(device => (
//               <tr key={device.deviceId} onClick={() => handleDeviceClick(device)} style={{ cursor: 'pointer' }}>
//                 <td>{device.deviceName}</td>
//                 <td>{device.deviceType}</td>
//                 <td>{device.purchaseDate}</td>
//                 <td>{device.endOfLife}</td>
//                 <td>{device.endOfSupportDate}</td>
//                 <td>{device.status}</td>
//                 <td>{device.dateOfLastReplacement}</td>
//                 <td>
//                   <button
//                     className="btn btn-sm btn-primary"
//                     onClick={() => handleReplacementRequest(device)}
//                   >
//                     Request Replacement
//                   </button>
//                 </td>
//                 <td>{renderCountdown(device)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {showCharts && (
//         <div className="charts-container">
//           <div className="chart-item">
//             <canvas id="deviceCountdownChart" width="5" height="1"></canvas>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserViewDevices;
// const UserViewDevices = () => {
//   const [devices, setDevices] = useState([]);
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState('name');
//   const [colorClass, setColorClass] = useState('');
//   const [selectedDevice, setSelectedDevice] = useState(null); // State to track selected device
//   const [showCharts, setShowCharts] = useState({}); // State to control chart visibility for each device

//   useEffect(() => {
//     fetchUserDevices();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(updateCountdowns, 1000);
//     return () => clearInterval(interval);
//   }, [devices]);

//   const fetchUserDevices = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       const response = await RegularUserService.viewDevices(currentUser.id);
//       setDevices(response);
//       setErrorState(false);
//     } catch (error) {
//       console.error('Error fetching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch devices.');
//     }
//   };

//     const updateCountdowns = () => {
//     const updatedDevices = devices.map(device => {
//       if (device.endOfLife) {
//         const endOfLifeDate = new Date(device.endOfLife).getTime();
//         const now = new Date().getTime();
//         const timeDifference = endOfLifeDate - now;

//         if (timeDifference > 0) {
//           const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

//           if (daysLeft <= 30) {
//             const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
//             const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//             const nextDay = new Date(now);
//             nextDay.setDate(nextDay.getDate() + 1);
//             const nextDayStart = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate()).getTime();
//             const daysRemaining = Math.floor((endOfLifeDate - nextDayStart) / (1000 * 60 * 60 * 24));

//             return {
//               ...device,
//               countdown: {
//                 days: daysRemaining,
//                 hours: hoursLeft,
//                 minutes: minutesLeft
//               }
//             };
//           } else if (daysLeft <= 90) {
//             return {
//               ...device,
//               countdown: {
//                 days: daysLeft
//               }
//             };
//           } else if (daysLeft <= 365) {
//             const monthsLeft = Math.floor(daysLeft / 30);
//             return {
//               ...device,
//               countdown: {
//                 months: monthsLeft
//               }
//             };
//           } else {
//             const yearsLeft = Math.floor(daysLeft / 365);
//             return {
//               ...device,
//               countdown: {
//                 years: yearsLeft
//               }
//             };
//           }
//         }
//       }
//       return device;
//     });
//     setDevices(updatedDevices);
//     updateColorClass(); // Update color class on every interval update
//   };

//   const handleReplacementRequest = async (device) => {
//     try {
//       const replaceDTO = {
//         deviceId: device.deviceId,
//         deviceName: device.deviceName,
//         deviceType: device.deviceType
//       };
//       const response = await RegularUserService.requestReplacement(replaceDTO);

//       const updatedDevices = devices.map(d => {
//         if (d.deviceId === device.deviceId) {
//           return {
//             ...d,
//             dateOfLastReplacement: new Date().toISOString().split('T')[0]
//           };
//         }
//         return d;
//       });
//       setDevices(updatedDevices);

//       alert('Replacement requested successfully!');

//       console.log('Request Replacement Response:', response);

//     } catch (error) {
//       console.error('Error requesting replacement:', error);
//       alert('Failed to request replacement.');
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       if (searchTerm.trim() === '') {
//         fetchUserDevices();
//         return;
//       }

//       let response;
//       switch (searchType) {
//         case 'name':
//           response = await RegularUserService.searchDevicesByName(searchTerm);
//           break;
//         case 'status':
//           response = await RegularUserService.searchDevicesByStatus(searchTerm);
//           break;
//         case 'type':
//           response = await RegularUserService.searchDevicesByType(searchTerm);
//           break;
//         default:
//           return;
//       }
//       setDevices(response);
//       setErrorState(false);
//     } catch (error) {
//       console.error('Error searching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to search devices.');
//     }
//   };

//   const handleDeviceClick = (device) => {
//     if (selectedDevice && selectedDevice.deviceId === device.deviceId) {
//       setSelectedDevice(null); // Deselect the device if it's already selected
//     } else {
//       setSelectedDevice(device);
//     }

//     // Toggle the chart visibility for the clicked device
//     setShowCharts(prevState => ({
//       ...prevState,
//       [device.deviceId]: !prevState[device.deviceId]
//     }));
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const renderCountdown = (device) => {
//     const { countdown } = device;
//     if (countdown !== undefined) {
//       return (
//         <div className="countdown-container">
//           {countdown.years !== undefined && (
//             <span className={`countdown-item years ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.years} ${countdown.years === 1 ? 'year' : 'years'}`}
//             </span>
//           )}
//           {countdown.months !== undefined && (
//             <span className={`countdown-item months ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.months} ${countdown.months === 1 ? 'month' : 'months'}`}
//             </span>
//           )}
//           {countdown.days !== undefined && (
//             <span className={`countdown-item days ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.days} ${countdown.days === 1 ? 'day' : 'days'}`}
//             </span>
//           )}
//           {countdown.hours !== undefined && (
//             <span className={`countdown-item hours ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.hours} ${countdown.hours === 1 ? 'hour' : 'hours'}`}
//             </span>
//           )}
//           {countdown.minutes !== undefined && (
//             <span className={`countdown-item minutes ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.minutes} ${countdown.minutes === 1 ? 'minute' : 'minutes'}`}
//             </span>
//           )}
//         </div>
//       );
//     }
//     return <span className="text-muted">No end of life set</span>;
//   };

//   const updateColorClass = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();

//     // Swap colors every hour and minute
//     if (hours % 2 === 0 && minutes === 0) {
//       setColorClass('calendar-green-1');
//     } else if (hours % 2 === 0 && minutes !== 0) {
//       setColorClass('calendar-green-2');
//     } else if (hours % 2 !== 0 && minutes === 0) {
//       setColorClass('calendar-green-3');
//     } else {
//       setColorClass('calendar-green-4');
//     }
//   };

//   // Function to render device countdown chart
//   const renderDeviceCountdownChart = (device) => {
//     if (!showCharts[device.deviceId]) return null; // Return null if showCharts is false for this device

//     const labels = [];
//     const data = [];

//     if (device.countdown?.years !== undefined) {
//       labels.push('Years');
//       data.push(device.countdown.years);
//     }
//     if (device.countdown?.months !== undefined) {
//       labels.push('Months');
//       data.push(device.countdown.months);
//     }
//     if (device.countdown?.days !== undefined) {
//       labels.push('Days');
//       data.push(device.countdown.days);
//     }
//     // Omitting hours and minutes

//     const ctx = document.getElementById(`deviceCountdownChart-${device.deviceId}`);

//     if (!ctx) return null; // Return null if canvas context is not found

//     // Check if chart instance already exists and destroy it
//     if (Chart.getChart(ctx)) {
//       Chart.getChart(ctx).destroy();
//     }

//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: [{
//           label: 'Time Remaining',
//           data: data,
//           backgroundColor: 'rgba(54, 162, 235, 0.6)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             display: false
//           },
//           title: {
//             display: true,
//             text: 'Device Countdown to End of Life'
//           }
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: 'Time'
//             }
//           },
//           x: {
//             title: {
//               display: true,
//               text: 'Units'
//             }
//           }
//         }
//       }
//     });
//   };

//   // Function to initialize or update charts
//   const initializeCharts = () => {
//     devices.forEach(device => {
//       renderDeviceCountdownChart(device);
//     });
//   };

//   // useEffect to initialize or update charts when devices or showCharts change
//   useEffect(() => {
//     initializeCharts();
//   }, [devices, showCharts]);

//   return (
//     <div className="view-devices-container">
//       <h2 className="mb-4">View Devices</h2>
//       <div className="search-section mb-3">
//         <select
//           className="form-select"
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//         >
//           <option value="name">Search by Name</option>
//           <option value="status">Search by Status</option>
//           <option value="type">Search by Type</option>
//         </select>
//         <input
//           type="text"
//           className="form-control mt-2"
//           placeholder={searchType === 'name' ? 'Device Name' : searchType === 'status' ? 'Status' : 'Device Type'}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <button className="btn btn-primary mt-2 view-devices-btn" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <div className="table-responsive">
//         <table className="table view-devices-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Purchase Date</th>
//               <th>End Of Life</th>
//               <th>End of Support Date</th>
//               <th>Status</th>
//               <th>Last Replacement Date</th>
//               <th>Action</th>
//               <th>Countdown</th>
//             </tr>
//           </thead>
//           <tbody>
//             {devices.map(device => (
//               <React.Fragment key={device.deviceId}>
//                 <tr onClick={() => handleDeviceClick(device)} style={{ cursor: 'pointer' }}>
//                   <td>{device.deviceName}</td>
//                   <td>{device.deviceType}</td>
//                   <td>{device.purchaseDate}</td>
//                   <td>{device.endOfLife}</td>
//                   <td>{device.endOfSupportDate}</td>
//                   <td>{device.status}</td>
//                   <td>{device.dateOfLastReplacement}</td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => handleReplacementRequest(device)}
//                     >
//                       Request Replacement
//                     </button>
//                   </td>
//                   <td>{renderCountdown(device)}</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="9">
//                     <div className="chart-container">
//                       <canvas
//                         id={`deviceCountdownChart-${device.deviceId}`}
//                         width="5"
//                         height="1"
//                       ></canvas>
//                     </div>
//                   </td>
//                 </tr>
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserViewDevices;

// const UserViewDevices = () => {
//   const [devices, setDevices] = useState([]);
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchType, setSearchType] = useState('name');
//   const [colorClass, setColorClass] = useState('');
//   const [selectedDevice, setSelectedDevice] = useState(null); // State to track selected device
//   const [showCharts, setShowCharts] = useState({}); // State to control chart visibility for each device

//   useEffect(() => {
//     fetchUserDevices();
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(updateCountdowns, 1000);
//     return () => clearInterval(interval);
//   }, [devices]);

//   const fetchUserDevices = async () => {
//     try {
//       const currentUser = AuthService.getCurrentUser();
//       const response = await RegularUserService.viewDevices(currentUser.id);
//       setDevices(response);
//       setErrorState(false);
//     } catch (error) {
//       console.error('Error fetching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch devices.');
//     }
//   };

//   const updateCountdowns = () => {
//     const updatedDevices = devices.map(device => {
//       if (device.endOfLife) {
//         const endOfLifeDate = new Date(device.endOfLife).getTime();
//         const now = new Date().getTime();
//         const timeDifference = endOfLifeDate - now;

//         if (timeDifference > 0) {
//           const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

//           if (daysLeft <= 30) {
//             const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
//             const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
//             const nextDay = new Date(now);
//             nextDay.setDate(nextDay.getDate() + 1);
//             const nextDayStart = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate()).getTime();
//             const daysRemaining = Math.floor((endOfLifeDate - nextDayStart) / (1000 * 60 * 60 * 24));

//             return {
//               ...device,
//               countdown: {
//                 days: daysRemaining,
//                 hours: hoursLeft,
//                 minutes: minutesLeft
//               }
//             };
//           } else if (daysLeft <= 90) {
//             return {
//               ...device,
//               countdown: {
//                 days: daysLeft
//               }
//             };
//           } else if (daysLeft <= 365) {
//             const monthsLeft = Math.floor(daysLeft / 30);
//             return {
//               ...device,
//               countdown: {
//                 months: monthsLeft
//               }
//             };
//           } else {
//             const yearsLeft = Math.floor(daysLeft / 365);
//             return {
//               ...device,
//               countdown: {
//                 years: yearsLeft
//               }
//             };
//           }
//         }
//       }
//       return device;
//     });
//     setDevices(updatedDevices);
//     updateColorClass(); // Update color class on every interval update
//   };

//   const handleReplacementRequest = async (device) => {
//     try {
//       const replaceDTO = {
//         deviceId: device.deviceId,
//         deviceName: device.deviceName,
//         deviceType: device.deviceType
//       };
//       const response = await RegularUserService.requestReplacement(replaceDTO);

//       const updatedDevices = devices.map(d => {
//         if (d.deviceId === device.deviceId) {
//           return {
//             ...d,
//             dateOfLastReplacement: new Date().toISOString().split('T')[0]
//           };
//         }
//         return d;
//       });
//       setDevices(updatedDevices);

//       alert('Replacement requested successfully!');

//       console.log('Request Replacement Response:', response);

//     } catch (error) {
//       console.error('Error requesting replacement:', error);
//       alert('Failed to request replacement.');
//     }
//   };

//   const handleSearch = async () => {
//     try {
//       if (searchTerm.trim() === '') {
//         fetchUserDevices();
//         return;
//       }

//       let response;
//       switch (searchType) {
//         case 'name':
//           response = await RegularUserService.searchDevicesByName(searchTerm);
//           break;
//         case 'status':
//           response = await RegularUserService.searchDevicesByStatus(searchTerm);
//           break;
//         case 'type':
//           response = await RegularUserService.searchDevicesByType(searchTerm);
//           break;
//         default:
//           return;
//       }
//       setDevices(response);
//       setErrorState(false);
//     } catch (error) {
//       console.error('Error searching devices:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to search devices.');
//     }
//   };

//   const handleDeviceClick = (device) => {
//     if (selectedDevice && selectedDevice.deviceId === device.deviceId) {
//       setSelectedDevice(null); // Deselect the device if it's already selected
//     } else {
//       setSelectedDevice(device);
//     }

//     // Toggle the chart visibility for the clicked device
//     setShowCharts(prevState => ({
//       ...prevState,
//       [device.deviceId]: !prevState[device.deviceId]
//     }));
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const renderCountdown = (device) => {
//     const { countdown } = device;
//     if (countdown !== undefined) {
//       return (
//         <div className="countdown-container">
//           {countdown.years !== undefined && (
//             <span className={`countdown-item years ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.years} ${countdown.years === 1 ? 'year' : 'years'}`}
//             </span>
//           )}
//           {countdown.months !== undefined && (
//             <span className={`countdown-item months ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.months} ${countdown.months === 1 ? 'month' : 'months'}`}
//             </span>
//           )}
//           {countdown.days !== undefined && (
//             <span className={`countdown-item days ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.days} ${countdown.days === 1 ? 'day' : 'days'}`}
//             </span>
//           )}
//           {countdown.hours !== undefined && (
//             <span className={`countdown-item hours ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.hours} ${countdown.hours === 1 ? 'hour' : 'hours'}`}
//             </span>
//           )}
//           {countdown.minutes !== undefined && (
//             <span className={`countdown-item minutes ${colorClass}`}>
//               <span className="fold-top"></span>
//               <span className="fold-bottom"></span>
//               {`${countdown.minutes} ${countdown.minutes === 1 ? 'minute' : 'minutes'}`}
//             </span>
//           )}
//         </div>
//       );
//     }
//     return <span className="text-muted">No end of life set</span>;
//   };

//   const updateColorClass = () => {
//     const now = new Date();
//     const hours = now.getHours();
//     const minutes = now.getMinutes();

//     // Swap colors every hour and minute
//     if (hours % 2 === 0 && minutes === 0) {
//       setColorClass('calendar-green-1');
//     } else if (hours % 2 === 0 && minutes !== 0) {
//       setColorClass('calendar-green-2');
//     } else if (hours % 2 !== 0 && minutes === 0) {
//       setColorClass('calendar-green-3');
//     } else {
//       setColorClass('calendar-green-4');
//     }
//   };

//   // Function to render device countdown chart
//   const renderDeviceCountdownChart = (device) => {
//     if (!showCharts[device.deviceId]) return null; // Return null if showCharts is false for this device

//     const labels = [];
//     const data = [];

//     if (device.countdown?.years !== undefined) {
//       labels.push('Years');
//       data.push(device.countdown.years);
//     }
//     if (device.countdown?.months !== undefined) {
//       labels.push('Months');
//       data.push(device.countdown.months);
//     }
//     if (device.countdown?.days !== undefined) {
//       labels.push('Days');
//       data.push(device.countdown.days);
//     }
//     // Omitting hours and minutes

//     const ctx = document.getElementById(`deviceCountdownChart-${device.deviceId}`);

//     if (!ctx) return null; // Return null if canvas context is not found

//     // Check if chart instance already exists and destroy it
//     if (Chart.getChart(ctx)) {
//       Chart.getChart(ctx).destroy();
//     }

//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: labels,
//         datasets: [{
//           label: 'Time Remaining',
//           data: data,
//           backgroundColor: 'rgba(54, 162, 235, 0.6)',
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             display: false
//           },
//           title: {
//             display: true,
//             text: 'Device Countdown to End of Life'
//           }
//         },
//         scales: {
//           y: {
//             beginAtZero: true,
//             title: {
//               display: true,
//               text: 'Time'
//             }
//           },
//           x: {
//             title: {
//               display: true,
//               text: 'Units'
//             }
//           }
//         }
//       }
//     });
//   };

//   // Function to initialize or update charts
//   const initializeCharts = () => {
//     devices.forEach(device => {
//       renderDeviceCountdownChart(device);
//     });
//   };

//   // useEffect to initialize or update charts when devices or showCharts change
//   useEffect(() => {
//     initializeCharts();
//   }, [devices, showCharts]);

//   return (
//     <div className="view-devices-container">
//       <h2 className="mb-4">View Devices</h2>
//       <div className="search-section mb-3">
//         <select
//           className="form-select"
//           value={searchType}
//           onChange={(e) => setSearchType(e.target.value)}
//         >
//           <option value="name">Search by Name</option>
//           <option value="status">Search by Status</option>
//           <option value="type">Search by Type</option>
//         </select>
//         <input
//           type="text"
//           className="form-control mt-2"
//           placeholder={searchType === 'name' ? 'Device Name' : searchType === 'status' ? 'Status' : 'Device Type'}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           onKeyPress={handleKeyPress}
//         />
//         <button className="btn btn-primary mt-2 view-devices-btn" onClick={handleSearch}>
//           Search
//         </button>
//       </div>
//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <div className="table-responsive">
//         <table className="table view-devices-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Type</th>
//               <th>Purchase Date</th>
//               <th>End Of Life</th>
//               <th>End of Support Date</th>
//               <th>Status</th>
//               <th>Last Replacement Date</th>
//               <th>Action</th>
//               <th>Countdown</th>
//             </tr>
//           </thead>
//           <tbody>
//             {devices.map(device => (
//               <React.Fragment key={device.deviceId}>
//                 <tr onClick={() => handleDeviceClick(device)} style={{ cursor: 'pointer' }}>
//                   <td>{device.deviceName}</td>
//                   <td>{device.deviceType}</td>
//                   <td>{device.purchaseDate}</td>
//                   <td>{device.endOfLife}</td>
//                   <td>{device.endOfSupportDate}</td>
//                   <td>{device.status}</td>
//                   <td>{device.dateOfLastReplacement}</td>
//                   <td>
//                     <button
//                       className="btn btn-sm btn-primary"
//                       onClick={() => handleReplacementRequest(device)}
//                     >
//                       Request Replacement
//                     </button>
//                   </td>
//                   <td>{renderCountdown(device)}</td>
//                 </tr>
//                 <tr>
//                   <td colSpan="9">
//                     <div className="chart-container">
//                       <canvas
//                         id={`deviceCountdownChart-${device.deviceId}`}
//                         width="400"
//                         height="200"
//                       ></canvas>
//                     </div>
//                   </td>
//                 </tr>
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserViewDevices;

const UserViewDevices = () => {
  const [devices, setDevices] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [colorClass, setColorClass] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null); // State to track selected device
  const [showCharts, setShowCharts] = useState({}); // State to control chart visibility for each device

  useEffect(() => {
    fetchUserDevices();
  }, []);

  useEffect(() => {
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [devices]);

  const fetchUserDevices = async () => {
    try {
      const currentUser = AuthService.getCurrentUser();
      const response = await RegularUserService.viewDevices(currentUser.id);
      setDevices(response);
      setErrorState(false);
    } catch (error) {
      console.error('Error fetching devices:', error);
      setErrorState(true);
      setErrorMessage('Failed to fetch devices.');
    }
  };

  const updateCountdowns = () => {
    const updatedDevices = devices.map(device => {
      if (device.endOfLife) {
        const endOfLifeDate = new Date(device.endOfLife).getTime();
        const now = new Date().getTime();
        const timeDifference = endOfLifeDate - now;

        if (timeDifference > 0) {
          const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

          if (daysLeft <= 30) {
            const hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
            const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const nextDay = new Date(now);
            nextDay.setDate(nextDay.getDate() + 1);
            const nextDayStart = new Date(nextDay.getFullYear(), nextDay.getMonth(), nextDay.getDate()).getTime();
            const daysRemaining = Math.floor((endOfLifeDate - nextDayStart) / (1000 * 60 * 60 * 24));

            return {
              ...device,
              countdown: {
                days: daysRemaining,
                hours: hoursLeft,
                minutes: minutesLeft
              }
            };
          } else if (daysLeft <= 90) {
            return {
              ...device,
              countdown: {
                days: daysLeft
              }
            };
          } else if (daysLeft <= 365) {
            const monthsLeft = Math.floor(daysLeft / 30);
            return {
              ...device,
              countdown: {
                months: monthsLeft
              }
            };
          } else {
            const yearsLeft = Math.floor(daysLeft / 365);
            return {
              ...device,
              countdown: {
                years: yearsLeft
              }
            };
          }
        }
      }
      return device;
    });
    setDevices(updatedDevices);
    updateColorClass(); // Update color class on every interval update
  };

  const handleReplacementRequest = async (device) => {
    try {
      const replaceDTO = {
        deviceId: device.deviceId,
        deviceName: device.deviceName,
        deviceType: device.deviceType
      };
      const response = await RegularUserService.requestReplacement(replaceDTO);

      const updatedDevices = devices.map(d => {
        if (d.deviceId === device.deviceId) {
          return {
            ...d,
            dateOfLastReplacement: new Date().toISOString().split('T')[0]
          };
        }
        return d;
      });
      setDevices(updatedDevices);

      alert('Replacement requested successfully!');

      console.log('Request Replacement Response:', response);

    } catch (error) {
      console.error('Error requesting replacement:', error);
      alert('Failed to request replacement.');
    }
  };

  const handleSearch = async () => {
    try {
      if (searchTerm.trim() === '') {
        fetchUserDevices();
        return;
      }

      let response;
      switch (searchType) {
        case 'name':
          response = await RegularUserService.searchDevicesByName(searchTerm);
          break;
        case 'status':
          response = await RegularUserService.searchDevicesByStatus(searchTerm);
          break;
        case 'type':
          response = await RegularUserService.searchDevicesByType(searchTerm);
          break;
        default:
          return;
      }
      setDevices(response);
      setErrorState(false);
    } catch (error) {
      console.error('Error searching devices:', error);
      setErrorState(true);
      setErrorMessage('Failed to search devices.');
    }
  };

  const handleDeviceClick = (device) => {
    if (selectedDevice && selectedDevice.deviceId === device.deviceId) {
      setSelectedDevice(null); // Deselect the device if it's already selected
    } else {
      setSelectedDevice(device);
    }

    // Toggle the chart visibility for the clicked device
    setShowCharts(prevState => ({
      ...prevState,
      [device.deviceId]: !prevState[device.deviceId]
    }));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const renderCountdown = (device) => {
    const { countdown } = device;
    if (countdown !== undefined) {
      return (
        <div className="countdown-container">
          {countdown.years !== undefined && (
            <span className={`countdown-item years ${colorClass}`}>
              <span className="fold-top"></span>
              <span className="fold-bottom"></span>
              {`${countdown.years} ${countdown.years === 1 ? 'year' : 'years'}`}
            </span>
          )}
          {countdown.months !== undefined && (
            <span className={`countdown-item months ${colorClass}`}>
              <span className="fold-top"></span>
              <span className="fold-bottom"></span>
              {`${countdown.months} ${countdown.months === 1 ? 'month' : 'months'}`}
            </span>
          )}
          {countdown.days !== undefined && (
            <span className={`countdown-item days ${colorClass}`}>
              <span className="fold-top"></span>
              <span className="fold-bottom"></span>
              {`${countdown.days} ${countdown.days === 1 ? 'day' : 'days'}`}
            </span>
          )}
          {countdown.hours !== undefined && (
            <span className={`countdown-item hours ${colorClass}`}>
              <span className="fold-top"></span>
              <span className="fold-bottom"></span>
              {`${countdown.hours} ${countdown.hours === 1 ? 'hour' : 'hours'}`}
            </span>
          )}
          {countdown.minutes !== undefined && (
            <span className={`countdown-item minutes ${colorClass}`}>
              <span className="fold-top"></span>
              <span className="fold-bottom"></span>
              {`${countdown.minutes} ${countdown.minutes === 1 ? 'minute' : 'minutes'}`}
            </span>
          )}
        </div>
      );
    }
    return <span className="text-muted">No end of life set</span>;
  };

  const updateColorClass = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // Swap colors every hour and minute
    if (hours % 2 === 0 && minutes === 0) {
      setColorClass('calendar-green-1');
    } else if (hours % 2 === 0 && minutes !== 0) {
      setColorClass('calendar-green-2');
    } else if (hours % 2 !== 0 && minutes === 0) {
      setColorClass('calendar-green-3');
    } else {
      setColorClass('calendar-green-4');
    }
  };

  const renderDeviceCountdownChart = (device) => {
    if (!showCharts[device.deviceId]) return null; // Return null if showCharts is false for this device

    const labels = [];
    const data = [];

    if (device.countdown?.years !== undefined) {
      labels.push('Years');
      data.push(device.countdown.years);
    }
    if (device.countdown?.months !== undefined) {
      labels.push('Months');
      data.push(device.countdown.months);
    }
    if (device.countdown?.days !== undefined) {
      labels.push('Days');
      data.push(device.countdown.days);
    }
    // Omitting hours and minutes

    const ctx = document.getElementById(`deviceCountdownChart-${device.deviceId}`);

    if (!ctx) return null; // Return null if canvas context is not found

    // Check if chart instance already exists and destroy it
    if (Chart.getChart(ctx)) {
      Chart.getChart(ctx).destroy();
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Time Remaining',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
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
            text: 'Device Countdown to End of Life'
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

  const initializeCharts = () => {
    devices.forEach(device => {
      renderDeviceCountdownChart(device);
    });
  };

  useEffect(() => {
    initializeCharts();
  }, [devices, showCharts]);

  return (
    <div className="view-devices-container">
      <h2 className="text-center mt-5 mb-3 underline">View Devices</h2>
      <div className="search-section mb-3">
        <select
          className="form-select"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="name">Search by Name</option>
          <option value="status">Search by Status</option>
          <option value="type">Search by Type</option>
        </select>
        <input
          type="text"
          className="form-control mt-2"
          placeholder={searchType === 'name' ? 'Device Name' : searchType === 'status' ? 'Status' : 'Device Type'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary mt-2 view-devices-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      {errorState && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="table-responsive">
        <table className="table view-devices-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Purchase Date</th>
              <th>End Of Life</th>
              <th>End of Support Date</th>
              <th>Status</th>
              <th>Last Replacement Date</th>
              <th>Action</th>
              <th>Countdown</th>
            </tr>
          </thead>
          <tbody>
            {devices.map(device => (
              <React.Fragment key={device.deviceId}>
                <tr onClick={() => handleDeviceClick(device)} style={{ cursor: 'pointer' }}>
                  <td>{device.deviceName}</td>
                  <td>{device.deviceType}</td>
                  <td>{device.purchaseDate}</td>
                  <td>{device.endOfLife}</td>
                  <td>{device.endOfSupportDate}</td>
                  <td>{device.status}</td>
                  <td>{device.dateOfLastReplacement}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleReplacementRequest(device)}
                    >
                      Request Replacement
                    </button>
                  </td>
                  <td>{renderCountdown(device)}</td>
                </tr>
                {showCharts[device.deviceId] && (
                  <tr>
                    <td colSpan="9">
                      <div className="chart-container">
                        <canvas
                          id={`deviceCountdownChart-${device.deviceId}`}
                          // width="400"
                          // height="200"
                          width="5"
                          height="1"
                        ></canvas>
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

export default UserViewDevices;