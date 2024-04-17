// Función para iniciar sesión
function iniciarSesion() {
    // Obtener el valor seleccionado en el select
    const sedeSeleccionada = document.getElementById('sede').value;

    // Almacenar la sede en el localStorage
    localStorage.setItem("sede", sedeSeleccionada);

    // Redirigir a la otra página
    window.location.href = 'html/inicio.html';
}