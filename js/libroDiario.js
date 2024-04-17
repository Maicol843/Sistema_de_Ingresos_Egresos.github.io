// Cargar datos de inicio.html en la tabla
document.addEventListener("DOMContentLoaded", function () {
  const registrosGuardados = localStorage.getItem("registros");
  const tablaLibroDiarioBody = document.getElementById("tablaLibroDiarioBody");
  const totalDebeElement = document.getElementById("totalDebe");
  const totalHaberElement = document.getElementById("totalHaber");

  if (registrosGuardados) {
    const registros = JSON.parse(registrosGuardados);
    let folio = 1;
    let totalDebe = 0;
    let totalHaber = 0;

    registros.forEach((registro) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${folio}</td>
                        <td>${registro.fecha}</td>
                        <td>${registro.descripcion}</td>
                        <td>${registro.comprobante}</td>
                        <td>${
                          registro.cantidad < 0 ? -registro.cantidad : ""
                        }</td>
                        <td>${
                          registro.cantidad > 0 ? registro.cantidad : ""
                        }</td>
                    `;
      tablaLibroDiarioBody.appendChild(row);
      if (registro.cantidad > 0) {
        totalDebe += registro.cantidad;
      } else if (registro.cantidad < 0) {
        totalHaber += -registro.cantidad;
      }
      folio++;
    });
    // Mostrar totales
    totalDebeElement.textContent = totalDebe.toFixed(2);
    totalHaberElement.textContent = totalHaber.toFixed(2);
  }
});

//Función para descargar la tabla en formato png
function descargarTabla() {
  const tabla = document.getElementById("tablaLibroDiario");

  // Utilizar html2canvas para capturar la tabla como imagen
  html2canvas(tabla).then(function (canvas) {
    // Crear un enlace para descargar la imagen
    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");
    enlace.download = "libroDiario.png";

    // Simular un clic en el enlace para iniciar la descarga
    enlace.click();
  });
}