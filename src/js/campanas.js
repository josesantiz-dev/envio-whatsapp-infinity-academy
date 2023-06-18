const ipc = require('electron').ipcRenderer;
const url = require('url');
const path = require('path');
const { error } = require('console');
const API = 'http://127.0.0.1:8000';
const btnCampaniaNueva = document.getElementById("btnNuevaCampana");
const guardarCampania = document.getElementById("btnGuardarCampania");
const actualizarCampania = document.getElementById("btnActualizarCampania");
const tableCampanias = document.querySelector('#tableCampanias tbody');
document.getElementById("menu-campanias").classList.add("active");

/* const btnNuevaCampana = document.getElementById("btnNuevaCampana");
document.getElementById("menu-campanias").classList.add("active");
btnNuevaCampana.addEventListener('click', (event) =>{
    ipc.send('abrirventana','nuevaCampana')
}) */

document.addEventListener("DOMContentLoaded", function () {
    dataTable1 = $('#tableCampanias').DataTable({
        "pageLength": 10 // Establece el número de filas por página a 10
    });
    fnMostrarCampaniasActuales();
});

function fnMostrarCampaniasActuales(){
    let campaniasActuales = obtenerCampaniasActuales();
    if(campaniasActuales.length > 0){
        //let rows = "";
        let count = 0;
        campaniasActuales.forEach(campania => {
            count += 1;
            let acciones = `<div class="text-center">
            <div class="btn-group">
                <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-layer-group"></i> &nbsp; Acciones
                </button>
                <div class="dropdown-menu">
                    <!--<button id="btn-ver-plantilla" data-id="${campania.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-ver-plantilla" title="Ver"> &nbsp;&nbsp; 
                        <i class="fas fa-eye icono-azul"></i> &nbsp; Ver
                    </button>-->
                    <div class="dropdown-divider">
                    </div>
                    <button id="btn-editar-campania" data-id="${campania.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-editar-campania" title="Editar"> &nbsp;&nbsp;
                        <i class="fas fa-pencil-alt"></i> &nbsp; Editar
                    </button>
                    <button id="btn-enviar-campania" data-id="${campania.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-editar-plantilla" title="Editar"> &nbsp;&nbsp;
                    <i class="fas fa-play"></i> &nbsp; Enviar
                    </button>                    
                    <button id="btn-detener-plantilla" data-id="${campania.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-editar-plantilla" title="Editar"> &nbsp;&nbsp;
                    <i class="fas fa-stop"></i> &nbsp; Detener
                    </button>
                    <div class="dropdown-divider">
                    </div>
                    <button id="btn-eliminar-plantila" data-id="${campania.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat"  title="Eliminar"> &nbsp;&nbsp;
                        <i class="far fa-trash-alt "></i> &nbsp; Eliminar
                    </button>
                </div>
            </div>
            </div>`;
            let estatus = "";
            switch (campania.estatus) {
                case 1:
                    estatus = "Sin enviar";
                    break;
                case 2:
                    estatus = "En proceso";
                    break;
                case 3:
                    estatus = "Enviado";
                    break;
                default:
                    break;
            }
            let row = `<tr><td>${count}</td><td>${campania.nombre}</td><td id="tdenviados${campania.id}">0</td><td id="tderrores${campania.id}">0</td><td id="tdpendientes${campania.id}">0</td><td>${campania.fechaCreacion.split("T")[0]}</td><td></td><td>${estatus}</td><td>${acciones}</td></tr>`;
          //  rows += row;

            //var rowData = [count,campania.bnom.nombre,`<img width="38px" src="${imagenes}">`,estatus,acciones];
            //dataTable.row.add(rowData).draw();
            dataTable1.row.add($(row)).draw();
        });
      //  tableCampanias.innerHTML = rows;
    }
};

function obtenerCampaniasActuales(){
    let campanias = localStorage.getItem("campanias");
    if(campanias == null || campanias == "[]"){
        campanias = [];
    }else{
        campanias = JSON.parse(campanias);
    }
    return campanias;
}

function obtenerPlantillas(){
    let plantillas = localStorage.getItem("plantillas");
    plantillas = (plantillas == null || plantillas == "[]")?[]:JSON.parse(plantillas);
    return plantillas;
}

