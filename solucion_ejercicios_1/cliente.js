// ## Ejercicio 9: Cliente con Fetch GET
// Crea un archivo cliente JavaScript que utilice `fetch()` para hacer una peticion GET a `http://localhost:4000/usuarios` y muestre la respuesta en la consola.

async function Ejercicio9() {
    const res = await fetch(`http://localhost:4000/usuarios`);
    const users = await res.json();
    console.log(users);
}

// Ejercicio9();


// ## Ejercicio 10: Cliente con Fetch POST
// Crea un cliente JavaScript que utilice `fetch()` para enviar una peticion POST a `http://localhost:4000/login` con un objeto JSON que contenga `usuario` y`contrasena`.Configura correctamente los headers y el body, y muestra la respuesta del servidor en la consola.
async function Ejercicio10() {
    const res = await fetch(`http://localhost:4000/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ username: "sfsadf", password: "password" }),
    });
    const users = await res.json();
    console.log(users);
}
Ejercicio10();