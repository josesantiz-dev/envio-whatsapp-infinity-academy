const ipc = require('electron').ipcRenderer;
const url = require('url');
const path = require('path');
const reader = require('xlsx')
const ExcelJS = require('exceljs');


//Contactos
const btnGuardarContactos = document.getElementById("btnGuardarContactos");
const actualizarContactos = document.getElementById("btnActualizarContactos");
const tableContactos = document.querySelector('#tableContactos tbody');
const tablePersonasAgregar = document.querySelector("#table-personas-agregar tbody");
const tablePersonasVerGrupo = document.querySelector("#table-participantes-ver tbody");
document.getElementById("menu-contactos").classList.add("active");


//Grupos
const btnGuardarGrupos = document.getElementById("btnGuardarGrupos");
const actualizarGrupos = document.getElementById("btnActualizarGrupos");
const tableGrupos = document.querySelector('#tableGrupos tbody');
const btnBuscarParticipantes = document.getElementById("btnBuscarParticipantes");

const excelInput = document.getElementById("excel-input");
const excelInputGroup = document.getElementById("excel-input-group");
const btnSubirMasivoContacto = document.getElementById("btnSubirCSV");


//Guardar Contactos
btnGuardarContactos.addEventListener("click", function () {
    let formContactos = document.querySelector("#formContactos");
    let nombreContacto = document.getElementById("txtNombreContacto").value;
    let teleContacto = document.getElementById("txtTelNuevo").value;
    if (nombreContacto == "" || teleContacto == "") {
        return false;
    }
    let listaContactos = obtenerListaContactos();
    let id = new Date().getTime();
    listaContactos.push({
        idContacto: id,
        nombre: nombreContacto,
        telefono: teleContacto,
        fechaCreacion: new Date(),
        fechaActualizacion: "",
        estatus: 1

    });
    localStorage.setItem("contacto", JSON.stringify(listaContactos));
    formContactos.reset();
    $("#modal-nuevo-contacto").modal('hide');
    fnMostrarListaContactos();
});

//Obtener Lista de Contactos
function obtenerListaContactos() {
    let contactos = localStorage.getItem("contacto");
    if (contactos == null || contactos == "[]") {
        contactos = [];
    } else {
        contactos = JSON.parse(contactos);
    }
    return contactos;
}

document.addEventListener("DOMContentLoaded", function () {
    dataTableContactos = $('#tableContactos').DataTable({
        "pageLength": 10 // Establece el número de filas por página a 10
    });
    dataTableGrupos = $('#tableGrupos').DataTable({
        "pageLength": 10 // Establece el número de filas por página a 10
    });
    fnMostrarListaContactos();
});

//Mostrar Lista de contactos en un tabla
function fnMostrarListaContactos() {
    let listaContactos = obtenerListaContactos();
    if (listaContactos.length > 0) {
        let count = 0;
        dataTableContactos.clear().draw();
        listaContactos.forEach(contactos => {
            count += 1;
            let btnAcciones = `<div class="text-center">
                                    <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-layer-group"></i> &nbsp; Acciones
                                    </button>
                                    <div class="dropdown-menu">
                                        <button id="btnEditarContacto" data-id="${contactos.idContacto}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-editar-contacto" title="Editar"> &nbsp;&nbsp;
                                        <i class="fas fa-pencil-alt"></i> &nbsp; Editar
                                        </button>
                                        <div class="dropdown-divider"></div>
                                        <button id="btnEliminarContacto" data-id="${contactos.idContacto}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat"  title="Eliminar"> &nbsp;&nbsp;
                                        <i class="far fa-trash-alt "></i> &nbsp; Eliminar
                                        </button>
                                    </div>
                                    </div>
                                </div>`;
            let row = `<tr><td>${count}</td><td>${contactos.nombre}</td><td>${contactos.telefono}</td><td>${btnAcciones}</td></tr>`;
            dataTableContactos.row.add($(row)).draw();
        });
    } else {
        tableContactos.innerHTML = "";
    }
};

