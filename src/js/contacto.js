const ipc = require('electron').ipcRenderer;
const url = require('url');
const path = require('path');


/* var listContactos = [];

const btnCrearContacto = document.getElementById("btnAbrirVentanaNuevoContacto");
const btnCrearGrupos = document.getElementById("btnAbrirVentanaNuevoGrupos");
const btnContactosMasivos = document.getElementById("btnAbrirVentanaContactosMasivos");

btnCrearContacto.addEventListener('click',(event) =>{
	ipc.send('abrirventana','crearContactos')
})

btnCrearGrupos.addEventListener('click',(event) =>{
	ipc.send('abrirventana','crearGrupos')
})

btnContactosMasivos.addEventListener('click',(event) =>{
	ipc.send('abrirventana','contactos-masiva')
})





function crearNuevoContacto(id,nombreContacto,apellidoPatContacto,apellidoMatContacto,telefonoContacto){
    var nuevoContacto = {
        id:id,
        nombre:nombreContacto,
        apellidoPaterno:apellidoPatContacto,
        apellidoMaterno:apellidoMatContacto,
        telefono:telefonoContacto
    }
    console.log(nuevoContacto);
    listContactos.push(nuevoContacto);
    localStorageListaContactos(listContactos);
}

function getObtenerListaContactos(){
    var storageListaCont = localStorage.getItem('localListaContactos');
    if(storageListaCont == null){
        listContactos = [];
    }else{
        listContactos = JSON.parse(storageListaCont);
    }
    return listContactos;
}

function localStorageListaContactos(listContactos){
    localStorage.setItem('localListaContactos', JSON.stringify(listContactos));
}



//Editar contactos
function fntEditContactos(){
    ipc.send('abrirventana','editarContactos')
} */

//Contactos
const btnGuardarContactos = document.getElementById("btnGuardarContactos");
const actualizarContactos = document.getElementById("btnActualizarContactos");
const tableContactos = document.querySelector('#tableContactos tbody');

//Grupos
const btnGuardarGrupos = document.getElementById("btnGuardarGrupos");
const actualizarGrupos = document.getElementById("btnActualizarGrupos");
const tableGrupos = document.querySelector('#tableGrupos tbody');


//Guardar Contactos
btnGuardarContactos.addEventListener("click",function(){
    let formContactos = document.querySelector("#formContactos");
    let nombreContacto = document.getElementById("txtNombreContacto").value;
    let apePatContacto = document.getElementById("txtApPatContacto").value;
    let apeMatContacto = document.getElementById("txtApMatContacto").value;
    let teleContacto = document.getElementById("txtTelNuevo").value;
    if(nombreContacto == "" || apePatContacto == "" || apeMatContacto == "" ||teleContacto == ""){
        return false;
    }
    let listaContactos = obtenerListaContactos();
    let id = new Date().getTime();
    listaContactos.push({
        id: id,
        nombre: nombreContacto,
        apellidoPat: apePatContacto,
        apellidoMat: apeMatContacto,
        telefono: teleContacto,
        fechaCreacion: new Date(),
        fechaActualizacion: ""

    });
    localStorage.setItem("contacto", JSON.stringify(listaContactos));
    formContactos.reset();
    $("#modal-nuevo-contacto").modal('hide');
    fnMostrarListaContactos();
});

//Obtener Lista de Contactos
function obtenerListaContactos(){
    let contactos = localStorage.getItem("contacto");
    if(contactos == null || contactos == "[]"){
        contactos = [];
    }else{
        contactos = JSON.parse(contactos);
    }
    return contactos;
}

document.addEventListener("DOMContentLoaded", function(){
    fnMostrarListaContactos();
});

