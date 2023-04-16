/* const electron = require('electron');
const {app, BrowserWindow, globalShorcut} = electron;

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700
    });

    mainWindow.setTitle('whatsapp');
    mainWindow.loadURL('https://web.whatsapp.com/');

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}); */

/* const path = require('path');*/
const ipc = require('electron').ipcRenderer;
const url = require('url');
const path = require('path');

const btnCrearContacto = document.getElementById("btnAbrirVentanaNuevoContacto");
const btnCrearGrupos = document.getElementById("btnAbrirVentanaNuevoGrupos");
/* const btnCopiarPegar = document.getElementById("btnAbrirVentanaCopiarPegar"); */
const btnContactosMasivos = document.getElementById("btnAbrirVentanaContactosMasivos");

btnCrearContacto.addEventListener('click',(event) =>{
	ipc.send('abrirventana','crearContactos')
})

btnCrearGrupos.addEventListener('click',(event) =>{
	ipc.send('abrirventana','crearGrupos')
})

/* btnCopiarPegar.addEventListener('click',(event) =>{
	ipc.send('abrirventana','copiar-pegar')
}) */

btnContactosMasivos.addEventListener('click',(event) =>{
	ipc.send('abrirventana','contactos-masiva')
})





/* function crearContacto(id,nombreContacto,apellidoPatContacto,apellidoMatContacto,telefonoContacto){
    var listContactos = [];
    var nuevoContacto = {
        id:id,
        nombre:nombreContacto,
        apellidoPaterno:apellidoPatContacto,
        apellidoMaterno:apellidoMatContacto,
        telefono:telefonoContacto
    }
    console.log(listContactos);
    console.log(nuevoContacto);
    listContactos.push(nuevoContacto);    
}

function getObtenerListaContactos(){
    return listContactos;
} */

/* const excelInput = document.getElementById('excel-input')
excelInput.addEventListener('change', async function(){
    const content = await readXlsxFile(excelInput.files[0]) 
    const excel = new Excel(content)
    console.log(ExcelPrinter.print('excel-table',excel))
}) */

/* const txtNombreContacto = document.getElementById("txtNombreContacto");
const txtApellidoPatContacto = document.getElementById("txtApellidoPatContacto");
const txtApellidoMatContacto = document.getElementById("txtApellidoMatContacto");
const txtTelefonoNuevo = document.getElementById("txtTelefonoNuevo");
const btnGuardarContacto = document.getElementById("btnGuardarContacto");

btnGuardarContacto.onclick = function (){
    const nombreContacto = txtNombreContacto.value;
    const apellidoPaterno = txtApellidoPatContacto.value;
    const apellidoMaterno = txtApellidoMatContacto.value;
    const telefonoContacto = txtTelefonoNuevo.value;

    console.log(nombreContacto);
    console.log(apellidoPaterno);
    console.log(apellidoMaterno);
    console.log(telefonoContacto);
} */


//Variable global
function fnAgregarContactos(){
    var datosIngresados = recuperarDatos();
    var leerDatos = leerDatosLocalStorage(datosIngresados);
    insert(leerDatos);
}

//Recuperando datos del formulario
function recuperarDatos(){
    var nombreContacto = document.getElementById("txtNombreContacto").value;
    var apellidoPatContacto = document.getElementById("txtApellidoPatContacto").value;
    var apellidoMatContacto = document.getElementById("txtApellidoMatContacto").value;
    var telefonoContacto = document.getElementById("txtTelefonoNuevo").value;

    var arr = [nombreContacto,apellidoPatContacto,apellidoMatContacto,telefonoContacto];
    return arr;
}

//Datos en localStorage
function leerDatosLocalStorage(datosIngresados){
    //Almacenar datos en localStorage
    var nomContacto = localStorage.setItem("txtNombreContacto",datosIngresados[0]);
    var apePatContacto = localStorage.setItem("txtApellidoPatContacto",datosIngresados[1]);
    var apeMatContacto = localStorage.setItem("txtApellidoMatContacto",datosIngresados[2]);
    var telContacto = localStorage.setItem("txtTelefonoNuevo",datosIngresados[3]);

    //Obtener valores de localStorage a tabla
    var nomContactoT = localStorage.getItem("txtNombreContacto", nomContacto);
    var apePatContactoT = localStorage.getItem("txtApellidoPatContacto", apePatContacto);
    var apeMatContactoT = localStorage.getItem("txtApellidoMatContacto", apeMatContacto);
    var telContactoT = localStorage.getItem("txtTelefonoNuevo", telContacto);

    var arr = [nomContactoT, apePatContactoT, apeMatContactoT, telContactoT];
    return arr;
}

function insert(leerDatos){
    var row = table.insertRow();
    row.insertCell(0).innerHTML =leerDatos[0];
    row.insertCell(1).innerHTML =leerDatos[1];
    row.insertCell(2).innerHTML =leerDatos[2];
    row.insertCell(3).innerHTML =leerDatos[3];
    row.insertCell(4).innerHTML =`<div class="text-center">
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
}

//Editar contactos
function fntEditContactos(){
    ipc.send('abrirventana','editarContactos')
}

//Eliminar contactos
function fntDelContactos(){
    console.log("Del Contactos");
}