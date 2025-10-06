const express = require("express")
const app = new express();
const port = 3001;

app.use(express.static('public'))

app.get("/welcome", (req, res) => {
    res.send("Bienvenido a mi Webserver");
});

app.get("/", (req, res) => {
    res.sendFile("public/index.html");
});

app.listen(port, () => console.log("WebServer en marcha!"))