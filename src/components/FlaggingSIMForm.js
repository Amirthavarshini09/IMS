import React, { useEffect, useState } from 'react';
import SimService from '../services/SimService';
const FlaggingSIMForm = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    msisdn: '',
    category: '',
    severity: ''
  });

  useEffect(() => {
    getFlaggedSim();
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
     console.log(formData);
      await SimService.FlaggedSimCard(formData);
      setMessage('SIM Flagged successfully');
      setFormData({ msisdn: '', category: '', severity: '' });
      getFlaggedSim(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error Flagging SIM. Please try again.');
    }
  };
  

  const getFlaggedSim = async () => {
    try {
      const flagSim = await SimService.getAllFlagSIMCards();
      console.log(flagSim);
      setSimCards(flagSim);
    } catch (error) {
      console.error('Error fetching Flagged SIM cards:', error);
      setMessage('Error fetching Flagged SIM cards. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
    <h2 className="mb-4">Flagged SIM Card</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="msisdn" className="form-label">MSISDN:</label>
        <input
          type="text"
          className="form-control"
          id="msisdn"
          name="msisdn"
          value={formData.msisdn}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category:</label>
        <textarea
          className="form-control"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          rows="3"
        ></textarea>
      </div>
  
      <div className="mb-3">
      <label htmlFor="severity" className="form-label">Severity:</label>
      <select
        className="form-control"
        id="severity"
        name="severity"
        value={formData.severity}
        onChange={handleChange}
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
        <option value="CRITICAL">CRITICAL</option>
      </select>
    </div>

        <button type="submit" className="btn btn-primary">Flagged SIM</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      {simCards.length > 0 && (
        <div className="reserved-sim-table mt-4">
          <h3>Flagged SIM Cards:</h3>
          <table className="table table-bordered">
            <thead>
              <tr style={{backgroundColor:"#26A69A"}}>
                <th>MSISDN</th>
                <th>Category</th>
                <th>Current Status</th>
                <th>Flagged Date</th>
                <th>ICCID</th>
                <th>Last Flagged By</th>
                <th>Severity</th>
                
              </tr>
            </thead>
            <tbody>
              {simCards.map((sim, index) => (
                <tr key={index}>
                  <td>{sim.msisdn}</td>
                  <td>{sim.category}</td>
                  <td>{sim.currentStatus}</td>
                  <td>{sim.flaggedDate}</td>
                  <td>{sim.iccid}</td>
                  <td>{sim.lastFlaggedBy}</td>
                  <td>{sim.severity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlaggingSIMForm;