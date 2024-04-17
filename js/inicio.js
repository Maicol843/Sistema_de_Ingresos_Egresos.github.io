let registros = [];
let numeroFila = 1;

function mostrarCamposComprobante() {
  const tipoComprobante = document.getElementById("tipoComprobante").value;
  const numeroComprobante1 = document.getElementById("numeroComprobante1");
  const numeroComprobante2 = document.getElementById("numeroComprobante2");

  // Ocultar ambos campos
  numeroComprobante1.style.display = "none";
  numeroComprobante2.style.display = "none";

  if (
    tipoComprobante === "Factura A" ||
    tipoComprobante === "Factura B" ||
    tipoComprobante === "Factura C"
  ) {
    // Mostrar ambos campos si es Factura A, Factura B o Factura C
    numeroComprobante1.style.display = "inline";
    numeroComprobante2.style.display = "inline";
  } else {
    // Mostrar solo el segundo campo para Ticket, Recibo o Transferencia
    numeroComprobante2.style.display = "inline";
  }
}

function validarCamposObligatorios() {
  const formulario = document.getElementById("formularioIngresosEgresos");
  const camposObligatorios = [
    "fecha",
    "descripcion",
    "cantidad",
  ];

  for (const campo of camposObligatorios) {
    if (!formulario[campo].value) {
      alert(`El campo '${campo}' es obligatorio.`);
      return false;
    }
  }

  return true;
}

function registrarIngreso() {
  if (!validarCamposObligatorios()) {
    return;
  }

  const formulario = document.getElementById("formularioIngresosEgresos");
  const fecha = formulario.fecha.value;
  const descripcion = formulario.descripcion.value;
  const cantidad = parseFloat(formulario.cantidad.value);
  const tipoComprobante = formulario.tipoComprobante.value;
  const numeroComprobante1 = formulario.numeroComprobante1.value;
  const numeroComprobante2 = formulario.numeroComprobante2.value;

  const numeroComprobante = tipoComprobante.includes("Factura")
    ? `${numeroComprobante1}-${numeroComprobante2}`
    : numeroComprobante2;


  const ingreso = {
    fecha: fecha,
    descripcion: descripcion,
    comprobante: `${tipoComprobante} - ${numeroComprobante}`,
    cantidad: cantidad,
  };

  const egreso = {
    fecha: fecha,
    descripcion: 'Caja',
    comprobante: `${tipoComprobante} - ${numeroComprobante}`,
    cantidad: -cantidad,
  };

  registros.push(ingreso);
  registros.push(egreso);
  actualizarTabla();
  limpiarFormulario();

  // Almacenar registros en localStorage
  localStorage.setItem("registros", JSON.stringify(registros));
}

function registrarEgreso() {
  if (!validarCamposObligatorios()) {
    return;
  }

  const formulario = document.getElementById("formularioIngresosEgresos");
  const fecha = formulario.fecha.value;
  const descripcion = formulario.descripcion.value;
  const cantidad = parseFloat(formulario.cantidad.value);
  const tipoComprobante = formulario.tipoComprobante.value;
  const numeroComprobante1 = formulario.numeroComprobante1.value;
  const numeroComprobante2 = formulario.numeroComprobante2.value;

  const numeroComprobante = tipoComprobante.includes("Factura")
    ? `${numeroComprobante1}-${numeroComprobante2}`
    : numeroComprobante2;

  const ingreso = {
    fecha: fecha,
    descripcion: 'Caja',
    comprobante: `${tipoComprobante} - ${numeroComprobante}`,
    cantidad: cantidad,
  };

  const egreso = {
    fecha: fecha,
    descripcion: descripcion,
    comprobante: `${tipoComprobante} - ${numeroComprobante}`,
    cantidad: -cantidad, // Marcar la cantidad como negativa para egresos
  };

  registros.push(ingreso);
  registros.push(egreso);
  actualizarTabla();
  limpiarFormulario();

  // Almacenar registros en localStorage
  localStorage.setItem("registros", JSON.stringify(registros));
}

