//Make Node.js API calls in this file

const { io } = require("socket.io-client");

const socket = io('http://127.0.0.1:8000')

socket.on('connect', function () {
    console.log("client connected.");
  });


socket.on('message', function(msg) {
    console.log(msg)
});
socket.on('qr', function(src){
    console.log(src)
    //setQr(src);
});
socket.on('ready',function(data){
    console.log(data)
});
socket.on('authenticated', function(data){
    console.log(data)
})