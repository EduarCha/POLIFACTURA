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
const url = 'http://localhost:3000/productos'; // URL de tu endpoint de productos en JSON Server

fetch(url)
    .then(response => response.json())
    .then(data => {
        const productosContainer = document.getElementById('productos-container');

        // Itera sobre cada producto y crea el HTML dinámico
        data.forEach(producto => {
            const card = document.createElement('div');
            card.classList.add('card');
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
    })
    .catch(error => {
        console.error('Error fetching productos:', error);
    });
