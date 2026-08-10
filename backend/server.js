const express = require('express');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({ quiet: true });

const app = express();
app.use(cors());
app.use(express.json());

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');
const serviciosRoutes = require('./routes/servicios');
const citasRoutes = require('./routes/citas'); 

// Activar rutas
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/citas', citasRoutes); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor en puerto ${PORT}`);
    console.log(`✅ Conexión exitosa a VM Barbershop`);
});