import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Estilos básicos (Mantenidos)
const estilos = {
  contenedor: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    color: '#333',
    marginBottom: '20px',
  },
  formulario: {
    display: 'flex',
    flexDirection: 'column' as 'column', // Añadir 'as 'column'' para tipado TS
  },
  entrada: {
    marginBottom: '15px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
  },
  boton: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '10px',
  },
  alternador: {
    marginTop: '15px',
    fontSize: '14px',
    color: '#666',
  },
  enlace: {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
    marginLeft: '5px',
  }
};

const LoginRegistro = () => {
  const [esLogin, setEsLogin] = useState(true);
  
  // Estados para los datos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState(''); 
  const [web, setWeb] = useState(''); // ¡NUEVO ESTADO PARA LA WEB!
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Función para manejar la lógica de REGISTRO
  const manejarRegistro = () => {
    // URL del webhook de registro
    const urlRegistro = "https://n8n-n8n.qxzsxx.easypanel.host/webhook/register"; 

    fetch(urlRegistro, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombre,
        email: email,
        password: password,
        web: [web], // ENVIAR EL NUEVO CAMPO 'web'
      }),
    })
    .then((response) => {
      // Manejar respuestas que no sean 200/201
      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.statusText}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Registro exitoso:", data);
      
      // Asumiendo que el registro NO devuelve un token inmediatamente y simplemente notifica:
      alert("¡Registro exitoso! Por favor, inicia sesión.");
      setEsLogin(true); // Cambiar a la vista de login automáticamente
    })
    .catch((error) => {
      console.error("Error en el registro:", error);
      setError("Error al intentar registrar. Intente de nuevo.");
    });
  };

  // Función para manejar la lógica de LOGIN (Mantenida)
  const manejarLogin = () => {
    const urlLogin = "https://n8n-n8n.qxzsxx.easypanel.host/webhook/login";

    fetch(urlLogin, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.token) { // Verificar si el servidor devolvió un token
        const tokenValue = data.token;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        const expires = "expires=" + expiryDate.toUTCString();

        const cookieString =
          "access_token=" +
          tokenValue +
          "; " +
          expires +
          "; Path=/; SameSite=Lax; Secure";

        document.cookie = cookieString;
        console.log("Cookie 'access_token' creada con éxito:", document.cookie);
        navigate("/list");
      } else {
         // Si la respuesta es exitosa pero no tiene token (ej: credenciales inválidas)
         setError("Usuario o contraseña incorrectos.");
      }
    })
    .catch((error) => {
        console.error("Error en el login:", error);
        setError("Error de conexión al iniciar sesión.");
    });
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (esLogin) {
      manejarLogin();
    } else {
      manejarRegistro(); // Llama a la nueva función de registro
    }
  };

  const alternarVista = () => {
    setEsLogin(!esLogin);
    setError(null); 
    setEmail('');
    setPassword('');
    setNombre('');
    setWeb(''); // Limpiar el campo web
  };

  return (
    <div style={estilos.contenedor}>
      <h2 style={estilos.titulo}>{esLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={manejarEnvio} style={estilos.formulario}>
        
        {/* Campo Nombre (solo para Registro) */}
        {!esLogin && (
          <input
            type="text"
            placeholder="Nombre Completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required={!esLogin}
            style={estilos.entrada}
          />
        )}
        
        {/* Campo Web (solo para Registro) */}
        {!esLogin && (
          <input
            type="text" // Usamos 'url' para validación básica
            placeholder="Web/Dominio (ej: miweb.com)"
            value={web}
            onChange={(e) => setWeb(e.target.value)}
            required={!esLogin}
            style={estilos.entrada}
          />
        )}

        {/* Campo Email */}
        <input
          type="email"
          placeholder="Correo Electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={estilos.entrada}
        />

        {/* Campo Contraseña */}
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={estilos.entrada}
        />

        <button type="submit" style={estilos.boton}>
          {esLogin ? 'Entrar' : 'Registrarse'}
        </button>
      </form>
      
      {/* Alternador de vista */}
      <div style={estilos.alternador}>
        {esLogin ? (
          <>
            ¿No tienes cuenta?
            <span onClick={alternarVista} style={estilos.enlace}>
              Regístrate aquí
            </span>
          </>
        ) : (
          <>
            ¿Ya tienes cuenta?
            <span onClick={alternarVista} style={estilos.enlace}>
              Inicia Sesión
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginRegistro;