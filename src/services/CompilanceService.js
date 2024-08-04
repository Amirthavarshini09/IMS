import axios from 'axios';
import authHeader from './auth-header';

const COMPILANCE_URL = 'http://localhost:8080/api/compliance';

const QuarantineSim = async (formData) => {
  try {
    
    const response = await axios.post(
      `${COMPILANCE_URL}/quarantine`,formData,
      { headers: { ...authHeader(), 'Content-Type': 'application/json' ,} }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

const ResolvedSIMCard = async (formData) => {
    try {
      const response = await axios.post(`${COMPILANCE_URL}/resolve`, formData, {
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
  
  const FlagSimCard = async (formData) => {
    try {
      const response = await axios.post(`${COMPILANCE_URL}/flag`, formData, {
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


  const getAllQuarantinedSIMCards = async () => {
    try {
      const response = await axios.get(`${COMPILANCE_URL}/quarantinesims`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

  const getAllFlaggedSIMCards = async () => {
    try {
      const response = await axios.get(`${COMPILANCE_URL}/flaggedsims`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getAllResolvedSIMCards = async () => {
    try {
      const response = await axios.get(`${COMPILANCE_URL}/resolvedsims`, {
        headers: authHeader()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  
  
const CompilanceOfficerService = {
    QuarantineSim,
    ResolvedSIMCard,
    FlagSimCard,
    getAllQuarantinedSIMCards,
    getAllFlaggedSIMCards,
    getAllResolvedSIMCards


};

export default CompilanceOfficerService;
