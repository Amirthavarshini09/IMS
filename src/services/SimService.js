


import axios from 'axios';
import authHeader from './auth-header';

const MANAGER_URL = 'http://localhost:8080/api';


const viewSIMs = async () => {
  try {
    const response = await axios.get(`${MANAGER_URL}/inventorymanager/getallsimcards`, {
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getSIMByMsisdn= async (msisdn) => {
  try {
    const response = await axios.get(`${MANAGER_URL}/inventorymanager/sim-cards/${msisdn}`, {
      headers: { ...authHeader(),
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
       }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const reserveSIM = async (formData) => {
  try {
    
    const response = await axios.post(
      `${MANAGER_URL}/inventorymanager/reserve`,formData,
      { headers: { ...authHeader(), 'Content-Type': 'application/json' ,} }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};


const deregisterSIMCard = async (msisdn) => {
  try {
    const response = await axios.post(`${MANAGER_URL}/inventorymanager/deregister-sim/{msisdn}/${msisdn}`,
      {
      headers: { ...authHeader(), 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllAvailableSIMs = async () => {
  try {
    const response = await axios.get(`${MANAGER_URL}/inventorymanager/availablesims`, {
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const activateSIM = async (formData) => {
  try {
    const response = await axios.post(
      `${MANAGER_URL}/inventorymanager/activate`,formData,
      { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllReserveSIMCards = async () => {
  try {
    const response = await axios.get(`${MANAGER_URL}/inventorymanager/reservesims`,{
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllActiveSIMCards = async () => {
  try {
    const response = await axios.get(`${MANAGER_URL}/inventorymanager/active`, {
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getAllDisassociateSIMCards = async () => {
  try {
    const response = await axios.get(`${MANAGER_URL}/inventorymanager/disassociate`, {
      headers: { ...authHeader() }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const DisassociateSIM = async (formData) => {
  try {
    const response = await axios.post(
      `${MANAGER_URL}/inventorymanager/disassociate`,formData,
     
      { headers: { ...authHeader(), 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllFlagSIMCards = async () => {
  try {
    const response = await axios.get(`${MANAGER_URL}/inventorymanager/flaggedsims`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


const FlaggedSimCard = async (formData) => {
  try {
    const response = await axios.post(`${MANAGER_URL}/inventorymanager/flag`, formData, {
      headers: {
        ...authHeader(),
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


const SimService = {
  viewSIMs,
  getSIMByMsisdn,
  getAllAvailableSIMs,
  reserveSIM,
  activateSIM,
  getAllReserveSIMCards,
  getAllActiveSIMCards,
  DisassociateSIM,
  deregisterSIMCard,
  getAllDisassociateSIMCards,
  getAllFlagSIMCards,
  FlaggedSimCard,
  
  
};

export default SimService;
