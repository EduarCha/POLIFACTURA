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



// Leer orden de productos de tabla 
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


//Insertar productos
document.getElementById('createProductButton').addEventListener('click', function() {
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