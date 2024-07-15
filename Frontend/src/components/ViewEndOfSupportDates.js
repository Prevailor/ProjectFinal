// import React, { useState, useEffect } from 'react';
// import TechnicalSupportService from '../services/TechnicalSupportService'; // Import TechnicalSupportService
// import 'bootstrap/dist/css/bootstrap.min.css';

// const ViewEndOfSupportDates = () => {
//   const [supportDates, setSupportDates] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchSupportDates();
//   }, []);

//   const fetchSupportDates = async () => {
//     setLoading(true);
//     try {
//       const dates = await TechnicalSupportService.viewEndOfSupportDates(); // Call viewEndOfSupportDates function
//       setSupportDates(dates);
//     } catch (error) {
//       console.error('Error fetching support dates:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <h2 className="mt-5 mb-3">End of Support Dates</h2>
//       {loading && <p>Loading...</p>}
//       <ul className="list-group">
//         {supportDates.map((date, index) => (
//           <li key={index} className="list-group-item">
//             {`${date.softwareName} - End of Support: ${date.supportEndDate}`}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ViewEndOfSupportDates;

import React, { useState, useEffect } from 'react';
import TechnicalSupportService from '../services/TechnicalSupportService'; // Import TechnicalSupportService
import 'bootstrap/dist/css/bootstrap.min.css';
import 'D:\\ProjectFinal\\Frontend\\src\\ViewEndOfSupportDates.css'; // Replace with your CSS file path

const ViewEndOfSupportDates = () => {
  const [supportDates, setSupportDates] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSupportDates();
  }, []);

  const fetchSupportDates = async () => {
    setLoading(true);
    try {
      const dates = await TechnicalSupportService.viewEndOfSupportDates(); // Call viewEndOfSupportDates function
      setSupportDates(dates);
    } catch (error) {
      console.error('Error fetching support dates:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerrss">
      <h2 className="text-center mt-5 mb-3 underline">End of Support Dates</h2>
      {loading && <p>Loading...</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Software Name</th>
            <th>End of Support</th>
          </tr>
        </thead>
        <tbody>
          {supportDates.map((date, index) => (
            <tr key={index}>
              <td>{date.softwareName}</td>
              <td>{date.supportEndDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEndOfSupportDates;

