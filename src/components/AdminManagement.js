import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminService from '../services/AdminService';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AdminManagement.css'; // Make sure to create this CSS file

const AdminManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    AdminService.getAllUsers()
      .then(response => {
        setUsers(response);
        console.log(response);
      })
      .catch(error => {
        console.error('Error fetching users : ', error);
      });
  };

  return (
    <div className="admin-management">
      <div className="admins-container">
        <h2 className="text-center ">User Management</h2>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.userId}>
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role.name}</td>
                  <td>
                    <Link to={`/update-user-role/${user.userId}`} className="btn btn-primary">
                      Update
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;