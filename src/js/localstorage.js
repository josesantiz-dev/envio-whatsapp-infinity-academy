//Grupos
function getGrupos(){
    let grupos = localStorage.getItem("grupo");
    grupos = (grupos == null || grupos == "[]")?[]:JSON.parse(grupos);
    return grupos;
}
function setGrupos(grupos){
    localStorage.setItem("grupo",grupos);
}
//Contactos
function getContactos(){
    let contactos = localStorage.getItem("contactos");
    contactos = (contactos == null || contactos == "[]")?[]:JSON.parse(contactos);
    return contactos;
}
function setContactos(contactos){
    localStorage.setItem("contactos",contactos);
}

//Plantillas
function getPlantillas(){
    let plantillas = localStorage.getItem("plantillas");
    plantillas = (plantillas == null || plantillas == "[]")?[]:JSON.parse(plantillas);
    return plantillas;
}
function setPlantillas(plantillas){
    localStorage.setItem("plantillas",plantillas);
}

//Campanias
function getCampanias(){
    let campanias = localStorage.getItem("campanias");
    campanias = (campanias == null || campanias == "[]")?[]:JSON.parse(campanias);
    return campanias;
}
function setCampanias(campanias){
    localStorage.setItem("campanias",campanias);
}
module.exports = {getGrupos,setGrupos,getContactos,setContactos,getPlantillas,setPlantillas,getCampanias,setCampanias}