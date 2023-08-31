const {app, BrowserWindow, ipcMain} = require('electron')
const url = require('url');
const path = require('path');
const { dialog } = require('electron')
const server = require('./app');
const log = require('electron-log');
const fs = require('fs');

let mainWindow

function configurarLog() {
  const logPath = path.join(__dirname, 'logs');
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }

  const logFilePath = path.join(logPath, 'app.log');
  log.transports.file.file = logFilePath;
  log.transports.console.level = 'debug';
  log.transports.file.format = '{h}:{i}:{s} {text}';
  log.transports.file.level = 'info';
  // Rotación manual del archivo de log cada día
  setInterval(() => {
    const fileSizeInBytes = fs.statSync(logFilePath).size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);

    if (fileSizeInMegabytes >= 5) {
      // Renombrar el archivo de log actual
      const timestamp = new Date().getTime();
      const rotatedLogFilePath = path.join(logPath, `app_${timestamp}.log`);
      fs.renameSync(logFilePath, rotatedLogFilePath);

      // Reiniciar el transporte de archivo para que el próximo log se escriba en un archivo nuevo
      log.transports.file.file = logFilePath;
      log.transports.file.open();
    }
  }, 24 * 60 * 60 * 1000); // 24 horas (un día) en milisegundos

  // Redirige la salida estándar y la salida de error a las funciones de registro de electron-log
  console.log = log.info.bind(log);
  console.warn = log.warn.bind(log);
  console.error = log.error.bind(log);
}

function createWindow () {
  
  configurarLog();


  mainWindow = new BrowserWindow({
    width: 1800,
    height: 820,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html');


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('resize', function(e,x,y){
  mainWindow.setSize(x, y);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})



ipcMain.on('abrirventana', (event, message) => {
  switch (message) {
      case 'crearContactos':
          crearContacto();
          break;
      case 'editarContactos':
          EditarContacto();
          break;
      case 'crearGrupos':
          crearGrupos();
          break;
      case 'plantillas':
          crearGrupos();
          break;
      /* case 'copiar-pegar':
          crearContactosCopiarPegar();
          break; */
      case 'contactos-masiva':
          importaContactosMasivos();
          break;
      case 'nuevaPlantilla':
          nuevaPlantilla();
          break;
      case 'nuevaCampana':
          crearCampana();
      default:
          break;
  }
})

//Crear contacto
function crearContacto(){
  nuevoContacto = new BrowserWindow({
    parent: mainWindow,
    modal: true,
      width:1200,
      height:820,
      title:'Nuevo contacto',
      webPreferences: {
          contextIsolation: false,
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
          enableRemoteModule: true
      }
  });
  /* nuevoContacto.setMenu(null); */
  nuevoContacto.loadURL(url.format({
      pathname:path.join(__dirname,'./view/nuevoContacto.html'),
      protocol:'file',
      slashes:true
  }))
  nuevoContacto.center();
  nuevoContacto.setResizable(false);
  nuevoContacto.on('closed',() =>{
      nuevoContacto = null;
  });
}

//Editar contacto
function EditarContacto(){
  editarContacto = new BrowserWindow({
    parent: mainWindow,
    modal: true,
      width:1200,
      height:820,
      title:'Editar contacto',
      webPreferences: {
          contextIsolation: false,
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
          enableRemoteModule: true
      }
  });
  /* nuevoContacto.setMenu(null); */
  editarContacto.loadURL(url.format({
      pathname:path.join(__dirname,'./view/editarContacto.html'),
      protocol:'file',
      slashes:true
  }))
  editarContacto.center();
  editarContacto.setResizable(false);
  editarContacto.on('closed',() =>{
      editarContacto = null;
  });
}

//Crear Grupos
function crearGrupos(){
  nuevoGrupos = new BrowserWindow({
    parent: mainWindow,
    modal: true,
      width:1200,
      height:820,
      title:'Nuevo grupo',
      webPreferences: {
          contextIsolation: false,
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
          enableRemoteModule: true
      }
  });
  nuevoGrupos.setMenu(null);
  nuevoGrupos.loadURL(url.format({
      pathname:path.join(__dirname,'./view/nuevoGrupo.html'),
      protocol:'file',
      slashes:true
  }))
  nuevoGrupos.center();
  nuevoGrupos.setResizable(false);
  nuevoGrupos.on('closed',() =>{
      nuevoGrupos = null;
  });
}

//Copiar y pegar
/* function crearContactosCopiarPegar(){
  copiarPegarContactos = new BrowserWindow({
      width:1200,
      height:820,
      title:'Crear contacto copiar y pegar',
      webPreferences: {
          contextIsolation: false,
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
          enableRemoteModule: true
      }
  });
  copiarPegarContactos.setMenu(null);
  copiarPegarContactos.loadURL(url.format({
      pathname:path.join(__dirname,'./view/copiarPegar.html'),
      protocol:'file',
      slashes:true
  }))
  copiarPegarContactos.center();
  copiarPegarContactos.setResizable(false);
  copiarPegarContactos.on('closed',() =>{
      copiarPegarContactos = null;
  });
} */

//Contactos masivos csv
function importaContactosMasivos(){
  contactoMasivos = new BrowserWindow({
    parent: mainWindow,
    modal: true,
      width:1200,
      height:820,
      title:'Contactos masivos',
      webPreferences: {
          contextIsolation: false,
          nodeIntegration: true,
          nodeIntegrationInWorker: true,
          enableRemoteModule: true
      }
  });
  contactoMasivos.setMenu(null);
  contactoMasivos.loadURL(url.format({
      pathname:path.join(__dirname,'./view/contactos-masivos.html'),
      protocol:'file',
      slashes:true
  }))
  contactoMasivos.center();
  contactoMasivos.setResizable(false);
  contactoMasivos.on('closed',() =>{
      contactoMasivos = null;
  });
}

//Nueva platilla
function nuevaPlantilla(){
  crearPlantilla = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    width:1200,
    height:820,
    title:'Nueva plantilla',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true
    }
  });
  crearPlantilla.setMenu(null);
  crearPlantilla.loadURL(url.format({
    pathname:path.join(__dirname,'./view/nuevaPlantilla.html'),
    protocol:'file',
    slashes:true
  }))
  crearPlantilla.center();
  crearPlantilla.setResizable(false);
  crearPlantilla.on('closed', () => {
    crearPlantilla = null;
  });
}

//Nueva campanas
function crearCampana(){
  nuevaCampana = new BrowserWindow({
    parent: mainWindow,
    modal: true,
    width:1200,
    height:820,
    title:'Nueva campaña',
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true
    }
  });
  nuevaCampana.setMenu(null);
  nuevaCampana.loadURL(url.format({
    pathname:path.join(__dirname,'./view/nuevaCampana.html'),
    protocol:'file',
    slashes:true
  }))
  nuevaCampana.center();
  nuevaCampana.setResizable(false);
  nuevaCampana.on('closed', () => {
    nuevaCampana = null;
  });
}

ipcMain.on('log', (event, message) => {
  switch (message.tipo) {
      case 'error':
        log.error(message.msg);
          break;
      case 'info':
        log.info(message.msg);
        break;
      case 'warn':
          log.warn(message.msg);
          break;
  }
})