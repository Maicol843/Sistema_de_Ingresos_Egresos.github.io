// Cargar datos de libroDiario.html en la tabla
document.addEventListener("DOMContentLoaded", function () {
  const registrosGuardados = localStorage.getItem("registros");
  const tablaSumasSaldosBody = document.getElementById("tablaSumasSaldosBody");
  const totalDebeElement = document.getElementById("totalDebe");
  const totalHaberElement = document.getElementById("totalHaber");
  const totalDeudorElement = document.getElementById("totalDeudor");
  const totalAcreedorElement = document.getElementById("totalAcreedor");

  if (registrosGuardados) {
    const registros = JSON.parse(registrosGuardados);
    const cuentas = new Map(); // Mapa para almacenar cuentas agrupadas por nombre
    let totalDebe = 0;
    let totalHaber = 0;
    let totalDeudor = 0;
    let totalAcreedor = 0;

    registros.forEach((registro, index) => {
      const nombreCuenta = registro.descripcion;
      const debe = registro.cantidad < 0 ? -registro.cantidad : 0;
      const haber = registro.cantidad > 0 ? registro.cantidad : 0;

      // Verificar si la cuenta ya existe en el mapa
      if (cuentas.has(nombreCuenta)) {
        const cuentaExistente = cuentas.get(nombreCuenta);
        cuentaExistente.debe += debe;
        cuentaExistente.haber += haber;
      } else {
        // Si no existe, crear una nueva entrada en el mapa
        cuentas.set(nombreCuenta, {
          nombre: nombreCuenta,
          debe: debe,
          haber: haber,
        });
      }

      totalDebe += debe;
      totalHaber += haber;
    });

    // Mostrar las cuentas en la tabla
    let folio = 1;
    cuentas.forEach((cuenta) => {
      const row = document.createElement("tr");
      const deudor =
        cuenta.debe > cuenta.haber ? cuenta.debe - cuenta.haber : 0;
      const acreedor =
        cuenta.haber > cuenta.debe ? cuenta.haber - cuenta.debe : 0;

      row.innerHTML = `
                        <td>${folio}</td>
                        <td>${cuenta.nombre}</td>
                        <td>${cuenta.debe.toFixed(2)}</td>
                        <td>${cuenta.haber.toFixed(2)}</td>
                        <td>${deudor.toFixed(2)}</td>
                        <td>${acreedor.toFixed(2)}</td>
                    `;
      tablaSumasSaldosBody.appendChild(row);

      totalDeudor += deudor;
      totalAcreedor += acreedor;

      folio++;
    });

    // Mostrar totales
    totalDebeElement.textContent = totalDebe.toFixed(2);
    totalHaberElement.textContent = totalHaber.toFixed(2);
    totalDeudorElement.textContent = totalDeudor.toFixed(2);
    totalAcreedorElement.textContent = totalAcreedor.toFixed(2);
  }

  // Guardar los datos en el localStorage
  localStorage.setItem('libroSumasSaldosData', JSON.stringify(data));

});

//Función para descargar la tabla en formato png
function descargarTabla() {
  const tabla = document.getElementById("libroSumasSaldos");

  // Utilizar html2canvas para capturar la tabla como imagen
  html2canvas(tabla).then(function (canvas) {
    // Crear un enlace para descargar la imagen
    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");
    enlace.download = "libroSumasSaldos.png";

    // Simular un clic en el enlace para iniciar la descarga
    enlace.click();
  });
}