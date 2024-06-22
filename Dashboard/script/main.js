import { auth } from '../../script/firebase.js'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import { signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"

var urlPag = '';

const logOut = document.getElementById('log_out');
logOut.addEventListener('click', async function () {
  // redirigr al formulario de login
  await signOut(auth)
  window.location.href = '../index.html'
});

const userEmail = document.getElementById('userEmail');
let userEmailValue = ''; // Variable para almacenar el correo electrónico

onAuthStateChanged(auth, async (user) => {
  if (user) { // Verifica si el usuario está autenticado
    userEmailValue = user.email; // Obtiene el correo electrónico del usuario
    userEmail.textContent = userEmailValue; // Actualiza el contenido del elemento HTML
  } else {
    userEmail.textContent = 'Usuario no logueado'; // Maneja el caso de usuario no autenticado
    await signOut(auth)
    window.location.href = '../index.html'
  }
});

document.getElementById("btnsun").addEventListener("click", function () {
  //code
  themeClaro();
});
function themeClaro() {
  document.querySelector("body").setAttribute("data-bs-theme", "ligth");
  document.querySelector("#d2-icon").setAttribute("class", "bx bxs-sun");
}

document.getElementById("btnmoon").addEventListener("click", function () {
  //code
  themeOscuro();
});
function themeOscuro() {
  document.querySelector("body").setAttribute("data-bs-theme", "dark");
  document.querySelector("#d1-icon").setAttribute("class", "bx bxs-moon");
}


function buscar() {
  // Code

}

var id_pos = document.getElementById("id_pos");
var id_his = document.getElementById("id_his");
var id_inv = document.getElementById("id_inv");
var id_rep = document.getElementById("id_rep");
var id_aju = document.getElementById("id_aju");


const btnpos = document.getElementById('btnpos')
btnpos.addEventListener('click', () => {
  pos();
})
function pos() {
  // Code    
  if (id_pos.style.display === "none") {
    id_pos.style.display = "block";
    id_his.style.display = "none";
    id_inv.style.display = "none";
    id_rep.style.display = "none";
    id_aju.style.display = "none";
  }
}

const btnhis = document.getElementById('btnhis')
btnhis.addEventListener('click', () => {
  historial();
})
function historial() {
  // Code    
  if (id_his.style.display === "none") {
    id_his.style.display = "block";
    id_pos.style.display = "none";
    id_inv.style.display = "none";
    id_rep.style.display = "none";
    id_aju.style.display = "none";
  }

}

document.getElementById("btninv").addEventListener("click", function () {
  //code
  inventario();
});
function inventario() {
  // Code
  if (id_inv.style.display === "none") {
    id_inv.style.display = "block";
    id_his.style.display = "none";
    id_pos.style.display = "none";
    id_rep.style.display = "none";
    id_aju.style.display = "none";
  }
}

document.getElementById("btnrep").addEventListener("click", function () {
  //code
  reportes();
});
function reportes() {
  // Code
  if (id_rep.style.display === "none") {
    id_rep.style.display = "block";
    id_his.style.display = "none";
    id_pos.style.display = "none";
    id_inv.style.display = "none";
    id_aju.style.display = "none";
  }
}


document.getElementById("btnaju").addEventListener("click", function () {
  //code
  ajustes();
});
function ajustes() {
  // Code
  if (id_aju.style.display === "none") {
    id_aju.style.display = "block";
    id_his.style.display = "none";
    id_pos.style.display = "none";
    id_rep.style.display = "none";
    id_inv.style.display = "none";
  }
}

// Script para scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});



// Función para simular la sincronización
function syncPrinter() {
  var progress = 0;
  var interval = setInterval(function () {
    progress += 10;
    $('#syncProgress .progress-bar').css('width', progress + '%').attr('aria-valuenow', progress);
    if (progress >= 100) {
      clearInterval(interval);
      $('#syncProgress').addClass('d-none');  // Ocultar la barra de progreso
      alert('La impresora se ha sincronizado correctamente.');  // Mensaje de éxito (puedes ajustarlo según tu lógica)
      $('#addPrintModal').modal('hide');  // Cerrar el modal después de sincronizar
    }
  }, 1000);  // Intervalo de simulación en milisegundos (aquí cada segundo)
}

// Event listener para el botón "Agregar"
document.getElementById('syncPrinterBtn').addEventListener('click', function () {
  $('#syncProgress').removeClass('d-none');  // Mostrar la barra de progreso al hacer clic en "Agregar"
  syncPrinter();  // Llamar a la función para simular la sincronización
});

/*


document.getElementById("ordBtn").addEventListener("click", function () {
  urlPag = './view/_ord_pos.html'
  newPag()
});


pagina que carga por defecto
urlPag = './view/_fac_pos.html'

// Ruta al archivo HTML externo que quieres cargar
const urlHtmlExterno = urlPag;

// Usar fetch para obtener el contenido del archivo HTML externo
fetch(urlHtmlExterno)
  .then(response => {
    // Verificar si la solicitud fue exitosa (status 200)
    if (response.ok) {
      return response.text(); // Obtener el contenido del archivo como texto
    }
    throw new Error('Error al cargar el archivo HTML externo');
  })
  .then(html => {
    // Insertar el contenido HTML dentro del div
    divContenidoExterno.innerHTML = html;
  })
  .catch(error => {
    console.error('Error:', error);
  });




const cantidad = document.getElementById('cantidad')
const sumar = document.getElementById('dis')
const restar = document.getElementById('add')
const borrar = document.getElementById('borrar')
const valor = document.getElementById('valor')

let numero = 0;
let precio = 10;

sumar.addEventListener('click', () => {
  if (numero == 0) { } else {
    numero--;
    suma();
  }
})

restar.addEventListener('click', () => {
  numero++;
  suma();
})

borrar.addEventListener('click', () => {
  numero = 0;
  cantidad.innerHTML = numero;
})

function suma() {
  cantidad.innerHTML = numero;
  var sum = numero * precio;
  valor.innerHTML = "$ "+ sum;
}*/

