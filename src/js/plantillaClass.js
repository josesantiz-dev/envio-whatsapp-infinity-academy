class Plantila{
    constructor(id,nombre,descripcion,fechaCreacion,fechaModificacion,estatus){
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
        this.estatus = estatus;
    }
}
class Plantillas{
    constructor(){
        this.plantillas = [];
    }
    setPlantilla(id,nombre,descripcion){
        let Id = (id != null)?this.plantillas.length + 1:id;
        let estatus = 1;
        let plantilla = new Plantila(Id,nombre,descripcion,"","",estatus);
        this.plantillas.push(plantilla);
        return plantilla;
    }
    getPlantillas(){
        return this.plantillas;
    }
    getPlantilla(id){
        return this.plantilla.filter((item) => item.id == id);
    }
    eliminarPlantilla(id){
        this.plantilla = this.plantilla.filter((item) => item.id != id);
    }
    editarPlantilla(id,nombre,descripcion,estatus){
        let fechaActual = "";
        this.plantillas.forEach(element => {
            if(element.id == id){
                element.nombre = nombre;
                element.descripcion = descripcion;
                element.estatus = estatus;
                element.fechaModificacion = fechaActual;
            }
        });
    }
}

module.exports = { Plantila, Plantillas }

