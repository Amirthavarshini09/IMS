import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};
const vmobile = (value) => {
  if (value.length !== 10) {
    return (
      <div className="alert alert-danger" role="alert">
        Enter 10 digit mobile number.
      </div>
    );
  }
};

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [firstname,setFirstName] = useState("");
  const [lastname,setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [branch, setBranch] =useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  
  // const [address, setAddress] = useState("");
  // const [gender, setGender] = useState("");
  const [role, setRole] = useState(null);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeMobile = (e) => {
    const mobile = e.target.value;
    setMobile(mobile);
  };
  const onChangeFirstName = (e) => {
    const firstname = e.target.value;
    setFirstName(firstname);
  };

  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
  };

  const onChangeBranch = (e) => {
    const branch = e.target.value;
    setBranch(branch);
  };
  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username,firstname,lastname, email, password,mobile,branch,role).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="firstname">FirstName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="firstname"
                  value={firstname}
                  onChange={onChangeFirstName}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastname">LastName</label>
                <Input
                  type="text"
                  className="form-control"
                  name="lastname"
                  value={lastname}
                  onChange={onChangeLastName}
                  validations={[required]}
                />
              </div>


              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <Input
                  type="text"
                  className="form-control"
                  name="mobile"
                  value={mobile}
                  onChange={onChangeMobile}
                  validations={[required, vmobile]}
                />
              </div> 
              {/* <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <Input
                  type="text"
                  className="form-control"
                  name="gender"
                  value={gender}
                  onChange={onChangeGender}
                  validations={[required]}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <Input
                  type="text"
                  className="form-control"
                  name="branch"
                  value={branch}
                  onChange={onChangeBranch}
                  validations={[required]}
                />
              </div> 
              <div className="form-group">
                <button className="btn btn-primary btn-block" style={{ backgroundColor: '#26A69A',border:"#26A69A" }}>Create an Account </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
