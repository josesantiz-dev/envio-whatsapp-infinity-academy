//Make Node.js API calls in this file

document.querySelector('#btnGuardarContacto').addEventListener('click', guardarContacto);

function guardarContacto(){
    var id = document.querySelector('#intId').value,
        nombreContacto = document.querySelector('#txtNombreContacto').value,
        apellidoPatContacto = document.querySelector('#txtApellidoPatContacto').value,
        apellidoMatContacto = document.querySelector('#txtApellidoMatContacto').value,
        telefonoContacto = document.querySelector('#txtTelefonoNuevo').value
        /* emailContacto = document.querySelector('#txtEmailNuevoContacto').value */

    crearContacto(id,nombreContacto,apellidoPatContacto,apellidoMatContacto,telefonoContacto);
}

function ObtenerListaContactos(){
    var listaContactos = getObtenerListaContactos(),
    tbody = document.querySelector('#tableContactos tbody');

    tbody.innerHTML = '';

    for (var i = 0; i < listaContactos.length; i++) {
        var row = tbody.insertRow(i),
            idcel = row.insert(0);
            nombreContactoCel = row.insertCell(1),
            apellidoPatContactoCel = row.insertCell(2),
            apellidoMatContacto = row.insertCell(3),
            telefonoContactoCel = row.insertCell(4);
            accionCel = row.insertCell(4);

        idcel.innerHTML = listaContactos[i].id;
        nombreContactoCel.innerHTML = listaContactos[i].nombre;
        apellidoPatContactoCel.innerHTML = listaContactos[i].apellidoPaterno;
        apellidoMatContacto.innerHTML = listaContactos[i].apellidoMaterno;
        telefonoContactoCel.innerHTML = listaContactos[i].telefono;

        var inputAcciones = document.createElement('input');
        inputAcciones.type = 'button';
        inputAcciones.value = list[i].id;
        accionCel.appendChild(inputAcciones);

        tbody.appendChild(row);
    }
}


/* document.querySelector('#btnGuardarContacto').addEventListener('click',(event) =>{
	ipc.send('abrirventana','crearContactos')
}) */
