import React, { useEffect, useState } from 'react';
import SimService from '../services/SimService';
import 'bootstrap/dist/css/bootstrap.min.css';

const ReservedSimcardPage = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReservedSIM();
  }, []);

  const fetchReservedSIM = async () => {
    try {
      const reservedSims = await SimService.getAllReserveSIMCards();
      setSimCards(reservedSims);
    } catch (error) {
      console.error('Error fetching reserved SIM cards:', error);
      setMessage('Error fetching reserved SIM cards. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Reserved SIM Cards</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      {simCards.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr style={{backgroundColor:"#26A69A"}}>
              <th>MSISDN</th>
              <th>ICCID</th>
              <th>Status</th>
              <th>Reservation Date</th>
              <th>Device Association ID</th>
              <th>Last Reserved By</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {simCards.map((sim, index) => (
              <tr key={index}>
                <td>{sim.msisdn}</td>
                <td>{sim.iccid}</td>
                <td>{sim.status}</td>
                <td>{sim.reservationDate}</td>
                <td>{sim.deviceAssociation.deviceId}</td>
                <td>{sim.lastReservedBy}</td>
                <td>{sim.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No reserved SIM cards found.</div>
      )}
    </div>
  );
};

export default ReservedSimcardPage;