btnCampaniaNueva.addEventListener("click",function(){
    let grupos = obtenerListaGrupos();
    let plantillas = obtenerPlantillas();
    let selectGrupo = "<option value=''>Seleccionar...</option>";
    let selectPlantillas = "<option value=''>Seleccionar...</option>";
    if(grupos.length > 0){
        grupos.forEach(grupo => {
            let option = `<option value="${grupo.id}">${grupo.nombre}</option>`;
            selectGrupo += option;
        });
        document.getElementById("selectGrrupoContactos").innerHTML = selectGrupo;
    }else{
        document.getElementById("selectGrrupoContactos").innerHTML = selectGrupo;
    }

    if(plantillas.length > 0){
        plantillas.forEach(plantilla => {
            let option = `<option value="${plantilla.id}">${plantilla.nombre}</option>`;
            selectPlantillas += option;
        });
        document.getElementById("selectPlantillaCampania").innerHTML = selectPlantillas;
    }else{
        document.getElementById("selectPlantillaCampania").innerHTML = selectPlantillas;
    }

    document.getElementById("selectGrrupoContactos").value = "";
    document.getElementById("txtNombreCampania").value = "";
    document.getElementById("numeroIntervalo").value = "";
    document.getElementById("horaEnvio").value = "";
});

function obtenerListaGrupos(){
    let grupos = localStorage.getItem("grupo");
    if(grupos == null || grupos == "[]"){
        grupos = [];
    }else{
        grupos = JSON.parse(grupos);
    }
    return grupos;
}

guardarCampania.addEventListener("click",function(){
    let nombre = document.getElementById("txtNombreCampania").value;
    let grupo = document.getElementById("selectGrrupoContactos").value;
    let plantilla = document.getElementById("selectPlantillaCampania").value;
    let intervalo = document.getElementById("numeroIntervalo").value;
    let horaEnvio = document.getElementById("horaEnvio").value;
    if(nombre == "" || grupo == "" || intervalo == "" || plantilla == ""){
        alert("Hay datos obligatorios!!")
        return false;
    }
    let campaniasActuales = obtenerCampaniasActuales();
    let id = new Date().getTime();
    campaniasActuales.push({
        id: id,
        nombre: nombre,
        idGrupo: grupo,
        idPlantilla: plantilla,
        intervalo: intervalo,
        horaEnvio: horaEnvio,
        fechaCreacion: new Date(),
        fechaActualizacion: "",
        estatus: 1,
        enviado:0
    });
    localStorage.setItem("campanias",JSON.stringify(campaniasActuales));
    $("#modal-nueva-campania").modal("hide");
    fnMostrarCampaniasActuales();
 });


tableCampanias.addEventListener('click', function (e) {
    const btn = e.target.closest('button'); 
    if(btn == null){
        return false;
    }
    let tipoBoton = btn.id;
    switch (tipoBoton) {
        case "btn-editar-campania":
            fnEditarCampania(btn);
            break;
        case "btn-eliminar-plantila":
            fnEliminarCampania(btn);
            break;
        case "btn-enviar-campania":
            fnEnviarCampania(btn);
            break;
        default:
            break;
    }
});

function fnEditarCampania(value){
    let id = Number(value.dataset.id);
    let campaniasActuales = obtenerCampaniasActuales();
    let campania = campaniasActuales.filter(x => x.id == id);
    let grupos = obtenerListaGrupos();
    let plantillas = obtenerPlantillas();
    let selectGrupo = "<option value=''>Seleccionar...</option>";
    let selectPlantillas = "<option value=''>Seleccionar...</option>";

    if(grupos.length > 0){
        grupos.forEach(grupo => {
            let option = `<option value="${grupo.id}">${grupo.nombre}</option>`;
            selectGrupo += option;
        });
        document.getElementById("selectGrrupoContactosEdit").innerHTML = selectGrupo;
    }else{
        document.getElementById("selectGrrupoContactosEdit").innerHTML = selectGrupo;
    }

    if(plantillas.length > 0){
        plantillas.forEach(plantilla => {
            let option = `<option value="${plantilla.id}">${plantilla.nombre}</option>`;
            selectPlantillas += option;
        });
        document.getElementById("selectPlantillaCampaniaEdit").innerHTML = selectPlantillas;
    }else{
        document.getElementById("selectPlantillaCampaniaEdit").innerHTML = selectPlantillas;
    }

    document.getElementById("idCampaniaEdit").value = id;
    document.getElementById("txtNombreCampaniaEdit").value = campania[0].nombre;
    document.getElementById("selectGrrupoContactosEdit").value = campania[0].idGrupo;
    document.getElementById("selectPlantillaCampaniaEdit").value = campania[0].idPlantilla;
    document.getElementById("numeroIntervaloEdit").value = campania[0].intervalo;
    document.getElementById("horaEnvioEdit").value = campania[0].horaEnvio;
}

