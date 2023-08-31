//const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const { body, validationResult } = require('express-validator');
const socketIO = require('socket.io');
const qrcode = require('qrcode');
//const qrcode = require('qrcode-terminal');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const { phoneNumberFormatter } = require('./helpers/formatter');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const mime = require('mime-types');

const port = process.env.PORT || 8000;
const FormData = require('form-data');


const app = express();
const server = http.createServer(app);
const io = socketIO(server);
//const Token = "EAALmvAYZCq0wBO2QUpWUH8vWtZBP9x1EfnMVcEfIZCJEl0vJz1m1ImFZBiyGoDRjQZB6FGcvYG300EhVIhDS0PJennpdoKxofjmBqYde8oc8JCvTx3MAmzvj4nWWQqQ1zVB4o0V3rjTp2jqsvpPyPBXwlZAAkKlUqXRbE19UaPG0mJqQqPxG7xoofyByyZAiNA3vk2BFgbuvbAHhJwRPFgZD";
//const idPhone = "109968958451061";


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());
app.use(fileUpload({
    debug: false
}));

//const client = new Client();
/*const client = new Client({
    puppeteer: { headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] },
});*/

/*client.on('message', msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    } else if (msg.body == 'good morning') {
        msg.reply('selamat pagi');
    } else if (msg.body == '!groups') {
        client.getChats().then(chats => {
            const groups = chats.filter(chat => chat.isGroup);

            if (groups.length == 0) {
                msg.reply('You have no group yet.');
            } else {
                let replyMsg = '*YOUR GROUPS*\n\n';
                groups.forEach((group, i) => {
                    replyMsg += `ID: ${group.id._serialized}\nName: ${group.name}\n\n`;
                });
                replyMsg += '_You can use the group id to send a message to the group._'
                msg.reply(replyMsg);
            }
        });
    }
});*/

//client.initialize();

// Socket IO
io.on('connection', function (socket) {
    socket.emit('message', 'Conectando...');

    /* client.on('loading_screen', (percent, message) => {
         //console.log('LOADING SCREEN', percent, message);
         socket.emit('message', message);
     });
 
     client.on('qr', (qr) => {
         console.log('QR RECEIVED', qr);
         qrcode.toDataURL(qr, (err, url) => {
             socket.emit('qr', url);
             socket.emit('message', 'Escanea el código QR por favor!');
         });
     });
 
     client.on('ready', () => {
         socket.emit('ready', 'Whatsapp está listo!');
         socket.emit('message', 'Whatsapp está listo!');
     });
 
     client.on('authenticated', () => {
         socket.emit('authenticated', 'Whatsapp está autenticado!');
         socket.emit('message', 'Whatsapp está autenticado!');
         console.log('AUTHENTICATED');
     });
 
     client.on('auth_failure', function (session) {
         socket.emit('message', 'Autenticación fallida, reiniciando...');
     });
 
     client.on('disconnected', (reason) => {
         socket.emit('disconnected', 'Whatsapp ha sido desconectado!');
         socket.emit('message', 'Whatsapp ha sido desconectado!');
         client.destroy();
         client.initialize();
     });*/
});


