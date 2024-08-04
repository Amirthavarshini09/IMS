
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./BoardManager.css"; // Import custom CSS

const BoardManager = () => {
  const handleButtonClick = (page) => {
    switch (page) {
      case "device":
        window.open("/manager/device-management", "_blank");
        break;
      case "sim":
        window.open("/manager/sim-management", "_blank");
        break;
      case "reserve":
        window.open("/manager/reserve-simcard", "_blank");
        break;
      case "activate":
        window.open("/manager/activate-simcard", "_blank");
        break;
      case "deregister":
        window.open("/manager/deregister-simcard", "_blank");
        break;
      case "disassociate":
        window.open("/manager/disassociate-simcard", "_blank");
        break;
      case "flag":
        window.open("/manager/flag-simcard", "_blank");
        break;
      default:
        break;
    }
  };

  return (
    // <div className="container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="col-md-12">
          <header className="jumbotron">
            <h2 className="text-center mb-4">Manager Dashboard</h2>
            <div className="row">
              <div className="col-md-4">
                <div className="content-div">
                  <button
                    onClick={() => handleButtonClick("device")}
                    className="custom-button"
                  >
                    Manage Devices
                  </button>
                  <p className="button-description">Add devices, view details, and perform administrative actions on devices.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="content-div">
                  <button
                    onClick={() => handleButtonClick("sim")}
                    className="custom-button"
                  >
                    Manage SIM Cards
                  </button>
                  <p className="button-description">Manage SIM cards, including activation, deactivation, and status monitoring.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="content-div">
                  <button
                    onClick={() => handleButtonClick("reserve")}
                    className="custom-button"
                  >
                    Reserve SIM
                  </button>
                  <p className="button-description">Reserve SIM cards for specific customers or purposes before activation.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="content-div">
                  <button
                    onClick={() => handleButtonClick("activate")}
                    className="custom-button"
                  >
                    Activate SIM
                  </button>
                  <p className="button-description">Activate reserved SIM cards to make them operational for users.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="content-div">
                  <button
                    onClick={() => handleButtonClick("flag")}
                    className="custom-button"
                  >
                    Flag SIM
                  </button>
                  <p className="button-description">Flag SIM cards that frequently fail activation for review.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="content-div">
                  <button
                    onClick={() => handleButtonClick("disassociate")}
                    className="custom-button"
                  >
                    Disassociate SIM
                  </button>
                  <p className="button-description">Disassociate SIM cards from devices as needed for management purposes.</p>
                </div>
              </div>
            </div>
          </header>
        </div>
      </div>
    // </div>
  );
};

export default BoardManager;
