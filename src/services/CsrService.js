import axios from 'axios';
import authHeader from './auth-header';

const CSR_URL = 'http://localhost:8080/api/customerservice';

const getByMsisdn = async (msisdn) => {
  try {
    const response = await axios.get(
      `${CSR_URL}/getbymsisdn/${msisdn}`,
      
      {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching SIM card details by MSISDN:', error);
    throw error;
  }
};

const getByImei = async (imeiNumber) => {
  try {
    const response = await axios.get(
      `${CSR_URL}/getbyimeiNumber/${imeiNumber}`,
       
      {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching SIM card details by IMEI:', error);
    throw error;
  }
};

const CsrService = {
  getByMsisdn,
  getByImei,
};

export default CsrService;
