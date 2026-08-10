const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');

// --- RUTA DE REGISTRO ---
router.post('/registro', async (req, res) => {
    const { nombre, email, password, telefono, rol } = req.body;
    try {
        // Encriptamos la contraseña antes de guardar
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const sql = 'INSERT INTO usuarios (nombre, email, password, telefono, rol) VALUES (?, ?, ?, ?, ?)';
        await db.query(sql, [nombre, email, hashedPass, telefono, rol || 'cliente']);

        res.status(201).send('Usuario registrado con éxito');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al registrar el usuario');
    }
});

// --- RUTA DE LOGIN ---
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // 1. Buscamos al usuario por email
        const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        
        if (usuarios.length === 0) {
            return res.status(401).json({ error: 'El email no existe' });
        }

        const usuario = usuarios[0];

        // 2. Comparamos la contraseña escrita con la encriptada de la DB
        const passwordCorrecta = await bcrypt.compare(password, usuario.password);

        if (!passwordCorrecta) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        // 3. Éxito: enviamos datos básicos (id, nombre y rol) para usarlos en el Front
        res.status(200).json({
            mensaje: 'Bienvenido',
            usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol }
        });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;