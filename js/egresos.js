function cargarDatosGuardadosEgresos() {
  const registrosGuardados = localStorage.getItem("registros");

  if (registrosGuardados) {
    const registros = JSON.parse(registrosGuardados);
    const tablaEgresos = document.getElementById("tablaEgresos");
    const totalEgresosElement = document.getElementById("totalEgresos");
    let numeroFila = 1;
    let totalEgresos = 0;

    registros.forEach((registro) => {
      if (registro.cantidad < 0) {
        const fila = tablaEgresos.insertRow();
        const columnas = [
          numeroFila++,
          registro.fecha,
          registro.descripcion,
          (-registro.cantidad).toFixed(2), // Mostrar el monto de egresos como positivo
        ];

        columnas.forEach((valor, index) => {
          const celda = fila.insertCell(index);
          celda.textContent = valor;
        });

        // Sumar al total de egresos
        totalEgresos += parseFloat(-registro.cantidad);
      }
    });

    // Actualizar el total en el tfoot
    totalEgresosElement.textContent = totalEgresos.toFixed(2);
  }
}

// Llamar a cargarDatosGuardadosEgresos al cargar la página
cargarDatosGuardadosEgresos();

//Función para descargar la tabla en formato png
function descargarTabla() {
  const tabla = document.getElementById("tabla-Egresos");

  // Utilizar html2canvas para capturar la tabla como imagen
  html2canvas(tabla).then(function (canvas) {
    // Crear un enlace para descargar la imagen
    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");
    enlace.download = "tabla_egresos.png";

    // Simular un clic en el enlace para iniciar la descarga
    enlace.click();
  });
}
