document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll('.menu-item');
    const logo = document.getElementById('logo');
    const modal = document.getElementById('accountModal');
    const span = document.getElementsByClassName('close')[0];

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
});

let totalAmount = 20000; // Ejemplo de total, debería calcular esto dinámicamente.
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

