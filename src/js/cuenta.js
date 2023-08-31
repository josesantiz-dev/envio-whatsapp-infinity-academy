const {io} = require("socket.io-client");
const { src } = require("vinyl-fs");
const socket = io("http://127.0.0.1:8000");
const ipc = require('electron').ipcRenderer;


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("menu-cuenta").classList.add("active");
    mostrarDatosApi();
   /* if(!isConnect){
        ipc.send('log',{tipo:'info',msg:'No esta conectado...'})
        socket.on("connect",function(){
            ipc.send('log',{tipo:'info',msg:'conectado...'})
           //console.log("conectando...")
        })
        socket.on("message",function(msg){
            mostrarMensaje(msg);
        })
        socket.on("qr", function(src){
            mostrarQR(src);
        })
        socket.on("ready",function(data){
            localStorage.setItem("connect","true");
            redireccionarContactos();
        })
        socket.on('loading_screen', (percent, message) => {
            ipc.send('log',{tipo:'info',msg:'locadin screen...'})
            document.getElementById("imagen-qr").src = "./src/images/loading-buffering.gif";
        });
    }else{
        ipc.send('log',{tipo:'info',msg:'esta conectado...'})
        document.getElementById("imagen-qr").src = "./src/images/done.png";
        document.getElementById("mensaje-cuenta").textContent = "Ya estas conectado";
    }*/
})

/*function mostrarMensaje(msg){
    ipc.send('log',{tipo:'info',msg:msg})
    document.getElementById("mensaje-cuenta").textContent = msg;
}

function mostrarQR(src){
    ipc.send('log',{tipo:'info',msg:src})
    document.getElementById("imagen-qr").src = src;
}

function redireccionarContactos(){
    ipc.send('log',{tipo:'info',msg:'redireccionando...'})
    location.href = "./contactos.html";
}*/

//const btnCerrarSesion = document.querySelector(".btn-cerrar-sesion");

/*btnCerrarSesion.addEventListener('click',function(){
    ipc.send('log',{tipo:'info',msg:'cerrando sesion...'})
    localStorage.setItem("connect","false");
    location.reload(true);
} )*/

const btnGuardarToken = document.querySelector("#btnGuardarToken");
const btnBorrarToken = document.querySelector("#btnBorrarToken");

btnGuardarToken.addEventListener('click',function(){
    let token = document.getElementById("txtToken").value;
    let identificador = document.getElementById("txtIdentificadorTelefono").value;
    if(token == ""){
        alert("Inserte un token de acceso");
        return false;
    }
    if(identificador == ""){
        alert("Inserte un identificador del Telefono");
        return false;
    }
    localStorage.setItem("token",token);
    localStorage.setItem("identificador",identificador);
    mostrarDatosApi();
    alert("Se guardaron los datos de acceso!")
})

btnBorrarToken.addEventListener('click',function(){
    localStorage.setItem("token","");
    localStorage.setItem("identificador","");
    mostrarDatosApi();
    alert("Se borraros los datos de acceso!")
})


function mostrarDatosApi(){
    let token = localStorage.getItem("token");
    let identificador = localStorage.getItem("identificador");
    token = (token == null)?"":token;
    identificador = (identificador == null)?"":identificador;
    document.getElementById("txtToken").value = token;
    document.getElementById("txtIdentificadorTelefono").value = identificador;
}