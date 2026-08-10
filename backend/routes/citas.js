const express = require('express');
const router = express.Router();
const db = require('../db');

// 1. OBTENER HORAS OCUPADAS (Para el cliente, según duración)
router.get('/ocupadas', async (req, res) => {
    const { barbero_id, fecha } = req.query;
    try {
        const query = `
            SELECT c.hora, s.duracion 
            FROM citas c 
            JOIN servicios s ON c.servicio_id = s.id 
            WHERE c.barbero_id = ? AND c.fecha = ?`;
        const [citas] = await db.query(query, [barbero_id, fecha]);
        res.json(citas);
    } catch (error) {
        res.status(500).json({ error: 'Error al consultar disponibilidad' });
    }
});

// 2. GUARDAR RESERVA
router.post('/reservar', async (req, res) => {
    const { usuario_id, servicio_id, barbero_id, fecha, hora } = req.body;
    try {
        const query = 'INSERT INTO citas (cliente_id, barbero_id, servicio_id, fecha, hora, estado) VALUES (?, ?, ?, ?, ?, "pendiente")';
        await db.query(query, [usuario_id, barbero_id, servicio_id, fecha, hora]);
        res.json({ mensaje: '✅ Cita guardada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar la cita' });
    }
});

// 3. CANCELAR CITA
router.delete('/:id', async (req, res) => {
    try {
        await db.query('DELETE FROM citas WHERE id = ?', [req.params.id]);
        res.json({ mensaje: 'Cita cancelada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al cancelar' });
    }
});

// 4. VER CITAS DEL CLIENTE (Panel Cliente)
router.get('/proxima/:clienteId', async (req, res) => {
    try {
        const query = `
            SELECT c.id, c.fecha, c.hora, s.nombre as servicio, u.nombre as barbero 
            FROM citas c 
            JOIN servicios s ON c.servicio_id = s.id 
            JOIN usuarios u ON c.barbero_id = u.id 
            WHERE c.cliente_id = ? AND c.fecha >= CURDATE()
            ORDER BY c.fecha ASC, c.hora ASC`;
        const [resultados] = await db.query(query, [req.params.clienteId]);
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ error: 'Error al cargar citas' });
    }
});

// 5. VER AGENDA DEL BARBERO (NUEVO - Panel Barbero)
// Esta es la ruta que te faltaba para que Sergio pueda ver sus citas
router.get('/barbero/:barberoId', async (req, res) => {
    try {
        const query = `
            SELECT c.fecha, c.hora, u.nombre as cliente, s.nombre as servicio, s.duracion
            FROM citas c
            JOIN usuarios u ON c.cliente_id = u.id
            JOIN servicios s ON c.servicio_id = s.id
            WHERE c.barbero_id = ? AND c.fecha >= CURDATE()
            ORDER BY c.fecha ASC, c.hora ASC`;
            
        const [resultados] = await db.query(query, [req.params.barberoId]);
        res.json(resultados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la agenda del barbero' });
    }
});

module.exports = router;