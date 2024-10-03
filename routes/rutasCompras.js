var rutas = require("express").Router();
var {mostrarCompras,nuevaCompra,borrarCompra,buscarCompraPorId} = require("../bd/comprasBD");


rutas.get("/mostrarCompras",async (req,res) =>{
    //res.send("Hola etas en raiz");
    var comprasValidas = await mostrarCompras();
    //console.log(usuarisValidos);
    res.json(comprasValidas);
});

rutas.get("/buscarCompraPorId/:id", async(req,res) => {
    var comprasValidas = await buscarCompraPorId(req.params.id)
    //console.log (usuarioValido);
    res.json(comprasValidas);
    
});

rutas.get("/borrarCompra/:id", async(req,res) => {
    var compraBorrada = await borrarCompra(req.params.id);
    res.json(compraBorrada);
});

rutas.post("/nuevaCompra", async (req,res) => {
    var compraValida = await nuevaCompra(req.body);
    res.json(compraValida);
});


module.exports = rutas;
