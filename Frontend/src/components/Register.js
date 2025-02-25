// import React, { useState, useRef } from "react";
// import Form from "react-validation/build/form";
// import Input from "react-validation/build/input";
// import CheckButton from "react-validation/build/button";
// import { isEmail } from "validator";
 
// import AuthService from "../services/auth.service";
 
// const required = (value) => {
//   if (!value) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This field is required!
//       </div>
//     );
//   }
// };
 
// const validEmail = (value) => {
//   if (!isEmail(value)) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         This is not a valid email.
//       </div>
//     );
//   }
// };
 
// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };
 
// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };
// // const vmobile = (value) => {
// //   if (value.length !== 10) {
// //     return (
// //       <div className="alert alert-danger" role="alert">
// //         Enter 10 digit mobile number.
// //       </div>
// //     );
// //   }
// // };
 
// const Register = () => {
//   const form = useRef();
//   const checkBtn = useRef();
 
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [successful, setSuccessful] = useState(false);
//   const [message, setMessage] = useState("");
//   //const [mobile, setMobile] = useState("");
//   //const [address, setAddress] = useState("");
//   //const [gender, setGender] = useState("");
//   const [role, setRole] = useState(null);
 
//   const onChangeUsername = (e) => {
//     const username = e.target.value;
//     setUsername(username);
//   };
 
//   const onChangeEmail = (e) => {
//     const email = e.target.value;
//     setEmail(email);
//   };
 
//   const onChangePassword = (e) => {
//     const password = e.target.value;
//     setPassword(password);
//   };
// /**
//   const onChangeMobile = (e) => {
//     const mobile = e.target.value;
//     setMobile(mobile);
//   };
//   const onChangeGender = (e) => {
//     const gender = e.target.value;
//     setGender(gender);
//   };
 
//   const onChangeAddress = (e) => {
//     const address = e.target.value;
//     setAddress(address);
//   }; */
//   const handleRegister = (e) => {
//     e.preventDefault();
 
//     setMessage("");
//     setSuccessful(false);
 
//     form.current.validateAll();
 
//     if (checkBtn.current.context._errors.length === 0) {
//       AuthService.register(username, email, password,role).then(
//         (response) => {
//           setMessage(response.data.message);
//           setSuccessful(true);
//         },
//         (error) => {
//           const resMessage =
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString();
 
//           setMessage(resMessage);
//           setSuccessful(false);
//         }
//       );
//     }
//   };
 
//   return (
//     <div className="col-md-12">
//       <div className="card card-container">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         />
 
//         <Form onSubmit={handleRegister} ref={form}>
//           {!successful && (
//             <div>
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="username"
//                   value={username}
//                   onChange={onChangeUsername}
//                   validations={[required, vusername]}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <Input
//                   type="password"
//                   className="form-control"
//                   name="password"
//                   value={password}
//                   onChange={onChangePassword}
//                   validations={[required, vpassword]}
//                 />
//               </div>
 
//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <Input
//                   type="text"
//                   className="form-control"
//                   name="email"
//                   value={email}
//                   onChange={onChangeEmail}
//                   validations={[required, validEmail]}
//                 />
//               </div>
 
//               <div className="form-group">
//                 <button className="btn btn-primary btn-block">Sign Up</button>
//               </div>
//             </div>
//           )}
 
//           {message && (
//             <div className="form-group">
//               <div
//                 className={
//                   successful ? "alert alert-success" : "alert alert-danger"
//                 }
//                 role="alert"
//               >
//                 {message}
//               </div>
//             </div>
//           )}
//           <CheckButton style={{ display: "none" }} ref={checkBtn} />
//         </Form>
//       </div>
//     </div>
//   );
// };
 
// export default Register;
 

import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { isEmail } from "validator";
import 'D:\\ProjectFinal\\Frontend\\src\\Register.css'
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

const Register = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
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

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, role).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          // Optionally navigate to login page after successful registration
          // navigate("/login");
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
    <div className="login-container">
      <div className="login-content">
        <div className="login-header">
          <FontAwesomeIcon icon={faUserPlus} className="avatar" />
          <h2>Register</h2>
        </div>

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">
                  <FontAwesomeIcon icon={faUser} /> Username
                </label>
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
                <label htmlFor="email">
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                </label>
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
                <label htmlFor="password">
                  <FontAwesomeIcon icon={faLock} /> Password
                </label>
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
                <button className="btn btn-primaryy">
                  <FontAwesomeIcon icon={faUserPlus} />
                  <span className="btn-text">Sign Up</span>
                </button>
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