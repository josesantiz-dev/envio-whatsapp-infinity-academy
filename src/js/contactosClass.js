//class nuevo contactos
class Contacto{
    constructor(id,nombre,numero,fechaCreacion,fechaModificacion){
        this.id = id;
        this.nombre = nombre;
        this.numero = numero;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
    }
}

class Contactos{
    constructor(){
        this.contactos = [];
    }
    setContacto(id,nombre,numero){
        let Id = (id != null)?this.contactos.length + 1:id;
        let contacto = new Contacto(Id,nombre,numero,"","");
        this.contactos.push(contacto);
        return contacto;
    }
    getContactos(){
        return this.contactos;
    }
    getContacto(){
        return this.contacto.filter((item) => item.id == id);
    }
    eliminarContacto(id){
        this.contacto = this.contacto.filter((item) => item.id != id);
    }
    editarContacto(id,nombre,numero){
        let fechaActual = "";
        this.contactos.forEach(element => {
            if(element.id == id){
                element.nombre = nombre;
                element.numero = numero;
                element.fechaModificacion = fechaActual;
            }
        });
    }
}

//class grupo
class Grupo{
    constructor(id,nombre,fechaCreacion,fechaModificacion){
        this.id = id;
        this.nombre = nombre;
        this.fechaCreacion = fechaCreacion;
        this.fechaModificacion = fechaModificacion;
    }
}

class Grupos{
    constructor(){
        this.grupos = [];
    }
    setGrupo(id,nombre){
        let Id = (id != null)?this.grupos.length + 1:id;
        let grupo = new Grupo(Id,nombre);
        this.grupos.push(grupo);
        return grupo;
    }
    getGrupos(){
        return this.grupos;
    }
    getGrupo(){
        return this.grupo.filter((item) => item.id == id);
    }
    eliminarGrupo(id){
        this.grupo = this.grupo.filter((item) => item.id != id);
    }
    editarGrupo(id,nombre){
        let fechaActual = "";
        this.grupos.forEach(element => {
            if(element.id == id){
                element.nombre = nombre;
                element.fechaModificacion = fechaActual;
            }
        });
    }
}

module.exports = { Contacto, Contactos, Grupo, Grupos }