//Editar contactos
function fnEditContactos(value) {
    $('#modal-editar-contacto').modal('show');
    let id = Number(value.dataset.id);
    let listaContactos = obtenerListaContactos();
    let contacto = listaContactos.filter(x => x.idContacto == id);
    document.getElementById("idContactosEdit").value = id;
    document.getElementById("txtNombreContactoEdit").value = contacto[0].nombre;
    /* document.getElementById("txtApPatContactoEdit").value = contacto[0].appellidoP;
    document.getElementById("txtApMatContactoEdit").value = contacto[0].apellidoM; */
    document.getElementById("txtTelNuevoEdit").value = contacto[0].telefono;
}

//Actulizar contactos
actualizarContactos.addEventListener("click", function () {
    let id = document.getElementById("idContactosEdit").value;
    let nombre = document.getElementById("txtNombreContactoEdit").value;
    /* let apellidoPat = document.getElementById("txtApPatContactoEdit").value;
    let apellidoMat = document.getElementById("txtApMatContactoEdit").value; */
    let telefono = document.getElementById("txtTelNuevoEdit").value;
    if (nombre == "" || telefono == "") {
        return false;
    }
    let listaContactos = obtenerListaContactos();
    let contacto = listaContactos.filter(x => x.idContacto == id);
    contacto[0].nombre = nombre;
    contacto[0].telefono = telefono;
    contacto[0].fechaActualizacion = new Date();
    localStorage.setItem("contacto", JSON.stringify(listaContactos));
    $("#modal-editar-contacto").modal("hide");
    fnMostrarListaContactos();
});

//Eliminar contactos
function fnDelContactos(value) {
    let id = Number(value.dataset.id);
    let listaContactos = obtenerListaContactos();
    let contactos = listaContactos.filter(x => x.idContacto != id);
    localStorage.setItem("contacto", JSON.stringify(contactos));
    fnMostrarListaContactos();
}



btnGuardarGrupos.addEventListener('click', async function (e) {
    
    let data = []
    if(excelInputGroup.files.length > 0){
        const filePath = excelInputGroup.files[0].path;
        const file = reader.readFile(filePath)
        const sheets = file.SheetNames
        const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[0]])
        temp.forEach((res) => {
            data.push(res)
        })

    }
    fnGuardarGrupo(data);
});

function fnGuardarGrupo(data){
    let nombreGrupo = document.getElementById("txtNombregrupo").value;
    if (nombreGrupo == "") {
        return false;
    }
    let listaGrupos = obtenerListaGrupos();
    let id = new Date().getTime();

    let formgrupos = document.querySelector("#formgrupos");
    let contactosActuales = obtenerListaContactos();
    let arrContactosGrupo = [];
    let count = 0;
    data.forEach(element => {
        count += 1;
        let nombre = element.Nombre;
        let telefono = element.Telefono;
        let newContacto = {
            idContacto: new Date().getTime() + count,
            nombre: nombre,
            telefono: telefono
        }
        contactosActuales.push(newContacto);
        arrContactosGrupo.push(newContacto);
    });
    listaGrupos.push({
        id: id,
        nombre: nombreGrupo,
        fechaCreacion: new Date(),
        fechaActualizacion: "",
        estatus: 1,
        participantes:arrContactosGrupo
    });
    if(data){
    localStorage.setItem("contacto",JSON.stringify(contactosActuales));
    fnMostrarListaContactos();
    }
    if(listaGrupos){
    localStorage.setItem("grupo", JSON.stringify(listaGrupos));
    fnMostrarListaGrupos();
    }


    formgrupos.reset();
    $("#modal-nuevo-grupo").modal("hide");
}

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
        let count = 0;
        dataTableGrupos.clear().draw();
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
            dataTableGrupos.row.add($(row)).draw();
        });
        //tableGrupos.innerHTML = rows;
    } else {
        tableGrupos.innerHTML = "";
    }
};

//Editar grupos
function fnEditGrupos(value) {
    $('#modal-editar-grupo').modal('show');
    let id = Number(value.dataset.id);
    let listaGrupos = obtenerListaGrupos();
    let grupo = listaGrupos.filter(x => x.id == id);
    document.getElementById("idGruposEdit").value = id;
    document.getElementById("txtNombregrupoEdit").value = grupo[0].nombre;
}

