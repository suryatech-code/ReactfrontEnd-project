import { useState } from "react";
import { useHistory } from "react-router-dom";

import './index.css'

const Login = () => {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const history = useHistory(); 

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (email === "" || password === "") {
      setErrorMsg("Both fields are strictly required.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("The password must be a minimum of 6 characters long.");
      return;
    }

    const userDetails = { email, password };

    const url = "https://csyibgv5y0.execute-api.eu-north-1.amazonaws.com/api/auth/signin";

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("jwt_token", data.token);
      history.replace("/dashboard");  
    } else {
      setUsername("");
      setPassword("");
      setErrorMsg(data.message || "Invalid username or password");
    }
  };

  return (
    <>
        <div className='bg-container'>
            <div className="left-container">
              <img className="task-img" src='https://img.magnific.com/premium-vector/task-paper-with-checklist-cartoon-vector-icon-illustration-education-business-isolated-flat-vector_138676-10728.jpg?w' alt='logo'/>
                <h1 className="heading">Task Manager</h1>
                <p className="descr">Sign in to open your project dashboard.</p>
                <ul className="ul-element">
                    <li className="list-items">Plan work across To Do, In Porgress and Done</li>
                    <li className="list-items">Track Priorities and Deadline in one place</li>
                    <li className="list-items">Your Board is save in the browser</li>
                </ul>
            </div>
            <div className="login-container">
                <div className="form-container">
                    <h1 className="welcome">Welcome</h1>
                    <p className="form-description">Use your account email and password to continue.</p>
                    <form className="form-element" onSubmit={onSubmitForm}>
                        <label className="label-el" htmlFor="username">Email</label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="you@example.com"
                            id='username'
                            className="username-input"
                        />
                        <label className="label-el" htmlFor="password">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="........"
                            id='password'
                            className="password-input"
                        />
                        <button type="submit" className="login-button">Login</button>
                        {errorMsg && <p>{errorMsg}</p>}
                    </form>
                </div>
            </div>
        </div>
    </>
  );
};

export default Login;