actualizarCampania.addEventListener("click",function(){
    let id = document.getElementById("idCampaniaEdit").value;
    let nombre = document.getElementById("txtNombreCampaniaEdit").value;
    let grupo = document.getElementById("selectGrrupoContactosEdit").value;
    let plantilla = document.getElementById("selectPlantillaCampaniaEdit").value;
    let intervalo = document.getElementById("numeroIntervaloEdit").value;
    let horaEnvio = document.getElementById("horaEnvioEdit").value;
    if(nombre == "" || grupo == "" || intervalo == "" || plantilla == ""){
        alert("Hay datos obligatorios!!")
        return false;
    }
    let campaniasActuales = obtenerCampaniasActuales();
    let campania = campaniasActuales.filter(x => x.id == id);
    campania[0].nombre = nombre;
    campania[0].idGrupo = grupo;
    campania[0].intervalo = intervalo;
    campania[0].horaEnvio = horaEnvio;
    campania[0].fechaActualizacion = new Date();
    localStorage.setItem("campanias",JSON.stringify(campaniasActuales));
    $("#modal-editar-campania").modal("hide");
    fnMostrarCampaniasActuales(); 
 });

 function fnEliminarCampania(value){
    let id = Number(value.dataset.id);
    let campaniasActuales = obtenerCampaniasActuales();
    let campanias = campaniasActuales.filter(x => x.id != id);
    localStorage.setItem("campanias",JSON.stringify(campanias));
    fnMostrarCampaniasActuales();
 }

 /* function fnEnviarCampania(value){
    if(!isConnect){
        alert("Conecta con una cuenta de Whatsapp!!")
        return false;
    }
    let datos = value.dataset;
    let idCampania = datos.id;
    let campania = obtenerCampaniasActuales().filter(x => x.id == idCampania);
    if(campania.length > 0){
        let grupo = obtenerListaGrupos().filter(x => x.id == Number(campania[0].idGrupo));
        let plantilla = obtenerPlantillas().filter(x => x.id == Number(campania[0].idPlantilla));
        let intervalo = Number(campania[0].intervalo) * 1000; //milisegundos
        if(grupo.length > 0){
            if(plantilla.length > 0){
                let participantes = (grupo[0].participantes != undefined)?grupo[0].participantes:[];
                let totalPaticipantes = participantes.length;
                let enviados = 0;
                let pendientes = totalPaticipantes - enviados;
                let errores = 0;
                let idTdEnviados = `tdenviados${campania[0].id}`;
                let idTdPendientes = `tdpendientes${campania[0].id}`;
                let idTdErrores = `tderrores${campania[0].id}`;
                document.getElementById(idTdEnviados).innerHTML = enviados;
                document.getElementById(idTdPendientes).innerHTML = pendientes;
                document.getElementById(idTdErrores).innerHTML = errores;
                if(participantes.length > 0){
                    participantes.forEach(async participante => {
                        let numeroTelefono = participante.telefono;
                        let mensaje = plantilla[0].descripcion;
                        let listaImagenes = plantilla[0].listImagenes;
                        setTimeout(async function(){
                            let promise = new Promise(async (resolve) =>{
                                if(listaImagenes.length > 0){
                                    let response = await fnEnviarMensajeMediaContacto(numeroTelefono,mensaje,listaImagenes);
                                    resolve({
                                        data:response
                                    })
                                }else{
                                    let response = await fnEnviarMensajeContacto(numeroTelefono,mensaje);
                                    resolve({
                                        data:response
                                    })
                                }
                            });
                            localStorage.setItem("listNegra",JSON.stringify(numeroTelefono));
                            let respuesta = await promise;
                            console.log(respuesta)
                            if(!respuesta.data.data.error){
                                enviados += 1;
                                pendientes = totalPaticipantes - (enviados + errores);
                                document.getElementById(idTdEnviados).innerHTML = enviados;
                                document.getElementById(idTdPendientes).innerHTML = pendientes;
                            }else{
                                errores += 1;
                                document.getElementById(idTdErrores).innerHTML = errores;
                            }
                        },intervalo);
                    });
                }else{
                    alert("No hay contacto agregado en el grupo!!!");
                    return false;
                }
            }else{
                alert("Error en la plantilla!!!");
                return false;
            }
        }else{
            alert("No hay grupo agreado!!");
            return false;
        }
    }else{
        alert("Hubo un error al obtener datos!!");
        return false;
    }
 } */

 async function fnEnviarMensajeContacto(telefono,mensaje){
    let promise = new Promise((resolve) =>{
        fetch(`${API}/send-message`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                number:telefono,
                message: mensaje
            }),
        }).then(res => res.json()).then(res =>{
            resolve({
                data:res,
                error:false
            })
        }).catch(err =>{
            resolve({
                data:err,
                error:true
            })
        })
    });
    let respuesta = await promise;
    return respuesta;
}

