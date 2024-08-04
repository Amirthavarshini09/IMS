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

// import React, { useState, useEffect } from 'react';
// import AdminService from '../services/AdminService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../components/GetAllSimCards.css";
// import '../components/BoardAdmin.css';

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

//   const generateReport = () => {
//     const header = ['MSISDN', 'ICCID', 'Status', 'Reservation Date', 'Activation Date', 'deviceAssociationId','CustomerName', 'DeviceName', 'IMEINumber'];
//     const rows = simCards.map(simCard => [
//       simCard.msisdn,
//       simCard.iccid,
//       simCard.status,
//       simCard.reservationDate,
//       simCard.activationDate,
//       simCard.deviceAssociation?.imeiNumber,
//       simCard.deviceAssociation?.customerName,
//       simCard.deviceAssociation?.DeviceName,
//     ]);

//     const reportData = [header, ...rows];
//     const csvContent = reportData.map(row => row.join(',')).join('\n');
//     const blob = new Blob([csvContent], { type: 'text/csv' });

//     const url = window.URL.createObjectURL(blob);
//     const link = document.createElement('a');
//     link.href = url;
//     link.setAttribute('download', 'sim_cards_report.csv');
//     document.body.appendChild(link);

//     link.click();
//   };

//   return (
//     <div className="container mt-5">
//       <h2 style={{ textAlign: "center" }}>All SIM Cards</h2>
//       {message && (
//         <div className="alert alert-danger" role="alert">
//           {message}
//         </div>
//       )}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <>
//           <table className="table table-bordered">
//             <thead>
//               <tr style={{backgroundColor:"#26A69A"}}>
//                 <th>MSISDN</th>
//                 <th>ICCID</th>
//                 <th>Status</th>
//                 <th>Reservation Date</th>
//                 <th>Activation Date</th>
//                 <th>IMEI Number</th>
//                 <th>Customer Name</th>
//                 <th>Device Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {simCards.map(sim => (
//                 <tr key={sim.msisdn}>
//                   <td>{sim.msisdn}</td>
//                   <td>{sim.iccid}</td>
//                   <td>{sim.status}</td>
//                   <td>{sim.reservationDate}</td>
//                   <td>{sim.activationDate}</td>
//                   <td>{sim.deviceAssociation?.imeiNumber}</td>
//                   <td>{sim.deviceAssociation?.customerName}</td>
//                   <td>{sim.deviceAssociation?.deviceName}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button className="btn btn-success mt-3" onClick={generateReport} style={{ backgroundColor: '#26A69A' }}>Generate Report</button>
//         </>
//       )}
//     </div>
//   );
// };

// export default GetAllSimCards;


import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../components/GetAllSimCards.css";
import '../components/BoardAdmin.css';

const GetAllSimCards = () => {
  return (
    <div className="get-container ">
      <h2 style={{ textAlign: "center",color:'#000000' }}>SIM Card Management</h2>
      <div className="row justify-content-center mb-3">
        <div className="col-md-3">
          <Link to="/reserved-simcards" className="btn btn-primary btn-block mb-3">Reserved SIM Cards</Link>
        </div>
        <div className="col-md-3">
          <Link to="/active-simcards" className="btn btn-primary btn-block mb-3">Active SIM Cards</Link>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <Link to="/suspended-simcards" className="btn btn-primary btn-block mb-3">Suspended SIM Cards</Link>
        </div>
        <div className="col-md-3">
          <Link to="/disassociate-simcards" className="btn btn-primary btn-block mb-3">Disassociate SIM Cards</Link>
        </div>
      </div>
    </div>
  );
};

export default GetAllSimCards;
