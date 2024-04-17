document.addEventListener("DOMContentLoaded", function () {
    // Obtener la sede del localStorage
    const sede = localStorage.getItem("sede");

    // Colocar la sede en el elemento span del header
    document.getElementById("sede").textContent = sede || "Invitado";
    document.getElementById("envio").textContent = sede; 
});

function cerrarSesion() {
    // Limpiar la sede del localStorage al cerrar sesión
    localStorage.removeItem("sede");

    // Redirigir a la página de inicio de sesión
    window.location.href = '../index.html';
}