# 💈 VM Barbershop

**Aplicación web de gestión y reserva de citas para una barbería**, desarrollada como Proyecto Intermodular del ciclo formativo de Desarrollo de Aplicaciones Web (DAW).

El proyecto permite a los clientes registrarse, iniciar sesión, consultar servicios y gestionar sus citas, además de ofrecer vistas específicas para la gestión de la actividad de la barbería.

## 📌 Características principales

- **Registro de usuarios:** creación de cuentas con nombre, correo electrónico, contraseña y teléfono.
- **Inicio de sesión:** autenticación de usuarios mediante comparación de contraseñas cifradas.
- **Catálogo de servicios:** consulta de los servicios disponibles, sus precios y su duración.
- **Reserva de citas:** selección de servicio, barbero, fecha y hora.
- **Consulta de disponibilidad:** obtención de las citas existentes para una fecha y un barbero.
- **Panel del cliente:** consulta de las próximas citas.
- **Panel del barbero:** visualización de su agenda.
- **Gestión de citas:** posibilidad de cancelar citas.

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura de las páginas |
| CSS3 | Diseño y estilos de la interfaz |
| JavaScript | Interactividad y comunicación con la API |
| Node.js | Entorno de ejecución del backend |
| Express | Creación de la API REST |
| MySQL / MariaDB | Almacenamiento de datos |
| `mysql2` | Conexión entre Node.js y la base de datos |
| `bcryptjs` | Hash de contraseñas |
| `dotenv` | Gestión de variables de entorno |
| `cors` | Configuración de acceso entre frontend y backend |
| Git y GitHub | Control de versiones y publicación del código |

## 📂 Estructura del proyecto

```text
VM-Barbershop/
├── backend/
│   ├── routes/
│   │   ├── citas.js
│   │   ├── servicios.js
│   │   └── usuarios.js
│   ├── db.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── index.html
│   ├── registro.html
│   ├── registro.js
│   ├── login.js
│   ├── dashboard-cliente.html
│   ├── dashboard-barbero.html
│   └── style.css
├── database/
│   └── vm_barbershop.sql
├── .gitignore
└── README.md
```

## ⚙️ Requisitos previos

Antes de ejecutar el proyecto, instala o prepara:

- [Node.js y npm](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/), para iniciar MySQL/MariaDB y acceder a phpMyAdmin.
- [Visual Studio Code](https://code.visualstudio.com/), recomendado para editar el código.
- Un navegador web actualizado.

## 🚀 Instalación y puesta en marcha

### 1. Clonar el repositorio

```bash
git clone https://github.com/victormolinatrujillo05/vm-barbershop.git
cd vm-barbershop
```

### 2. Preparar la base de datos

1. Abre XAMPP e inicia los servicios Apache y MySQL.
2. Accede a [phpMyAdmin](http://localhost/phpmyadmin).
3. Crea una base de datos llamada `vm_barbershop`, si no existe.
4. Selecciona la base de datos y entra en **Importar**.
5. Selecciona el archivo `database/vm_barbershop.sql`.
6. Ejecuta la importación.

**Importante:** importa únicamente una versión de `vm_barbershop.sql` que contenga datos de demostración ficticios y no información personal real.

### 3. Configurar la conexión con MySQL

El backend permite configurar la conexión mediante variables de entorno.

Crea un archivo `.env` dentro de la carpeta `backend`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=vm_barbershop
```

Adapta los valores a tu instalación local de MySQL. Si tu usuario `root` tiene contraseña, introdúcela en `DB_PASSWORD`.

No publiques el archivo `.env` ni incluyas credenciales reales en el repositorio.

### 4. Instalar las dependencias

Desde el terminal, ejecuta:

```bash
cd backend
npm install
```

Este comando instala las dependencias declaradas en `package.json`.

### 5. Arrancar el backend

Desde la carpeta `backend`, ejecuta:

```bash
node server.js
```

El servidor se inicia en el puerto `3000` y expone las rutas de la API bajo el prefijo `/api`.

Mantén el terminal abierto mientras utilizas la aplicación.

### 6. Abrir el frontend

Abre la carpeta `frontend` en Visual Studio Code y utiliza una extensión como **Live Server** para servir los archivos HTML desde el navegador.

También puedes utilizar otro servidor estático local compatible.

El frontend debe poder comunicarse con el backend que se ejecuta en `http://localhost:3000`. Si las peticiones no funcionan, comprueba las direcciones utilizadas en los archivos JavaScript del frontend.

## 🔌 API REST

Las rutas principales se organizan en tres grupos:

### Usuarios — `/api/usuarios`

| Método | Ruta | Función |
|---|---|---|
| POST | `/api/usuarios/registro` | Registrar un usuario |
| POST | `/api/usuarios/login` | Iniciar sesión |

### Servicios — `/api/servicios`

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/servicios` | Consultar los servicios disponibles |

### Citas — `/api/citas`

| Método | Ruta | Función |
|---|---|---|
| GET | `/api/citas/ocupadas` | Consultar las citas existentes para un barbero y una fecha |
| POST | `/api/citas/reservar` | Registrar una reserva |
| DELETE | `/api/citas/:id` | Eliminar una cita |
| GET | `/api/citas/proxima/:clienteId` | Consultar las próximas citas de un cliente |
| GET | `/api/citas/barbero/:barberoId` | Consultar la agenda de un barbero |

Las rutas que requieren parámetros o datos en el cuerpo de la petición deben utilizar los valores esperados por el backend.

## 🗄️ Base de datos

La aplicación utiliza una base de datos relacional denominada `vm_barbershop`.

Las tablas principales son:

- **`usuarios`:** información de usuarios y su rol (cliente, barbero o administrador).
- **`servicios`:** catálogo de servicios, precios, duración y orden de presentación.
- **`citas`:** reservas vinculadas a clientes, barberos y servicios.

El esquema SQL se encuentra en `database/vm_barbershop.sql`.

## 🔐 Seguridad y buenas prácticas

- Las contraseñas se almacenan mediante hashes generados con `bcryptjs`.
- Las consultas a la base de datos utilizan parámetros en las operaciones mostradas.
- Las credenciales de conexión deben configurarse mediante variables de entorno.
- Los archivos `.env` y las dependencias instaladas deben mantenerse fuera del repositorio.
- Para un despliegue real, es necesario reforzar la autenticación, la autorización por roles, la validación de entradas y la protección de las operaciones sensibles.

Este proyecto tiene finalidad académica y demostrativa. No debe considerarse listo para producción sin una auditoría de seguridad y pruebas adicionales.

## 👨‍💻 Autor

**Víctor Molina Trujillo**

Proyecto Intermodular — Desarrollo de Aplicaciones Web (DAW).

- GitHub: [victormolinatrujillo05](https://github.com/victormolinatrujillo05)
- Repositorio: [VM Barbershop](https://github.com/victormolinatrujillo05/vm-barbershop)

## 📄 Licencia

Este repositorio no declara actualmente una licencia de código abierto específica. Consulta al autor antes de reutilizar o redistribuir el proyecto.
