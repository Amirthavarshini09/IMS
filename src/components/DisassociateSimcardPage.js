import React, { useEffect, useState } from 'react';
import SimService from '../services/SimService';
import 'bootstrap/dist/css/bootstrap.min.css';

const DisassociateSimcardPage = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchDisassociateSIMCards();
  }, []);

  const fetchDisassociateSIMCards = async () => {
    try {
      const disassociateSIMs = await SimService.getAllDisassociateSIMCards();
      setSimCards(disassociateSIMs);
    } catch (error) {
      console.error('Error fetching disassociate SIM cards:', error);
      setMessage('Error fetching disassociate SIM cards. Please try again.');
    }
  };

  // const handleDisassociateSIM = async (msisdn) => {
  //   try {
  //     await SimService.DisassociateSIM(msisdn);
  //     setMessage(`SIM with MSISDN ${msisdn} disassociated successfully.`);
  //     fetchDisassociateSIMCards(); // Refresh the list after disassociation
  //   } catch (error) {
  //     console.error(`Error disassociating SIM with MSISDN ${msisdn}:`, error);
  //     setMessage(`Error disassociating SIM with MSISDN ${msisdn}. Please try again.`);
  //   }
  // };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Disassociate SIM Cards</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      {simCards.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr style={{ backgroundColor: "#26A69A" }}>
              <th>MSISDN</th>
              <th>Comments</th>
              <th>Disassociation Date</th>
              <th>ICCID</th>
              <th>Last Disassociated By</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {simCards.map((sim, index) => (
              <tr key={index}>
                <td>{sim.msisdn}</td>
                <td>{sim.comments}</td>
                <td>{sim.disassociatedDate}</td>
                <td>{sim.iccid}</td>
                <td>{sim.lastDisassociatedBy}</td>
                <td>{sim.status}</td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No SIM cards available for disassociation.</div>
      )}
    </div>
  );
};

export default DisassociateSimcardPage;
