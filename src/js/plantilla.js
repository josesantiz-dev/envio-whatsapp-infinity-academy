const ipc = require('electron').ipcRenderer;
const url = require('url');
const path = require('path');

const btnNuevaPlantilla = document.getElementById("btnNuevaPlantilla");
document.getElementById("menu-plantillas").classList.add("active");
btnNuevaPlantilla.addEventListener('click', (event) =>{
    ipc.send('abrirventana','nuevaPlantilla')
})