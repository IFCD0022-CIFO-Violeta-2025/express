// el fetch si no configuramos nada, utiliza el metodo http GET
// fetch("http://localhost:3000/")
//     .then(res => res.json())
//     .then(msg => console.log(msg))

// el fetch para POST
fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ "dato": 30 }),
})
.then(res => res.json())
.then(msg => console.log(msg))