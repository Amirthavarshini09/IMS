import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../components/BoardAdmin.css"; // Import custom CSS

const BoardCompilance = () => {
  const navigateToPage = (page) => {
    if (page === "Quarantine") {
      window.open("/quarantine", "_blank"); // Open in new tab
    } else if (page === "Flagsim") {
      window.open("/flagsim", "_blank"); // Open in new tab
    } else if (page === "Resolvedsimcards") {
      window.open("/resolvedsimcards", "_blank");
    }
  };

  return (
    // <div className="container-fluid"> 
      <div className="row justify-content-center "> 
        <div className="col-md-10 "> 
          <header className="jumbotron">
            <h2 className="text-center mb-4">Compilance Officer Dashboard</h2>
            <div className="row justify-content-center">
              <div className="col-md-4 content-div mr-md-4"> 
                <button
                  onClick={() => navigateToPage("Quarantine")}
                  className="btn custom-button mb-2"
                >
                  Quarantine Simcards
                </button>
                <div>
                  <p className="text-muted mb-1">
                    Admins can Quarantine Simcards
                  </p>

                </div>
              </div>

              <div className="col-md-4 content-div mr-md-4"> {/* Second content div */}
                <button
                  onClick={() => navigateToPage("Flagsim")}
                  className="btn custom-button mb-2"
                >
                  Flag Simcards
                </button>
                <div>
                  <p className="text-muted mb-1">
                    Admins can Flag Simcards.
                  </p>
                </div>
              </div>

              <div className="col-md-4 content-div mr-md-4"> {/* Second content div */}
                <button
                  onClick={() => navigateToPage("Resolvedsimcards")}
                  className="btn custom-button mb-2"
                >
                  All Resolved SimCards Reports.
                </button>
                <div>
                  <p className="text-muted mb-1">
                    Admins can view all All Resolved SimCards Reports.
                  </p>
                </div>
              </div>
            </div>

          </header>
        </div>
      </div>
    // </div>
  );
};

export default BoardCompilance;
