
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import "../components/BoardCSR.css"; // Import custom CSS

const BoardCSR = () => {
  const navigateToPage = (page) => {
    if (page === "IMEI") {
      window.open("/csr/imei-management", "_blank"); // Open in new tab
    } else if (page === "MSISDN") {
      window.open("/csr/msisdn-management", "_blank"); // Open in new tab
    }
  };

  return (
    // <div className="container-fluid">
      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <header className="jumbotron">
            <h2 className="text-center mb-4">Customer Service Dashboard</h2>
            <div className="row justify-content-center">
              <div className="col-md-4 content-div mr-md-4">
                <button
                  onClick={() => navigateToPage("IMEI")}
                  className="btn custom-button mb-2"
                >
                  IMEI Management
                </button>
                <p className="text-muted mb-1">
                  Provide all the details related to that IMEI.
                </p>
              </div>

              <div className="col-md-4 content-div mr-md-4">
                <button
                  onClick={() => navigateToPage("MSISDN")}
                  className="btn custom-button mb-2"
                >
                  MSISDN Management
                </button>
                <p className="text-muted mb-1">
                Provide all the SimCard details related to that MSISDN.
                </p>
              </div>
            </div>
          </header>
        </div>
      </div>
    // </div>
  );
};

export default BoardCSR;
