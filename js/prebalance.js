
// Cargar datos de libroDiario.html en la tabla
document.addEventListener("DOMContentLoaded", function () {
    const registrosGuardados = localStorage.getItem("registros");
    const tablaPrebalanceBody = document.getElementById("prebalanceBody");

    if (registrosGuardados) {
        const registros = JSON.parse(registrosGuardados);
        const cuentas = new Map(); // Mapa para almacenar cuentas agrupadas por nombre
        let totalDebe = 0;
        let totalHaber = 0;
        let totalDeudor = 0;
        let totalAcreedor = 0;
        let totalDebeAjuste = 0;
        let totalHaberAjuste = 0;
        let totalDeudorAjustado = 0;
        let totalAcreedorAjustado = 0;
        let totalResultadoNegativo = 0;
        let totalResultadoPositivo = 0;
        let cajaDebe = 0;
        let cajaHaber = 0;
        let totalCajaDebe = 0;
        let totalCajaHaber = 0;
        let totalCajaDeudor = 0;
        let totalCajaAcreedor = 0;
        let totalCajaDeudorAjustado = 0;
        let totalCajaAcreedorAjustado = 0;
        let activo = 0;
        let activo2 = 0;
        let ppn = 0;
        let totalResultadoEjercicio = 0;
        let totalPPN = 0;

        registros.forEach((registro, index) => {
            const nombreCuenta = registro.descripcion;
            const debe = registro.cantidad > 0 ? registro.cantidad : 0;
            const haber = registro.cantidad < 0 ? -registro.cantidad : 0;

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

            if ((nombreCuenta === 'Servicios de fotocopias') || (nombreCuenta === 'Gestión de formularios')
                || (nombreCuenta === 'Bonos contribución') || (nombreCuenta === 'Lotas') ||
                (nombreCuenta === 'Rifas') || (nombreCuenta === 'Certificaciones') || (nombreCuenta === 'Donaciones')
                || (nombreCuenta === 'Ayuda económica') || (nombreCuenta === 'Ventas') || (nombreCuenta === 'Caja') || 
                (nombreCuenta === 'Capital')) {
                totalDebe += debe;
                document.getElementById('sumas-haber').textContent = totalDebe.toFixed(2);
                document.getElementById('total-sumas-haber').textContent = totalDebe.toFixed(2);
            }

            if ((nombreCuenta === 'Pasajes') || (nombreCuenta === 'Fotocopias') || (nombreCuenta === 'Fletes') || (nombreCuenta === 'Artículos de librería')
                || (nombreCuenta === 'Insumos informáticos') || (nombreCuenta === 'Libros') || (nombreCuenta === 'Formularios')
                || (nombreCuenta === 'Reparación y mantenimiento') || (nombreCuenta === 'Artículos de limpieza') ||
                (nombreCuenta === 'Servicios de limpieza y fumigación') || (nombreCuenta === 'Materiales didácticos') ||
                (nombreCuenta === 'Artículos deportivos') || (nombreCuenta === 'Servicios de internet') || (nombreCuenta === 'Seguros')
                || (nombreCuenta === 'Caja') || (nombreCuenta === 'Mercaderias')) {
                totalHaber += haber;
                document.getElementById('sumas-debe').textContent = totalDebe.toFixed(2);
                document.getElementById('total-sumas-debe').textContent = totalDebe.toFixed(2);
            }

            if (nombreCuenta === 'Sobrante de caja') {
                totalDebeAjuste += debe;
            }

            if (nombreCuenta === 'Faltante de caja') {
                totalHaberAjuste += haber;

            }
            document.getElementById('sumas-debe').textContent = (parseFloat(totalDebe) - parseFloat(totalHaberAjuste)).toFixed(2);
            document.getElementById('total-sumas-debe').textContent = (parseFloat(totalDebe) - parseFloat(totalHaberAjuste)).toFixed(2);
            document.getElementById('sumas-haber').textContent = (parseFloat(totalDebe) - parseFloat(totalHaberAjuste)).toFixed(2);
            document.getElementById('total-sumas-haber').textContent = (parseFloat(totalDebe) - parseFloat(totalHaberAjuste)).toFixed(2);
        });


        let folio = 1;

        cuentas.forEach((cuenta) => {
            const row = document.createElement("tr");
            const deudor =
                cuenta.debe > cuenta.haber ? cuenta.debe - cuenta.haber : 0;
            const acreedor =
                cuenta.haber > cuenta.debe ? cuenta.haber - cuenta.debe : 0;

            if ((cuenta.nombre === 'Servicios de fotocopias') || (cuenta.nombre === 'Gestión de formularios')
                || (cuenta.nombre === 'Bonos contribución') || (cuenta.nombre === 'Lotas') ||
                (cuenta.nombre === 'Rifas') || (cuenta.nombre === 'Certificaciones') || (cuenta.nombre === 'Donaciones')
                || (cuenta.nombre === 'Ayuda económica') || (cuenta.nombre === 'Ventas')) {
                row.innerHTML = `
                        <td>${folio}</td>
                        <td>${cuenta.nombre}</td>
                        <td>0.00</td>
                        <td>${cuenta.debe.toFixed(2)}</td>
                        <td>0.00</td>
                        <td>${deudor.toFixed(2)}</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>${cuenta.debe.toFixed(2)}</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>${cuenta.debe.toFixed(2)}</td>
                        `;
                tablaPrebalanceBody.appendChild(row);
                totalDeudor += 0.00;
                totalAcreedor += deudor;
                totalDeudorAjustado += 0.00;
                totalResultadoPositivo += deudor;

            } else if (cuenta.nombre === 'Capital') {
                ppn += cuenta.debe;
                row.innerHTML = `
                        <td>${folio}</td>
                        <td>${cuenta.nombre}</td>
                        <td>0.00</td>
                        <td>${cuenta.debe.toFixed(2)}</td>
                        <td>0.00</td>
                        <td>${deudor.toFixed(2)}</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        <td>${deudor.toFixed(2)}</td>
                        <td>0.00</td>
                        <td>${ppn.toFixed(2)}</td>
                        <td>0.00</td>
                        <td>0.00</td>
                        `;
                        totalAcreedor += deudor;
                tablaPrebalanceBody.appendChild(row);
            } else if ((cuenta.nombre === 'Pasajes') || (cuenta.nombre === 'Fotocopias') || (cuenta.nombre === 'Fletes') || (cuenta.nombre === 'Artículos de librería')
                || (cuenta.nombre === 'Insumos informáticos') || (cuenta.nombre === 'Libros') || (cuenta.nombre === 'Formularios')
                || (cuenta.nombre === 'Reparación y mantenimiento') || (cuenta.nombre === 'Artículos de limpieza') ||
                (cuenta.nombre === 'Servicios de limpieza y fumigación') || (cuenta.nombre === 'Materiales didácticos') ||
                (cuenta.nombre === 'Artículos deportivos') || (cuenta.nombre === 'Servicios de internet') || (cuenta.nombre === 'Seguros') || (cuenta.nombre === 'Ventas')) {
                row.innerHTML = `
                    <td>${folio}</td>
                    <td>${cuenta.nombre}</td>
                    <td>${cuenta.haber.toFixed(2)}</td>
                    <td>0.00</td>
                    <td>${acreedor.toFixed(2)}</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>${cuenta.haber.toFixed(2)}</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>${cuenta.haber.toFixed(2)}</td>
                    <td>0.00</td>
                    `;
                tablaPrebalanceBody.appendChild(row);
                totalDeudor += acreedor;
                
                totalAcreedorAjustado += acreedor;
                totalResultadoNegativo += acreedor;
            } else if (cuenta.nombre === 'Mercaderias'){
                activo2 = cuenta.haber;
                row.innerHTML = `
                    <td>${folio}</td>
                    <td>${cuenta.nombre}</td>
                    <td>${cuenta.haber.toFixed(2)}</td>
                    <td>0.00</td>
                    <td>${acreedor.toFixed(2)}</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>${cuenta.haber.toFixed(2)}</td>
                    <td>0.00</td>
                    <td>${cuenta.haber.toFixed(2)}</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    `;
                tablaPrebalanceBody.appendChild(row);
                totalDeudor += acreedor;
                
                totalAcreedorAjustado += acreedor;
            } else if (cuenta.nombre === 'Sobrante de caja') {
                row.innerHTML = `
                <td>${folio}</td>
                <td>${cuenta.nombre}</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>${cuenta.debe.toFixed(2)}</td>
                <td>0.00</td>
                <td>${cuenta.debe.toFixed(2)}</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>${cuenta.debe.toFixed(2)}</td>
                `;
                tablaPrebalanceBody.appendChild(row);
                totalDeudorAjustado += deudor;
                totalResultadoPositivo += deudor;
            } else if (cuenta.nombre === 'Faltante de caja') {
                row.innerHTML = `
                    <td>${folio}</td>
                    <td>${cuenta.nombre}</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>${cuenta.haber.toFixed(2)}</td>
                    <td>0.00</td>
                    <td>${cuenta.haber.toFixed(2)}</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>${cuenta.haber.toFixed(2)}</td>
                    <td>0.00</td>
                    `;
                tablaPrebalanceBody.appendChild(row);
                totalAcreedorAjustado += acreedor;
                totalResultadoNegativo += acreedor;
            } else if(cuenta.nombre === 'Caja'){
                cajaDebe += cuenta.haber;
                cajaHaber += cuenta.debe;
                totalCajaDebe = (parseFloat(cajaDebe) - parseFloat(totalDebeAjuste)).toFixed(2);
                totalCajaHaber = (parseFloat(cajaHaber) - parseFloat(totalHaberAjuste)).toFixed(2);

                if (totalCajaDebe > totalCajaHaber) {
                    totalCajaDeudor = (parseFloat(totalCajaDebe) - parseFloat(totalCajaHaber)).toFixed(2);
                    totalCajaAcreedor = '0.00';
                } 
                
                if (totalCajaHaber > totalCajaDebe) {
                    totalCajaDeudor = '0.00';
                    totalCajaAcreedor = (parseFloat(totalCajaDebe) - parseFloat(totalCajaHaber)).toFixed(2);
                }

                if (totalCajaDeudor > totalCajaAcreedor) {
                    totalCajaDeudorAjustado = parseFloat(totalCajaDeudor - totalCajaAcreedor  + totalDebeAjuste - totalHaberAjuste).toFixed(2);
                    totalCajaAcreedorAjustado = '0.00'
                } else if (totalCajaAcreedor > totalCajaDeudor) {
                    totalCajaAcreedorAjustado = parseFloat(totalCajaAcreedor - totalCajaDeudor - totalDebeAjuste + totalHaberAjuste).toFixed(2);
                    totalCajaDeudorAjustado = '0.00'
                }

                if (totalCajaDeudorAjustado > totalCajaAcreedorAjustado) {
                    activo = totalCajaDeudorAjustado;
                } else if (totalCajaAcreedorAjustado > totalCajaDeudorAjustado) {
                    activo = totalCajaAcreedorAjustado;
                }
                row.innerHTML = `
                <td>${folio}</td>
                <td>${cuenta.nombre}</td>
                <td>${totalCajaDebe}</td>
                <td>${totalCajaHaber}</td>
                <td>${totalCajaDeudor}</td>
                <td>${totalCajaAcreedor}</td>
                <td>${totalDebeAjuste.toFixed(2)}</td>
                <td>${totalHaberAjuste.toFixed(2)}</td>
                <td>${totalCajaDeudorAjustado}</td>
                <td>${totalCajaAcreedorAjustado}</td>
                <td>${activo}</td>
                <td>0.00</td>
                <td>0.00</td>
                <td>0.00</td>
                `;
                tablaPrebalanceBody.appendChild(row);
                totalCajaDeudor += acreedor;
                totalCajaAcreedor += deudor;
                totalDeudorAjustado += deudor;
                totalAcreedorAjustado += acreedor;
            }

            folio++;

            if (totalResultadoPositivo > totalResultadoNegativo) {
                resultadoEjercicioNegativo = parseFloat(totalResultadoPositivo - totalResultadoNegativo).toFixed(2);
                resultadoEjercicioPositivo = 0.00;
                totalRN = parseFloat(totalResultadoNegativo) + parseFloat(resultadoEjercicioNegativo);
                totalResultadoEjercicio = resultadoEjercicioNegativo;

                //RESULTADO DE EJERCICIO
                document.getElementById('resultadoEjercicioPositivo').textContent = parseFloat(resultadoEjercicioNegativo).toFixed(2);
                document.getElementById('resultadoEjercicioNegativo').textContent = parseFloat(resultadoEjercicioPositivo).toFixed(2);
                document.getElementById('total-rn').textContent = parseFloat(totalRN).toFixed(2);
                document.getElementById('total-rp').textContent = parseFloat(totalResultadoPositivo).toFixed(2);
                document.getElementById('resultadoEjercicio').textContent = parseFloat(resultadoEjercicioNegativo).toFixed(2);
                
                //RESULTADOS NEGATIVOS
                document.getElementById('rn').textContent = parseFloat(totalResultadoNegativo).toFixed(2);

                //RESULTADOS POSITIVOS
                document.getElementById('rp').textContent =parseFloat(totalResultadoPositivo).toFixed(2);

            } else if (totalResultadoNegativo > totalResultadoPositivo) {
                resultadoEjercicioPositivo = parseFloat(totalResultadoNegativo - totalResultadoPositivo).toFixed(2);
                resultadoEjercicioNegativo = 0;
                totalRP = (parseFloat(totalResultadoPositivo) + parseFloat(resultadoEjercicioPositivo)).toFixed(2);
                totalResultadoEjercicio = resultadoEjercicioPositivo;

                //RESULTADO DE EJERCICIO
                document.getElementById('resultadoEjercicioPositivo').textContent = parseFloat(resultadoEjercicioNegativo).toFixed(2);
                document.getElementById('resultadoEjercicioNegativo').textContent = parseFloat(resultadoEjercicioPositivo).toFixed(2);
                document.getElementById('total-rp').textContent = parseFloat(totalRP).toFixed(2);
                document.getElementById('total-rn').textContent = parseFloat(totalResultadoNegativo).toFixed(2);
                document.getElementById('resultadoEjercicio').textContent = parseFloat(resultadoEjercicioPositivo).toFixed(2);
            
                //RESULTADOS NEGATIVOS
                document.getElementById('rn').textContent = parseFloat(totalResultadoNegativo).toFixed(2);

                //RESULTADOS POSITIVOS
                document.getElementById('rp').textContent =parseFloat(totalResultadoPositivo).toFixed(2);
            }
        });
        //SALDOS
        document.getElementById('saldos-deudor').textContent = (parseFloat(totalDeudor) + parseFloat(totalCajaDeudor)).toFixed(2);
        document.getElementById('saldos-acreedor').textContent = (parseFloat(totalDeudor) + parseFloat(totalCajaDeudor)).toFixed(2) ;
        document.getElementById('total-saldos-deudor').textContent = (parseFloat(totalDeudor) + parseFloat(totalCajaDeudor)).toFixed(2);
        document.getElementById('total-saldos-acreedor').textContent = (parseFloat(totalDeudor) + parseFloat(totalCajaDeudor)).toFixed(2);

        //AJUSTES
        document.getElementById('ajustes-debe').textContent = (parseFloat(totalDebeAjuste) + parseFloat(totalHaberAjuste)).toFixed(2);
        document.getElementById('total-ajustes-debe').textContent = (parseFloat(totalDebeAjuste) + parseFloat(totalHaberAjuste)).toFixed(2);
        document.getElementById('ajustes-haber').textContent = (parseFloat(totalDebeAjuste) + parseFloat(totalHaberAjuste)).toFixed(2);
        document.getElementById('total-ajustes-haber').textContent = (parseFloat(totalDebeAjuste) + parseFloat(totalHaberAjuste)).toFixed(2);

        //SALDOS AJUSTADOS
        document.getElementById('saldosAjustados-deudor').textContent = (parseFloat(totalAcreedorAjustado)).toFixed(2);
        document.getElementById('saldosAjustados-acreedor').textContent = (parseFloat(totalAcreedorAjustado)).toFixed(2);
        document.getElementById('total-saldosAjustados-deudor').textContent = (parseFloat(totalAcreedorAjustado)).toFixed(2);
        document.getElementById('total-saldosAjustados-acreedor').textContent = (parseFloat(totalAcreedorAjustado)).toFixed(2);

        //ACTIVO
        totalActivo = (parseFloat(activo)+parseFloat(activo2)).toFixed(2);
        document.getElementById('activo').textContent = totalActivo;
        document.getElementById('total-activo').textContent = totalActivo;

        //PASIVO + PATRIMONIO NETO 
        document.getElementById('p+pn').textContent = ppn.toFixed(2);
        if (resultadoEjercicioNegativo > 0) {
            totalPPN = (parseFloat(ppn) + parseFloat(resultadoEjercicioNegativo)).toFixed(2);
            document.getElementById('total-p+pn').textContent = totalPPN;
        } else if (resultadoEjercicioPositivo > 0) {
            totalPPN = (Math.abs(parseFloat(ppn) - parseFloat(resultadoEjercicioPositivo))).toFixed(2);
            document.getElementById('total-p+pn').textContent = totalPPN;
        } 

        localStorage.setItem("midato", totalActivo);
        localStorage.setItem("midato2", ppn);
        localStorage.setItem("midato3", totalResultadoEjercicio);
        localStorage.setItem("midato4", totalPPN);
    }
});

//Función para descargar la tabla en formato png
function descargarTabla() {
    const tabla = document.getElementById("tablaPrebalance");
  
    // Utilizar html2canvas para capturar la tabla como imagen
    html2canvas(tabla).then(function (canvas) {
      // Crear un enlace para descargar la imagen
      const enlace = document.createElement("a");
      enlace.href = canvas.toDataURL("image/png");
      enlace.download = "prebalance.png";
  
      // Simular un clic en el enlace para iniciar la descarga
      enlace.click();
    });
  }