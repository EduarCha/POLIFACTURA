// pos.js
export function cargarProductos() {
    return fetch('./docs/productos.json')  // Ajuste de ruta
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error('Error loading products:', error);
            return [];  // Devolver un array vacío u otro valor por defecto en caso de error
        });
}

document.addEventListener('DOMContentLoaded', function () {
    const pinInputs = document.querySelectorAll('.pin-input');

    pinInputs.forEach((input, index) => {
        input.addEventListener('input', function () {
            if (input.value.length === 1 && index < pinInputs.length - 1) {
                pinInputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Backspace' && input.value.length === 0 && index > 0) {
                pinInputs[index - 1].focus();
            }
        });
    });
});

//en acrear usuarios deja ecribir solo letras mayuscukay numeros 
function filterInput(event) {
    const input = event.target;
    const value = input.value;
    const filteredValue = value.replace(/[^0-9A-Z]/g, '');
    if (value !== filteredValue) {
        alert('Solo se permiten letras mayúsculas y números.');
    }
    input.value = filteredValue;
}

document.addEventListener('DOMContentLoaded', function() {
    const inputDocumento = document.getElementById('inputDocumento');
    inputDocumento.addEventListener('input', filterInput);
});

