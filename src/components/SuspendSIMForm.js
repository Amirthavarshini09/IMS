
import React, { useEffect, useState } from 'react';
import TechnicalStaffService from '../services/TechnicalStaffService';
const SuspendSIMForm = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    Msisdn: '',
    comments: ''
  });

  useEffect(() => {
    fetchSuspendSIM();
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
      await TechnicalStaffService.suspendSIMCard(formData);
      setMessage('SIM Suspended successfully');
      setFormData({ imsdn: '', deviceId: '', comments: '' });
      fetchSuspendSIM(); // Refresh the list after reservation
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error Suspended SIM. Please try again.');
    }
  };

  const fetchSuspendSIM = async () => {
    try {
      const suspendSims = await TechnicalStaffService.getAllSuspendedSIMCards();
      console.log(suspendSims);
      setSimCards(suspendSims);
    } catch (error) {
      console.error('Error fetching Suspend SIM cards:', error);
      setMessage('Error fetching Suspend SIM cards. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Suspend SIM Card</h2>
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
        <button type="submit" className="btn btn-primary">Suspend SIM</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      {simCards.length > 0 && (
        <div className="reserved-sim-table mt-4">
          <h3>Suspend SIM Cards:</h3>
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

export default SuspendSIMForm;