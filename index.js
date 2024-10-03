const express = require("express");
const usuariosRutas=require("./routes/rutasUsuarios");
const productosRutas=require("./routes/rutasProductos");
const comprasRutas=require("./routes/rutasCompras");

const app=express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/", usuariosRutas);
app.use("/", productosRutas);
app.use("/", comprasRutas);

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log("Servidor en http://localhost:"+port);
});