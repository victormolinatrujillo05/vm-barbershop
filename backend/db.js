const mysql = require('mysql2');
require('dotenv').config();

// Creamos la conexión (pool de conexiones es más eficiente para un TFG)
const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '', // Pon tu pass de MySQL si tienes una
    database: process.env.DB_NAME || 'vm_barbershop'
});

// Comprobamos la conexión
db.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error conectando a la base de datos:', err.message);
        return;
    }
    console.log('✅ Conexión exitosa a la base de datos VM Barbershop');
    connection.release();
});

module.exports = db.promise();