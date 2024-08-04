import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../components/BoardTechnicalStaff.css"; // Import your custom CSS

const BoardTechnicalStaff = () => {
  const handleButtonClick = (page) => {
    let url = "";
    switch (page) {
      case "suspend":
        url = "/technicalstaff/SuspendSIMForm";
        break;
      case "reactive":
        url = "/technicalstaff/ReactiveSIMForm";
        break;
      default:
        break;
    }
    window.open(url, "_blank"); // Open the URL in a new tab
  };

  return (
    <div className="container-fluid technical-staff-dashboard">
      <div className="row justify-content-center mt-5">
        <div className="col-md-8">
          <header>
            <h2 className="dashboard-title">Technical Staff Dashboard</h2>
            <div className="dashboard-content">
              <div className="action-box">
                <button
                  onClick={() => handleButtonClick("suspend")}
                  className="btn action-button"
                >
                  Suspend SIM Card
                </button>
                <p className="action-description">
                  Suspend a SIM card temporarily.
                </p>
              </div>

              <div className="action-box">
                <button
                  onClick={() => handleButtonClick("reactive")}
                  className="btn action-button"
                >
                  Reactive SIM Card
                </button>
                <p className="action-description">
                  Reactive a suspended SIM card.
                </p>
              </div>
            </div>
          </header>
        </div>
      </div>
    </div>
  );
};

export default BoardTechnicalStaff;
