import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const MANAGER_URL = "http://localhost:8080/api/inventorymanager/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getManagerBoard = () => {
  return axios.get(MANAGER_URL + "manager", { headers: authHeader() });
};


const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getManagerBoard,
 
};

export default UserService;
