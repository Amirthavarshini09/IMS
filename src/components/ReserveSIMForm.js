import React, { useEffect, useState } from 'react';
import SimService from '../services/SimService';


const ReserveSIMForm = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    Msisdn: '',
    deviceId: '',
    comments: ''
  });

  useEffect(() => {
    fetchReservedSIM();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await SimService.reserveSIM(formData);
      setMessage('SIM reserved successfully');
      setFormData({ imsdn: '', deviceId: '', comments: '' });
      fetchReservedSIM(); // Refresh the list after reservation
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error reserving SIM. Please try again.');
    }
  };

  const fetchReservedSIM = async () => {
    try {
      const reservedSims = await SimService.getAllReserveSIMCards();
      console.log(reservedSims);
      setSimCards(reservedSims);
    } catch (error) {
      console.error('Error fetching reserved SIM cards:', error);
      setMessage('Error fetching reserved SIM cards. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">RESERVE SIM CARD</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="imsdn" className="form-label">MSISDN:</label>
          <input
            type="text"
            className="form-control"
            id="msisdn"
            name="msisdn"
            value={formData.imsdn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="deviceId" className="form-label">Device ID:</label>
          <input
            type="text"
            className="form-control"
            id="deviceId"
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">Comments:</label>
          <textarea
            className="form-control"
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Reserve Simcard</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      {simCards.length > 0 && (
        <div className="reserved-sim-table mt-4">
          <h3>RESERVED SIM CARDS LIST</h3>
          <table className="table table-bordered">
            <thead>
              <tr style={{backgroundColor:"#26A69A", textAlign:"center"}}>
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
        </div>
      )}
    </div>
  );
};

export default ReserveSIMForm;