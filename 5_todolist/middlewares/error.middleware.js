/*
* Manejador de rutas no encontradas 404
*/
const notFound = ((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Error 404 - Not Found"
    })
    next();
});

module.exports = {
    notFound
}