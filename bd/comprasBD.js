const comprasBD = require("./conexion").compras;
const productosBD = require("./conexion").productos;
const buscarProductoPorId = require("../bd/productosBD").buscarPorId;
const buscarUsuarioPorId = require("../bd/usuariosBD").buscarPorID;
const Compra=require("../modelos/compraModelo");

function validarDatos(compra) {
    var valido = false
    if (compra.idUsuario != undefined && compra.idProducto != undefined ) {
        valido = true;
    }
    return valido;
}


async function mostrarCompras() {
    const compras = await comprasBD.get();
    const comprasValidas = [];

    for (const doc of compras.docs) {
        const compra = new Compra({ id: doc.id, ...doc.data() });
        if (validarDatos(compra.getCompra())) {
            const clienteId = compra.idUsuario;
            const productoId = compra.idProducto;

            const cliente = await buscarUsuarioPorId(clienteId);
            let nombreUsuario;
            if (cliente) {
                nombreUsuario = cliente.nombre;
            } else {
                nombreUsuario = "Usuario no encontrado";
            }

            const producto = await buscarProductoPorId(productoId);
            let nombreProducto;
            if (producto) {
                nombreProducto = producto.nombre;
            } else {
                nombreProducto = "Producto no encontrado";
            }

            comprasValidas.push({
                fecha: compra.fecha,
                hora: compra.hora,
                Usuario: nombreUsuario,
                Producto: nombreProducto,
                estatus: compra.estatus
            });
        }

    }
    return comprasValidas;
}


async function buscarCompraPorId(id) {
    try {
        console.log("ID recibido:", id);  // Log para verificar el ID
        const compraDoc = await comprasBD.doc(id).get();

        if (!compraDoc.exists) {
            console.log("Compra no encontrada");
            return { error: "Compra no encontrada", id: id };  // Cambiar para devolver un objeto con error
        }

        const compra1 = new Compra({ idCompra: compraDoc.id, ...compraDoc.data() });
        console.log("Compra encontrada:", compra1);

        let compraValida = [];
        if (validarDatos(compra1.getCompra())) {
            const clienteId = compra1.idUsuario;
            const productoId = compra1.idProducto;

            const cliente = await buscarUsuarioPorId(clienteId);
            let nombreUsuario = cliente ? cliente.nombre : "Cliente no encontrado";

            const producto = await buscarProductoPorId(productoId);
            let nombreProducto = producto ? producto.nombre : "Producto no encontrado";

            compraValida.push({
                fecha: compra1.fecha,
                hora: compra1.hora,
                Cliente: nombreUsuario,
                Producto: nombreProducto,
                estatus: compra1.estatus
            });
        }
        return compraValida;
    } catch (error) {
        console.error("Error buscando la compra:", error);  // Log para detectar el error específico
        throw new Error("ErrorInterno");
    }
}

//buscarPorID("6UCKH0nCyIjQrCsyZrJ4");



async function nuevaCompra(data) {
    const fechaActual = new Date();
    const zonaHorariaOffset = -30;
    const horaLocal = new Date(fechaActual.getTime() + (zonaHorariaOffset * 60 * 60 * 1000));

    const horaActual = horaLocal.toISOString().split('T')[1].substring(0, 5);
    console.log("Fecha: ", fechaActual.toISOString().split('T')[0]);
    console.log("Hora: ", horaActual);
    const estatus = "Activa";

    const compra1 = new Compra(data);
    compra1.fecha = fechaActual.toISOString().split('T')[0];
    compra1.hora = horaActual;
    compra1.estatus = estatus;

    console.log("Compra inicial: ", compra1);
    let compraValida = false;

    if (validarDatos(compra1.getCompra())) {
        const productoId = compra1.idProducto;
        const producto = await buscarProductoPorId(productoId);
        await comprasBD.doc().set(compra1.getCompra());
            compraValida = true;
        
    }
    return compraValida;
}
   
async function borrarCompra(id) {
    const nuevoEstado = "Cancelada";
    const compra = await buscarCompraPorId(id);

    if (compra.length > 0) {
        await comprasBD.doc(id).update({ estatus: nuevoEstado });
        console.log("VENTA_CANCELADA");
        return true;
    } else {
        console.log("Error_en_la_compra");
        return false;
    }
}

module.exports={
    mostrarCompras,
    nuevaCompra,
    borrarCompra,
    buscarCompraPorId
}

// borrarUsuario("miEjemploBD");

