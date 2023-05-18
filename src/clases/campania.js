class Campania{
    constructor(id,nombre,enviado,estatus,fechaCreacion,fechaActualizacion,horaEnvio,idGrupo,idPlantilla,intervalo){
        this.id =  id;
        this.nombre = nombre;
        this.enviado = enviado
        this.estatus = estatus
        this.fechaActualizacion = fechaActualizacion
        this.fechaCreacion = fechaCreacion
        this.horaEnvio =  horaEnvio
        this.idGrupo = idGrupo
        this.idPlantilla = idPlantilla
        this.intervalo = intervalo
    }
}
class Campanias{
    constructor(){
        this.campanias = [];
    }
    setCampania(campania){
        this.campanias.push(campania);
        return campania;
    }
    getCampanias(){
        return this.campanias;
    }
    getCampania(id){
        return this.campania.filter((item) => item.id == id);
    }
    eliminarCampania(id){
        this.campanias = this.campanias.filter((item) => item.id != id);
    }
    editarCampania(campania){
        this.campanias.forEach(element => {
            if(element.id == campania.id){
                element = campania
            }
        });
    }
}
module.exports = { Campania, Campanias }

