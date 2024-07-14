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

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegularUserService from '../services/RegularUserService';
import AuthService from '../services/auth.service';
import 'D:\\ProjectFinal\\Frontend\\src\\UserViewSoftware.css'; // Import your custom styles

const UserViewSoftware = () => {
  const [deviceName, setDeviceName] = useState('');
  const [software, setSoftware] = useState([]);
  const [devices, setDevices] = useState([]);
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

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
        const minutesLeft = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

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
      alert('Renewal requested successfully!'); // Modify alert as needed

    } catch (error) {
      console.error('Error requesting renewal:', error);
      // Handle error as needed
      alert('Failed to request renewal.'); // Show error message to user
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

  return (
    <div className="user-view-software">
      <h2 className="mb-4">View Software by Device Name</h2>
      <form onSubmit={handleFormSubmit} className="mb-4 search-section">
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
  <button type="submit" className="btn btn-primarys">
    Search Software
  </button>
</form>

      {errorState && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="table-responsive">
        <table className="table mt-4 view-devices-table">
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
              <tr key={softwareItem.softwareId}>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserViewSoftware;