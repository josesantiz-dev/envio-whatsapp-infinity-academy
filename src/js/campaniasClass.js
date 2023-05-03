//class nuevo contactos
class Campania{
    constructor(id,nombre,fechaCreacion,fechaModificacion){
        this.id = id;
        this.nombre = nombre;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
    }
}

class Campanias{
    constructor(){
        this.campanias = [];
    }
    setCampania(id,nombre,numero){
        let Id = (id != null)?this.campanias.length + 1:id;
        let campania = new Campania(Id,nombre);
        this.campanias.push(campania);
        return campania;
    }
    getCampanias(){
        return this.campanias;
    }
    getCampania(){
        return this.campania.filter((item) => item.id == id);
    }
    eliminarCampania(id){
        this.campania = this.campania.filter((item) => item.id != id);
    }
    editarCampania(id,nombre){
        let fechaActual = "";
        this.campanias.forEach(element => {
            if(element.id == id){
                element.nombre = nombre;
                element.fechaModificacion = fechaActual;
            }
        });
    }
}

module.exports = { Campania, Campanias }