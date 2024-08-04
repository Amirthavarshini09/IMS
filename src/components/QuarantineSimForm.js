import React, { useEffect, useState } from 'react';
import CompilanceOfficerService from '../services/CompilanceService';
const ReactivateSIMForm = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    msisdn: '',
    reason: ''
  });

  useEffect(() => {
    getQuarantineSim();
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
      await CompilanceOfficerService.QuarantineSim(formData);
      setMessage('SIM Quarantined successfully');
      setFormData({ msisdn: '', reason: '' });
      getQuarantineSim(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error Quarantining SIM. Please try again.');
    }
  };

  const getQuarantineSim = async () => {
    try {
      const quarantineSim = await CompilanceOfficerService.getAllQuarantinedSIMCards();
      console.log(quarantineSim);
      setSimCards(quarantineSim);
    } catch (error) {
      console.error('Error fetching quarantine SIM cards:', error);
      setMessage('Error fetching quarantine SIM cards. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Quarantined SIM Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="msisdn" className="form-label">MSISDN:</label>
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
          <label htmlFor="reason" className="form-label">Reason:</label>
          <textarea
            className="form-control"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Quarantine SIM</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      {simCards.length > 0 && (
        <div className="reserved-sim-table mt-4">
          <h3>Quarantined SIM Cards:</h3>
          <table className="table table-bordered">
            <thead>
              <tr style={{backgroundColor:"#26A69A"}}>
                <th>MSISDN</th>
                <th>Category</th>
                <th>iccid</th>
                <th>Last Quarantined By</th>
                <th>Quarantined Date</th>
                <th>Reason</th>
                <th>Severity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {simCards.map((sim, index) => (
                <tr key={index}>
                  <td>{sim.msisdn}</td>
                  <td>{sim.category}</td>
                  <td>{sim.iccid}</td>
                  <td>{sim.lastQuarantinedBy}</td>
                  <td>{sim.quarantinedDate}</td>
                  <td>{sim.reason}</td>
                  <td>{sim.severity}</td>
                  <td>{sim.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReactivateSIMForm;