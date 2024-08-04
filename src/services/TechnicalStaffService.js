import axios from 'axios';
import authHeader from './auth-header';

const TECHNICAL_URL = 'http://localhost:8080/api/technical';

const suspendSIMCard = async (formData) => {
  try {
    
    const response = await axios.post(
      `${TECHNICAL_URL}/suspend`,formData,
      { headers: { ...authHeader(), 'Content-Type': 'application/json' ,} }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const reactivateSIMCard = async (formData) => {
    try {
      const response = await axios.post(`${TECHNICAL_URL}/reactivate`, formData, {
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
  
  const getAllSuspendedSIMCards = async () => {
    try {
      const response = await axios.get(`${TECHNICAL_URL}/suspendedsimcards`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
const getAllActiveSIMCards = async () => {
  try {
    const response = await axios.get(`${TECHNICAL_URL}/getallactive`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const TechnicalStaffService = {
  suspendSIMCard,
  reactivateSIMCard,
  getAllActiveSIMCards,
  getAllSuspendedSIMCards
};

export default TechnicalStaffService;
