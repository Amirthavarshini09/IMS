import React, { useEffect, useState } from 'react';
import SimService from '../services/SimService';

const DisassociateSIMForm = () => {
  const [simCards, setSimCards] = useState([]);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    Msisdn: '',
    comments: ''
  });

  useEffect(() => {
    fetchDisassociateSIM();
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
      await SimService.DisassociateSIM(formData);
      setMessage('SIM Disassociated successfully');
      setFormData({ imsdn: '', comments: '' });
      fetchDisassociateSIM() // Refresh the list after reservation
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Error Disassociating SIM. Please try again.');
    }
  };

  const fetchDisassociateSIM = async () => {
    try {
      const reservedSims = await SimService.getAllDisassociateSIMCards();
      console.log(reservedSims);
      setSimCards(reservedSims);
    } catch (error) {
      console.error('Error fetching Disassociate SIM cards:', error);
      setMessage('Error fetching Disassociate SIM cards. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Disassociate SIM Card</h2>
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
        <button type="submit" className="btn btn-primary">Disassociate SIM</button>
      </form>
      {message && <div className="alert alert-info mt-3">{message}</div>}
      {simCards.length > 0 && (
        <div className="reserved-sim-table mt-4">
          <h3>Disassociate SIM Cards:</h3>
          <table className="table table-bordered">
            <thead>
              <tr style={{backgroundColor:"#26A69A"}}>
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
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default DisassociateSIMForm;