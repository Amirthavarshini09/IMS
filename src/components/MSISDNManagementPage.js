// import React, { useState, useRef } from 'react';
// import CsrService from '../services/CsrService';
// import 'bootstrap/dist/css/bootstrap.min.css';
 
// const MSISDNManagementPage = () => {
//   const [newMsisdn, setNewMsisdn] = useState('');
//   const [simCardDetails, setSimCardDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const form = useRef();
 
//   const handleInputChange = (e) => {
//     setNewMsisdn(e.target.value);
//   };
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);
//     setSimCardDetails(null); // Clear previous SIM card details
 
//     CsrService.getByMsisdn(newMsisdn)
//       .then(response => {
//         setSimCardDetails(response);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('Error fetching SIM card details:', error);
//         setError('Failed to fetch SIM card details.');
//         setLoading(false);
//       });
//   };
 
//   return (
//     <div className="container">
//       <h2>MSISDN Management Page</h2>
//       <div className="card card-container">
//         <form onSubmit={handleSubmit} ref={form}>
//           <div className="mb-3">
//             <label htmlFor="msisdn" className="form-label">MSISDN:</label>
//             <input
//               type="text"
//               className="form-control"
//               id="msisdn"
//               name="msisdn"
//               value={newMsisdn}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? 'Loading...' : 'Get SIM Card Details'}
//           </button>
//         </form>
//       </div>
 
//       {error && (
//         <div className="alert alert-danger mt-4" role="alert">
//           {error}
//         </div>
//       )}
 
//       {simCardDetails && (
//         <div className="mt-4">
//           <h3>SIM Card Details:</h3>
//           <p>ID: {simCardDetails.id}</p>
//           <p>SIM Number: {simCardDetails.simNumber}</p>
//           <p>Status: {simCardDetails.status}</p>
//           <p>Reservation Date: {simCardDetails.reservationDate}</p>
//           <p>Activation Date: {simCardDetails.activationDate}</p>
//           {simCardDetails.deviceAssociation && (
//             <div>
//               <h4>Associated Device:</h4>
//               <p>ID: {simCardDetails.deviceAssociation.id}</p>
//               <p>IMEI: {simCardDetails.deviceAssociation.imei}</p>
//               <p>MSISDN: {simCardDetails.deviceAssociation.msisdn}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };
 
// export default MSISDNManagementPage;

import React, { useState, useRef } from 'react';
import CsrService from '../services/CsrService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MSISDNManagementPage.css';

const MSISDNManagementPage = () => {
  const [newMsisdn, setNewMsisdn] = useState('');
  const [simCardDetails, setSimCardDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useRef();

  const handleInputChange = (e) => {
    setNewMsisdn(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSimCardDetails(null); // Clear previous SIM card details

    CsrService.getByMsisdn(newMsisdn)
      .then(response => {
        console.log(response);
        setSimCardDetails(response);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching SIM card details:', error);
        setError('Failed to fetch SIM card details.');
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2>MSISDN Management Page</h2>
      <div className="card card-container">
        <form onSubmit={handleSubmit} ref={form}>
          <div className="mb-3">
            <label htmlFor="msisdn" className="form-label">MSISDN:</label>
            <input
              type="text"
              className="form-control"
              id="msisdn"
              name="msisdn"
              value={newMsisdn}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Get SIM Card Details'}
          </button>
        </form>
      </div>

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}

      {simCardDetails && (
        <div className="mt-4">
          <h3>SIM Card Details</h3>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>MSISDN</th>
                <td>{simCardDetails.msisdn}</td>
              </tr>
              <tr>
                <th>ICCID</th>
                <td>{simCardDetails.iccid}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{simCardDetails.status}</td>
              </tr>
              <tr>
                <th>Reservation Date</th>
                <td>{simCardDetails.reservationDate}</td>
              </tr>
              <tr>
                <th>Activation Date</th>
                <td>{simCardDetails.activationDate}</td>
              </tr>
              {simCardDetails.deviceAssociation && (
                <React.Fragment>
                  <tr>
                    <th colSpan="2" className="bg-secondary text-white">Associated Device</th>
                  </tr>
                  <tr>
                    <th>IMEI Number</th>
                    <td>{simCardDetails.deviceAssociation.imeiNumber}</td>
                  </tr>
                  <tr>
                    <th>Customer Name</th>
                    <td>{simCardDetails.deviceAssociation.customerName}</td>
                  </tr>
                  <tr>
                    <th>Device Name</th>
                    <td>{simCardDetails.deviceAssociation.deviceName}</td>
                  </tr>
                </React.Fragment>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MSISDNManagementPage;
