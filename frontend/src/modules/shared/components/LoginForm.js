import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
//import { useHistory } from 'react-router-dom';
import '../../../App.css';

const LoginForm = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);
    //const history = useHistory(); 

    const handleCaptchaChange = (value) => {
      if (value) {
        setCaptchaValid(true);
      } else {
        setCaptchaValid(false);
      }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (captchaValid) {
          // Simular autenticación exitosa
          localStorage.setItem('authToken', 'example-token');
          setIsLoggedIn(true);
        } else {
          alert('Por favor, complete el captcha');
        }
      };

      /*
      const handleSubmit = async (e) => {
    e.preventDefault();
    if (captchaValid) {
      try {
        // Realiza una solicitud al backend para autenticar al usuario
        const response = await fetch('http://tu-backend.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();

        // Verifica si la autenticación fue exitosa
        if (response.ok) {
          // Si la autenticación fue exitosa, redirige al usuario al módulo correspondiente
          switch (data.userType) {
            case 'gerente':
              history.push('/gerente');
              break;
            case 'director':
              history.push('/director');
              break;
            case 'capataz':
              history.push('/capataz');
              break;
            default:
              break;
          }
        } else {
          // Si la autenticación falló, muestra un mensaje de error al usuario
          alert(data.message);
        }
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error);
      }
    } else {
      alert('Por favor, complete el captcha');
    }
  };
      */
  
    return (
      <div className="contenedor">
        <div className="login-container">
          <form onSubmit={handleSubmit}>
            <h1>EDIFEX</h1>
            <h2>Inicio de Sesión</h2>
            <div>
              <input
                type="text"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <section>
                <ReCAPTCHA
                  sitekey="6LfvYuQpAAAAAAzE6LgIssQxN5IEsyJl1uE-7_JB"
                  onChange={handleCaptchaChange}
                />
              </section>
            </div>
            <button type="submit">Iniciar Sesión</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginForm;
