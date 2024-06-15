document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll('.menu-item');
    const logo = document.getElementById('logo');
    const accountModal = document.getElementById('accountModal');
    const userModal = document.getElementById('userModal');
    const productModal = document.getElementById('productModal');
    const span = document.getElementsByClassName('close')[0];
    const spanUser = document.getElementsByClassName('close')[1]; // Índice ajustado para el segundo elemento con clase 'close'
    const spanProduct = document.getElementsByClassName('close-product')[0];
    const cancelButton = document.getElementById('cancelButton');
    const addProductIcon = document.getElementById('addProductIcon');
    const userAccount = document.getElementById('userAccount');

    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    //modal account
    logo.addEventListener('click', function () {
        accountModal.style.display = "block";
    });

    span.addEventListener('click', function () {
        accountModal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target == accountModal) {
            accountModal.style.display = "none";
        }
    });

    //modal add producto
    addProductIcon.addEventListener('click', function () {
        productModal.style.display = "block";
    });

    spanProduct.addEventListener('click', function () {
        productModal.style.display = "none";
    });

    cancelButton.addEventListener('click', function () {
        productModal.style.display = "none";
    });

    // Modal user
    userAccount.addEventListener('click', function () {
        userModal.style.display = "block";
    });

    spanUser.addEventListener('click', function () {
        userModal.style.display = "none";
    });

    window.addEventListener('click', function (event) {
        if (event.target == userModal) {
            userModal.style.display = "none";
        }
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

document.querySelector('.cash-input input').addEventListener('input', function () {
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


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./mi_base_de_datos.db');

// Crear tablas
db.serialize(() => {
    // Empresa
    db.run(`CREATE TABLE IF NOT EXISTS empresa (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        direccion TEXT,
        telefono TEXT,
        correo TEXT
    )`);

    // Usuarios
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        apellido TEXT,
        correo TEXT,
        telefono TEXT,
        rol_id INTEGER,
        FOREIGN KEY (rol_id) REFERENCES roles(id)
    )`);

    // Roles
    db.run(`CREATE TABLE IF NOT EXISTS roles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT
    )`);

    // Productos
    db.run(`CREATE TABLE IF NOT EXISTS productos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        precio REAL,
        descripcion TEXT
    )`);

    // Historial de Facturas
    db.run(`CREATE TABLE IF NOT EXISTS historial_facturas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha TEXT,
        usuario_id INTEGER,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )`);

    // Nota de Crédito
    db.run(`CREATE TABLE IF NOT EXISTS nota_credito (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha TEXT,
        usuario_id INTEGER,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )`);

    // Cierre de Caja Diario
    db.run(`CREATE TABLE IF NOT EXISTS cierre_caja_diario (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha TEXT,
        total_ventas REAL
    )`);

    // Requisición
    db.run(`CREATE TABLE IF NOT EXISTS requisicion (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha TEXT,
        usuario_id INTEGER,
        FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    )`);
});

// Ejemplo de inserción de datos (productos)
db.serialize(() => {
    const productos = [
        { nombre: 'Producto 1', precio: 100.00, descripcion: 'Descripción del Producto 1' },
        { nombre: 'Producto 2', precio: 150.00, descripcion: 'Descripción del Producto 2' }
    ];

    productos.forEach((producto) => {
        db.run(`INSERT INTO productos (nombre, precio, descripcion)
                VALUES (?, ?, ?)`, [producto.nombre, producto.precio, producto.descripcion], (err) => {
            if (err) {
                console.error('Error al insertar producto:', err.message);
            } else {
                console.log(`Producto "${producto.nombre}" insertado correctamente`);
            }
        });
    });
});

// Cerrar la conexión con la base de datos al finalizar
db.close((err) => {
    if (err) {
        return console.error('Error al cerrar la base de datos', err.message);
    }
    console.log('Conexión a la base de datos cerrada');
});

