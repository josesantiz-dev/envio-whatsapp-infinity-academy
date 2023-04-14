const ipc = require('electron').ipcRenderer;
const url = require('url');
const path = require('path');

const btnNuevaCampana = document.getElementById("btnNuevaCampana");
document.getElementById("menu-campanias").classList.add("active");
btnNuevaCampana.addEventListener('click', (event) =>{
    ipc.send('abrirventana','nuevaCampana')
})