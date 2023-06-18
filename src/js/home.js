document.getElementById("menu-home").classList.add("active");

const btnCerrarSesion = document.querySelector(".btn-cerrar-sesion");

btnCerrarSesion.addEventListener('click',function(){
    localStorage.setItem("connect","false");
    location.reload(true);
} )