//Mostrar Lista de contactos en un tabla
function fnMostrarListaContactos(){
    let listaContactos = obtenerListaContactos();
    if (listaContactos.length > 0){
        let rows = "";
        let count = 0;
        listaContactos.forEach(contactos =>{
            count += 1;
            let btnAcciones = `<div class="text-center">
                                    <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-layer-group"></i> &nbsp; Acciones
                                    </button>
                                    <div class="dropdown-menu">
                                        <button id="btnEditarContacto" data-id="${contactos.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-editar-contacto" onClick="fnEditContactos(this,${contactos.id})" title="Editar"> &nbsp;&nbsp;
                                        <i class="fas fa-pencil-alt"></i> &nbsp; Editar
                                        </button>
                                        <div class="dropdown-divider"></div>
                                        <button id="btnEliminarContacto" data-id="${contactos.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" onClick="fnDelContactos(this,${contactos.id})" title="Eliminar"> &nbsp;&nbsp;
                                        <i class="far fa-trash-alt "></i> &nbsp; Eliminar
                                        </button>
                                    </div>
                                    </div>
                                </div>`;
            let row = `<tr><td>${count}</td><td>${contactos.nombre +' '+ contactos.apellidoPat +' '+ contactos.apellidoMat}</td><td>${contactos.telefono}</td><td>${btnAcciones}</td></tr>`;
            rows += row;
        });
        tableContactos.innerHTML = rows;


        

        /* var listaContactos = getObtenerListaContactos(),
        tbody = document.querySelector('#tableContactos tbody');
    
        tbody.innerHTML = '';
    
        for (var i = 0; i < listaContactos.length; i++) {
            var row = tbody.insertRow(i),
                idcel = row.insertCell(0);
                nombreContactoCel = row.insertCell(1),
                apellidoPatContactoCel = row.insertCell(2),
                apellidoMatContacto = row.insertCell(3),
                telefonoContactoCel = row.insertCell(4);
                accionCel = row.insertCell(5);
    
            idcel.innerHTML = listaContactos[i].id;
            nombreContactoCel.innerHTML = listaContactos[i].nombre;
            apellidoPatContactoCel.innerHTML = listaContactos[i].apellidoPaterno;
            apellidoMatContacto.innerHTML = listaContactos[i].apellidoMaterno;
            telefonoContactoCel.innerHTML = listaContactos[i].telefono;
            accionCel.innerHTML = `<div class="text-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-layer-group"></i> &nbsp; Acciones
                                        </button>
                                        <div class="dropdown-menu">
                                            <button class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" onClick="fntEditContactos(this)" title="Editar"> &nbsp;&nbsp;
                                                <i class="fas fa-pencil-alt"></i> &nbsp; Editar
                                            </button>
                                            <div class="dropdown-divider"></div>
                                            <button class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" onClick="fntDelContactos(this)" title="Eliminar"> &nbsp;&nbsp;
                                                <i class="far fa-trash-alt "></i> &nbsp; Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>`;
    
            /* var inputAcciones = document.createElement('input');
            inputAcciones.type = 'button';
            inputAcciones.value = listaContactos[i].id;
            accionCel.appendChild(inputAcciones); */
            /*accionCel.value = listaContactos[i].id;
    
            tbody.appendChild(row);
        } */
    }
};

//Editar contactos
function fnEditContactos(value){
    $('#modal-editar-contacto').modal('show');
    let id = Number(value.dataset.id);
    let listaContactos = obtenerListaContactos();
    let contacto = listaContactos.filter(x => x.id == id);
    document.getElementById("idContactosEdit").value = id;
    document.getElementById("txtNombreContactoEdit").value = contacto[0].nombre;
    document.getElementById("txtApPatContactoEdit").value = contacto[0].apellidoPat;
    document.getElementById("txtApMatContactoEdit").value = contacto[0].apellidoMat;
    document.getElementById("txtTelNuevoEdit").value = contacto[0].telefono;
}

//Actulizar contactos
actualizarContactos.addEventListener("click", function(){
    let id =document.getElementById("idContactosEdit").value;
    let nombre =document.getElementById("txtNombreContactoEdit").value;
    let apellidoPat =document.getElementById("txtApPatContactoEdit").value;
    let apellidoMat =document.getElementById("txtApMatContactoEdit").value;
    let telefono =document.getElementById("txtTelNuevoEdit").value;
    if(nombre == "" || apellidoPat == "" || apellidoMat == "" || telefono == ""){
        return false;
    }
    let listaContactos = obtenerListaContactos();
    let contacto = listaContactos.filter(x => x.id == id);
    contacto[0].nombre = nombre;
    contacto[0].apellidoPat = apellidoPat;
    contacto[0].apellidoMat = apellidoMat;
    contacto[0].telefono = telefono;
    contacto[0].fechaActualizacion = new Date();
    localStorage.setItem("contacto",JSON.stringify(listaContactos));
    $("#modal-editar-contacto").modal("hide");
    fnMostrarListaContactos();
});

