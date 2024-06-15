document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const logo = document.getElementById('logo');
    const modal = document.getElementById('accountModal');
    const productModal = document.getElementById('productModal');
    const span = document.getElementsByClassName('close')[0];
    const spanProduct = document.getElementsByClassName('close-product')[0];
    const cancelButton = document.getElementById('cancelButton');
    const addProductIcon = document.getElementById('addProductIcon');

    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    logo.addEventListener('click', function() {
        modal.style.display = "block";
    });

    span.addEventListener('click', function() {
        modal.style.display = "none";
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    addProductIcon.addEventListener('click', function() {
        productModal.style.display = "block";
    });

    spanProduct.addEventListener('click', function() {
        productModal.style.display = "none";
    });

    cancelButton.addEventListener('click', function() {
        productModal.style.display = "none";
    });

    calculateTax();
});

let totalAmount = 30000; // Ejemplo de total, debería calcular esto dinámicamente.
let cashReceived = 0;

function addCash(amount) {
    cashReceived += amount;
    document.querySelector('.cash-input input').value = cashReceived;
    calculateChange();
}

document.querySelector('.cash-input input').addEventListener('input', function() {
    cashReceived = parseFloat(this.value) || 0;
    calculateChange();
});

function calculateChange() {
    let change = cashReceived - totalAmount;
    document.getElementById('change').textContent = `S/. ${change.toFixed(2)}`;
}

function calculateTax() {
    // Obtener el valor total como texto
    let totalText = document.getElementById('total_id').innerText;

    // Eliminar el prefijo "S/." y convertir a número
    let total = parseFloat(totalText.replace('S/.', '').replace(/\./g, '').replace(',', '.'));

    // Calcular el IVA (19%)
    let taxRate = 0.19;
    let tax = total * taxRate;

    // Calcular el subtotal
    let subtotal = total - tax;

    // Actualizar los valores en el HTML
    document.getElementById('subtotal_id').innerText = `S/. ${subtotal.toFixed(2)}`;
    document.getElementById('tax_id').innerText = `S/. ${tax.toFixed(2)}`;
}

// Llamar a la función calculateTax al cargar la página
document.addEventListener('DOMContentLoaded', calculateTax);
