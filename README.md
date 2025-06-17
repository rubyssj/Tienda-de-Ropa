# Backend para Tienda de Ropa Online by RubyShop

Este es el backend para la tienda de ropa online desarrollada con Node.js, Express y MongoDB(por el momento esa base de datos por que estara en venta esta aplicacion).

## Estructura del Proyecto

```
backend/
  ├── src/
  │   ├── controllers/    # Lógica de negocio
  │   ├── models/         # Modelos de datos
  │   ├── routes/         # Rutas de la API
  │   ├── middleware/     # Middleware (autenticación, etc.)
  │   ├── app.js          # Aplicación Express
  │   └── seeder.js       # Importador de datos iniciales
  ├── package.json        # Dependencias
  └── .env                # Variables de entorno (crear manualmente)
```

## Instalación

1. Instalar dependencias:
   ```
   npm install
   ```

2. Crear archivo `.env` en la raíz del proyecto:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/tienda-ropa
   JWT_SECRET=tu_clave_secreta
   NODE_ENV=development
   ```

3. Importar datos iniciales (opcional):
   ```
   npm run data:import
   ```

## Ejecución

Para desarrollo:
```
npm run dev
```

Para producción:
```
npm start
```

## API Endpoints

### Productos

- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener un producto por ID
- `POST /api/products` - Crear un producto (Admin)
- `PUT /api/products/:id` - Actualizar un producto (Admin)
- `DELETE /api/products/:id` - Eliminar un producto (Admin)

### Usuarios

- `POST /api/users/register` - Registrar un nuevo usuario
- `POST /api/users/login` - Iniciar sesión
- `GET /api/users/profile` - Obtener perfil de usuario (Autenticado)
- `PUT /api/users/profile` - Actualizar perfil de usuario (Autenticado)

### Órdenes

- `POST /api/orders` - Crear una nueva orden (Autenticado)
- `GET /api/orders/myorders` - Obtener órdenes del usuario (Autenticado)
- `GET /api/orders/:id` - Obtener una orden por ID (Autenticado)
- `PUT /api/orders/:id/pay` - Actualizar orden a pagada (Autenticado)
- `GET /api/orders` - Obtener todas las órdenes (Admin)
- `PUT /api/orders/:id/status` - Actualizar estado de la orden (Admin)

## Integración con el Frontend

Para integrar este backend con el frontend React existente:

1. Asegúrate de que el backend esté corriendo en el puerto 5000
2. En el frontend, actualiza las llamadas API para usar la URL base `http://localhost:5000/api`
3. Implementa la autenticación usando JWT en el frontend 



Produce by Ruben
