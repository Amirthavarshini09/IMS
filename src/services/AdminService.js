import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/admin";

const updateUserRole = async (roleUpdateRequest) => {
  try {
    const response = await axios.post(`${API_URL}/updateuserrole`, roleUpdateRequest, {
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
const getAllSIMCards = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/getall-by-admin`,
      {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all SIM cards:', error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/user/${id}`, {
      headers: {
        ...authHeader(),
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/getallusers`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const getAllRoles = async () => {
  try {
    const response = await axios.get(`${API_URL}/getallroles`, {
      headers: authHeader()
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


const getAllPoolSIMCards = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/poolsims`,
      {
        headers: {
          ...authHeader(),
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all SIM cards:', error);
    throw error;
  }
};



const AdminService = {
  updateUserRole,
  getAllSIMCards,
  getUserById,
  getAllUsers,
  getAllRoles,
  getAllPoolSIMCards
};

export default AdminService;
