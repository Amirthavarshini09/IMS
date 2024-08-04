import React, { useEffect, useState } from 'react';
import TechnicalStaffService from '../services/TechnicalStaffService';


const SuspendedSimcardPage = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSuspendSIM();
  }, []);

  const fetchSuspendSIM = async () => {
    try {
      const suspendedSims = await TechnicalStaffService.getAllSuspendedSIMCards();
      console.log(suspendedSims);
      setSimCards(suspendedSims);
    } catch (error) {
      console.error('Error fetching suspended SIM cards:', error);
      setMessage('Error fetching suspended SIM cards. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Suspended SIM Cards</h2>
      {message && <div className="alert alert-info">{message}</div>}
      {simCards.length > 0 && (
        <div className="suspended-sim-table mt-4">
          <h3>SUSPENDED SIM CARDS LIST</h3>
          <table className="table table-bordered">
            <thead>
              <tr style={{backgroundColor:"#26A69A"}}>
                <th>MSISDN</th>
                <th>ICCID</th>
                <th>Status</th>
                <th>Suspension Date</th>
                <th>Device Association ID</th>
                <th>Last Suspended By</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {simCards.map((sim, index) => (
                <tr key={index}>
                  <td>{sim.msisdn}</td>
                  <td>{sim.iccid}</td>
                  <td>{sim.status}</td>
                  <td>{sim.suspensionDate}</td>
                  <td>{sim.deviceAssociation.deviceId}</td>
                  <td>{sim.lastSuspendedBy}</td>
                  <td>{sim.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SuspendedSimcardPage;