//Eliminar contactos
function fnDelContactos(value){
    let id = Number(value.dataset.id);
    let listaContactos = obtenerListaContactos();
    let contactos  = listaContactos.filter(x => x.id != id);
    localStorage.setItem("contacto",JSON.stringify(contactos));
    fnMostrarListaContactos();
}





//Guardar Grupos
btnGuardarGrupos.addEventListener("click",function(){
    let formGrupos = document.querySelector("#formGrupos");
    let nombreGrupo = document.getElementById("txtNombregrupo").value;
    if(nombreGrupo == ""){
        return false;
    }
    let listaGrupos = obtenerListaGrupos();
    let id = new Date().getTime();
    listaGrupos.push({
        id: id,
        nombre: nombreGrupo,
        fechaCreacion: new Date(),
        fechaActualizacion: "",
        estatus: 1

    });
    localStorage.setItem("grupo", JSON.stringify(listaGrupos));
    formGrupos.reset();
    $("#modal-nuevo-grupo").modal('hide');
    fnMostrarListaGrupos();
});

//Obtener Lista de grupos
function obtenerListaGrupos(){
    let grupos = localStorage.getItem("grupo");
    if(grupos == null || grupos == "[]"){
        grupos = [];
    }else{
        grupos = JSON.parse(grupos);
    }
    return grupos;
}

document.addEventListener("DOMContentLoaded", function(){
    fnMostrarListaGrupos();
});

//Mostrar Lista de grupos en un tabla
function fnMostrarListaGrupos(){
    let listaGrupos = obtenerListaGrupos();
    if (listaGrupos.length > 0){
        let rows = "";
        let count = 0;
        listaGrupos.forEach(grupos =>{
            count += 1;
            let btnAcciones = `<div class="text-center">
                                    <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-layer-group"></i> &nbsp; Acciones
                                    </button>
                                    <div class="dropdown-menu">
                                        <button id="btnEditarGrupo" data-id="${grupos.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-editar-grupo" onClick="fnEditGrupos(this,${grupos.id})" title="Editar"> &nbsp;&nbsp;
                                        <i class="fas fa-pencil-alt"></i> &nbsp; Editar
                                        </button>
                                        <div class="dropdown-divider"></div>
                                        <button id="btnEliminarGrupo" data-id="${grupos.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" onClick="fnDelGrupos(this,${grupos.id})" title="Eliminar"> &nbsp;&nbsp;
                                        <i class="far fa-trash-alt "></i> &nbsp; Eliminar
                                        </button>
                                    </div>
                                    </div>
                                </div>`;
            let row = `<tr><td>${count}</td><td>${grupos.nombre}</td><td>0</td><td>${grupos.estatus}</td><td>${btnAcciones}</td></tr>`;
            rows += row;
        });
        tableGrupos.innerHTML = rows;
    }
};

//Editar grupos
function fnEditGrupos(value){
    $('#modal-editar-grupo').modal('show');
    let id = Number(value.dataset.id);
    let listaGrupos = obtenerListaGrupos();
    let grupo = listaGrupos.filter(x => x.id == id);
    document.getElementById("idGruposEdit").value = id;
    document.getElementById("txtNombregrupoEdit").value = grupo[0].nombre;
}

//Actulizar grupos
actualizarGrupos.addEventListener("click", function(){
    let id =document.getElementById("idGruposEdit").value;
    let nombre =document.getElementById("txtNombregrupoEdit").value;
    if(nombre == ""){
        return false;
    }
    let listaGrupos = obtenerListaGrupos();
    let grupo = listaGrupos.filter(x => x.id == id);
    grupo[0].nombre = nombre;
    grupo[0].fechaActualizacion = new Date();
    localStorage.setItem("grupo",JSON.stringify(listaGrupos));
    $("#modal-editar-grupo").modal("hide");
    fnMostrarListaGrupos();
});

//Eliminar grupos
function fnDelGrupos(value){
    let id = Number(value.dataset.id);
    let listaGrupos = obtenerListaGrupos();
    let grupos  = listaGrupos.filter(x => x.id != id);
    localStorage.setItem("grupo",JSON.stringify(grupos));
    fnMostrarListaGrupos();
}