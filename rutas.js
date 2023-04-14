const {io} = require("socket.io-client");
const socket = io('http://127.0.0.1:8000');
const API = 'http://127.0.0.1:8000';

//Conexion
socket.on('connect',function(){
    console.log("conectado.");
})
socket.on("message", function(msg){
    console.log(msg);
});
socket.on("qr", function(src){
    console.log(src);
    //fnSetQR(src);
});
socket.on("ready", function(data){
    console.log(data);
});
socket.on("authenticated" ,function(data){
    console.log(data);
});

//Funciones para whattsapp api
//Contactos
async function getAllContactos(){
    let promise = new Promise((resolve) =>{
        fetch(`${API}/get-contacts`).then(res => res.json()).then(res =>{
            resolve({
                data: res
            })
        });
    });
    return await promise;
}
//Sobre un contacto
