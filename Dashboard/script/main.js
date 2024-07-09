import './pos.js'
import './ajustes.js'
import { auth } from '../../script/firebase.js'
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"
import { signOut } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js"


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



//cambar them appweb
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




//ocultar elemento div al abrir la pagina web
document.addEventListener('DOMContentLoaded', (event) => {
  id_pos.style.display = "block";
  id_his.style.display = "none";
  id_inv.style.display = "none";
  id_rep.style.display = "none";
  id_aju.style.display = "none";
});


// Obtener todos los botones del menú sedebar
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



//odenenes
//mutlipli[2:15 a.m.] LUIS CARLOS BACCA OCAMPO
async function fetchOrdenes() {
  try {
    const response = await fetch('http://localhost:3000/ordenes');
    if (!response.ok) {
      throw new Error('Error al obtener las órdenes');
    }
    const ordenes = await response.json();
    return ordenes;
  } catch (error) {
    console.error('Error:', error);
    return []; // Devolver un array vacío o manejar el error según sea necesario
  }
}

function renderOrdenes(ordenes) {
  const productContainer = document.getElementById('productContainer-ord');
  productContainer.innerHTML = ''; // Limpiar contenido previo

  ordenes.forEach((orden, index) => {
    const cardHtml = `
    
        <div class="card mb-1 w-100">
          <div class="card-body ">
            <h5 class="card-title d-none">Orden ID: ${orden.id}</h5>
            <p class="card-text">Producto: ${orden.nombre}</p>
            <p class="card-text">Precio: $<span class="precio">${orden.precio}</span></p>
            <div class="d-flex align-items-center">
              <button class="btn btn-secondary btn-sm decrease" data-index="${index}">-</button>
              <input type="number" class="form-control quantity" value="1" min="1" style="width: 60px; text-align: center; margin: 0 10px;" data-index="${index}">
              <button class="btn btn-secondary btn-sm increase" data-index="${index}">+</button>
            </div>
            <p class="card-text mt-2">Total: $<span class="total">${orden.precio}</span></p>
          </div>
        </div>
    `;
    productContainer.innerHTML += cardHtml;
  });

  // Agregar event listeners a los botones
  document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', event => {
      const index = event.target.getAttribute('data-index');
      const quantityInput = document.querySelectorAll('.quantity')[index];
      const newValue = parseInt(quantityInput.value) + 1;
      quantityInput.value = newValue;
      updateTotal(index, ordenes[index].precio, newValue);
      updateGlobalTotal(ordenes);
    });
  });

  document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', event => {
      const index = event.target.getAttribute('data-index');
      const quantityInput = document.querySelectorAll('.quantity')[index];
      const newValue = Math.max(parseInt(quantityInput.value) - 1, 1); // Asegurar que el valor no sea menor que 1
      quantityInput.value = newValue;
      updateTotal(index, ordenes[index].precio, newValue);
      updateGlobalTotal(ordenes);
    });
  });

  document.querySelectorAll('.quantity').forEach(input => {
    input.addEventListener('input', event => {
      const index = event.target.getAttribute('data-index');
      const newValue = Math.max(parseInt(input.value), 1); // Asegurar que el valor no sea menor que 1
      input.value = newValue;
      updateTotal(index, ordenes[index].precio, newValue);
      updateGlobalTotal(ordenes);
    });
  });

  // Inicializar el total global
  updateGlobalTotal(ordenes);
}

function updateTotal(index, precio, quantity) {
  const totalElement = document.querySelectorAll('.total')[index];
  const newTotal = precio * quantity;
  totalElement.textContent = newTotal.toFixed(2);
}

function updateGlobalTotal(ordenes) {
  const totalElements = document.querySelectorAll('.total');
  let globalTotal = 0;

  totalElements.forEach((element, index) => {
    const price = parseFloat(ordenes[index].precio); // Obtener el precio del orden correspondiente
    const quantity = parseInt(document.querySelectorAll('.quantity')[index].value);
    globalTotal += price * quantity;
  });

  // Calcular el IVA (19% del total global)
  const totaliva = globalTotal * 0.19;

  // Calcular la base sin IVA
  const sumabase = globalTotal - totaliva;

  // Actualizar elementos en el HTML
  const globalTotalElement = document.getElementById('globalTotal');
  const globalTotalElementiva = document.getElementById('idiva');
  const globalTotalElementbase = document.getElementById('idsumbase');

  globalTotalElement.textContent = `$${globalTotal.toFixed(2)}`;
  globalTotalElementiva.textContent = `$${totaliva.toFixed(2)}`;
  globalTotalElementbase.textContent = `$${sumabase.toFixed(2)}`;
}


