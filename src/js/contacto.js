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





function crearContacto(id,nombreContacto,apellidoPatContacto,apellidoMatContacto,telefonoContacto){
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
}

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