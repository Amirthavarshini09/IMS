import React, { useEffect, useState } from 'react';
import SimService from '../services/SimService';
import 'bootstrap/dist/css/bootstrap.min.css';
import "D://FRONTEND//capstoneproject//src//components//common.css"

const ActiveSimcardPage = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchActiveSIMCards();
  }, []);

  const fetchActiveSIMCards = async () => {
    try {
      const activeSIMs = await SimService.getAllActiveSIMCards();
      setSimCards(activeSIMs);
    } catch (error) {
      console.error('Error fetching active SIM cards:', error);
      setMessage('Error fetching active SIM cards. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">ACTIVE SIMCARDS</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      {simCards.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr style={{ backgroundColor: "#26A69A" }}>
              <th>MSISDN</th>
              <th>Activation Date</th>
              <th>Comments</th>
              <th>ICCID</th>
              <th>Last Activated By</th>
              <th>Status</th>
              <th>Device Association ID</th>
            </tr>
          </thead>
          <tbody>
            {simCards.map((sim, index) => (
              <tr key={index}>
                <td>{sim.msisdn}</td>
                <td>{sim.activationDate}</td>
                <td>{sim.comments}</td>
                <td>{sim.iccid}</td>
                <td>{sim.lastActivatedBy}</td>
                <td>{sim.status}</td>
                <td>{sim.deviceAssociation.deviceId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No active SIM cards found.</div>
      )}
    </div>
  );
};

export default ActiveSimcardPage;
