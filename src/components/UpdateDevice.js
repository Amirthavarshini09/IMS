import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DeviceService from '../services/DeviceService';

function UpdateDevice() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [deviceData, setDeviceData] = useState({
    deviceId: '',
    customerName: '',
    deviceName: '',
    imeiNumber: null // Set IMEI as a number
  });

  useEffect(() => {
    const device = JSON.parse(localStorage.getItem('device'));
    if (device) {
      setDeviceData(device);
    }
    fetchDeviceDataById(id);
  }, [id]);

  const fetchDeviceDataById = async (id) => {
    try {
      const response = await DeviceService.getDeviceById(id);
      if (response) {
        setDeviceData(response);
      } else {
        console.error('Error: Device data is undefined.');
      }
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeviceData((prevDeviceData) => ({
      ...prevDeviceData,
      [name]: name === 'imeiNumber' ? Number(value) : value // Ensure IMEI number is stored as a number
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure the IMEI number is passed as an integer
      const updatedDeviceData = {
        ...deviceData,
        imeiNumber: parseInt(deviceData.imeiNumber, 10) // Convert to integer
      };
      await DeviceService.updateDevice(updatedDeviceData);
      alert("Device Updated Successfully");
      navigate("/manager/device-management");
    } catch (error) {
      console.error('Error updating device:', error);
      alert(error.message || 'An error occurred while updating the device.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="update-device-form">
            <h2>Update Device</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer Name:</label>
                <input type="text" name="customerName" value={deviceData.customerName} onChange={handleInputChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>Device Name:</label>
                <input type="text" name="deviceName" value={deviceData.deviceName} onChange={handleInputChange} className="form-control" required />
              </div>
              <div className="form-group">
                <label>IMEI Number:</label>
                <input type="number" name="imeiNumber" value={deviceData.imeiNumber || ''} onChange={handleInputChange} className="form-control" required />
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateDevice;
