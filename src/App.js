import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faUserShield,
  faBriefcase,
  faTools,
  faUser,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
// import BoardUser from "./components/BoardUser";
import BoardCSR from "./components/BoardCSR";
import DeviceManagementPage from "./components/DeviceManagementPage";
import UpdateDevice from "./components/UpdateDevice";
import SimManagementPage from "./components/SimManagementPage";
// import UpdateSim from "./components/UpdateSim.js";
import ReserveSIMForm from "./components/ReserveSIMForm";
import ActivateSIMForm from "./components/ActivateSIMForm";

import DeregisterSIMForm from "./components/DeregisterSIMForm";
import MSISDNManagementPage from "./components/MSISDNManagementPage.js";
import IMEIManagementPage from "./components/IMEIManagementPage.js";
import DisassociateSIMForm from "./components/DisassociateSIMForm";
import SuspendSIMForm from "./components/SuspendSIMForm.js";
import ReactivateSIMForm from "./components/ReactivateSIMForm.js";
import FetchDataComponent from "./services/FetchData.js";
import AdminManagement from "./components/AdminManagement.js";
import UpdateUseRole from "./components/UpdateUserRole.js";

import BoardAdmin from "./components/BoardAdmin.js";
import BoardManager from "./components/BoardManager";
import BoardTechnicalStaff from "./components/BoardTechnicalStaff.js";
import BoardCompilance from "./components/BoardCompilance.js";
import QuarantineSimForm from "./components/QuarantineSimForm.js";
import FlagSIMForm from "./components/FlagSIMForm.js";
import ResolvedSIMForm from "./components/ResolvedSIMForm.js";
import EventBus from "./common/EventBus";
import UpdateUserRole from "./components/UpdateUserRole.js";
import GetAllSimCards from "./components/GetAllSimCards.js";
import GetAllPoolSIMCards from "./components/GetAllPoolSIMCards.js";
import ReservedSimcardPage from './components/ReservedSimcardPage';
import ActiveSimcardPage from "./components/ActiveSimcardPage";
import SuspendedSimcardPage from './components/SuspendedSimcardPage';
import DisassociateSimcardPage from './components/DisassociateSimcardPage';
import FlaggingSIMForm from "./components/FlaggingSIMForm.js";

const App = () => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showTechnicalBoard, setShowTechnicalBoard] = useState(false);
  const [showManagerBoard, setShowManagerBoard] = useState(false);
  const [showCSRBoard, setShowCSRBoard] = useState(false);
  const [showCompilanceBoard, setshowCompilanceBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setShowManagerBoard(user.role.includes("ROLE_INVENTORY_MANAGER"));
      setShowCSRBoard(user.role.includes("ROLE_CUSTOMER_SERVICE"));
      setShowAdminBoard(user.role.includes("ROLE_SYSTEM_ADMIN"));
      setShowTechnicalBoard(user.role.includes("ROLE_TECHNICAL_SUPPORT_STAFF"));
      setshowCompilanceBoard(user.role.includes("ROLE_COMPLIANCE_OFFICER"));
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowManagerBoard(false);
    setShowCSRBoard(false);
    setShowAdminBoard(false);
    setShowTechnicalBoard(false);
    setshowCompilanceBoard(false);
    setCurrentUser(undefined);
  };
  

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          INVENTORY MANAGEMENT SYSTEM
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              <FontAwesomeIcon icon={faHome} className="mr-1" /> Home
            </Link>
          </li>

          {showCSRBoard && (
            <li className="nav-item">
              <Link to={"/csr"} className="nav-link">
                <FontAwesomeIcon icon={faUsers} className="mr-1" /> CSR Board
              </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                <FontAwesomeIcon icon={faUserShield} className="mr-1" /> Admin Board
              </Link>
            </li>
          )}

          {showManagerBoard && (
            <li className="nav-item">
              <Link to={"/manager"} className="nav-link">
                <FontAwesomeIcon icon={faBriefcase} className="mr-1" /> Inventory Manager Board
              </Link>
            </li>
          )}

          {showTechnicalBoard && (
            <li className="nav-item">
              <Link to={"/technical"} className="nav-link">
                <FontAwesomeIcon icon={faTools} className="mr-1" /> Technical Staff Board
              </Link>
            </li>
          )}


          {showCompilanceBoard && (
            <li className="nav-item">
              <Link to={"/compilance"} className="nav-link">
                <FontAwesomeIcon icon={faBriefcase} className="mr-1" /> Compilance Officer Board
              </Link>
            </li>
          )}
        </div>


        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                <FontAwesomeIcon icon={faUser} className="mr-1" /> {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" /> LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-1" /> Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                <FontAwesomeIcon icon={faUserPlus} className="mr-1" /> Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/user" element={<BoardUser/>} /> */}
          <Route path="/admin" element={<BoardAdmin />} />
          <Route path="/manager" element={<BoardManager />} />
          <Route path="/compilance" element={<BoardCompilance />} />
          <Route path="/csr" element={<BoardCSR />} />
          <Route path="/technical" element={<BoardTechnicalStaff />} />
          <Route path="/manager/device-management" element={<DeviceManagementPage />} />
          <Route path="/update-device" element={<UpdateDevice />} />
          <Route path="/manager/sim-management" element={<SimManagementPage />} />
          {/* <Route path="/admin/UpdateUserRole" element={<UserRoleUpdatePage />} /> */}
          <Route path="/admin/GetAllSimCards" element={<GetAllSimCards />} />
          <Route path="/admin/GetAllPoolSIMCards" element={<GetAllPoolSIMCards />} />
          {/* <Route path="/update-sim/:simId" element={<UpdateSim />} /> */}
          <Route path="/manager/reserve-sim/:simId" element={<ReserveSIMForm />} />
          <Route path="/manager/activate-sim/:simId" element={<ActivateSIMForm />} />
          <Route path="/manager/disassociate-sim/:simId" element={<DisassociateSIMForm />} />
          <Route path="/manager/deregister-simcard" element={<DeregisterSIMForm />} />
          <Route path="/csr/msisdn-Management" element={<MSISDNManagementPage />} />
          <Route path="/csr/imei-Management" element={<IMEIManagementPage />} />
          <Route path="/technicalstaff/SuspendSIMForm" element={<SuspendSIMForm />} />
          <Route path="/technicalstaff/ReactiveSIMForm" element={<ReactivateSIMForm />} />
          <Route path="/manager/reserve-simcard" element={<ReserveSIMForm />} />
          <Route path="/manager/activate-simcard" element={<ActivateSIMForm />} />
          <Route path="/manager/disassociate-simcard" element={<DisassociateSIMForm />} />
          <Route path="/fetch-data" element={<FetchDataComponent />} />
          <Route path="/admin/admin-management" element={<AdminManagement />} />
          <Route path="/update-user-role/:userId" element={<UpdateUserRole />} />
          <Route path="/reserved-simcards" element={<ReservedSimcardPage />} />
          <Route path="/active-simcards" element={<ActiveSimcardPage />} />
          <Route path="/suspended-simcards" element={<SuspendedSimcardPage />} />
          <Route path="/disassociate-simcards" element={<DisassociateSimcardPage />} />
          <Route path="/quarantine" element={<QuarantineSimForm/>} />
          <Route path="/flagsim" element={<FlagSIMForm/>}/>
          <Route path="/resolvedsimcards" element={<ResolvedSIMForm />} />
          <Route path="/manager/flag-simcard" element={<FlaggingSIMForm/>}/>
          
        </Routes>
      </div>
    </div>
  );
};

export default App;
