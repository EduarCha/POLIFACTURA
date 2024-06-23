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
