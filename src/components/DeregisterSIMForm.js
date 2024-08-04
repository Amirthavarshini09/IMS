import React, { useEffect, useState } from 'react';
import SimService from '../services/SimService';


const DeregisterSIMForm = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSIMCards();
  }, []);

  const fetchSIMCards = async () => {
    try {
      const data = await SimService.getAllReserveSIMCards();
      setSimCards(data);
    } catch (error) {
      console.error('Error fetching SIM cards', error);
    }
  };

  const handleDeregister = async (simCard) => {
    const daysBetween = (startDate, endDate) => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return Math.floor((end - start) / (1000 * 60 * 60 * 24));
    };

    const reservationDate = simCard.reservationDate;
    const activationDate = simCard.activationDate;
    const daysDiff = daysBetween(reservationDate, activationDate);

    if (simCard.status === 'RESERVED' && daysDiff > 90) {
      try {
        await SimService.deregisterSIMCard(simCard.id);
        setMessage(`SIM Card ${simCard.id} deregistered successfully.`);
        fetchSIMCards();
      } catch (error) {
        setMessage(`Failed to deregister SIM Card ${simCard.id}. Please try again.`);
      }
    } else {
      setMessage(`SIM Card ${simCard.id} cannot be deregistered. Reservation period is less than 90 days.`);
    }
  };

  return (
    <div>
      <h2>DEREGISTER SIM CARDS</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <ul className="list-group">
        {simCards.map((simCard) => (
          <li key={simCard.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>SIM Card ID: {simCard.id}</span>
            <button
              className="btn btn-warning" style={{ backgroundColor: '#26A69A',border:"#26A69A" }}
              onClick={() => handleDeregister(simCard)}
            >
              Deregister
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeregisterSIMForm;
