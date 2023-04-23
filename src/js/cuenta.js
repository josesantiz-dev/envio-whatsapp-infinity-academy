const {io} = require("socket.io-client");
const { src } = require("vinyl-fs");
const socket = io("http://127.0.0.1:8000");

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("menu-cuenta").classList.add("active");
    if(!isConnect){
        socket.on("connect",function(){
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
            document.getElementById("imagen-qr").src = "./src/images/loading-buffering.gif";
        });
    }else{
        document.getElementById("imagen-qr").src = "./src/images/done.png";
        document.getElementById("mensaje-cuenta").textContent = "Ya estas conectado";
    }
})

function mostrarMensaje(msg){
    document.getElementById("mensaje-cuenta").textContent = msg;
}

function mostrarQR(src){
    document.getElementById("imagen-qr").src = src;
}

function redireccionarContactos(){
    location.href = "./contactos.html";
}

