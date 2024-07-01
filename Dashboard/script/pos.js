//validar pagos 
document.getElementById('openModalBtn').addEventListener('click', function () {
    var amountInput = document.getElementById('amountInput').value;
    if (amountInput.trim() === "") {
        alert("Por favor, ingrese un monto.");
    } else {
        $('#pagosModal').modal('show');
    }
});


// Código para cargar productos
// pos.js
const url = 'http://localhost:3000/productos'; // URL de tu endpoint de productos en JSON Server

fetch(url)
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
                card.innerHTML = `
                    <img src="./img/undraw_Photo.png" class="card-img-top" alt="Imagen del producto">
                    <div class="card-body">
                        <p>${producto.nombre}
                            <i data-bs-toggle="modal" data-bs-target="#exampleModal" class='bx bxs-info-circle'></i>
                        </p>
                        <h5 class="card-title">Cop $ ${producto.precio}</h5>
                    </div>
                `;
                productosContainer.appendChild(card);
            });
        }

        // Función para filtrar productos por nombre
        function buscar() {
            const input = document.getElementById('buscarProductoInput');
            const filtro = input.value.toUpperCase();

            fetch(url)
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
    })
    .catch(error => {
        console.error('Error fetching productos:', error);
    });