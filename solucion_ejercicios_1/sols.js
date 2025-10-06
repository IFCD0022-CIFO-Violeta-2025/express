const express = require("express")
const app = new express();
const port = 4000;

// middleware parsear JSON
app.use(express.json());
// ## Ejercicio 8: Middleware Personalizado
// Crea un middleware que registre en consola la fecha, el metodo HTTP y la URL de cada peticion que llegue al servidor.Aplicalo a todas las rutas usando`api.use()`.
app.use((req, res, next) => {
    const fecha = new Date();
    console.log('Fecha:', fecha);
    console.log("Metodo: ", req.method);
    console.log("Path: ", req.url);
    next();
})

// ## Ejercicio 1: Servidor Basico
// Crea un servidor Express que escuche en el puerto 4000 y que tenga una ruta GET en `/bienvenida` que devuelva el mensaje "Bienvenido a mi API".
app.get("/bienvenida", (req, res) => {
    res.status(200).json({ "msg": "Bienvenido a mi API" });
});

// ## Ejercicio 2: Respuesta JSON
// Modifica el ejercicio anterior para que la ruta `/bienvenida` devuelva un objeto JSON con las siguientes propiedades:
// - `mensaje`: "Bienvenido a mi API"
// - `fecha`: la fecha actual
// - `puerto`: 4000
app.get("/bienvenida2", (req, res) => {
    res.status(200).json({
        mensaje: "Bienvenido a mi API",
        fecha: new Date().toString(),
        puerto: port
    });
});

// ## Ejercicio 3: Parametros de URL
// Crea una ruta GET `/saludar/:nombre` que reciba un nombre como parametro de URL y devuelva un JSON con el mensaje: "Hola, [nombre]!".
// Ejemplo: GET`/saludar/Juan` -> `{"mensaje": "Hola, Juan!"}`
app.get("/saludar/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    res.status(200).json({ mensaje: `Hola, ${nombre}!` });
});

// ## Ejercicio 4: POST con Body
// Crea una ruta POST `/registro` que reciba en el body un objeto con `nombre` y`email`, y devuelva un JSON confirmando el registro:
// ```json
// {
//   "mensaje": "Usuario registrado correctamente",
//   "nombre": "...",
//   "email": "..."
// }
app.post("/registro", (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    // validar contenido (solo si viene vacio)
    if (!nombre || !email)
        return res.status(400).json({ error: "Añade nombre y email!"});

    res.status(200).json({ mensaje: "Usuario registrado correctamente", nombre, email});
});

// ## Ejercicio 5: CRUD Completo - Productos
// Crea un CRUD completo para productos con las siguientes rutas:
// - ** GET ** `/productos` - Devuelve un array de productos (puedes usar datos de ejemplo en memoria)
// - ** POST ** `/productos` - Crea un nuevo producto(recibe`nombre` y`precio` en el body)
// - ** PUT ** `/productos/:id` - Actualiza un producto existente
// - ** DELETE ** `/productos/:id` - Elimina un producto por su ID
const productos = [
    { id: 3, nombre: "Producto 1", precio: 100 },
    { id: 2, nombre: "Producto 2", precio: 200 },
    { id: 1, nombre: "Producto 3", precio: 300 }
];

// cRud
app.get("/productos", (req, res) => {
    res.status(200).json({ productos });
});
// Crud
app.post("/producto", (req, res) => {
    const { nombre, precio  } = req.body;
    const id = productos.length + 1;
    productos.push({ id, nombre, precio })
    res.status(201).json({ productos });
});
// crUd
app.put("/producto/:id", (req, res) => {
    const { id } = req.params; // cuidado que nos llega en String
    const { nombre, precio } = req.body;
    // validar que el producto existe
    const prod_exists = productos.find(p => p.id === parseInt(id))
    if (prod_exists) {
        if (nombre) prod_exists.nombre = nombre;
        if (precio) prod_exists.precio = precio;
        
        const indice = productos.findIndex(p => p.id === parseInt(id));
        productos.splice(indice, 1, prod_exists);

        res.status(201).json({
            msg: "Producto con id " + id + " modificado!",
            productos
        });
    } else {
        res.status(404).json({ error: "No existe este producto en nuestra DB" });
    }
});

// cruD
app.delete("/producto/:id", (req, res) => {
    const { id } = req.params;
    const indice = productos.findIndex(p => p.id === parseInt(id))
    if (indice !== -1) {
        productos.splice(indice, 1);
        res.status(200).json({ productos });
    } else {
        res.status(404).json({ error: "No existe este producto en nuestra DB" });
    }
});

// ## Ejercicio 9: Cliente con Fetch GET
// Crea un archivo cliente JavaScript que utilice `fetch()` para hacer una peticion GET a `http://localhost:3000/usuarios` y muestre la respuesta en la consola.
const users = [ 
    { id: 1, username: "user1", email: "user1@gmail.com" },
    { id: 2, username: "user2", email: "user2@gmail.com" },
    { id: 3, username: "user3", email: "user3@gmail.com" }
]
app.get("/usuarios", (req, res) => {
    res.status(200).json({ users });
});

app.post("/usuarios", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(404).json({ error: "Añade email y password" });
    res.status(200).json({ username, password });
});

// levanta el server
app.listen(port, () => console.log("Servidor Ejercicios en marcha!"))