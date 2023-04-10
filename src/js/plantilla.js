const ipc = require('electron').ipcRenderer;
const url = require('url');
const path = require('path');

const btnNuevaPlantilla = document.getElementById("btnNuevaPlantilla");

btnNuevaPlantilla.addEventListener('click', (event) =>{
    ipc.send('abrirventana','nuevaPlantilla')
})