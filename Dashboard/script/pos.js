// Validar pagos
document.getElementById('openModalBtn').addEventListener('click', function () {
    $('#pagosModal').modal('show');
});

// Función para cargar productos y mostrarlos en el contenedor
const urlProductos = 'http://localhost:3000/productos';

fetch(urlProductos)
    .then(response => response.json())
    .then(data => {
        const productosContainer = document.getElementById('productos-container');

        // Función para mostrar productos en el contenedor
        function mostrarProductos(productos) {
            productosContainer.innerHTML = ''; // Limpiar contenido anterior antes de mostrar nuevos productos

            productos.forEach(producto => {
                const card = document.createElement('div');
                card.classList.add('card', 'mb-3');
                card.style.margin = '3px';
                card.style.maxWidth = '18rem';  // Ajusta el ancho máximo según tus necesidades
                card.innerHTML = `
                    <img src="./img/undraw_Photo.png" class="card-img-top" alt="Imagen del producto">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group" style="width: 100%;">
                                <button type="button" class="btn btn-sm btn-outline-secondary w-100" 
                                    data-nombre="${producto.nombre}" data-precio="${producto.precio}">
                                    Cop $ ${producto.precio}
                                </button>
                            </div>
                        </div>
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.descripcion}</p>
                    </div>
                `;
                productosContainer.appendChild(card);

                // Agregar evento click al botón generado
                const btn = card.querySelector('button');
                btn.addEventListener('click', () => {
                    const nombre = btn.getAttribute('data-nombre');
                    const precio = parseFloat(btn.getAttribute('data-precio'));
                    alertProductoAgregado(nombre, precio);
                    
                });
            });
        }

        // Función para filtrar productos por nombre
        function buscar() {
            const input = document.getElementById('buscarProductoInput');
            const filtro = input.value.toUpperCase();

            fetch(urlProductos)
                .then(response => response.json())
                .then(data => {
                    const productosFiltrados = data.filter(producto => producto.nombre.toUpperCase().includes(filtro));
                    mostrarProductos(productosFiltrados);
                })
                .catch(error => console.error('Error fetching productos:', error));
        }

        // Mostrar todos los productos al cargar la página
        mostrarProductos(data);

        // Capturar evento de cambio en el input para filtrar dinámicamente
        const input = document.getElementById('buscarProductoInput');
        input.addEventListener('input', buscar);

        function alertProductoAgregado(nombre, precio) {
            // Reproducir el sonido
            const beepSound = document.getElementById('beepSound');
            beepSound.play();

            // Mostrar la alerta con el nombre y el precio del producto
            //alert(`Producto agregado: ${nombre}\nPrecio del producto: $ ${precio}`)
            // Capturar el input opcional
            let inputOpcional = prompt('Ingrese S/N (opcional): ');

            if (inputOpcional === null) {
                alert("CANCELAR?");
            } else if (inputOpcional.trim() === '') {
                agregarProductoAOrden({ nombre, precio });
            } else {
                alert("Ingresó número serial: " + inputOpcional);
            }

        
        }

        function agregarProductoAOrden(producto) {
            // Insertar datos en la orden
            fetch('http://localhost:3000/ordenes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: producto.nombre,
                    precio: producto.precio.toFixed(2), // Asumiendo que producto.precio es un número
                }),
            })
                .then(response => response.json())
                .then(data => console.log('Producto agregado a la orden:', data))
                .catch(error => console.error('Error al agregar producto a la orden:', error));
        }
    })
    .catch(error => {
        console.error('Error fetching productos:', error);
    });



//eliminar datos de ordenes 
document.addEventListener('DOMContentLoaded', function () {
    const productContainer = document.getElementById('productContainer-ord');
    const clearOrderButton = document.getElementById('clear-order');

    // Función para eliminar todas las órdenes y limpiar la interfaz
    function clearOrders() {
        // Primero obtener todos los IDs de las órdenes
        fetch('http://localhost:3000/ordenes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener la lista de órdenes');
                }
                return response.json();
            })
            .then(ordenes => {
                // Obtener los IDs de las órdenes
                const ordenIds = ordenes.map(orden => orden.id);

                // Eliminar cada orden por su ID
                const deletePromises = ordenIds.map(id => {
                    return fetch(`http://localhost:3000/ordenes/${id}`, {
                        method: 'DELETE'
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`No se pudo borrar la orden con ID ${id}`);
                            }
                        });
                });

                // Esperar a que todas las eliminaciones se completen
                return Promise.all(deletePromises);
            })
            .then(() => {
                // Limpiar el contenedor de productos en la interfaz
                productContainer.innerHTML = '';
                console.log('Todas las órdenes han sido eliminadas.');
            })
            .catch(error => {
                console.error('Error al eliminar las órdenes:', error);
                // Manejar el error mostrando un mensaje al usuario o registrándolo de otra forma
            });
    }

    // Añadir evento al botón de borrar órdenes
    clearOrderButton.addEventListener('click', clearOrders);
});