//Actulizar grupos
actualizarGrupos.addEventListener("click", function () {
    let id = document.getElementById("idGruposEdit").value;
    let nombre = document.getElementById("txtNombregrupoEdit").value;
    if (nombre == "") {
        return false;
    }
    let listaGrupos = obtenerListaGrupos();
    let grupo = listaGrupos.filter(x => x.id == id);
    grupo[0].nombre = nombre;
    grupo[0].fechaActualizacion = new Date();
    localStorage.setItem("grupo", JSON.stringify(listaGrupos));
    $("#modal-editar-grupo").modal("hide");
    fnMostrarListaGrupos();
});

//Eliminar grupos
function fnDelGrupos(value) {
    let id = Number(value.dataset.id);
    let listaGrupos = obtenerListaGrupos();
    let grupos = listaGrupos.filter(x => x.id != id);
    localStorage.setItem("grupo", JSON.stringify(grupos));
    fnMostrarListaGrupos();
}



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

tableGrupos.addEventListener('click', function (e) {
    const btn = e.target.closest('button');
    if (btn == null) {
        return false;
    }
    let tipoBoton = btn.id;
    switch (tipoBoton) {
        case "btnEditarGrupo":
            fnEditGrupos(btn);
            break;
        case "btnEliminarGrupo":
            fnDelGrupos(btn);
            break;
        case "btnAgregarParticipante":
            fnAgregarParticipante(btn);
            break;
        case "btnVerParticipantes":
            fnVerParticipantesGrupo(btn);
            break;
        default:
            break;
    }
});

function fnAgregarParticipante(value) {
    let idGrupo = value.dataset.id;
    document.getElementById("idGrupoAgregarParticipante").value = idGrupo;
    document.getElementById("nombreParticipanteGrupo").value = "";
    tablePersonasAgregar.innerHTML = "";
}

function buscarParticipantes() {
    let contactos = localStorage.getItem("contacto");
    if (contactos == null || contactos == "[]") {
        contactos = [];
    } else {
        contactos = JSON.parse(contactos);
    }
    return contactos;
}

btnBuscarParticipantes.addEventListener("click", function () {
    let idGrupo = document.getElementById("idGrupoAgregarParticipante").value;
    let valor = document.getElementById("nombreParticipanteGrupo").value;
    let participantesActuales = buscarParticipantes();
    let resultado = participantesActuales.filter(x => (x.nombre + " " + x.appellidoP + " " + x.apellidoM).includes(valor));
    if (resultado.length > 0) {
        let rows = "";
        let count = 0;
        resultado.forEach(part => {
            count += 1;
            let estatus = '<button type="button" data-id="' + part.idContacto + '" data-grupo="' + idGrupo + '" data-nombre="' + part.nombre + '" data-apellidop="' + part.appellidoP + '" data-apellidom="' + part.apellidoM + '" data-telefono="' + part.telefono + '" id="btnAgregarParticipante" class="btn btn-primary">Agregar</button>';
            let row = `<tr><td>${count}</td><td>${part.nombre}</td><td>${part.telefono}</td><td>${estatus}</td></tr>`;
            rows += row;
        });
        tablePersonasAgregar.innerHTML = rows;
    } else {
        tablePersonasAgregar.innerHTML = "";
    }
});

tablePersonasAgregar.addEventListener('click', function (e) {
    const btn = e.target.closest('button');
    if (btn == null) {
        return false;
    }
    let tipoBoton = btn.id;
    switch (tipoBoton) {
        case "btnAgregarParticipante":
            fnAgregarParticipanteGrupo(btn);
            break;
        default:
            break;
    }
});

function fnAgregarParticipanteGrupo(value) {
    let datos = value.dataset;
    let idGrupo = datos.grupo;
    let idContacto = datos.id;
    let nombreContacto = datos.nombre;
    let telefono = datos.telefono;
    let gruposActuales = obtenerListaGrupos();
    let grupo = gruposActuales.filter(x => x.id == idGrupo);
    let participantes = (grupo[0].participantes != undefined) ? grupo[0].participantes : [];
    let isExistParticipante = participantes.filter(x => x.idContacto == idContacto);
    if (isExistParticipante.length > 0) {
        alert("El contacto ya existe en este grupo!!");
        return false;
    }
    participantes.push({
        idContacto: idContacto,
        nombre: nombreContacto,
        telefono: telefono
    })
    grupo[0].participantes = participantes;
    localStorage.setItem("grupo", JSON.stringify(gruposActuales));
    $("#modal-agregar-participante-grupo").modal("hide");
    fnMostrarListaGrupos();
}

