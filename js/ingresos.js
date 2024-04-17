function cargarDatosGuardadosIngresos() {
  const registrosGuardados = localStorage.getItem("registros");

  if (registrosGuardados) {
    const registros = JSON.parse(registrosGuardados);
    const tablaIngresos = document.getElementById("tablaIngresos");
    const totalIngresosElement = document.getElementById("totalIngresos");
    let numeroFila = 1;
    let totalIngresos = 0;

    registros.forEach((registro) => {
      if (registro.cantidad > 0) {
        const fila = tablaIngresos.insertRow();
        const columnas = [
          numeroFila++,
          registro.fecha,
          registro.descripcion,
          registro.cantidad.toFixed(2),
        ];

        columnas.forEach((valor, index) => {
          const celda = fila.insertCell(index);
          celda.textContent = valor;
        });
        // Sumar al total de ingresos
        totalIngresos += parseFloat(registro.cantidad);
      }
    });
    // Actualizar el total en el tfoot
    totalIngresosElement.textContent = totalIngresos.toFixed(2);
  }
}

// Llamar a cargarDatosGuardadosIngresos al cargar la página
cargarDatosGuardadosIngresos();

//Función para descargar la tabla en formato png
function descargarTabla() {
  const tabla = document.getElementById("tabla-Ingresos");

  // Utilizar html2canvas para capturar la tabla como imagen
  html2canvas(tabla).then(function (canvas) {
    // Crear un enlace para descargar la imagen
    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");
    enlace.download = "tabla_ingresos.png";

    // Simular un clic en el enlace para iniciar la descarga
    enlace.click();
  });
}