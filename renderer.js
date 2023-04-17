//Make Node.js API calls in this file

document.querySelector('#btnGuardarContacto').addEventListener('click', guardarContacto);

function guardarContacto(){
    var id = document.querySelector('#intId').value,
        nombreContacto = document.querySelector('#txtNombreContacto').value,
        apellidoPatContacto = document.querySelector('#txtApellidoPatContacto').value,
        apellidoMatContacto = document.querySelector('#txtApellidoMatContacto').value,
        telefonoContacto = document.querySelector('#txtTelefonoNuevo').value

        if(nombreContacto == '' || apellidoPatContacto == '' || apellidoMatContacto == '' || telefonoContacto == '') {
            console.log("Algunos campos estan vacios");
            return false;
        }

    crearNuevoContacto(id,nombreContacto,apellidoPatContacto,apellidoMatContacto,telefonoContacto);
    ObtenerListaContactos();
}

function ObtenerListaContactos(){
    var listaContactos = getObtenerListaContactos(),
    tbody = document.querySelector('#tableContactos tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < listaContactos.length; i++) {
        var row = tbody.insertRow(i),
            idcel = row.insertCell(0);
            nombreContactoCel = row.insertCell(1),
            apellidoPatContactoCel = row.insertCell(2),
            apellidoMatContacto = row.insertCell(3),
            telefonoContactoCel = row.insertCell(4);
            accionCel = row.insertCell(5);

        idcel.innerHTML = listaContactos[i].id;
        nombreContactoCel.innerHTML = listaContactos[i].nombre;
        apellidoPatContactoCel.innerHTML = listaContactos[i].apellidoPaterno;
        apellidoMatContacto.innerHTML = listaContactos[i].apellidoMaterno;
        telefonoContactoCel.innerHTML = listaContactos[i].telefono;
        accionCel.innerHTML = `<div class="text-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-layer-group"></i> &nbsp; Acciones
                                    </button>
                                    <div class="dropdown-menu">
                                        <button class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" onClick="fntEditContactos(this)" title="Editar"> &nbsp;&nbsp;
                                            <i class="fas fa-pencil-alt"></i> &nbsp; Editar
                                        </button>
                                        <div class="dropdown-divider"></div>
                                        <button class="dropdown-item btn btn-outline-secondary btn-sm btn-flat" onClick="fntDelContactos(this)" title="Eliminar"> &nbsp;&nbsp;
                                            <i class="far fa-trash-alt "></i> &nbsp; Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>`;

        /* var inputAcciones = document.createElement('input');
        inputAcciones.type = 'button';
        inputAcciones.value = listaContactos[i].id;
        accionCel.appendChild(inputAcciones); */
        accionCel.value = listaContactos[i].id;

        tbody.appendChild(row);
    }
}


/* document.querySelector('#btnGuardarContacto').addEventListener('click',(event) =>{
	ipc.send('abrirventana','crearContactos')
}) */
