function login() {
  var rol = document.getElementById("rol").value;
  var usuario = document.getElementById("usuario").value;
  var clave = document.getElementById("clave").value;
  var mensaje = document.getElementById("mensaje");

  // Aquí puedes realizar la lógica de autenticación según el rol seleccionado
  // Por ejemplo, puedes enviar los datos a un servidor para verificar la autenticación

  // Solo como ejemplo, aquí estoy imprimiendo los datos en la consola del navegador
  console.log("Rol:", rol);
  console.log("Usuario:", usuario);
  console.log("Clave:", clave);

  // Simulación de validación de credenciales
  if ((usuario === "admin" && clave === "admin123" && rol === "admin") ||
      (usuario === "cajero" && clave === "cajero123" && rol === "cajero")) {
      if (rol === "admin") {
          window.location.href = 'admin_dashboard/index.html';
      } else if (rol === "cajero") {
          window.location.href = 'cajero_dashboard/index.html';
      }
  } else {
      mensaje.textContent = 'Usuario o contraseña incorrectos';
      mensaje.style.color = 'red';
  }
}

function openChat() {
  alert("Abrir chat de soporte");
  // Aquí puedes agregar la lógica para abrir el chat de soporte
}

