// DeviceService.js
import axios from "axios";
import authHeader from "./auth-header";

const MANAGER_URL = "http://localhost:8080/api";

const addDevice = async (device) => {
  try {
    const response = await axios.post(`${MANAGER_URL}/inventorymanager/adddevices`, device, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeader(),
        'Access-Control-Allow-Origin': '*'
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const updateDevice = async (device) => {
  try {
    const response = await axios.post(`${MANAGER_URL}/inventorymanager/update`,device, {
      headers: { 
        ...authHeader() ,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',

      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const viewDevices = async () => {
  try {
    const response = await axios.get(`${MANAGER_URL}/inventorymanager/getalldevices`, {
      headers: { ...authHeader(),
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
       }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const getDeviceById = async (id) => {
  try {
    const response = await axios.get(`${MANAGER_URL}/inventorymanager/devices/${id}`, {
      params: { id },
      headers: { ...authHeader() ,
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

const DeviceService = {
  addDevice,
  updateDevice,
  viewDevices,
  getDeviceById,
};

export default DeviceService;