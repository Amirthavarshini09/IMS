import React, { useEffect, useState } from "react";
import AdminService from "../services/AdminService";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/Profile.css';
import AuthService from "../services/auth.service";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const userId = AuthService.getCurrentUser().id;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await AdminService.getUserById(userId);
        setCurrentUser(user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!currentUser) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      
        <div className="card profile-cards">
          <div className="card-header text-center">
            <img
              src="/profile 1.jpg" // Replace this with a real image URL
              alt="Profile"
              className="profile-img img-fluid rounded-circle"
            />
            <h3 className="profile-username mt-3">
              <strong>{currentUser.username}</strong>
            </h3>
          </div>
          <div className="card-body">
            <div className="profile-info">
              <strong>Id:</strong> {currentUser.userId}
            </div>
            <div className="profile-info">
              <strong>First Name:</strong> {currentUser.firstName}
            </div>
            <div className="profile-info">
              <strong>Last Name:</strong> {currentUser.lastName}
            </div>
            <div className="profile-info">
              <strong>Email:</strong> {currentUser.email}
            </div>
            <div className="profile-info">
              <strong>Mobile:</strong> {currentUser.mobile}
            </div>
            <div className="profile-info">
              <strong>Branch:</strong> {currentUser.branch}
            </div>
            <div className="profile-info">
              <strong>Role:</strong> {currentUser.role?.name}
            </div>
          </div>
        </div>
      </div>
    
  );
};

export default Profile;