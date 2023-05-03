const ipc = require('electron').ipcRenderer;
const url = require('url');
const path = require('path');
const reader = require('xlsx')
const {Contacto,Contactos, Grupo, Grupos} = require('./contactosClass');
const { table } = require('console');
let contactos = new Contactos;

//Contactos
const btnNuevoContacto = document.getElementById("btnAbrirVentanaNuevoContacto");
const btnGuardarContactos = document.getElementById("btnGuardarContactos");
const actualizarContactos = document.getElementById("btnActualizarContactos");
const tableContactos = document.querySelector('#tableContactos tbody');
const txtNombreContacto = document.getElementById("txtNombreContacto");
const txtNumeroContacto = document.getElementById("txtTelNuevo");
const tablePersonasAgregar = document.querySelector("#table-personas-agregar tbody");
const tablePersonasVerGrupo = document.querySelector("#table-participantes-ver tbody");
document.getElementById("menu-contactos").classList.add("active");


//Grupos
const btnGuardarGrupos = document.getElementById("btnGuardarGrupos");
const actualizarGrupos = document.getElementById("btnActualizarGrupos");
const tableGrupos = document.querySelector('#tableGrupos tbody');
const txtNombreGrupo = document.getElementById("txtNombregrupo");
const btnBuscarParticipantes = document.getElementById("btnBuscarParticipantes");

const excelInput = document.getElementById("excel-input");
const btnSubirMasivoContacto = document.getElementById("btnSubirCSV");


btnGuardarContactos.addEventListener("click",function(){
    let formContactos = document.querySelector("#formContactos");
    let contactosActuales = obtenerContactos();
    let id = contactosActuales.length + 1;
    let nombre = txtNombreContacto.value;
    let numero = txtNumeroContacto.value;
    if(nombre == "" || numero == ""){
        return false;
    }
    contactosActuales.push({
        id:id,
        nombre:nombre,
        numero:numero,
        fechaCreacion:new Date(),
        fechaModificacion:""
    });
    localStorage.setItem("contactos",JSON.stringify(contactosActuales));
    formContactos.reset();
    $("#modal-nuevo-contacto").modal("hide");
    fnMostrarContactos(obtenerContactos());
})

function obtenerContactos(){
    let contactos = localStorage.getItem("contactos");
    contactos = (contactos == null || contactos == "[]")?[]:JSON.parse(contactos);
    return contactos;
}

document.addEventListener("DOMContentLoaded", function () {
    fnMostrarContactos();
});

//Mostrar Lista de contactos en un tabla
function fnMostrarContactos() {
    let listaContactos = obtenerContactos();
    if (listaContactos.length > 0) {
        let rows = "";
        let count = 0;
        listaContactos.forEach(contactos => {
            count += 1;
            let btnAcciones = `<div class="text-center">
                                    <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-layer-group"></i> &nbsp; Acciones
                                    </button>
                                    <div class="dropdown-menu">
                                        <button id="btnEditarContacto" data-id="${contactos.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-editar-contacto" title="Editar"> &nbsp;&nbsp;
                                        <i class="fas fa-pencil-alt"></i> &nbsp; Editar
                                        </button>
                                        <div class="dropdown-divider"></div>
                                        <button id="btnEliminarContacto" data-id="${contactos.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat"  title="Eliminar"> &nbsp;&nbsp;
                                        <i class="far fa-trash-alt "></i> &nbsp; Eliminar
                                        </button>
                                    </div>
                                    </div>
                                </div>`;
            let row = `<tr><td>${count}</td><td>${contactos.nombre}</td><td>${contactos.numero}</td><td>${btnAcciones}</td></tr>`;
            rows += row;
        });
        tableContactos.innerHTML = rows;
    } else {
        tableContactos.innerHTML = "";
    }
};

/* btnNuevoContacto.addEventListener('click', (event) =>{
    txtNombreContacto.value = "";
    txtNumeroContacto.value = "";
 }) */

tableContactos.addEventListener('click', function (e) {
    const btn = e.target.closest('button');
    if (btn == null) {
        return false;
    }
    let tipoBoton = btn.id;
    switch (tipoBoton) {
        case "btnEditarContacto":
            fnEditContactos(btn);
            break;
        case "btnEliminarContacto":
            fnDelContactos(btn);
            break;
        default:
            break;
    }
});

