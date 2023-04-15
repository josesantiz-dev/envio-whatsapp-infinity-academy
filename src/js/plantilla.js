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

document.getElementById("menu-plantillas").classList.add("active");


document.addEventListener("DOMContentLoaded", function () {
    fnMostrarPlantillas(obtenerPlantillas());
    $("#txtDescripcion").emojioneArea({
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
        console.log(element)
        count += 1;
        let estatus =(element.estatus == 1)?"Activo":"Innactivo";
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
                    <button id="btn-editar-plantilla" class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" data-toggle="modal" data-target="#modal-editar-plantilla" title="Editar"> &nbsp;&nbsp;
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
        let row = `<tr><td>${count}</td><td>${element.nombre}</td><td>${estatus}</td><td>${acciones}</td></tr>`;
        rows += row;
    });
    tablePlantillas.innerHTML = rows;
}

btnGuardar.addEventListener("click",function(){
    let plantillasActuales = obtenerPlantillas();
    let nuevoId = plantillasActuales.length + 1;
    let nombre = txtNombre.value;
    let descripcion = txtDescripcion.textContent;
    if(nombre == "" || descripcion == ""){
        return false;
    }
    plantillas.setPlantilla(nuevoId,nombre,descripcion); 
    let plantillasGuardar = plantillasActuales.concat(plantillas.getPlantillas());
    plantillasGuardar = JSON.stringify(plantillasGuardar);
    localStorage.setItem("plantillas",plantillasGuardar);
    $("#modal-nueva-plantilla").modal("hide");
    fnMostrarPlantillas(obtenerPlantillas());
})

btnNuevaPlantilla.addEventListener('click', (event) =>{
    txtNombre.value = "";
    $(".emojionearea-editor").html('Hola, 🖐.');
 })

 tablePlantillas.addEventListener('click', function (e) {
    const btn = e.target.closest('button'); 
    let tipoBoton = btn.id;
    console.log(tipoBoton)
    switch (tipoBoton) {
        case "btn-ver-plantilla":
            fnVerPlantilla(btn);
            break;
        case "btn-eliminar-plantila":
            fnEliminarPlantilla(btn);
            break;
        default:
            break;
    }
    /*if(btn != null){
        fnVerPlantilla(btn)
    } */
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

function fnEliminarPlantilla(value){
    let id = Number(value.dataset.id);
    let plantillas = obtenerPlantillas();
    let plantilla = plantillas.filter(x => x.id != id);
    localStorage.setItem("plantillas",JSON.stringify(plantilla));
    fnMostrarPlantillas(obtenerPlantillas());
}
