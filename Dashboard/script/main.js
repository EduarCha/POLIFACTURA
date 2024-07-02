import './pos.js'
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




//Insertar productos
document.getElementById('createProductButton').addEventListener('click', function () {
  // Obtener los valores de los campos del formulario
  const productName = document.getElementById('productName').value;
  const productDescription = document.getElementById('productDescription').value;
  const productPrice = document.getElementById('productPrice').value;
  const productIVA = document.getElementById('productIVA').value;
  const productCategory = document.getElementById('productCategory').value;

  // Validar los campos del formulario
  if (!productName || !productDescription || !productPrice || !productIVA || !productCategory) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  // Crear el nuevo producto
  const newProduct = {
    id: Date.now(), // Utilizar timestamp como ID único
    nombre: productName,
    descripcion: productDescription,
    precio: parseFloat(productPrice),
    iva: parseInt(productIVA),
    categoriaId: parseInt(productCategory)
  };

  // Insertar el nuevo producto en el JSON de productos
  fetch('http://localhost:3000/productos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newProduct)
  })
    .then(response => {
      if (response.ok) {
        alert('Producto creado exitosamente.');
        // Cerrar el modal y limpiar el formulario
        $('#addProductoModal').modal('hide');
        document.getElementById('addProductoForm').reset();
      } else {
        throw new Error('Error al insertar el producto.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al crear el producto.');
    });
});



// Obtener referencia a elementos del DOM
const inputEditProductId = document.getElementById('editProductId');
const buttonEditProduct = document.getElementById('buttonEditProduct');
const editProductoForm = document.getElementById('editProductoForm');
const buttonSaveChanges = document.getElementById('buttonSaveChanges');
const editModal = new bootstrap.Modal(document.getElementById('editProductoModal'));

// Función para cargar categorías
function cargarCategorias() {
  fetch('http://localhost:3000/categorias')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(categorias => {
      const categoriaSelect = document.getElementById('editCategoriaProducto');
      categoriaSelect.innerHTML = ''; // Limpiar opciones existentes

      categorias.forEach(categoria => {
        const option = document.createElement('option');
        option.value = categoria.id;
        option.textContent = categoria.nombre;
        categoriaSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error al cargar las categorías:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    });
}

// Función para cargar los datos del producto en el formulario de edición
function cargarProductoParaEdicion(productoId) {
  fetch(`http://localhost:3000/productos/${productoId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(producto => {
      // Llenar los campos del formulario con los datos del producto
      editProductoForm.elements['id'].value = producto.id;
      editProductoForm.elements['nombre'].value = producto.nombre;
      editProductoForm.elements['descripcion'].value = producto.descripcion;
      editProductoForm.elements['precio'].value = producto.precio;
      editProductoForm.elements['iva'].value = producto.iva; // Asignar valor de IVA
      editProductoForm.elements['categoriaId'].value = producto.categoriaId; // Asignar valor de categoriaId

      // Cargar categorías y luego mostrar el modal de edición de producto
      cargarCategorias();
      editModal.show();
    })
    .catch(error => {
      console.error('Error al cargar los datos del producto:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    });
}

// Evento al hacer clic en el botón de edición
buttonEditProduct.addEventListener('click', function () {
  const productoId = inputEditProductId.value.trim();

  if (productoId) {
    cargarProductoParaEdicion(productoId);
  } else {
    console.log('Ingrese un ID de producto válido.');
    // Aquí puedes mostrar un mensaje al usuario o realizar alguna acción adicional si el campo está vacío
  }
});

// Evento al hacer clic en Guardar Cambios en el formulario de edición
buttonSaveChanges.addEventListener('click', function () {
  const formData = new FormData(editProductoForm);

  fetch(`http://localhost:3000/productos/${formData.get('id')}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Object.fromEntries(formData))
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(updatedProduct => {
      // Aquí puedes actualizar visualmente la lista de productos si es necesario
      console.log('Producto actualizado:', updatedProduct);
      // Puedes cerrar el modal de edición aquí si lo deseas
      editModal.hide();
    })
    .catch(error => {
      console.error('Error al actualizar el producto:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario
    });
});





// Obtener referencia al cuerpo de la tabla 
const productosTableBody = document.getElementById('ProductosTableBody');

// Variable para almacenar las categorías 
let categorias = [];

// Función para cargar los datos de productos desde el servidor JSON 
function cargarProductosDesdeJSON() {
  // Primero, cargamos las categorías 
  fetch('http://localhost:3000/categorias')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      categorias = data;
      // Luego, cargamos los productos 
      return fetch('http://localhost:3000/productos');
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(productos => {
      // Limpiar el cuerpo de la tabla antes de insertar nuevos datos 
      productosTableBody.innerHTML = '';

      // Iterar sobre cada producto y agregar una fila a la tabla 
      productos.forEach(producto => {
        const fila = ` 
                    <tr> 
                        <td>${producto.id}</td> 
                        <td>${producto.nombre}</td> 
                        <td>${producto.descripcion}</td> 
                        <td>${producto.precio}</td> 
                        <td>${producto.iva}</td> 
                        <td>${obtenerNombreCategoria(producto.categoriaId)}</td> 
                    </tr> 
                `;
        productosTableBody.innerHTML += fila;
      });
    })
    .catch(error => {
      console.error('Error al cargar los productos:', error);
      // Aquí puedes manejar el error, como mostrar un mensaje al usuario 
    });
}

// Función para obtener el nombre de la categoría basado en su ID 
function obtenerNombreCategoria(categoriaId) {
  const categoria = categorias.find(cat => cat.id == categoriaId); // Cambiado a comparación suelta (==) para manejar tipos de datos mixtos 
  return categoria ? categoria.nombre : 'Sin categoría';
}

// Llamar a la función para cargar productos al cargar la página 
document.addEventListener('DOMContentLoaded', () => {
  cargarProductosDesdeJSON();
});


//logica para cargar productos

// Datos del producto a cargar
var producto = {
  "nombre": "Tomate",
  "cantidad": 1,
  "total": 3570
};

// Función para cargar los datos del producto en el DOM
function cargarProducto(producto) {
  // Selección de elementos del DOM
  var nomProducto = document.getElementById('nomProducto');
  var id_cantidad = document.getElementById('id_cantidad');
  var valor_total = document.getElementById('valor_total');

  // Asignar valores del producto a los elementos del DOM
  nomProducto.textContent = producto.nombre;
  id_cantidad.value = producto.cantidad;
  valor_total.textContent = "$" + producto.total.toFixed(2); // Formatear el total como dinero
}



// Llamar a la función para cargar el producto al cargar la página
window.addEventListener('DOMContentLoaded', function () {
  cargarProducto(producto);
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
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
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

