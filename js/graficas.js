// Configurar el gráfico de barras con datos iniciales vacíos
const ctx = document.getElementById("graficoBarras-Anual").getContext("2d");
// Obtener la sede almacenada en localStorage
const sedeSeleccionada = localStorage.getItem("sede") || "Sede No Seleccionada";
const graficoBarras = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ],
    datasets: [
      {
        label: "Ingresos",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: Array(12).fill(0),
      },
      {
        label: "Egresos",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: Array(12).fill(0),
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "black", // Cambia el color del texto de la leyenda a blanco
        },
      },
      title: {
        display: true,
        text: "Gráfica de Ingresos y Egresos Anual", // Aquí está el título que se añade
        color: "black", // Puedes cambiar el color del título
        font: {
          size: 16, // Puedes ajustar el tamaño del texto del título
        },
      },
      subtitle: {
        display: true,
        text: `Sede: ${sedeSeleccionada}`, // Subtítulo dinámico con la sede
        color: "black",
        font: {
          size: 14,
        },
      },
    },
  },
});

// ... (resto del código JavaScript)

function cargarDatosGraficoBarras() {
  const registrosGuardados = localStorage.getItem("registros");

  if (registrosGuardados) {
    const registros = JSON.parse(registrosGuardados);
    const ingresosPorMes = Array(12).fill(0);
    const egresosPorMes = Array(12).fill(0);

    registros.forEach((registro) => {
      const fecha = new Date(registro.fecha);
      const mes = fecha.getMonth() + 1; // Sumar 1 para ajustar el mes

      if (registro.cantidad > 0) {
        ingresosPorMes[mes - 1] += registro.cantidad; // Restar 1 para ajustar el índice del array
      } else if (registro.cantidad < 0) {
        egresosPorMes[mes - 1] += -registro.cantidad;
      }
    });

    // Actualizar los datos del gráfico
    graficoBarras.data.datasets[0].data = ingresosPorMes;
    graficoBarras.data.datasets[1].data = egresosPorMes;
    graficoBarras.update(); // Actualizar el gráfico
  }
}

// Llamar a cargarDatosGraficoBarras al cargar la página
cargarDatosGraficoBarras();

//Función para descargar la gráfica en formato png
function descargarGraficaAnual() {
  const tabla = document.getElementById("graficoBarras-Anual");

  // Utilizar html2canvas para capturar la tabla como imagen
  html2canvas(tabla).then(function (canvas) {
    // Crear un enlace para descargar la imagen
    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");
    enlace.download = "grafica_Anual.png";

    // Simular un clic en el enlace para iniciar la descarga
    enlace.click();
  });
}

function generarGraficaMes() {
  const mesSeleccionado = document.getElementById("selectMes").value;
  const registrosGuardados = localStorage.getItem("registros");

  if (registrosGuardados) {
    const registros = JSON.parse(registrosGuardados);
    const ingresosPorMes = [0]; // Inicializar array solo para el mes seleccionado
    const egresosPorMes = [0]; // Inicializar array solo para el mes seleccionado

    registros.forEach((registro) => {
      const fecha = new Date(registro.fecha);
      const mes = fecha.getMonth() + 1; // Sumar 1 para ajustar el mes

      if (mes === parseInt(mesSeleccionado, 10)) {
        if (registro.cantidad > 0) {
          ingresosPorMes[0] += registro.cantidad;
        } else if (registro.cantidad < 0) {
          egresosPorMes[0] += -registro.cantidad;
        }
      }
    });

    // Configurar el gráfico de barras para el mes seleccionado
    const ctx = document
      .getElementById("graficoBarras-Mensual")
      .getContext("2d");
    const graficoBarras = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Ingresos", "Egresos"],
        datasets: [
          {
            label: "Ingresos y Egresos",
            backgroundColor: [
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 99, 132, 0.2)",
            ],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
            data: [ingresosPorMes[0], egresosPorMes[0]],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "black", // Cambia el color del texto de la leyenda a blanco
            },
          },
          title: {
            display: true,
            text: "Gráfica de Ingresos y Egresos Mensual", // Aquí está el título que se añade
            color: "black", // Puedes cambiar el color del título
            font: {
              size: 16, // Puedes ajustar el tamaño del texto del título
            },
          },
          subtitle: {
            display: true,
            text: `Sede: ${sedeSeleccionada}`, // Subtítulo dinámico con la sede
            color: "black",
            font: {
              size: 14,
            },
          },
        },
      },
    });
  }
}

//Función para descargar la gráfica en formato png
function descargarGraficaMensual() {
  const tabla = document.getElementById("graficoBarras-Mensual");

  // Utilizar html2canvas para capturar la tabla como imagen
  html2canvas(tabla).then(function (canvas) {
    // Crear un enlace para descargar la imagen
    const enlace = document.createElement("a");
    enlace.href = canvas.toDataURL("image/png");
    enlace.download = "grafica_Mensual.png";

    // Simular un clic en el enlace para iniciar la descarga
    enlace.click();
  });
}

//Gráfico de tortas de los Ingresos y de los egresos
function cargarDatosGraficoTortas() {
  const registrosGuardados = localStorage.getItem("registros");

  if (registrosGuardados) {
    const registros = JSON.parse(registrosGuardados);
    let totalIngresos = 0;
    let totalEgresos = 0;

    registros.forEach((registro) => {
      if (registro.cantidad > 0) {
        totalIngresos += registro.cantidad;
      } else if (registro.cantidad < 0) {
        totalEgresos += -registro.cantidad;
      }
    });

    // Calcular porcentajes
    const porcentajeIngresos =
      (totalIngresos / (totalIngresos + totalEgresos)) * 100;
    const porcentajeEgresos =
      (totalEgresos / (totalIngresos + totalEgresos)) * 100;

    // Configurar el gráfico de torta para ingresos
    const ctxTortaIngresos = document
      .getElementById("graficoTortaIngresos")
      .getContext("2d");
    const datosTortaIngresos = {
      labels: ["Ingresos", "Otros"],
      datasets: [
        {
          data: [porcentajeIngresos, 100 - porcentajeIngresos],
          backgroundColor: [
            "rgba(75, 192, 192, 0.7)",
            "rgba(184, 183, 183, 0.3)",
          ],
        },
      ],
    };
    new Chart(ctxTortaIngresos, {
      type: "doughnut",
      data: datosTortaIngresos,
    });

    // Configurar el gráfico de torta para egresos
    const ctxTortaEgresos = document
      .getElementById("graficoTortaEgresos")
      .getContext("2d");
    const datosTortaEgresos = {
      labels: ["Egresos", "Otros"],
      datasets: [
        {
          data: [porcentajeEgresos, 100 - porcentajeEgresos],
          backgroundColor: [
            "rgba(255, 99, 132, 0.7)",
            "rgba(184, 183, 183, 0.3)",
          ],
        },
      ],
    };
    new Chart(ctxTortaEgresos, {
      type: "doughnut",
      data: datosTortaEgresos,
    });
  }
}

// Llamar a cargarDatosGraficoTortas al cargar la página
cargarDatosGraficoTortas();
