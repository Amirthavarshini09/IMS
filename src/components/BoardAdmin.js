import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/BoardAdmin.css";

const BoardAdmin = () => {
  const navigateToPage = (page) => {
    if (page === "UpdateUserRole") {
      window.open("/admin/admin-management", "_blank");
    } else if (page === "GetAllSimCards") {
      window.open("/admin/GetAllSimCards", "_blank");
    } else if (page === "GetAllPoolSIMCards") {
      window.open("/admin/GetAllPoolSIMCards", "_blank");
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-container">
        <header className="dashboard-header">
          <h2>Admin Dashboard</h2>
        </header>
        <div className="row justify-content-center">
          <div className="col-md-4 mb-4">
            <div className="content-card">
              <h3>User Management</h3>
              <button
                onClick={() => navigateToPage("UpdateUserRole")}
                className="btn custom-button"
              >
                Update User Role
              </button>
              <p className="card-description">
                Admins can update user roles and manage permissions.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="content-card">
              <h3>SIM Card Overview</h3>
              <button
                onClick={() => navigateToPage("GetAllSimCards")}
                className="btn custom-button"
              >
                All SIM Cards
              </button>
              <p className="card-description">
                View and manage all SIM cards to monitor usage and status.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="content-card">
              <h3>Available SIM Cards</h3>
              <button
                onClick={() => navigateToPage("GetAllPoolSIMCards")}
                className="btn custom-button"
              >
                Available SIM Cards
              </button>
              <p className="card-description">
                View all available SIM cards in the SIM pool.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardAdmin;