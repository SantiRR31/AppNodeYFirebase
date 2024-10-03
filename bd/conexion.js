const admin = require("firebase-admin");
const keys=require("../keys.json");
admin.initializeApp({
    credential: admin.credential.cert(keys)
});

const proyecto=admin.firestore();
const usuarios=proyecto.collection("miejenplo");
const productos=proyecto.collection("productos");
const compras = proyecto.collection("compra");

module.exports={
    usuarios,
    productos,
    compras
}
