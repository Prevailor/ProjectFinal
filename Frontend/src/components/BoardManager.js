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

  
//   const generatePDF = () => {
//     const pdf = new jsPDF();
//     const totalPagesExp = '{total_pages_count_string}';

//     pdf.setProperties({
//       title: 'Board Management - Selected Lifecycle Events Report',
//     });

//     let startY = 40;
//     pdf.setFontSize(18);
//     pdf.text('Board Management - Selected Lifecycle Events Report', pdf.internal.pageSize.width / 2, startY, { align: 'center' });
//     startY += 10;

//     pdf.setFontSize(12);
//     pdf.setTextColor(100);
//     let pageHeight = pdf.internal.pageSize.height - 20;

//     let y = 70;
//     let pageCount = 1;

//     lifecycleEvents.forEach((event, index) => {
//       if (!isEventSelected(event.eventId)) {
//         return; // Skip events that are not selected
//       }

//       if (y > pageHeight - 20) {
//         pdf.addPage();
//         y = 70;
//         pageCount++;
//       }

//       pdf.text(`Event ${index + 1}`, 20, y);
//       pdf.text(`Event ID: ${event.eventId}`, 40, y + 10);
//       pdf.text(`Device ID: ${event.deviceId}`, 40, y + 20);
//       pdf.text(`Event Type: ${event.eventType}`, 40, y + 30);
//       pdf.text(`Event Date: ${event.eventDate}`, 40, y + 40);
//       pdf.text(`Description: ${event.description}`, 40, y + 50);
//       pdf.text(`Category: ${event.category}`, 40, y + 60);

//       y += 80;
//     });

//     // Set total page number on each page
//     for (let i = 1; i <= pageCount; i++) {
//       pdf.setPage(i);
//       pdf.text(`Page ${i} of ${totalPagesExp}`, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 10);
//     }

//     pdf.save('selected_lifecycle_events.pdf');
//   };

//   return (
//     <div className="container mt-5">
//       <h2 className="mb-4 underline">Board Management</h2>
//       {errorState && (
//         <div className="alert alert-danger" role="alert">
//           {errorMessage}
//         </div>
//       )}
//       <button className="btn btn-primaryys mb-3" onClick={generatePDF} disabled={selectedEvents.size === 0}>
//         Generate PDF Report for Selected Events
//       </button>
//       <table className="tables mt-4">
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
  //     pdf.text(`Page ${i}`, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 10);
  //   }

  //   pdf.save('selected_lifecycle_events.pdf');
  // };

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
    pdf.setTextColor(0, 0, 0); // Set text color to black
    let pageHeight = pdf.internal.pageSize.height - 20;

    let y = startY + 30;
    let pageCount = 1;

    // Define table header
    const headers = ['Event ID', 'Device ID', 'Event Type', 'Event Date', 'Description', 'Category'];
    const headerWidth = pdf.internal.pageSize.width - 40;
    const columnWidth = headerWidth / headers.length;

    // Draw table header
    pdf.setFontSize(12);
    pdf.setFillColor(200, 200, 200); // Light grey background for header
    pdf.rect(20, y - 10, headerWidth, 10, 'F'); // Fill header background
    pdf.setTextColor(0, 0, 0); // Reset text color
    headers.forEach((header, i) => {
        pdf.text(header, 20 + i * columnWidth + (columnWidth / 2), y - 3, { align: 'center' });
    });

    y += 10; // Move down to start rows

    // Draw table rows
    pdf.setTextColor(0);
    lifecycleEvents.forEach((event, index) => {
      if (!isEventSelected(event.eventId)) {
        return; // Skip events that are not selected
      }

      if (y > pageHeight - 20) {
        pdf.addPage();
        y = startY + 30; // Reset y to the start position for the new page
        pdf.setFontSize(12);
        // Redraw header on new page
        pdf.setFillColor(200, 200, 200);
        pdf.rect(20, y - 10, headerWidth, 10, 'F');
        pdf.setTextColor(0, 0, 0);
        headers.forEach((header, i) => {
            pdf.text(header, 20 + i * columnWidth + (columnWidth / 2), y - 3, { align: 'center' });
        });
        y += 10;
      }

      // Draw row
      pdf.setFontSize(10);
      pdf.setTextColor(0);
      pdf.text(event.eventId.toString(), 20 + 0 * columnWidth + (columnWidth / 2), y + 5, { align: 'center' });
      pdf.text(event.deviceId.toString(), 20 + 1 * columnWidth + (columnWidth / 2), y + 5, { align: 'center' });
      pdf.text(event.eventType, 20 + 2 * columnWidth + (columnWidth / 2), y + 5, { align: 'center' });
      pdf.text(event.eventDate, 20 + 3 * columnWidth + (columnWidth / 2), y + 5, { align: 'center' });
      pdf.text(event.description, 20 + 4 * columnWidth + (columnWidth / 2), y + 5, { align: 'center' });
      pdf.text(event.category, 20 + 5 * columnWidth + (columnWidth / 2), y + 5, { align: 'center' });

      y += 10; // Move to the next row
    });

    // Draw table border
    pdf.setDrawColor(0);
    pdf.rect(20, startY + 20, headerWidth, y - (startY + 20), 'S');

    // Set total page number on each page
    for (let i = 1; i <= pageCount; i++) {
      pdf.setPage(i);
      pdf.text(`Page ${i}`, pdf.internal.pageSize.width - 40, pdf.internal.pageSize.height - 10);
    }

    pdf.save('selected_lifecycle_events.pdf');
};


  const generateCSV = () => {
    const selectedEventsArray = lifecycleEvents.filter(event => isEventSelected(event.eventId));
    
    if (selectedEventsArray.length === 0) {
      alert('No events selected for CSV export.');
      return;
    }

    const headers = ['Event ID', 'Device ID', 'Event Type', 'Event Date', 'Description', 'Category'];
    const rows = selectedEventsArray.map(event => [
      event.eventId,
      event.deviceId,
      event.eventType,
      event.eventDate,
      event.description,
      event.category
    ]);

    let csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") 
      + "\n" 
      + rows.map(row => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "selected_lifecycle_events.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container ">
      <h2 className="mb-4 underline">Board Management</h2>
      {errorState && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="mb-3">
        <button className="btn btn-primaryys me-2" onClick={generatePDF} disabled={selectedEvents.size === 0}>
          Generate PDF Report for Selected Events
        </button>
        <br></br><br></br>
        <button className="btn btn-secondary" onClick={generateCSV} disabled={selectedEvents.size === 0}>
          Download CSV for Selected Events
        </button>
      </div>
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