// import React, { useState, useEffect } from 'react';
// import AdminService from '../services/AdminService';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const GetAllSimCards = () => {
//   const [simCards, setSimCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   const fetchAllSIMCards = async () => {
//     try {
//       const response = await AdminService.getAllSIMCards();
//       setSimCards(response);
//     } catch (error) {
//       setMessage('Failed to fetch SIM cards. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAllSIMCards();
//   }, []);

//   return (
//     <div className="container mt-5">
//       <h2>All SIM Cards</h2>
//       {message && (
//         <div className="alert alert-danger" role="alert">
//           {message}
//         </div>
//       )}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>SIM Number</th>
//               <th>Status</th>
//               <th>Reservation Date</th>
//               <th>Activation Date</th>
//               <th>IMEI</th>
//               <th>MSISDN</th>
//             </tr>
//           </thead>
//           <tbody>
//             {simCards.map(sim => (
//               <tr key={sim.id}>
//                 <td>{sim.id}</td>
//                 <td>{sim.simNumber}</td>
//                 <td>{sim.status}</td>
//                 <td>{sim.reservationDate}</td>
//                 <td>{sim.activationDate}</td>
//                 <td>{sim.deviceAssociation?.imei}</td>
//                 <td>{sim.deviceAssociation?.msisdn}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default GetAllSimCards;

import React, { useState, useEffect } from 'react';
import AdminService from '../services/AdminService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/BoardAdmin.css';

const GetAllPoolSIMCards = () => {
  const [simCards, setSimCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchAllSIMCards = async () => {
    try {
      const response = await AdminService.getAllPoolSIMCards();
      setSimCards(response);
    } catch (error) {
      setMessage('Failed to fetch SIM cards. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSIMCards();
  }, []);

  

  return (
    <div className="container mt-5">
      <h2 style={{ textAlign: "center" }}>All Available SIM Cards</h2>
      {message && (
        <div className="alert alert-danger" role="alert">
          {message}
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead>
              <tr style={{backgroundColor:"#26A69A"}}>
                <th>MSISDN</th>
                <th>ICCID</th>
               
              </tr>
            </thead>
            <tbody>
              {simCards.map(sim => (
                <tr key={sim.msisdn}>
                  <td>{sim.msisdn}</td>
                  <td>{sim.iccid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default GetAllPoolSIMCards;