// Llamar a la función fetchOrdenes y luego renderizar las ordenes
fetchOrdenes().then(ordenes => {
  renderOrdenes(ordenes);
});



// Función para buscar y cargar datos del cliente desde db.json
function buscarCliente() {
  const identificacion = document.getElementById('iduCliente').value.trim();

  // Hacer una solicitud GET a la base de datos JSON para obtener el cliente
  fetch(`http://localhost:3000/clientes/${identificacion}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Cliente no encontrado');
      }
      return response.json();
    })
    .then(clienteEncontrado => {
      const clienteHtml = `
        <p><strong>Identificación:</strong> ${clienteEncontrado.id}</p>
        <p><strong>Nombre:</strong> ${clienteEncontrado.nombre}</p>
        <p><strong>Dirección:</strong> ${clienteEncontrado.direccion}</p>
        <p><strong>Teléfono:</strong> ${clienteEncontrado.telefono}</p>
        <p><strong>Email:</strong> ${clienteEncontrado.email}</p>
      `;
      document.getElementById('clienteEncontrado').innerHTML = clienteHtml;

      // Ocultar el botón "Buscar Cliente" y mostrar el botón "Imprimir Factura"
      document.getElementById('buscarClienteBtn').style.display = 'none';
      document.getElementById('imprimirFacturaBtn').style.display = 'block';

      // Obtener las órdenes relacionadas con el cliente
      return fetch(`http://localhost:3000/ordenes`);
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Órdenes no encontradas');
      }
      return response.json();
    })
    .then(ordenes => {
      // Generar la tabla de órdenes
      const ordenesHtml = `
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            ${ordenes.map(orden => `
              <tr>
                <td>${orden.id}</td>
                <td>${orden.nombre}</td>
                <td>${orden.precio}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      document.getElementById('tablaOrdenes').innerHTML = ordenesHtml;

      // Calcular el precio total
      const totalPrecio = ordenes.reduce((total, orden) => total + parseFloat(orden.precio), 0);

      // Calcular el valor base y el IVA
      const iva = totalPrecio * 0.19;
      const valorBase = totalPrecio - iva;

      // Generar la tabla de suma de precios
      const sumaHtml = `
        <table class="table">
        <br><h3>
          <thead>
            <tr>
              <th>Valor Base</th>
              <th>IVA</th>
              <th>Total Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${valorBase.toFixed(2)}</td>
              <td>${iva.toFixed(2)}</td>
              <td>${totalPrecio.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      `;
      document.getElementById('tablasuma').innerHTML = sumaHtml;
    })
    .catch(error => {
      if (error.message === 'Cliente no encontrado') {
        const formularioNuevoClienteHtml = `
          <h3>Nuevo Cliente</h3>
          <form id="formNuevoCliente">
            <div class="form-group">
              <label for="nuevoNombre">Nombre:</label>
              <input type="text" id="nuevoNombre" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="nuevaDireccion">Dirección:</label>
              <input type="text" id="nuevaDireccion" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="nuevoTelefono">Teléfono:</label>
              <input type="text" id="nuevoTelefono" class="form-control" required>
            </div>
            <div class="form-group">
              <label for="nuevoEmail">Email:</label>
              <input type="email" id="nuevoEmail" class="form-control" required>
            </div>
            <button type="button" class="btn btn-primary mt-1" id="guardarClienteBtn">Guardar Cliente</button>
          </form>
        `;
        document.getElementById('clienteEncontrado').innerHTML = formularioNuevoClienteHtml;
        // Event Listener para el botón "Guardar Cliente"
        document.getElementById('guardarClienteBtn').addEventListener('click', guardarNuevoCliente);
      } else {
        document.getElementById('clienteEncontrado').innerHTML = `<p>${error.message}</p>`;
      }
      document.getElementById('tablaOrdenes').innerHTML = '';
      document.getElementById('tablasuma').innerHTML = '';
    });
}

// Función para guardar el nuevo cliente
function guardarNuevoCliente() {
  const nuevoCliente = {
    id: Date.now().toString(), // Usar timestamp como ID único
    nombre: document.getElementById('nuevoNombre').value,
    direccion: document.getElementById('nuevaDireccion').value,
    telefono: document.getElementById('nuevoTelefono').value,
    email: document.getElementById('nuevoEmail').value
  };

  fetch('http://localhost:3000/clientes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoCliente)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar el nuevo cliente');
      }
      return response.json();
    })
    .then(clienteGuardado => {
      document.getElementById('clienteEncontrado').innerHTML = `<p>Cliente guardado exitosamente: ${clienteGuardado.nombre}</p>`;
    })
    .catch(error => {
      document.getElementById('clienteEncontrado').innerHTML = `<p>${error.message}</p>`;
    });
}

