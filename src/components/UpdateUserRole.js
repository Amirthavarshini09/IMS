import React, { useState,useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminService from '../services/AdminService';
import './UpdateUserRole.css';

function UpdateUseRole() {
  const navigate = useNavigate();
  const{userId} = useParams();
 
  const [userData, setUserData] = useState({
    userId: '',
    role: ''
  });
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchDeviceDataById(userId);
  }, [userId]);


  const fetchDeviceDataById = async (userId) => {
    try {
       
      const response = await AdminService.getUserById(userId);
      if (response) {
        setUserData(response);
      } else {
        console.error('Error: User data is undefined.');
      }
    } catch (error) {
      console.error('Error fetching User data:', error);
    }
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AdminService.updateUserRole(userData);
      navigate("/Adminmanagement");
      alert("User role Updated Successfully")
      navigate("/admin/admin-management");
    } catch (error) {
      console.error('Error updating user : ', error);
      alert(error.message || 'An error occurred while updating user.');
    }
  };
 
  return (
    <div className="update-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="update-user-form">
            <h2>Update User Role</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group1">
                <label>User ID :</label>
                <input type="number" name="id" value={userData.userId } onChange={handleInputChange} className="form-control" />
             
                <label htmlFor="role" className="form-label">Role :</label>
                <select className="form-select" id="role" name="role" value={userData.role} onChange={handleInputChange} required>
                  <option value="">Select Role</option>
                  <option value="ROLE_SYSTEM_ADMIN">ROLE_SYSTEM_ADMIN</option>
                  <option value="ROLE_CUSTOMER_SERVICE_REPRESENTATIVE">ROLE_CUSTOMER_SERVICE</option>
                  <option value="ROLE_INVENTORY_MANAGER">ROLE_INVENTORY_MANAGER</option>
                  <option value="ROLE_TECHNICAL_SUPPORT_STAFF">ROLE_TECHNICAL_STAFF</option>
                  <option value="ROLE_USER">ROLE_USER</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Update</button>
            </form>
          </div>
        </div>
      </div>
     </div>
  );
}
 
export default UpdateUseRole;
 