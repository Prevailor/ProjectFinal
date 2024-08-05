


// import React, { useState, useEffect } from 'react';
// import DeviceService from '../services/DeviceService';
// import UpdateDevice from './UpdateDevice';

// const UpdateDeviceForm = () => {
//   const [deviceId, setDeviceId] = useState('');
//   const [device, setDevice] = useState(null); // Initially no device
//   const [error, setError] = useState(null);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission

//   useEffect(() => {
//     const fetchDeviceData = async () => {
//       try {
//         const fetchedDevice = await DeviceService.getDeviceById(deviceId);
//         setDevice(fetchedDevice);
//       } catch (error) {
//         console.error('Error fetching device:', error);
//         setError('Failed to fetch device.');
//       }
//     };

//     if (formSubmitted && deviceId) {
//       fetchDeviceData();
//     }
//   }, [formSubmitted, deviceId]);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setFormSubmitted(true); // Trigger fetching device data
//     } catch (error) {
//       console.error('Error updating device:', error);
//       setError('Error updating device.');
//     }
//   };

//   const handleDeviceIdChange = (e) => {
//     setDeviceId(e.target.value);
//   };

//   return (
//     <div className="container mt-4">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card p-4 rounded">
//             <h2 className="mb-4">Update Device</h2>
//             <form onSubmit={handleFormSubmit}>
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
//               <button type="submit" className="btn btn-primary mb-3">
//                 Fetch Device Details
//               </button>
//               {error && <p className="text-danger">{error}</p>}
//               {responseMessage && <p className="mt-4">{responseMessage}</p>}
//             </form>
//             {formSubmitted && device && (
//               <UpdateDevice
//                 device={device}
//                 setResponseMessage={setResponseMessage}
//                 setError={setError}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateDeviceForm;


// import React, { useState, useEffect } from 'react';
// import DeviceService from '../services/DeviceService';
// import UpdateDevice from './UpdateDevice';

// const UpdateDeviceForm = () => {
//   const [deviceId, setDeviceId] = useState('');
//   const [device, setDevice] = useState(null); // Initially no device
//   const [error, setError] = useState(null);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission

//   useEffect(() => {
//     const fetchDeviceData = async () => {
//       try {
//         const fetchedDevice = await DeviceService.getDeviceById(deviceId);
//         setDevice(fetchedDevice);
//       } catch (error) {
//         console.error('Error fetching device:', error);
//         setError('Failed to fetch device.');
//       }
//     };

//     if (formSubmitted && deviceId) {
//       fetchDeviceData();
//     }
//   }, [formSubmitted, deviceId]);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setFormSubmitted(true); // Trigger fetching device data
//     } catch (error) {
//       console.error('Error updating device:', error);
//       setError('Error updating device.');
//     }
//   };

//   const handleDeviceIdChange = (e) => {
//     setDeviceId(e.target.value);
//   };

//   return (
//     <div className="row justify-content-center">
//       <div className="col-md-8">
//         <div className="text-center mb-4">
//           <h2 className="mb-0">Update Device</h2>
//           <hr className="mt-2 mb-4 custom-line" />
//         </div>
//         <form onSubmit={handleFormSubmit}>
//           <div className="form-group row align-items-center">
//             <label htmlFor="deviceId" className="col-sm-3 col-form-label text-right">Enter Device ID:</label>
//             <div className="col-sm-6">
//               <input
//                 type="text"
//                 id="deviceId"
//                 name="deviceId"
//                 value={deviceId}
//                 onChange={handleDeviceIdChange}
//                 className="form-control"
//                 required
//               />
//             </div>
//             <div className="col-sm-3">
//               <button type="submit" className="btn btn-primary btn-block">
//                 Fetch Device Details
//               </button>
//             </div>
//           </div>
//           {error && <p className="text-danger text-center">{error}</p>}
//           {responseMessage && <p className="mt-4 text-center">{responseMessage}</p>}
//         </form>
//         {formSubmitted && device && (
//           <UpdateDevice
//             device={device}
//             setResponseMessage={setResponseMessage}
//             setError={setError}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default UpdateDeviceForm;


 


 
// import React, { useState, useEffect } from 'react';
// import DeviceService from '../services/DeviceService';
// import UpdateDevice from './UpdateDevice';
 
// const UpdateDeviceForm = () => {
//   const [deviceId, setDeviceId] = useState('');
//   const [device, setDevice] = useState(null); // Initially no device
//   const [error, setError] = useState(null);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission
 
//   useEffect(() => {
//     const fetchDeviceData = async () => {
//       try {
//         const fetchedDevice = await DeviceService.getDeviceById(deviceId);
//         setDevice(fetchedDevice);
//       } catch (error) {
//         console.error('Error fetching device:', error);
//         setError('Failed to fetch device.');
//       }
//     };
 
//     if (formSubmitted && deviceId) {
//       fetchDeviceData();
//     }
//   }, [formSubmitted, deviceId]);
 
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setFormSubmitted(true); // Trigger fetching device data
//     } catch (error) {
//       console.error('Error updating device:', error);
//       setError('Error updating device.');
//     }
//   };
 
//   const handleDeviceIdChange = (e) => {
//     setDeviceId(e.target.value);
//   };
 
//   return (
//     <div className="container mt-4">
//       <div className="row justify-content-center">
//         <div className="col-md-8">
//           <div className="card p-4 rounded">
//             <h2 className="mb-4">Update Device</h2>
//             <form onSubmit={handleFormSubmit}>
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
//               <button type="submit" className="btn btn-primary mb-3">
//                 Fetch Device Details
//               </button>
//               {error && <p className="text-danger">{error}</p>}
//               {responseMessage && <p className="mt-4">{responseMessage}</p>}
//             </form>
//             {formSubmitted && device && (
//               <UpdateDevice
//                 device={device}
//                 setResponseMessage={setResponseMessage}
//                 setError={setError}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
 
// export default UpdateDeviceForm;
import React, { useState, useEffect } from 'react';
import DeviceService from '../services/DeviceService';
import UpdateDevice from './UpdateDevice';
 
const UpdateDeviceForm = () => {
  const [deviceId, setDeviceId] = useState('');
  const [device, setDevice] = useState(null); // Initially no device
  const [error, setError] = useState(null);
  const [deviceList, setDeviceList] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false); // Track form submission


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

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const fetchedDevice = await DeviceService.getDeviceById(deviceId);
        setDevice(fetchedDevice);
      } catch (error) {
        console.error('Error fetching device:', error);
        alert('Failed to fetch device.');
      }
    };

    if (formSubmitted && deviceId) {
      fetchDeviceData();
    }
  }, [formSubmitted, deviceId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormSubmitted(true); // Trigger fetching device data
    } catch (error) {
      console.error('Error updating device:', error);
      setError('Error updating device.');
    }
  };

  const handleDeviceIdChange = (e) => {
    setDeviceId(e.target.value);
  };

  return (
    <div className="update-device-form">
      <div className="title-container">
        <h2 className="page-title">Update Device Details</h2>
        {/* <hr className="underline" /> */}
      </div>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 rounded">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="deviceId">Select Device:</label>
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
              <button type="submit" className="btn btn-primaryy">
                Fetch Device Details
              </button>
              {error && <p className="text-danger">{error}</p>}
              {responseMessage && <p className="mt-4">{responseMessage}</p>}
            </form>
            {formSubmitted && device && (
              <UpdateDevice
                device={device}
                setResponseMessage={setResponseMessage}
                setError={setError}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDeviceForm;