const {app, BrowserWindow, ipcMain} = require('electron')
const url = require('url');
const path = require('path');
const { dialog } = require('electron')
const server = require('./app');

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1800,
    height: 820,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')
  

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

//Crear Grupos
function crearGrupos(){
  nuevoGrupos = new BrowserWindow({
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