import './pos.js'
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


//ocultar elemento div al abrir la pagina web
document.addEventListener('DOMContentLoaded', (event) => {
  id_pos.style.display = "block";
  id_his.style.display = "none";
  id_inv.style.display = "none";
  id_rep.style.display = "none";
  id_aju.style.display = "none";
});


// Obtener todos los botones del menú
const buttons = document.querySelectorAll('.btn-sidebar');

// Obtener elementos por ID
const id_pos = document.getElementById("id_pos");
const id_his = document.getElementById("id_his");
const id_inv = document.getElementById("id_inv");
const id_rep = document.getElementById("id_rep");
const id_aju = document.getElementById("id_aju");

// Función para manejar el clic en cada botón del menú
buttons.forEach(button => {
  button.addEventListener('click', function () {
    // Limpiar estilos de todos los botones antes de aplicar al botón actual
    buttons.forEach(btn => {
      btn.querySelector('span').style.fontWeight = 'normal';
      btn.querySelector('span').style.color = ''; // Vaciar para que se utilicen los colores de estilo
      btn.querySelector('i').style.color = ''; // Vaciar para que se utilicen los colores de estilo
    });

    // Aplicar estilos al botón actual
    const buttonText = this.querySelector('span');
    const icon = this.querySelector('i');
    if (buttonText && icon) {
      buttonText.style.fontWeight = 'bold';
      buttonText.style.color = 'white'; // Cambiar el color del texto 
      icon.style.color = 'white'; // Cambiar el color del icono
    }

    // Mostrar contenido correspondiente según el botón clicado
    switch (this.id) {
      case 'btnpos':
        showContent(id_pos);
        break;
      case 'btnhis':
        showContent(id_his);
        break;
      case 'btninv':
        showContent(id_inv);
        break;
      case 'btnrep':
        showContent(id_rep);
        break;
      case 'btnaju':
        showContent(id_aju);
        break;
      default:
        break;
    }
  });
});

// Función para mostrar el contenido correspondiente y ocultar los demás
function showContent(elementToShow) {
  const elementsToHide = [id_pos, id_his, id_inv, id_rep, id_aju];
  elementsToHide.forEach(element => {
    if (element !== elementToShow) {
      element.style.display = "none";
    }
  });
  elementToShow.style.display = "block";
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



// main.js
import { cargarProductos } from './pos.js';

document.addEventListener('DOMContentLoaded', function () {
  const productContainer = document.getElementById('productContainer');


  cargarProductos().then(data => {
    productContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar los datos
    data.slice(0, 300).forEach(product => {
      const cardHTML = `
                <div class="card mb-3 w-100">
                    <div class="row g-0 text-center">
                        <div class="col-2">
                            <img src="${product.imageUrl}" class="img-fluid rounded img-fluidcss" alt="...">
                        </div>
                        <div class="col-5">
                            <p class="1h-1 text-start">${product.name}</p>
                        </div>
                        <div class="col-5">
                            <h5 class="card-title text-end">$ ${product.price}</h5>
                            <div class="input-group text-end">
                                <button class="btn btn-outline-danger">-</button>
                                <input id="cant" type="text" class="form-control text-center" placeholder="0">
                                <button class="btn btn-outline-success">+</button>
                            </div>
                        </div>
                    </div>
                </div>`;
      productContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
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


