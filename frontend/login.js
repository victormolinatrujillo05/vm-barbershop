const form = document.getElementById('formLogin');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // 1. Enviamos las credenciales al Backend
        const respuesta = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            // 2. Si el login es correcto, guardamos los datos del usuario
            // Guardamos ID, Nombre y Rol para usarlos en los Dashboards
            localStorage.setItem('usuario', JSON.stringify(datos.usuario));
            
            alert('✅ Bienvenido, ' + datos.usuario.nombre);

            // 3. REDIRECCIÓN SEGÚN EL ROL
            // Si en la base de datos es 'barbero', va a su agenda. Si no, al panel de cliente.
            if (datos.usuario.rol === 'barbero') {
                window.location.href = 'dashboard-barbero.html';
            } else {
                window.location.href = 'dashboard-cliente.html';
            }
            
        } else {
            // Mostramos el mensaje de error que viene del servidor (ej: "Contraseña incorrecta")
            alert('❌ Error: ' + (datos.error || 'Credenciales no válidas'));
        }
    } catch (error) {
        console.error('Error en la conexión:', error);
        alert('❌ No se pudo conectar con el servidor. ¿Está el backend encendido?');
    }
});