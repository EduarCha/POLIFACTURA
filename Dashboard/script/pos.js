//validar pagos 
document.getElementById('openModalBtn').addEventListener('click', function () {
    var amountInput = document.getElementById('amountInput').value;
    if (amountInput.trim() === "") {
        alert("Por favor, ingrese un monto.");
    } else {
        $('#pagosModal').modal('show');
    }
});



// Función para cargar productos y mostrarlos en el contenedor
const url = 'http://localhost:3000/productos';

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
                card.style.maxWidth = '18rem';  // Ajusta el ancho máximo según tus necesidades
                card.innerHTML = `
                    <img src="./img/undraw_Photo.png" class="card-img-top" alt="Imagen del producto">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group" style="width: 100%;">
                                <button type="button" class="btn btn-sm btn-outline-secondary w-100" data-precio="${producto.precio}">Cop $ ${producto.precio}</button>
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
                    alertProductoAgregado(producto.precio);
                });
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


        function alertProductoAgregado(precio) {
            // Reproducir el sonido
            const beepSound = document.getElementById('beepSound');
            beepSound.play();

            // Mostrar la alerta
            alert(`Precio del producto: $ ${precio}`);

            // Cerrar la alerta después de 3 segundos
            setTimeout(function () {
                const alertBox = document.querySelector('.alert'); // Asegúrate de que '.alert' sea el selector correcto
                if (alertBox) {
                    alertBox.style.display = 'none';
                }
            }, 3000); // 3000 milisegundos = 3 segundos
        }


    })
    .catch(error => {
        console.error('Error fetching productos:', error);
    });