function agregarTransaccion(tipo, fecha, descripcion, cantidad) {
  const tabla = document.getElementById('tablaIngresosEgresos');
  const numFilas = tabla.rows.length;

  // Agregar la transacción en la tabla
  const row = tabla.insertRow(numFilas);
  const cellFecha = row.insertCell(0);
  const cellDescripcion = row.insertCell(1);
  const cellComprobante = row.insertCell(2);
  const cellCondicion = row.insertCell(3);
  const cellIngresos = row.insertCell(4);
  const cellEgresos = row.insertCell(5);

  cellNumero.textContent = numFilas - 1;
  cellFecha.textContent = fecha;
  cellDescripcion.textContent = descripcion;
  cellComprobante.textContent = "N/A";
  cellCondicion.textContent = "N/A";

  if (tipo === 'Ingreso') {
      cellIngresos.textContent = cantidad.toFixed(2);
      cellEgresos.textContent = "0.00";
  } else if (tipo === 'Egreso') {
      cellIngresos.textContent = "0.00";
      cellEgresos.textContent = cantidad.toFixed(2);
  }
}

function actualizarTabla() {
  const tabla = document.getElementById("tablaIngresosEgresos");
  const tbody = tabla.getElementsByTagName("tbody")[0];

  // Limpiar el contenido actual de la tabla
  tbody.innerHTML = "";

  // Agregar filas para ingresos y egresos
  registros.forEach((registro) => {
    agregarFilaTabla(registro);
  });

  // Actualizar totales
  actualizarTotales();
}

// Llamar a esta función al cargar la página
actualizarTabla();

function agregarFilaTabla(registro) {
  const tabla = document.getElementById("tablaIngresosEgresos");
  const tbody = tabla.getElementsByTagName("tbody")[0];
  const fila = tbody.insertRow();

  const columnas = [
    registro.fecha,
    registro.descripcion,
    registro.comprobante,
  ];

  if (registro.cantidad > 0) {
    columnas.push(registro.cantidad.toFixed(2), "-");
  } else {
    columnas.push("-", Math.abs(registro.cantidad).toFixed(2));
  }

  columnas.forEach((valor, index) => {
    const celda = fila.insertCell(index);
    celda.textContent = valor;
  });
}

function actualizarTotales() {
  const totalIngresos = registros
    .reduce(
      (total, registro) =>
        registro.cantidad > 0 ? total + registro.cantidad : total,
      0
    )
    .toFixed(2);
  const totalEgresos = Math.abs(
    registros.reduce(
      (total, registro) =>
        registro.cantidad < 0 ? total + registro.cantidad : total,
      0
    )
  ).toFixed(2);
  

  document.getElementById("totalIngresos").textContent = totalIngresos;
  document.getElementById("totalEgresos").textContent = totalEgresos;


  // Actualizar el contenido de las tarjetas (cards)
  document.getElementById("totalIngresosCard").textContent = totalIngresos;
  document.getElementById("totalEgresosCard").textContent = totalEgresos;
}

function limpiarFormulario() {
  document.getElementById("formularioIngresosEgresos").reset();
}

// Llamar a mostrarCamposComprobante al cargar la página
mostrarCamposComprobante();

//Funciones de los botones de reestablecer, eliminar y descargar
function reestablecerTabla() {
  registros = [];
  actualizarTabla();
  localStorage.removeItem("registros"); // Limpiar datos almacenados
}

function borrarUltimoRegistro() {
  registros.pop();
  actualizarTabla();
}


//Función para descargar la tabla en formato png
function descargarTabla() {
  const tabla = document.getElementById("tablaIngresosEgresos");

  // Utilizar html2canvas para capturar la tabla como imagen
  html2canvas(tabla).then(function (canvas) {
    // Crear un enlace para descargar la imagen
    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");
    enlace.download = "sistemas_ingresos_egresos.png";

    // Simular un clic en el enlace para iniciar la descarga
    enlace.click();
  });
}

function cargarDatosGuardados() {
  const registrosGuardados = localStorage.getItem("registros");

  if (registrosGuardados) {
    registros = JSON.parse(registrosGuardados);
    actualizarTabla();
  }
}

// Llamar a cargarDatosGuardados al cargar la página
cargarDatosGuardados();

//AJUSTES
function registrarAjuste() {
  // Obtener los valores del formulario
  const tipoAjuste = document.getElementById('tipoAjuste').value;
  const montoAjuste = document.getElementById('montoAjuste').value;

  // Guardar los datos en el almacenamiento local
  localStorage.setItem('ajusteTipo', tipoAjuste);
  localStorage.setItem('ajusteMonto', montoAjuste);

  // Mostrar alerta
  alert("Se ingresó el ajuste. Por favor, controla el prebalance en la página de informes.");
}