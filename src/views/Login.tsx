import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Login = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Por favor, completa ambos campos");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:3001/users/login", { username, password });
      
      if (response.status === 200) {
        setLoggedIn(true); // Cambiar el estado a true si el login es exitoso
        navigate("/home");
      } else {
        console.error("Credenciales inválidas");
        alert("El nombre de usuario o contraseña son incorrectas");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Debes registrarte primero");
    }
  };

  const handleRegistrationClick = (event) => {
    event.preventDefault();
    setShowRegistration(true);
  };

  return (
    <div className="container p-5 m-6"> 
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Iniciar sesión</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="user" className="form-label">Nombre de usuario</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="user" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="d-grid">
                  <button onClick={handleLogin} className="btn btn-primary">Iniciar sesión</button>
                </div>
              </form>
              {!loggedIn && !showRegistration && (
                <div className="text-center mt-3">
                <p>¿No tienes una cuenta? <button onClick={handleRegistrationClick} style={{ border: 'none', background: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>Regístrate aquí</button></p>

                </div>
              )}
            </div>
          </div>
          {showRegistration && (
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title text-center">Registrarse</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="userName" className="form-label">Nombre de usuario</label>
                    <input type="text" className="form-control" id="userName" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" id="email" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="password" />
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Registrarse</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
