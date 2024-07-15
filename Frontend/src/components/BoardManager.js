import React, { useState, useEffect } from 'react';
import ManagerService from '../services/ManagerService';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'D:\\ProjectFinal\\Frontend\\src\\BoardManager.css'

// // const BoardManager = () => {
// //   const [lifecycleEvents, setLifecycleEvents] = useState([]);
// //   const [errorState, setErrorState] = useState(false);
// //   const [errorMessage, setErrorMessage] = useState('');

// //   useEffect(() => {
// //     fetchLifecycleEvents();
// //   }, []);

// //   const fetchLifecycleEvents = async () => {
// //     try {
// //       const events = await ManagerService.viewAllLifecycleEvents();
// //       setLifecycleEvents(events);
// //       setErrorState(false); // Reset error state on successful fetch
// //     } catch (error) {
// //       console.error('Error fetching lifecycle events:', error);
// //       setErrorState(true);
// //       setErrorMessage('Failed to fetch lifecycle events.'); // Set error message on fetch error
// //     }
// //   };

// //   return (
// //     <div className="container mt-5">
// //       <h2 className="mb-4">Board Management</h2>
// //       {errorState && (
// //         <div className="alert alert-danger" role="alert">
// //           {errorMessage}
// //         </div>
// //       )}
// //       <table className="table mt-4">
// //         <thead>
// //           <tr>
// //             <th>Event ID</th>
// //             <th>Device ID</th>
// //             <th>Event Type</th>
// //             <th>Event Date</th>
// //             <th>Description</th>
// //             <th>Category</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {lifecycleEvents.map(event => (
// //             <tr key={event.eventId}>
// //               <td>{event.eventId}</td>
// //               <td>{event.deviceId}</td> {/* Displaying device ID */}
// //               <td>{event.eventType}</td>
// //               <td>{event.eventDate}</td>
// //               <td>{event.description}</td>
// //               <td>{event.category}</td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default BoardManager;


// import React, { useState, useEffect } from 'react';
// import ManagerService from '../services/ManagerService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import jsPDF from 'jspdf';

// const BoardManager = () => {
//   const [lifecycleEvents, setLifecycleEvents] = useState([]);
//   const [selectedEvents, setSelectedEvents] = useState(new Set()); // Set to track selected event IDs
//   const [errorState, setErrorState] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');

//   useEffect(() => {
//     fetchLifecycleEvents();
//   }, []);

//   const fetchLifecycleEvents = async () => {
//     try {
//       const events = await ManagerService.viewAllLifecycleEvents();
//       setLifecycleEvents(events);
//       setErrorState(false); // Reset error state on successful fetch
//     } catch (error) {
//       console.error('Error fetching lifecycle events:', error);
//       setErrorState(true);
//       setErrorMessage('Failed to fetch lifecycle events.'); // Set error message on fetch error
//     }
//   };

//   const toggleEventSelection = (eventId) => {
//     const updatedSelectedEvents = new Set(selectedEvents);
//     if (updatedSelectedEvents.has(eventId)) {
//       updatedSelectedEvents.delete(eventId);
//     } else {
//       updatedSelectedEvents.add(eventId);
//     }
//     setSelectedEvents(updatedSelectedEvents);
//   };

//   const isEventSelected = (eventId) => {
//     return selectedEvents.has(eventId);
//   };

  // const generatePDF = () => {
  //   const pdf = new jsPDF();
  //   const totalPagesExp = '{total_pages_count_string}';

  //   pdf.setProperties({
  //     title: 'Board Management - Selected Lifecycle Events Report',
  //   });

  //   let startY = 40;
  //   pdf.setFontSize(18);
  //   pdf.text('Board Management - Selected Lifecycle Events Report', pdf.internal.pageSize.width / 2, startY, { align: 'center' });
  //   startY += 10;

  //   pdf.setFontSize(12);
  //   pdf.setTextColor(100);
  //   let pageHeight = pdf.internal.pageSize.height - 20;

  //   let y = 70;
  //   let pageCount = 1;

  //   lifecycleEvents.forEach((event, index) => {
  //     if (!isEventSelected(event.eventId)) {
  //       return; // Skip events that are not selected
  //     }

  //     if (y > pageHeight - 20) {
  //       pdf.addPage();
  //       y = 70;
  //       pageCount++;
  //     }

  //     pdf.text(`Event ${index + 1}`, 20, y);
  //     pdf.text(`Event ID: ${event.eventId}`, 40, y + 10);
  //     pdf.text(`Device ID: ${event.deviceId}`, 40, y + 20);
  //     pdf.text(`Event Type: ${event.eventType}`, 40, y + 30);
  //     pdf.text(`Event Date: ${event.eventDate}`, 40, y + 40);
  //     pdf.text(`Description: ${event.description}`, 40, y + 50);
  //     pdf.text(`Category: ${event.category}`, 40, y + 60);

  //     y += 80;
  //   });

  //   // Set total page number on each page
  //   for (let i = 1; i <= pageCount; i++) {
  //     pdf.setPage(i);
  //     pdf.text(`Page ${i} of ${totalPagesExp}`, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 10);
  //   }

  //   pdf.save('selected_lifecycle_events.pdf');
  // };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4">Board Management</h2>
