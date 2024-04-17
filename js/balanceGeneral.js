// Recuperar el dato guardado en localStorage
var datoRecuperado = localStorage.getItem("midato");
var datoRecuperado2 = localStorage.getItem("midato2");
var datoRecuperado3 = localStorage.getItem("midato3");
var datoRecuperado4 = localStorage.getItem("midato4");

// Mostrar el dato recuperado en la página
var mostrarDatoElement = document.getElementById("cajaBalance");
mostrarDatoElement.textContent = parseFloat(datoRecuperado).toFixed(2);

var mostrarDatoElement2 = document.getElementById('activoCorriente');
mostrarDatoElement2.innerHTML = `<span><i class="fa-solid fa-dollar-sign"> ${parseFloat(datoRecuperado).toFixed(2)}</span>`;

var mostrarDatoElement3 = document.getElementById('totalActivo');
mostrarDatoElement3.innerHTML = `<span><i class="fa-solid fa-dollar-sign"> ${parseFloat(datoRecuperado).toFixed(2)}</span>`;

var mostrarDatoElement4 = document.getElementById("capital");
mostrarDatoElement4.textContent = parseFloat(datoRecuperado2).toFixed(2);

var mostrarDatoElement4 = document.getElementById("resultado");
mostrarDatoElement4.textContent = parseFloat(datoRecuperado3).toFixed(2);

var mostrarDatoElement5 = document.getElementById("totalPN");
mostrarDatoElement5.innerHTML = `<span><i class="fa-solid fa-dollar-sign"> ${parseFloat(datoRecuperado4).toFixed(2)}</span>`;

var mostrarDatoElement6 = document.getElementById("totalPPN");
mostrarDatoElement6.innerHTML = `<span><i class="fa-solid fa-dollar-sign"> ${parseFloat(datoRecuperado4).toFixed(2)}</span>`;


//Función para descargar la tabla en formato png
function descargarTabla() {
    const tabla = document.getElementById("balance");

    // Utilizar html2canvas para capturar la tabla como imagen
    html2canvas(tabla).then(function (canvas) {
        // Crear un enlace para descargar la imagen
        const enlace = document.createElement("a");
        enlace.href = canvas.toDataURL("image/png");
        enlace.download = "balanceGeneral.png";

        // Simular un clic en el enlace para iniciar la descarga
        enlace.click();
    });
}

