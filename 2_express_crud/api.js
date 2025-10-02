const express = require("express");
const api = new express();
const port = 3000;

// middleware para formatear json
api.use(express.json());

// cRud
api.get("/", (req, res) => {
    res.json({
        "message": "Hello World!"
    });
});

// Crud
api.post("/", (req, res) => {
    const data = req.body.data;
    res.json({
        "message": data + " data received!"
    });
});

// crUd (body)
// api.put("/", (req, res) => {

//     const email = req.body.email;
//     const newPass = req.body.newPass;
//     res.json({
//         "message": `new pass ${newPass} to ${email}`
//     });
// });

// crUd (body+url)
api.put("/pass/:id", (req, res) => {
    const id = req.params.id;
    const newPass = req.body.newPass;
    res.json({
        "message": `new pass ${newPass} to ${id}`
    });
});

// cruD (url)
api.delete("/:id", (req, res) => {
    const id = req.params.id;
    res.json({
        "message": `user ${id} deleted`
    });
});

api.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port);
})