/*const checkRegisteredNumber = async function (number) {
    const isRegistered = await client.isRegisteredUser(number);
    return isRegistered;
}*/
app.get('/', (req, res) => {
    res.send({
        data: 'Hola mundo'
    })
})
app.post('/send-message-media1', async (req, res) => {
    try {
        const accessToken = Token; // Tu token de acceso aquí
        const url = 'https://graph.facebook.com/v17.0/' + idPhone + '/messages';

        const requestBody = {
            messaging_product: 'whatsapp',
            to: '529612168345',
            type: 'template',
            template: {
                name: 'hello_world',
                language: {
                    code: 'en_US'
                }
            }
        };

        const response = await axios.post(url, requestBody, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});
app.post('/send-message-media', async (req, res) => {
    try {
        const number = req.body.number;
        const message = req.body.message;
        const urlImagen = req.body.imagenes;
        const Token = req.body.token;
        const identificador = req.body.identificador;
/*         idPhone = identificador;
        const accessToken = Token; // Reemplaza con tu token de acceso 
        console.log(idPhone)
        console.log(accessToken) */
        const formData = new FormData();
        formData.append("file", fs.createReadStream(urlImagen), {
            contentType: "image/png",
        });
        formData.append("messaging_product", "whatsapp");

        try {
            const {
                data: { id: mediaId },
            } = await axios.post(
                `https://graph.facebook.com/v17.0/${identificador}/media`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${Token}`, // "Bearer" prefix
                        ...formData.getHeaders(), // merge in FormData headers
                    },
                }
            );
            console.log("media ID", mediaId);

            const url = `https://graph.facebook.com/v17.0/${identificador}/messages`;
    
            const requestBody = {
                messaging_product: 'whatsapp',
                recipient_type: "individual",
                to: number, // Número de destino
                type: 'image', // Tipo de mensaje
                image: {
                    id: mediaId, // Contenido Base64 de la imagen
                    caption:message
                },
               // fallback_text: 'Mensaje de respaldo en caso de que la imagen no se cargue'
            };
    
            const response = await axios.post(url, requestBody, {
                headers: {
                    Authorization: `Bearer ${Token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            res.status(response.status).json(response.data);

        } catch (err) {
            console.error("upload", err.toJSON());
        }

    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});
//Get all contacts
/*app.get('/get-contacts', async (req, res) => {
    const contactos = client.getContacts();
    res.send(({ value: await client.getContacts() }));
})*/

//get about a contact
/*app.get('/get_about_contact', async (req, res) => {
    let idContact = req.query.idcliente;
    res.send(({ value: await client.getContactById(idContact) }))
})*/

//Get picture a contact
/*app.get('/get-picture-contact', async (req, res) => {
    let idContact = req.query.idcliente;
    res.send(({ value: await client.getProfilePicUrl(idContact) }));
})*/

//Get status a contact
/*app.get('/get-status-contact', async (req, res) => {
    let idContact = req.query.idcliente;
    res.send(({ value: await client.getState(idContact) }))
})*/
// Send message
/*app.post('/send-message', [
    body('number').notEmpty(),
    body('message').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req).formatWith(({
        msg
    }) => {
        return msg;
    });

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: errors.mapped()
        });
    }

    const number = phoneNumberFormatter(req.body.number);
    const message = req.body.message;

    const isRegisteredNumber = await checkRegisteredNumber(number);

    if (!isRegisteredNumber) {
        return res.status(422).json({
            status: false,
            message: 'The number is not registered'
        });
    }
    client.sendMessage(number, message).then(response => {
        res.status(200).json({
            status: true,
            response: response
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            response: err
        });
    });
});*/

/*app.post('/send-message-media', [
    body('number').notEmpty(),
    body('message').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req).formatWith(({
        msg
    }) => {
        return msg;
    });
    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: errors.mapped()
        });
    }
    const number = phoneNumberFormatter(req.body.number);
    const message = req.body.message;
    const urlImagen = req.body.imagenes;
    const isRegisteredNumber = await checkRegisteredNumber(number);
    if (!isRegisteredNumber) {
        return res.status(422).json({
            status: false,
            message: 'The number is not registered'
        });
    }
    const media = await MessageMedia.fromFilePath(urlImagen);
    client.sendMessage(number, media, {
        caption: message
    }).then(response => {
        res.status(200).json({
            status: true,
            response: response
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            response: err
        });
    });
});*/

// Send media
/*app.post('/send-media', async (req, res) => {
    const number = phoneNumberFormatter(req.body.number);
    const caption = req.body.caption;
    const fileUrl = req.body.file;

    // const media = MessageMedia.fromFilePath('./image-example.png');
    // const file = req.files.file;
    // const media = new MessageMedia(file.mimetype, file.data.toString('base64'), file.name);
    let mimetype;
    const attachment = await axios.get(fileUrl, {
        responseType: 'arraybuffer'
    }).then(response => {
        mimetype = response.headers['content-type'];
        return response.data.toString('base64');
    });

    const media = new MessageMedia(mimetype, attachment, 'Media');

    client.sendMessage(number, media, {
        caption: caption
    }).then(response => {
        res.status(200).json({
            status: true,
            response: response
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            response: err
        });
    });
});*/

/*const findGroupByName = async function (name) {
    const group = await client.getChats().then(chats => {
        return chats.find(chat =>
            chat.isGroup && chat.name.toLowerCase() == name.toLowerCase()
        );
    });
    return group;
}*/

// Send message to group
// You can use chatID or group name, yea!
/*app.post('/send-group-message', [
    body('id').custom((value, { req }) => {
        if (!value && !req.body.name) {
            throw new Error('Invalid value, you can use `id` or `name`');
        }
        return true;
    }),
    body('message').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req).formatWith(({
        msg
    }) => {
        return msg;
    });

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: errors.mapped()
        });
    }

    let chatId = req.body.id;
    const groupName = req.body.name;
    const message = req.body.message;

    // Find the group by name
    if (!chatId) {
        const group = await findGroupByName(groupName);
        if (!group) {
            return res.status(422).json({
                status: false,
                message: 'No group found with name: ' + groupName
            });
        }
        chatId = group.id._serialized;
    }

    client.sendMessage(chatId, message).then(response => {
        res.status(200).json({
            status: true,
            response: response
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            response: err
        });
    });
});*/

// Clearing message on spesific chat
/*app.post('/clear-message', [
    body('number').notEmpty(),
], async (req, res) => {
    const errors = validationResult(req).formatWith(({
        msg
    }) => {
        return msg;
    });

    if (!errors.isEmpty()) {
        return res.status(422).json({
            status: false,
            message: errors.mapped()
        });
    }

    const number = phoneNumberFormatter(req.body.number);

    const isRegisteredNumber = await checkRegisteredNumber(number);

    if (!isRegisteredNumber) {
        return res.status(422).json({
            status: false,
            message: 'The number is not registered'
        });
    }

    const chat = await client.getChatById(number);

    chat.clearMessages().then(status => {
        res.status(200).json({
            status: true,
            response: status
        });
    }).catch(err => {
        res.status(500).json({
            status: false,
            response: err
        });
    })
});*/

server.listen(port, function () {
    console.log('App running on *: ' + port);
});
