class Compra {
    constructor(data) {
        this._idCompra = data.idCompra;
        this._idUsuario = data.idUsuario;
        this._idProducto = data.idProducto;
        this._fecha = data.fecha;
        this._hora = data.hora;
        this._estatus = data.estatus;
    }

    set idCompra(idCompra) {
        this._idCompra = idCompra;
    }

    set idUsuario(idUsuario) {
        if (typeof idUsuario === 'string' && idUsuario.trim() !== '') {
            this._idUsuario = idUsuario;
        } else {
            throw new Error("El ID no puede estar UNDEFINED");
        }
    }

    set idProducto(idProducto) {
        if (typeof idProducto === 'string' && idProducto.trim() !== '') {
            this._idProducto = idProducto;
        } else {
            throw new Error("El ID del producto no puede ser UNDEFINED");
        }
    }

    set fecha(fecha) {
        console.log("Fecha:", fecha);
        if (fecha) {
            this._fecha = fecha;
        } else {
            throw new Error('Fecha invalida');
        }
    }
    
    set hora(hora) {
        console.log("Hora:", hora);

        if (hora) {
            this._hora = hora;
        } else {
            throw new Error('Hora invalida');
        }
    }

    set estatus(estatus) {
        const estatusValido = ["Activa", "Cancelada", "Completada"];
        if (estatusValido.includes(estatus)) {
            this._estatus = estatus;
        } else {
            throw new Error(`El estado '${estatus}' no es válido`);
        }
    }


    get idCompra() {
        return this._idCompra;
    }
        
    get idUsuario() {
        return this._idUsuario;
    }

    get idProducto() {
        return this._idProducto;
    }

    get fecha() {
        return this._fecha;
    }
    
    get hora() {
        return this._hora;
    }
    
    get estatus() {
        return this._estatus;
    }

    getCompra() {
        const conId = {
            idCompra: this.idCompra,
            idUsuario: this.idUsuario,
            idProducto: this.idProducto,
            fecha: this.fecha,
            hora: this.hora,
            estatus: this.estatus
        };

        const sinId = {
            idUsuario: this.idUsuario,
            idProducto: this.idProducto,
            fecha: this.fecha,
            hora: this.hora,
            estatus: this.estatus
        };
        if (this.idCompra == undefined){
            return sinId;
        }  else  {
            return conId;
        }
    }
}

module.exports = Compra;