function fnVerParticipantesGrupo(value) {
    let datos = value.dataset;
    let idGrupo = datos.id;
    let grupo = obtenerListaGrupos().filter(x => x.id == idGrupo);
    let participantes = (grupo[0].participantes != undefined) ? grupo[0].participantes : [];
    if (participantes.length > 0) {
        let count = 0;
        let rows = "";
        participantes.forEach(participante => {
            count += 1;
            let nombre = (participante.nombre != undefined) ? participante.nombre : "";
            let telefono = (participante.telefono != undefined) ? participante.telefono : "";
            let row = `<tr><td>${count}</td><td>${nombre}</td><td>${telefono}</td></tr>`;
            rows += row;
        });
        tablePersonasVerGrupo.innerHTML = rows;
    } else {
        tablePersonasVerGrupo.innerHTML = "";
    }
}

btnSubirMasivoContacto.addEventListener('click', async function (e) {
    const filePath = excelInput.files[0].path;
    const file = reader.readFile(filePath)
    let data = []
    const sheets = file.SheetNames
    const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[0]])
    
    temp.forEach((res) => {
        data.push(res)
    })
    fnGuardarMasivoContacto(data);  
   /*  for(let i = 0; i < sheets.length; i++)
    {
       const temp = reader.utils.sheet_to_json(
            file.Sheets[file.SheetNames[i]])
       temp.forEach((res) => {
          data.push(res)
       })
    } */
      
    // Printing data
});

function fnGuardarMasivoContacto(data){
    let formSubirCSV = document.querySelector("#formSubirCSV");
    let contactosActuales = obtenerListaContactos();
    let count = 0;
    data.forEach(element => {
        count += 1;
        let nombre = element.Nombre;
        /* let apellidosPaterno = element.ApellidoPaterno;
        let apellidosMaterno = element.ApellidoMaterno; */
        let telefono = element.Telefono;
        contactosActuales.push({
            idContacto: new Date().getTime() + count,
            nombre: nombre,
            /* appellidoP: apellidosPaterno,
            apellidoM: apellidosMaterno, */
            telefono: telefono,
            estatus: 1
        });
    });
    localStorage.setItem("contacto",JSON.stringify(contactosActuales));
    formSubirCSV.reset();
    $("#modal-subir-csv").modal("hide");
    fnMostrarListaContactos();
}

btnExportarContactos.addEventListener('click', async function (e) {
    console.log("exportar")
    let contactosActuales = obtenerListaContactos();
    if(contactosActuales.length > 0){
        exportarJSONExcel(contactosActuales,"Lista-Contactos");
    }else{
        alert("No hay contactos que exportar!")
    }
});

btnExportarGrupos.addEventListener('click', async function (e) {
    let arrContactosGrupos = [];
    let grupoActuales = obtenerListaGrupos();
    grupoActuales.forEach(grupo => {
        let nombreGrupo = grupo.nombre;
        let listaParticipantes = (grupo.participantes == undefined)?[]:grupo.participantes;
        listaParticipantes.forEach(participante => {
            let idParticipante = participante.idContacto;
            let nombre = participante.nombre;
            let telefono = participante.telefono;
            let objParticipante = {
                idPersona: idParticipante,
                nombrePersona: nombre,
                telefono: telefono,
                nombreGrupo: nombreGrupo
            }
            arrContactosGrupos.push(objParticipante);
        })
    });
    if(arrContactosGrupos.length > 0){
        exportarJSONExcel(arrContactosGrupos,"Lista-Grupos-Contactos")
    }else{
        alert("Agregar al menos un participante en un grupo ó crea un grupo con participantes!")
    }
});


function exportarJSONExcel(arrDatos,nombreArchivo){
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    const headers = Object.keys(arrDatos[0]);
    worksheet.addRow(headers);
    arrDatos.forEach(row => {
        const rowData = Object.values(row);
        worksheet.addRow(rowData);
    });
    // Generar el archivo Excel
    workbook.xlsx.writeBuffer().then(function(buffer) {
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        // Crear un enlace de descarga
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = nombreArchivo+ '.xls';
        link.click();
        // Limpiar recursos después de la descarga
        setTimeout(function() {
        URL.revokeObjectURL(link.href);
        }, 100);
    });
}