// import React, { useState } from 'react';
// import DeviceService from '../services/DeviceService';
 
// const DeleteDeviceForm = () => {
//   const [deviceId, setDeviceId] = useState('');
//   const [error, setError] = useState(null);
//   const [responseMessage, setResponseMessage] = useState('');
 
//   const handleDelete = async (e) => {
//     e.preventDefault();
//     try {
//       await DeviceService.deleteDevice(deviceId);
//       alert('Device deleted successfully.');
//       setDeviceId(''); // Clear input after successful deletion
//     } catch (error) {
//       console.error('Error deleting device:', error);
//       setError('Failed to delete device.');
//     }
//   };
 
//   const handleDeviceIdChange = (e) => {
//     setDeviceId(e.target.value);
//   };
 
//   return (
//     <div className="container mt-4">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card p-4 rounded">
//             <h2 className="mb-4">Delete Device</h2>
//             <form onSubmit={handleDelete}>
//               <div className="form-group">
//                 <label htmlFor="deviceId">Enter Device ID:</label>
//                 <input
//                   type="text"
//                   id="deviceId"
//                   name="deviceId"
//                   value={deviceId}
//                   onChange={handleDeviceIdChange}
//                   className="form-control"
//                   required
//                 />
//               </div>
//               <button type="submit" className="btn btn-danger mb-3">
//                 Delete Device
//               </button>
//               {error && <p className="text-danger">{error}</p>}
//               {responseMessage && <p className="mt-4">{responseMessage}</p>}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default DeleteDeviceForm;


import React, { useState, useEffect } from 'react';
import DeviceService from '../services/DeviceService';
import 'D:\\ProjectFinal\\Frontend\\src\\DeleteDeviceForm.css'; // Import your custom CSS file for styling


const DeleteDeviceForm = () => {
  const [deviceId, setDeviceId] = useState('');
  const [error, setError] = useState(null);
  const [deviceList, setDeviceList] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await DeviceService.deleteDevice(deviceId);
      alert('Device deleted successfully.');
      setDeviceId(''); // Clear input after successful deletion
      setError(null);
    } catch (error) {
      console.error('Error deleting device:', error);
      alert('Failed to delete device.');
      setResponseMessage('');
    }
  };

  useEffect(() => {
    const fetchDeviceList = async () => {
      try {
        const devices = await DeviceService.getAllDevices(); // Assuming getAllDevices exists in DeviceService
        setDeviceList(devices);
      } catch (error) {
        console.error('Error fetching devices:', error);
        setError('Failed to fetch devices.');
      }
    };
  
    fetchDeviceList();
  }, []);

  const handleDeviceIdChange = (e) => {
    setDeviceId(e.target.value);
  };

  return (
    <div className="delete-device-form-container">
      <div className="delete-device-form">
        <h2 className="page-title">Delete Device</h2>
        <form onSubmit={handleDelete}>
          <div className="form-group">
            <label htmlFor="deviceId">Enter Device ID:</label>
            <select
                  id="deviceId"
                  name="deviceId"
                  value={deviceId}
                  onChange={handleDeviceIdChange}
                  className="form-control"
                  required
                >
                  <option value="">Select device</option>
                  {deviceList.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.deviceName}
                    </option>
                  ))}
                </select>
          </div>
          <button type="submit" className="delete-device-button">
            Delete Device
          </button>
          {error && <p className="error-message">{error}</p>}
          {responseMessage && <p className="success-message">{responseMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default DeleteDeviceForm;
