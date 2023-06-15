const {io} = require("socket.io-client");
const socket = io("http://127.0.0.1:8000");

socket.on("disconnected",function(msg){
    localStorage.setItem("connect","false");
})

// Asegúrate de tener la referencia a la instancia de WhatsApp Web en la variable "waWeb"
socket.on('connectionStatus', function(status) {
    console.log(status)
  });
  