// Función para insertar una nueva factura
function insertarFactura(datosFactura) {
  fetch('http://localhost:3000/facturas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datosFactura)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al insertar la factura');
      }
      return response.json();
    })
    .then(nuevaFactura => {
      console.log('Factura insertada correctamente:', nuevaFactura);
    })
    .catch(error => {
      console.error('Error al insertar la factura:', error);
      // Manejar el error mostrando un mensaje al usuario o registrándolo de otra forma
    });
}

// Función para imprimir la factura y luego eliminar las órdenes una por una
function imprimirFactura() {
  // Selecciona solo el contenido del cuerpo del modal
  const modalBodyContent = document.querySelector('.modal-body').innerHTML;
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write('<html><head><title>Factura</title>');
  printWindow.document.write('</head><body>');
  printWindow.document.write(modalBodyContent);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.print();

  // Aquí deberías definir los datos de la factura según tu lógica
  const datosFactura = {
    id: Date.now().toString(), // Genera un ID único para la factura
    ordenId: 1, // Ejemplo de ID de la orden asociada a la factura (debes ajustar esto según tu lógica)
    clienteId: 1, // Ejemplo de ID del cliente asociado a la factura (debes ajustar esto según tu lógica)
    empresaId: '123456789-0', // ID de la empresa (ejemplo)
    subtotal: 40000, // Ejemplo de subtotal (debes ajustar esto según tu lógica)
    iva: 7600, // Ejemplo de valor de IVA (debes ajustar esto según tu lógica)
    total: 47600, // Ejemplo de total (debes ajustar esto según tu lógica)
    fecha: '2024-06-30' // Ejemplo de fecha (debes ajustar esto según tu lógica)
  };

  // Insertar la factura antes de eliminar las órdenes
  insertarFactura(datosFactura);

  // Después de imprimir la factura, obtener y eliminar las órdenes una por una
  fetch('http://localhost:3000/ordenes')
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al obtener las órdenes');
      }
      return response.json();
    })
    .then(ordenes => {
      const deletePromises = ordenes.map(orden => {
        return fetch(`http://localhost:3000/ordenes/${orden.id}`, {
          method: 'DELETE'
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error al borrar la orden con ID ${orden.id}`);
            }
          });
      });

      // Esperar a que todas las eliminaciones se completen
      return Promise.all(deletePromises);
    })
    .then(() => {
      console.log('Todas las órdenes fueron borradas correctamente');
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


// Event Listener para el botón "Imprimir Factura"
document.getElementById('imprimirFacturaBtn').addEventListener('click', imprimirFactura);

// Event Listener para el botón "Buscar Cliente"
document.getElementById('buscarClienteBtn').addEventListener('click', buscarCliente);

document.getElementById('guardarClienteBtn').addEventListener('click', guardarNuevoCliente);

// Función para cargar y mostrar las facturas desde el archivo JSON
function cargarFacturas() {
  fetch('http://localhost:3000/facturas') // Cambiar la URL según tu configuración
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar las facturas');
      }
      return response.json();
    })
    .then(data => {
      // Obtener el contenedor donde se cargarán las tarjetas de facturas
      const facturasContainer = document.getElementById('facturasContainer');

      // Iterar sobre cada factura en los datos obtenidos
      data.forEach(factura => {
        // Crear la tarjeta HTML para cada factura
        const cardHtml = `
                  <div class="shadow p-3 mb-3 rounded p-2 bg-body-tertiary bg-opacity-75">
                      <div class="row p-1">
                          <div class="col border-bottom">Factura No ${factura.id}</div>
                          <div class="col border-bottom">Cliente ID ${factura.clienteId}</div>
                          <div class="col border-bottom">IVA ${factura.iva}%</div>
                          <div class="col border-bottom">Valor $${factura.total.toFixed(2)}</div>
                      </div>
                      <div class="row p-1">
                          <div class="col">Fecha ${factura.fecha}</div>
                          <div class="col"><button type="button" class="btn btn-danger">Anular factura</button></div>
                          <div class="col"><button type="button" class="btn btn-warning">Detalle de factura</button></div>
                          <div class="col"><button type="button" class="btn btn-success">Enviar al correo</button></div>
                      </div>
                  </div>
              `;

        // Agregar la tarjeta HTML al contenedor
        facturasContainer.innerHTML += cardHtml;
      });
    })
    .catch(error => {
      console.error('Error al cargar las facturas:', error);
      // Manejar el error mostrando un mensaje al usuario o registrándolo de otra forma
    });
}

// Llamar a la función para cargar las facturas al cargar la página
document.addEventListener('DOMContentLoaded', cargarFacturas);
