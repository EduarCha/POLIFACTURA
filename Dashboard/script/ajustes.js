

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
        id: Date.now().toString, // Utilizar timestamp como ID único
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

