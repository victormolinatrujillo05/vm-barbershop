const express = require('express');
const router = express.Router();
const db = require('../db');

// Ruta para obtener todos los servicios ordenados por prioridad
router.get('/', async (req, res) => {
    try {
        // Añadimos 'ORDER BY orden ASC' para que aparezcan en tu orden: 1, 2, 3...
        const [servicios] = await db.query('SELECT * FROM servicios ORDER BY orden ASC');
        res.json(servicios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener servicios');
    }
});

module.exports = router;