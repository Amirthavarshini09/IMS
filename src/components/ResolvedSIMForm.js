import React, { useEffect, useState } from 'react';
import CompilanceOfficerService from '../services/CompilanceService';
const ResolvedSIMForm = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    msisdn: '',
    comments: ''
  });

  useEffect(() => {
    getResolvedSim();
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
      await CompilanceOfficerService.ResolvedSIMCard(formData);
      setMessage('Issue Resolved successfully');
      setFormData({ msisdn: '', comments: '' });
      getResolvedSim(); 
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error Resolving SIM. Please try again.');
    }
  };

  const getResolvedSim = async () => {
    try {
      const resolvedsim = await CompilanceOfficerService.getAllResolvedSIMCards();
      console.log(resolvedsim);
      setSimCards(resolvedsim);
    } catch (error) {
      console.error('Error Resolving  SIM cards issue:', error);
      setMessage('Error Resolving SIM card. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Resolved SIM Card</h2>
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
          <label htmlFor="comments" className="form-label">Reason:</label>
          <textarea
            className="form-control"
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Resolve SIM</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      {simCards.length > 0 && (
        <div className="reserved-sim-table mt-4">
          <h3>Resolved SIM Cards:</h3>
          <table className="table table-bordered">
            <thead>
              <tr style={{backgroundColor:"#26A69A"}}>
                <th>MSISDN</th>
                <th>Issue Resolved</th>
                <th>Comments</th>
                <th>Flag Date</th>
                <th>Flag Reason </th>
                <th>ICCID</th>
                <th>Last Resolved By</th>
                <th>Resolved Date</th>
                <th>New Status</th>
                <th> Quarantined Date</th>
              </tr>
            </thead>
            <tbody>
              {simCards.map((sim, index) => (
                <tr key={index}>
                  <td>{sim.msisdn}</td>
                  <td>{sim.comments}</td>
                  <td>{sim.flagDate}</td>
                  <td>{sim.flagReason}</td>
                  <td>{sim.iccid}</td>
                  <td>{sim.lastResolvedBY}</td>
                  <td>{sim.lastResolvedDate}</td>
                  <td>{sim.newStatus}</td>
                  <td>{sim.quarantineDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ResolvedSIMForm;