async function fnEnviarMensajeMediaContacto(telefono,mensaje,listImagenes){
    let promise = new Promise((resolve) =>{
        fetch(`${API}/send-message-media`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                number:telefono,
                message: mensaje,
                imagenes:listImagenes[0].path
            }),
        }).then(res => res.json()).then(res =>{
            resolve({
                data:res,
                error:false
            })
        }).catch(err =>{
            resolve({
                data:err,
                error:true
            })
        })
    });
    let respuesta = await promise;
    return respuesta;
}
/*  async function getAllContactos(){
    let promise = new Promise((resolve) =>{
        fetch(`${API}/get-contacts`).then(res => res.json()).then(res =>{
            resolve({
                data: res
            })
        });
    });
    return await promise;
} */

function fnEnviarCampania(value){
    /* let numTel = numeroTelefono; */
    /* console.log(numTel); */
    if(!isConnect){
        alert("Conecta con una cuenta de Whatsapp!!")
        return false;
    }
    let datos = value.dataset;
    let idCampania = datos.id;
    let campania = obtenerCampaniasActuales().filter(x => x.id == idCampania);
    if(campania.length > 0){
        let grupo = obtenerListaGrupos().filter(x => x.id == Number(campania[0].idGrupo));
        let plantilla = obtenerPlantillas().filter(x => x.id == Number(campania[0].idPlantilla));
        let intervalo = Number(campania[0].intervalo) * 1000; //milisegundos
        if(grupo.length > 0){
            if(plantilla.length > 0){
                let participantes = (grupo[0].participantes != undefined)?grupo[0].participantes:[];
                let totalPaticipantes = participantes.length;
                let enviados = 0;
                let pendientes = totalPaticipantes - enviados;
                let errores = 0;
                let idTdEnviados = `tdenviados${campania[0].id}`;
                let idTdPendientes = `tdpendientes${campania[0].id}`;
                let idTdErrores = `tderrores${campania[0].id}`;
                document.getElementById(idTdEnviados).innerHTML = enviados;
                document.getElementById(idTdPendientes).innerHTML = pendientes;
                document.getElementById(idTdErrores).innerHTML = errores;
                if(participantes.length > 0){
                    participantes.forEach(async participante => {
                        let numeroTelefono = participante.telefono;
                        let mensaje = plantilla[0].descripcion;
                        let listaImagenes = plantilla[0].listImagenes;
                        setTimeout(async function(){
                            let promise = new Promise(async (resolve) =>{
                                const listaNegra = obtenerListaNegra();
                                if (listaNegra.includes(listaNegra)) {
                                    console.log("El contacto está en la lista negra.");
                                    return false;
                                } else {
                                    console.log("El contacto no está en la lista negra.");
                                    
                                if(listaImagenes.length > 0){
                                    let response = await fnEnviarMensajeMediaContacto(numeroTelefono,mensaje,listaImagenes);
                                    resolve({
                                        data:response
                                    })
                                }else{
                                    let response = await fnEnviarMensajeContacto(numeroTelefono,mensaje);
                                    resolve({
                                        data:response
                                    })
                                }

                                return true;
                                }

                            });
                            localStorage.setItem("listNegra",JSON.stringify(numeroTelefono));
                            let respuesta = await promise;
                            console.log(respuesta)
                            if(!respuesta.data.data.error){
                                console.log(respuesta.data);
                                enviados += 1;
                                pendientes = totalPaticipantes - (enviados + errores);
                                document.getElementById(idTdEnviados).innerHTML = enviados;
                                document.getElementById(idTdPendientes).innerHTML = pendientes;
                            }else{
                                errores += 1;
                                document.getElementById(idTdErrores).innerHTML = errores;
                            }
                        },intervalo);
                    });
                }else{
                    alert("No hay contacto agregado en el grupo!!!");
                    return false;
                }
            }else{
                alert("Error en la plantilla!!!");
                return false;
            }
        }else{
            alert("No hay grupo agreado!!");
            return false;
        }
    }else{
        alert("Hubo un error al obtener datos!!");
        return false;
    }
 }


//para obtebner lista negra
function obtenerListaNegra() {
    const listaNegra = localStorage.getItem('listNegra');
    console.log(listaNegra);
  
    // Verificar si existe una lista negra en el almacenamiento
    if (listaNegra) {
        return JSON.parse(listaNegra);
    } else {
        return [];
    }
}