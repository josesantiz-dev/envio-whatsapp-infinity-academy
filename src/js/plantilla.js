const ipc = require('electron').ipcRenderer;
const url = require('url');
const path = require('path');
const {Plantila,Plantillas} = require('./plantillaClass');
const { table } = require('console');
let plantillas = new Plantillas;

const btnNuevaPlantilla = document.getElementById("btnNuevaPlantilla");
const tablePlantillas = document.querySelector('#tbl-plantillas tbody');
const txtNombre = document.getElementById("txtNombreContacto");
let txtDescripcion = document.getElementById("txtDescripcion");
const btnGuardar = document.getElementById("btnGuardarContacto");
const btnActualizar = document.getElementById("btnEditarPlantilla");
const btnAgregarImagenPlantilla = document.getElementById("agregarImagenPlantilla");

document.getElementById("menu-plantillas").classList.add("active");


document.addEventListener("DOMContentLoaded", function () {
    fnMostrarPlantillas(obtenerPlantillas());
    $("#txtDescripcion").emojioneArea({
        pickerPosition: "bottom"
    });
   $("#txtDescripcionEdit").emojioneArea({
        pickerPosition: "bottom"
    });
})

function obtenerPlantillas(){
    let plantillas = localStorage.getItem("plantillas");
    plantillas = (plantillas == null || plantillas == "[]")?[]:JSON.parse(plantillas);
    return plantillas;
}


function fnMostrarPlantillas(plantillas){
    let rows = "";
    let count = 0;
    plantillas.forEach(element => {
        count += 1;
        let estatus =(element.estatus == 1)?"Activo":"Innactivo";
        let imagenes = (element.listImagenes[0].path);
        let acciones = `<div class="text-center">
            <div class="btn-group">
                <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fas fa-layer-group"></i> &nbsp; Acciones
                </button>
                <div class="dropdown-menu">
                    <button id="btn-ver-plantilla" data-id="${element.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-ver-plantilla" title="Ver"> &nbsp;&nbsp; 
                        <i class="fas fa-eye icono-azul"></i> &nbsp; Ver
                    </button>
                    <div class="dropdown-divider">
                    </div>
                    <button id="btn-editar-plantilla" data-id="${element.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-editar-plantilla" title="Editar"> &nbsp;&nbsp;
                        <i class="fas fa-pencil-alt"></i> &nbsp; Editar
                    </button>
                    <div class="dropdown-divider">
                    </div>
                    <button id="btn-eliminar-plantila" data-id="${element.id}" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat"  title="Eliminar"> &nbsp;&nbsp;
                        <i class="far fa-trash-alt "></i> &nbsp; Eliminar
                    </button>
                </div>
            </div>
        </div>`;
        let row = `<tr><td>${count}</td><td>${element.nombre}</td><td><img width="38px" class="img-circle" src="${imagenes}" style="border-radius: 50%;"></td><td>${estatus}</td><td>${acciones}</td></tr>`;
        rows += row;
    });
    tablePlantillas.innerHTML = rows;
}

btnGuardar.addEventListener("click",function(){
    let formPlantillas = document.querySelector("#formPlantillas");
    let plantillasActuales = obtenerPlantillas();
    let id = plantillasActuales.length + 1;
    let nombre = txtNombre.value;
    let descripcion = txtDescripcion.textContent;
    let listaImagenes = [];
    let divImagenes = document.getElementById("div-imagenes");
    let inputImagenes = divImagenes.getElementsByTagName("input");
    if(inputImagenes.length > 0){
        for(let i = 0; i<inputImagenes.length; i++){
            if(inputImagenes[i].files.length > 0){
                let path = inputImagenes[i].files[0].path;
                let name = inputImagenes[i].files[0].name;
                listaImagenes.push({
                    path: path,
                    nombre: name
                })
            }
        }
    }
    if(nombre == "" || descripcion == ""){
        return false;
    }
    //plantillas.setPlantilla(id,nombre,descripcion); 
    plantillasActuales.push({
        id:id,
        nombre:nombre,
        descripcion:descripcion,
        listImagenes: listaImagenes,
        estatus:1,
        fechaCreacion:new Date(),
        fechaModificacion:""
    });
    localStorage.setItem("plantillas",JSON.stringify(plantillasActuales));
    //let plantillasGuardar = plantillasActuales.concat(plantillas.getPlantillas());
    //plantillasGuardar = JSON.stringify(plantillasGuardar);
    //localStorage.setItem("plantillas",plantillasGuardar);
    formPlantillas.reset();
    $("#modal-nueva-plantilla").modal("hide");
    fnMostrarPlantillas(obtenerPlantillas());
})

btnNuevaPlantilla.addEventListener('click', (event) =>{
    txtNombre.value = "";
    $("#txtDescripcion")[0].emojioneArea.setText("Hola, 🖐.");
 })

 tablePlantillas.addEventListener('click', function (e) {
    const btn = e.target.closest('button'); 
    if(btn == null){
        return false;
    }
    let tipoBoton = btn.id;
    switch (tipoBoton) {
        case "btn-ver-plantilla":
            fnVerPlantilla(btn);
            break;
        case "btn-editar-plantilla":
            fnEditarPlantilla(btn);
            break;
        case "btn-eliminar-plantila":
            fnEliminarPlantilla(btn);
            break;
        default:
            break;
    }
});

function fnVerPlantilla(value){
    let id = Number(value.dataset.id);
    let plantillas = obtenerPlantillas();
    let plantilla = plantillas.filter(x => x.id == id);
    if(plantilla.length > 0){
        document.getElementById("txtNombrePlantillaVer").value = plantilla[0].nombre;
        document.getElementById("txtDescripcionPlantillaVer").value = plantilla[0].descripcion;
    }
}

function fnEditarPlantilla(value){
    let id = Number(value.dataset.id);
    let plantillas = obtenerPlantillas();
    let plantilla = plantillas.filter(x => x.id == id);
    if(plantilla.length > 0){
        document.getElementById("idPlantillaEdit").value = plantilla[0].id;
        document.getElementById("txtNombreContactoEdit").value = plantilla[0].nombre;
        $("#txtDescripcionEdit")[0].emojioneArea.setText(plantilla[0].descripcion);
    }
}

function fnEliminarPlantilla(value){
    let id = Number(value.dataset.id);
    let plantillas = obtenerPlantillas();
    let plantilla = plantillas.filter(x => x.id != id);
    localStorage.setItem("plantillas",JSON.stringify(plantilla));
    fnMostrarPlantillas(obtenerPlantillas());
}

btnActualizar.addEventListener("click",function(){
    let plantillasActuales = obtenerPlantillas();
    let id = document.getElementById("idPlantillaEdit").value;
    let nombre = document.getElementById("txtNombreContactoEdit").value;
    let descripcion = document.getElementById("txtDescripcionEdit").textContent;
    if(id == "" || nombre == "" || descripcion == ""){
        return false;
    }
    let plantilla = plantillasActuales.filter(x => x.id == id);
    plantilla[0].nombre = nombre;
    plantilla[0].descripcion = descripcion;
    localStorage.setItem("plantillas",JSON.stringify(plantillasActuales));
    $("#modal-editar-plantilla").modal("hide");
    fnMostrarPlantillas(obtenerPlantillas());
})

