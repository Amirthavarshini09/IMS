import React, { useState, useEffect, useRef } from 'react';
import DeviceService from '../services/DeviceService';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './common.css';

const DeviceManagementPage = () => {
  const [newDevice, setNewDevice] = useState({
    customerName: '',
    deviceName: '',
    imeiNumber: '',
  });
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);

  const form = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = () => {
    DeviceService.viewDevices()
      .then(response => {
        setDevices(response);
      })
      .catch(error => {
        console.error('Error fetching devices:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice({ ...newDevice, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    DeviceService.addDevice(newDevice)
      .then(() => {
        alert('Device added successfully');
        setNewDevice({
          customerName: '',
          deviceName: '',
          imeiNumber: '',
        });
        fetchDevices();
      })
      .catch(error => {
        console.error('Error adding device:', error);
        alert('An error occurred while adding device');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchDeviceById = async (deviceId) => {
    try {
      const device = await DeviceService.getDeviceById(deviceId);
      console.log(device);
      localStorage.setItem('device', JSON.stringify(device));
      setSelectedDevice(device);
    } catch (error) {
      console.error('Error fetching device by ID:', error);
    }
  };

  return (
    <div className="container-lg"> {/* Use container-lg for a larger container */}
      <h2>DEVICE MANAGEMENT PAGE</h2>
      <div className="card card-container">
        <form onSubmit={handleSubmit} ref={form}>
          <div className="mb-3">
            <label htmlFor="imei" className="form-label">customerName:</label>
            <input type="text" className="form-control" id="customerName" name="customerName" value={newDevice.customerName} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="msisdn" className="form-label">deviceName:</label>
            <input type="text" className="form-control" id="deviceName" name="deviceName" value={newDevice.deviceName} onChange={handleInputChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="msisdn" className="form-label">imeiNumber:</label>
            <input type="text" className="form-control" id="imeiNumber" name="imeiNumber" value={newDevice.imeiNumber} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ backgroundColor: "#26A69A", border: "#26A69A" }}>Add Device</button>
        </form>
      </div>

      <table className="table mt-4">
        <thead style={{ backgroundColor: '#26A69A', color: 'white' }}>
          <tr>
            <th>deviceID</th>
            <th>customerName</th>
            <th>deviceName</th>
            <th>imeiNumber</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <tr key={device.deviceId} style={{ backgroundColor: index % 2 === 0 ? '#E0F7F5' : '#A7DFD8' }}>
              <td style={{ border: '1px solid black' }}>{device.deviceId}</td>
              <td style={{ border: '1px solid black' }}>{device.customerName}</td>
              <td style={{ border: '1px solid black' }}>{device.deviceName}</td>
              <td style={{ border: '1px solid black' }}>{device.imeiNumber}</td>
              <td style={{ border: '1px solid black' }}>
                <div className="btn-group" role="group" aria-label="Device Actions">
                  <button className="btn btn-primary" onClick={() => fetchDeviceById(device.deviceId)} style={{ backgroundColor: '#26A69A', border: '#26A69A' }}>View</button>
                  <Link to={`/update-device`} className="btn btn-primary" onClick={() => fetchDeviceById(device.deviceId)} style={{ marginLeft: '10px', backgroundColor: '#26A69A', border: '#26A69A' }}>Update</Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedDevice && (
        <div className="selected-device-table mt-4">
          <h3>Selected Device Details</h3>
          <table className="table table-bordered" style={{ borderColor: 'black', borderWidth: '2px', borderStyle: 'solid' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black',backgroundColor: '#26A69A', color: 'white'}}>Field</th>
                <th style={{ border: '1px solid black',backgroundColor: '#26A69A', color: 'white' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ backgroundColor: '#E0F7F5' }}>
                <td style={{ border: '1px solid black' }}>deviceID</td>
                <td style={{ border: '1px solid black' }}>{selectedDevice.deviceId}</td>
              </tr>
              <tr style={{ backgroundColor: '#A7DFD8' }}>
                <td style={{ border: '1px solid black' }}>customerName</td>
                <td style={{ border: '1px solid black' }}>{selectedDevice.customerName}</td>
              </tr>
              <tr style={{ backgroundColor: '#E0F7F5' }}>
                <td style={{ border: '1px solid black' }}>deviceName</td>
                <td style={{ border: '1px solid black' }}>{selectedDevice.deviceName}</td>
              </tr>
              <tr style={{ backgroundColor: '#E0F7F5' }}>
                <td style={{ border: '1px solid black' }}>imeiNumber</td>
                <td style={{ border: '1px solid black' }}>{selectedDevice.imeiNumber}</td>
              </tr>
              {/* Add other device details as needed */}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeviceManagementPage;
