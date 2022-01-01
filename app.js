const { group } = require('console');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const { Client, LocalAuth } = require('whatsapp-web.js');
const port = process.env.PORT || 8000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(express.json());
app.use(express.urlencoded({
    extends: true
}));
const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        args:[
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-sygote',
            '--single-process',
            '--disable-gpu'
        ],
    },
    authStrategy: new LocalAuth()
});

client.on('message',msg =>{
    if(msg.body == '!ping'){
        msg.reply('pong');
    }else if(msg.body == 'good morning'){
        msg.reply('selamat pagi');
    }else if(msg.body == '!groups'){
        client.getChats().then(chats =>{
            const groups = chats.filter(chat => chat.isGroup);
            if(groups.length == 0){
                msg.reply('You have no group yet.');
            }else{
                let replyMsg = '*YOUR GROUPS*\n\n';
                group.forEach((group,i) => {
                    //replyMsg += `ID: ${group.id._serialized}`
                });
            }
        })
    }
})
client.initialize();

io.on('connection', function(socket) {
    socket.emit('message', 'Connecting...');
  
    client.on('qr', (qr) => {
      console.log('QR RECEIVED', qr);
      qrcode.toDataURL(qr, (err, url) => {
        socket.emit('qr', url);
        socket.emit('message', 'QR Code received, scan please!');
      });
    });
  
    client.on('ready', () => {
      socket.emit('ready', 'Whatsapp is ready!');
      socket.emit('message', 'Whatsapp is ready!');
    });
  
    client.on('authenticated', () => {
      socket.emit('authenticated', 'Whatsapp is authenticated!');
      socket.emit('message', 'Whatsapp is authenticated!');
      console.log('AUTHENTICATED');
    });
  
    client.on('auth_failure', function(session) {
      socket.emit('message', 'Auth failure, restarting...');
    });
  
    client.on('disconnected', (reason) => {
      socket.emit('message', 'Whatsapp is disconnected!');
      client.destroy();
      client.initialize();
    });
  });

app.get('/', (req, res) => {
    res.send({
        data: 'Hola mundo'
    })
})
app.get('/get-contacts', async(req,res) => {
    const contactos = client.getContacts();
    res.send(({value: await client.getContacts()}));
})
server.listen(port, function(){
    console.log('App running on *: ' + port);
})
