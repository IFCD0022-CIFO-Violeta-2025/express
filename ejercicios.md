# Ejercicios de Repaso - Express y CRUD

## Ejercicio 1: Servidor Basico
Crea un servidor Express que escuche en el puerto 4000 y que tenga una ruta GET en `/bienvenida` que devuelva el mensaje "Bienvenido a mi API".

---

## Ejercicio 2: Respuesta JSON
Modifica el ejercicio anterior para que la ruta `/bienvenida` devuelva un objeto JSON con las siguientes propiedades:
- `mensaje`: "Bienvenido a mi API"
- `fecha`: la fecha actual
- `puerto`: 4000

---

## Ejercicio 3: Parametros de URL
Crea una ruta GET `/saludar/:nombre` que reciba un nombre como parametro de URL y devuelva un JSON con el mensaje: "Hola, [nombre]!".

Ejemplo: GET `/saludar/Juan` -> `{"mensaje": "Hola, Juan!"}`

---

## Ejercicio 4: POST con Body
Crea una ruta POST `/registro` que reciba en el body un objeto con `nombre` y `email`, y devuelva un JSON confirmando el registro:
```json
{
  "mensaje": "Usuario registrado correctamente",
  "nombre": "...",
  "email": "..."
}
```

No olvides configurar el middleware `express.json()`.

---

## Ejercicio 5: CRUD Completo - Productos
Crea un CRUD completo para productos con las siguientes rutas:
- **GET** `/productos` - Devuelve un array de productos (puedes usar datos de ejemplo en memoria)
- **POST** `/productos` - Crea un nuevo producto (recibe `nombre` y `precio` en el body)
- **PUT** `/productos/:id` - Actualiza un producto existente
- **DELETE** `/productos/:id` - Elimina un producto por su ID

---

## Ejercicio 6: Multiples Parametros
Crea una ruta GET `/calculadora/:operacion/:num1/:num2` que realice operaciones matematicas basicas (suma, resta, multiplicacion, division) y devuelva el resultado en formato JSON.

Ejemplo: GET `/calculadora/suma/5/3` -> `{"operacion": "suma", "resultado": 8}`

---

## Ejercicio 7: Query Parameters
Crea una ruta GET `/buscar` que acepte query parameters `categoria` y `precio_max`, y devuelva un mensaje indicando los filtros aplicados.

Ejemplo: GET `/buscar?categoria=libros&precio_max=50` -> `{"mensaje": "Buscando en categoria: libros con precio maximo: 50"}`

---

## Ejercicio 8: Middleware Personalizado
Crea un middleware que registre en consola la fecha, el metodo HTTP y la URL de cada peticion que llegue al servidor. Aplicalo a todas las rutas usando `api.use()`.

---

## Ejercicio 9: Cliente con Fetch GET
Crea un archivo cliente JavaScript que utilice `fetch()` para hacer una peticion GET a `http://localhost:3000/usuarios` y muestre la respuesta en la consola.

---

## Ejercicio 10: Cliente con Fetch POST
Crea un cliente JavaScript que utilice `fetch()` para enviar una peticion POST a `http://localhost:3000/login` con un objeto JSON que contenga `usuario` y `contrasena`. Configura correctamente los headers y el body, y muestra la respuesta del servidor en la consola.

---

## Bonus: Proyecto Integrador
Combina todo lo aprendido creando una API de gestion de tareas (TODO list) con:
- Servidor Express con CRUD completo
- Cliente JavaScript con fetch para todas las operaciones
- Middleware para logging de peticiones
- Validacion basica de datos