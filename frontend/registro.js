const form = document.getElementById('formRegistro');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue y borre los datos

    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const telefono = document.getElementById('telefono').value;
    const rol = document.getElementById('rol').value; // El valor 'cliente' que pusimos oculto

    const usuario = { nombre, email, password, telefono, rol };

    try {
        const respuesta = await fetch('http://localhost:3000/api/usuarios/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });

        if (respuesta.ok) {
            alert('✅ ¡Registro completado con éxito!');
            form.reset();
            // Te manda al login automáticamente tras registrarte
            window.location.href = 'index.html'; 
        } else {
            alert('❌ Error al registrar usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ No se pudo conectar con el servidor');
    }
});