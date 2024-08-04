import React, { useState, useRef } from 'react';
import CsrService from '../services/CsrService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './IMEIManagementPage.css';

const IMEIManagementPage = () => {
  const [newImei, setNewImei] = useState('');
  const [deviceAssociation, setDeviceAssociation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const form = useRef();

  const handleInputChange = (e) => {
    setNewImei(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setDeviceAssociation(null); // Clear previous device association details

    CsrService.getByImei(newImei)
      .then(response => {
        if (response) {
          setDeviceAssociation(response);
        } else {
          setError('No device association available for this IMEI.');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching device association details:', error);
        setError('Failed to fetch device association details.');
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h2>IMEI Management Page</h2>
      <div className="card card-container">
        <form onSubmit={handleSubmit} ref={form}>
          <div className="mb-3">
            <label htmlFor="imeiNumber" className="form-label">IMEI:</label>
            <input
              type="text"
              className="form-control"
              id="imeiNumber"
              name="imeiNumber"
              value={newImei}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Loading...' : 'Get Device Details'}
          </button>
        </form>
      </div>

      {error && (
        <div className="alert alert-danger mt-4" role="alert">
          {error}
        </div>
      )}

      {deviceAssociation && (
        <div className="mt-4">
          <h3>Device Association Details</h3>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>IMEI Number</th>
                <td>{deviceAssociation.imeiNumber}</td>
              </tr>
              <tr>
                <th>Customer Name</th>
                <td>{deviceAssociation.customerName}</td>
              </tr>
              <tr>
                <th>Device Name</th>
                <td>{deviceAssociation.deviceName}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default IMEIManagementPage;