//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <button className="btn btn-primary mb-3" onClick={generatePDF} disabled={selectedEvents.size === 0}>
//         Generate PDF Report for Selected Events
//       </button>
//       <table className="table mt-4">
//         <thead className="thead-dark">
//           <tr>
//             <th scope="col">Select</th>
//             <th scope="col">Event ID</th>
//             <th scope="col">Device ID</th>
//             <th scope="col">Event Type</th>
//             <th scope="col">Event Date</th>
//             <th scope="col">Description</th>
//             <th scope="col">Category</th> 
//           </tr>
//         </thead>
//         <tbody>
//           {lifecycleEvents.map((event) => (
//             <tr key={event.eventId}>
//               <td>
//                 <input
//                   type="checkbox"
//                   checked={isEventSelected(event.eventId)}
//                   onChange={() => toggleEventSelection(event.eventId)}
//                 />
//               </td>
//               <td>{event.eventId}</td>
//               <td>{event.deviceId}</td>
//               <td>{event.eventType}</td>
//               <td>{event.eventDate}</td>
//               <td>{event.description}</td>
//               <td>{event.category}</td>
              
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BoardManager;


import jsPDF from 'jspdf';

const BoardManager = () => {
  const [lifecycleEvents, setLifecycleEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(new Set()); // Set to track selected event IDs
  const [errorState, setErrorState] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchLifecycleEvents();
  }, []);

  const fetchLifecycleEvents = async () => {
    try {
      const events = await ManagerService.viewAllLifecycleEvents();
      setLifecycleEvents(events);
      setErrorState(false); // Reset error state on successful fetch
    } catch (error) {
      console.error('Error fetching lifecycle events:', error);
      setErrorState(true);
      setErrorMessage('Failed to fetch lifecycle events.'); // Set error message on fetch error
    }
  };

  const toggleEventSelection = (eventId) => {
    const updatedSelectedEvents = new Set(selectedEvents);
    if (updatedSelectedEvents.has(eventId)) {
      updatedSelectedEvents.delete(eventId);
    } else {
      updatedSelectedEvents.add(eventId);
    }
    setSelectedEvents(updatedSelectedEvents);
  };

  const isEventSelected = (eventId) => {
    return selectedEvents.has(eventId);
  };

  
  const generatePDF = () => {
    const pdf = new jsPDF();
    const totalPagesExp = '{total_pages_count_string}';

    pdf.setProperties({
      title: 'Board Management - Selected Lifecycle Events Report',
    });

    let startY = 40;
    pdf.setFontSize(18);
    pdf.text('Board Management - Selected Lifecycle Events Report', pdf.internal.pageSize.width / 2, startY, { align: 'center' });
    startY += 10;

    pdf.setFontSize(12);
    pdf.setTextColor(100);
    let pageHeight = pdf.internal.pageSize.height - 20;

    let y = 70;
    let pageCount = 1;

    lifecycleEvents.forEach((event, index) => {
      if (!isEventSelected(event.eventId)) {
        return; // Skip events that are not selected
      }

      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 70;
        pageCount++;
      }

      pdf.text(`Event ${index + 1}`, 20, y);
      pdf.text(`Event ID: ${event.eventId}`, 40, y + 10);
      pdf.text(`Device ID: ${event.deviceId}`, 40, y + 20);
      pdf.text(`Event Type: ${event.eventType}`, 40, y + 30);
      pdf.text(`Event Date: ${event.eventDate}`, 40, y + 40);
      pdf.text(`Description: ${event.description}`, 40, y + 50);
      pdf.text(`Category: ${event.category}`, 40, y + 60);

      y += 80;
    });

    // Set total page number on each page
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.text(`Page ${i} of ${totalPagesExp}`, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 10);
    }

    pdf.save('selected_lifecycle_events.pdf');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 underline">Board Management</h2>
      {errorState && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <button className="btn btn-primaryys mb-3" onClick={generatePDF} disabled={selectedEvents.size === 0}>
        Generate PDF Report for Selected Events
      </button>
      <table className="tables mt-4">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Select</th>
            <th scope="col">Event ID</th>
            <th scope="col">Device ID</th>
            <th scope="col">Event Type</th>
            <th scope="col">Event Date</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {lifecycleEvents.map((event) => (
            <tr key={event.eventId}>
              <td>
                <input
                  type="checkbox"
                  checked={isEventSelected(event.eventId)}
                  onChange={() => toggleEventSelection(event.eventId)}
                />
              </td>
              <td>{event.eventId}</td>
              <td>{event.deviceId}</td>
              <td>{event.eventType}</td>
              <td>{event.eventDate}</td>
              <td>{event.description}</td>
              <td>{event.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardManager;