import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimService from '../services/SimService';
import 'bootstrap/dist/css/bootstrap.min.css';

const SimManagementPage = () => {
  const [newSIM, setNewSIM] = useState({
    MSISDN: '',
    ICCID: '',
    reservationDate: '',
    activationDate: '',
    status: '',
    deviceAssociationId: ''
  });
  const [sims, setSIMs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSIM, setSelectedSIM] = useState(null);

  const form = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSIMs();
  }, []);

  const fetchSIMs = () => {
    SimService.viewSIMs()
      .then(response => {
        console.log(response);
        setSIMs(response);
      })
      .catch(error => {
        console.error('Error fetching SIM cards:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSIM({ ...newSIM, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

  //   SimService.addSIM(newSIM)
  //     .then(() => {
  //       alert('SIM card added successfully');
  //       setNewSIM({
  //         MSISDN: '',
  //         ICCID: '',
  //         reservationDate: '',
  //         activationDate: '',
  //         status: '',
  //         deviceAssociationId: ''
  //       });
  //       fetchSIMs();
  //     })
  //     .catch(error => {
  //       console.error('Error adding SIM card:', error);
  //       alert('An error occurred while adding SIM card');
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  };

  const fetchSIMByMsisdn = async (msisdn) => {
    try {
      const sim = await SimService.getSIMByMsisdn(msisdn);
      console.log(sim);
      setSelectedSIM(sim);
    } catch (error) {
      console.error('Error fetching SIM card by Msisdn:', error);
    }
  };

  return (
    <div className="container custom-bg-color">
      <h2>SIM Management Page</h2>
      {/* <div className="card card-container">
        <form onSubmit={handleSubmit} ref={form}>
          <div className="mb-3">
            <label htmlFor="simNumber" className="form-label">SIM Number:</label>
            <input type="text" className="form-control" id="simNumber" name="simNumber" value={newSIM.simNumber} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ backgroundColor: "#26A69A", border: "#26A69A" }}>Add SIM</button>
        </form>
      </div> */}

      <table className="table mt-4">
        <thead>
          <tr style={{backgroundColor:"#26A69A"}}>
            <th>MSISDN</th>
            <th>ICCID</th>
            <th>Reservation Date</th>
            <th>Activation Date</th>
            <th>Status</th>
            <th>Device Association</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sims.map((sim, index) => (
            <tr key={sim.msisdn} style={{ backgroundColor: index % 2 === 0 ? '#A7DFD8' : '#E0F7F5' }}>
              <td style={{ border: "1px solid black" }}>{sim.msisdn}</td>
              <td style={{ border: "1px solid black" }}>{sim.iccid}</td>
              <td style={{ border: "1px solid black" }}>{sim.reservationDate}</td>
              <td style={{ border: "1px solid black" }}>{sim.activationDate}</td>
              <td style={{ border: "1px solid black" }}>{sim.status}</td>
              <td style={{ border: "1px solid black" }}>
  {sim.deviceAssociation && sim.deviceAssociation.deviceId ? sim.deviceAssociation.deviceId : 'N/A'}
</td>
              <td style={{ border: "1px solid black" }}>
                <div className="btn-group" role="group" aria-label="SIM Actions">
                  <button className="btn btn-primary" onClick={() => fetchSIMByMsisdn(sim.msisdn)} style={{ backgroundColor: "#26A69A", border: "#26A69A" }}>View</button>
                  {/* <Link to={`/update-sim/${sim.id}`} className="btn btn-primary" style={{ marginLeft: '10px', backgroundColor: "#26A69A", border: "#26A69A" }}>Update</Link> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSIM && (
        <div className="selected-sim-table mt-4">
          <h3>Selected SIM Card Details:</h3>
          <table className="table table-bordered" style={{ borderColor: "black", borderWidth: "2px", borderStyle: "solid" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid black",backgroundColor:"#26A69A" }}>Field</th>
                <th style={{ border: "1px solid black",backgroundColor:"#26A69A" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#A7DFD8' }}>
                <td style={{ border: "1px solid black" }}>MSISDN</td>
                <td style={{ border: "1px solid black" }}>{selectedSIM.msisdn}</td>
              </tr>
              <tr style={{ backgroundColor: '#E0F7F5' }}>
                <td style={{ border: "1px solid black" }}>ICCID</td>
                <td style={{ border: "1px solid black" }}>{selectedSIM.iccid}</td>
              </tr>
              <tr style={{ backgroundColor: '#A7DFD8' }}>
                <td style={{ border: "1px solid black" }}>Reservation Date</td>
                <td style={{ border: "1px solid black" }}>{selectedSIM.reservationDate}</td>
              </tr>
              <tr style={{ backgroundColor: '#E0F7F5' }}>
                <td style={{ border: "1px solid black" }}>Activation Date</td>
                <td style={{ border: "1px solid black" }}>{selectedSIM.activationDate}</td>
              </tr>
              <tr style={{ backgroundColor: '#A7DFD8' }}>
                <td style={{ border: "1px solid black" }}>Status</td>
                <td style={{ border: "1px solid black" }}>{selectedSIM.status}</td>
              </tr>
              <tr style={{ backgroundColor: '#E0F7F5' }}>
                <td style={{ border: "1px solid black" }}>Device Association ID</td>
                <td style={{ border: "1px solid black" }}>{selectedSIM.deviceAssociation.deviceId ? selectedSIM.deviceAssociation.deviceId : 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SimManagementPage;


