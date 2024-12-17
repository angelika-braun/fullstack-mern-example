import { useState } from "react";
import { NavLink } from 'react-router-dom';

const Registration = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [message, setMessage] = useState("");
  
      function onSubmit(e) {
          e.preventDefault();
  
          fetch('https://fullstack-mern-example-mk3x.onrender.com/api/auth/register', {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                email: email,
                password: password
              })
          })
          .then(res => {
              if (!res.ok) {
                  throw new Error("registration failed");
              }
              setMessage("Please check your inbox and confirm your e-mail.");
              setEmail("");
              setPassword("");
          })
          .catch(error => setMessage("Please check your data", error));
      }
  
      return (
          <section className="form-wrapper">
              <h1>Neu hier?</h1>
              <p className="form-info">{message}</p>
              <form onSubmit={onSubmit}>
                  <div className="input-section">
                      <label htmlFor="email">E-Mail-Adresse</label>
                      <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                  <div className="input-section">
                      <label htmlFor="password">Passwort</label>
                      <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                  <button className="button-primary">Registration</button>
              </form>
              <p style={{marginTop: "20px"}}>You already have an account?<br/> <NavLink to="/login">Login now</NavLink></p>
          </section>
      )
  }

export default Registration
