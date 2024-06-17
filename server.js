const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const db = new sqlite3.Database('./mi_base_de_datos.db');

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta para servir archivos estáticos (por ejemplo, tu frontend)
app.use(express.static(path.join(__dirname, 'cajero_dashboard')));

// Ruta para insertar datos en la tabla empresa
app.post('/insertar', (req, res) => {
    const { nombre, nit, direccion, telefono, correo } = req.body;

    if (!nombre || !nit || !direccion || !telefono || !correo) {
        return res.json({ success: false, message: 'Todos los campos son obligatorios.' });
    }

    db.run(`INSERT INTO empresa (nombre, nit, direccion, telefono, correo) VALUES (?, ?, ?, ?, ?)`,
        [nombre, nit, direccion, telefono, correo], function(err) {
            if (err) {
                return res.json({ success: false, message: err.message });
            }
            res.json({ success: true, message: 'Datos insertados correctamente', id: this.lastID });
        });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

// Crear tablas en SQLite si no existen
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS empresa (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nit TEXT,
        nombre TEXT,
        direccion TEXT,
        telefono TEXT,
        correo TEXT
    )`);
});