//Editar contactos
function fnEditContactos(value) {
    let id = Number(value.dataset.id);
    let contactos = obtenerContactos();
    let contacto = contactos.filter(x => x.id == id);
    document.getElementById("idContactosEdit").value = id;
    document.getElementById("txtNombreContactoEdit").value = contacto[0].nombre;
    document.getElementById("txtTelNuevoEdit").value = contacto[0].numero;
}

actualizarContactos.addEventListener("click",function(){
    let contactosActuales = obtenerContactos();
    let id = document.getElementById("idContactosEdit").value;
    let nombre = document.getElementById("txtNombreContactoEdit").value;
    let numero = document.getElementById("txtTelNuevoEdit").value;
    if(id == "" || nombre == "" || numero == ""){
        return false;
    }
    let contacto = contactosActuales.filter(x => x.id == id);
    contacto[0].nombre = nombre;
    contacto[0].numero = numero;
    localStorage.setItem("contactos",JSON.stringify(contactosActuales));
    $("#modal-editar-contacto").modal("hide");
    fnMostrarContactos(obtenerContactos());
})

function fnDelContactos(value){
    let id = Number(value.dataset.id);
    let contactos = obtenerContactos();
    let contacto = contactos.filter(x => x.id != id);
    localStorage.setItem("contactos",JSON.stringify(contacto));
    fnMostrarContactos(obtenerContactos());
}



//Guardar Grupos
btnGuardarGrupos.addEventListener("click", function () {
    let formGrupos = document.querySelector("#formgrupos");
    let gruposActuales = obtenerListaGrupos();
    let id = gruposActuales.length + 1;
    let nombre = txtNombreGrupo.value;
    if(nombre == ""){
        return false;
    }
    gruposActuales.push({
        id: id,
        nombre: nombre,
        fechaCreacion: new Date(),
        fechaActualizacion: "",
        estatus: 1

    });
    localStorage.setItem("grupo", JSON.stringify(gruposActuales));
    formGrupos.reset();
    $("#modal-nuevo-grupo").modal('hide');
    fnMostrarListaGrupos(obtenerListaGrupos());
})

//Obtener Lista de grupos
function obtenerListaGrupos() {
    let grupos = localStorage.getItem("grupo");
    if (grupos == null || grupos == "[]") {
        grupos = [];
    } else {
        grupos = JSON.parse(grupos);
    }
    return grupos;
}

document.addEventListener("DOMContentLoaded", function () {
    fnMostrarListaGrupos();
});

//Mostrar Lista de grupos en un tabla
function fnMostrarListaGrupos() {
    let listaGrupos = obtenerListaGrupos();
    if (listaGrupos.length > 0) {
        let rows = "";
        let count = 0;
        listaGrupos.forEach(grupos => {
            let participantes = (grupos.participantes != undefined) ? grupos.participantes : [];
            let estatus = (grupos.estatus == 1) ? "Activo" : "Eliminado";
            count += 1;
            let btnAcciones = `<div class="text-center">
                                    <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-layer-group"></i> &nbsp; Acciones
                                    </button>
                                    <div class="dropdown-menu">
                                        <button id="btnEditarGrupo" data-id="${grupos.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-editar-grupo" title="Editar"> &nbsp;&nbsp;
                                        <i class="fas fa-pencil-alt"></i> &nbsp; Editar
                                        </button>
                                        <button id="btnAgregarParticipante" data-id="${grupos.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-agregar-participante-grupo" title="Editar"> &nbsp;&nbsp;
                                        <i class="fas fa-add"></i> &nbsp; Agregar participante
                                        </button>
                                        <button id="btnVerParticipantes" data-id="${grupos.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-ver-participantes-grupo" title="Editar"> &nbsp;&nbsp;
                                        <i class="fas fa-eye"></i> &nbsp; Ver participantes
                                        </button>
                                        <div class="dropdown-divider"></div>
                                        <button id="btnEliminarGrupo" data-id="${grupos.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" onClick="fnDelGrupos(this,${grupos.id})" title="Eliminar"> &nbsp;&nbsp;
                                        <i class="far fa-trash-alt "></i> &nbsp; Eliminar
                                        </button>
                                    </div>
                                    </div>
                                </div>`;
            let row = `<tr><td>${count}</td><td>${grupos.nombre}</td><td>${participantes.length}</td><td>${estatus}</td><td>${btnAcciones}</td></tr>`;
            rows += row;
        });
        tableGrupos.innerHTML = rows;
    } else {
        tableGrupos.innerHTML = "";
    }
};