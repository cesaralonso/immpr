import { Configuration } from './../app.constants';
import { AuthLocalstorage } from './auth-localstorage.service';
import { CommonService } from './common.service';
import { EgresoconceptosInterface } from './../pages/egresoconceptos/components/egresoconceptos-table/egresoconceptos.interface';
import { AbonosInterface } from './../pages/abonos/components/abonos-table/abonos.interface';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


@Injectable()
export class PrinterService {

  constructor(
    private authService: AuthService, 
    private commonService: CommonService, 
    private constant: Configuration,
    private authLocalstorage: AuthLocalstorage) {
  }

  printCorteInicio(corte): string {

    // OBTIENE LOS DATOS DEL USUARIO LOGEADO
    const user = this.authService.useJwtHelper();

    // FECHA Y HORA ACTUAL
    const date = this.authLocalstorage.getCurrentDateAndHour();
    const fecha = date.fecha;
    const hora = date.hora;

    const innerHTML = `
      <html>
      <head>
      <title>
        
      </title>
      <style>
        body {
          padding: 0px;
          marging: 0px;
          font-family: 'Arial';
          font-size: 10px;
          line-height: 10px;
          text-align: center;
        }
        p {
          font-size: 11px;
          line-height: 11px;
          text-align: center;
        }
        table {
          font-size: 10px;
          padding: 0px;
          marging: 0px;
          line-height: 10px;
          display: table;
          cellpadding: 0;
          cellspacing: 0;
          border-collapse: collapse;
          width: 100%;
        }
      @page 
      {
        size:  auto;   /* auto es el valor inicial */
        margin: 0mm auto;  /* afecta el margen en la configuración de impresión */
      }
      </style>
      </head>
      <body>
        <table>
          <tr>
            <td colspan="2" style="font-weight: bold; text-align: center">
              Inicio de Caja
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center">
              ----------------------------------------------------------
            </td>
          </tr>
          <tr>
            <td>
              <label style="font-weight: bold;">Cajero</label>
            </td>
            <td>
            ${user.nombre}
            </td>
          </tr>
          <tr>
            <td>
              <label style="font-weight: bold;">Turno</label>
            </td>
            <td>
            ${user.horaEntrada} - ${user.horaSalida}
            </td>
          </tr>
          <tr>
            <td>
                <label style="font-weight: bold;">Fecha</label>
            </td>
            <td>
              ${corte.fechaInicia}
            </td>
          </tr>
          <tr>
            <td>
                <label style="font-weight: bold;">Hora</label>
            </td>
            <td>
              ${corte.horaInicia}
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center">
              ----------------------------------------------------------
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <h5 style="text-align: center">¡QUE TENGAS UN EXCELENTE DÍA!<h5>
            </td>
          </tr>
        </table>
      </body>
      </html> 
    `;
    
    return innerHTML.replace(' ', '');
  }

  printCorteFin(corte): string {
      
      // OBTIENE LOS DATOS DEL USUARIO LOGEADO
      const user = this.authService.useJwtHelper();

      // FECHA Y HORA ACTUAL
      const date = this.authLocalstorage.getCurrentDateAndHour();
      const fecha = date.fecha;
      const hora = date.hora;

      const innerHTML = `
        <html>
        <head>
        <title>
          
        </title>
        <style>
        body {
          padding: 0px;
          marging: 0px;
          font-family: 'Arial';
          font-size: 10px;
          line-height: 10px;
          text-align: center;
        }
        p {
          font-size: 11px;
          line-height: 11px;
          text-align: center;
        }
        table {
          font-size: 10px;
          padding: 0px;
          marging: 0px;
          line-height: 10px;
          display: table;
          cellpadding: 0;
          cellspacing: 0;
          border-collapse: collapse;
          width: 100%;
        }
        @page 
        {
          size:  auto;   /* auto es el valor inicial */
          margin: 0mm auto;  /* afecta el margen en la configuración de impresión */
        }
        </style>
        </head>
        <body>
          <table>
            <tr>
              <td colspan="2" style="font-weight: bold; text-align: center">
                Cierre de Caja
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
                ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
                <label style="font-weight: bold;">Cajero</label>
              </td>
              <td>
              ${user.nombre}
              </td>
            </tr>
            <tr>
              <td>
                <label style="font-weight: bold;">Turno</label>
              </td>
              <td>
              ${user.horaEntrada} - ${user.horaSalida}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
                ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Fecha Cierre</label>
              </td>
              <td>
                ${corte.fechaFInaliza}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Hora Cierre</label>
              </td>
              <td>
                ${corte.horaFinaliza}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Monto Registrado</label>
              </td>
              <td>
                ${this.commonService._formatMoney(corte.montoEsperado, 2, '.', ',')}
              </td>
            </tr>
          </table>
        </body>
        </html> 
      `;
      
      return innerHTML.replace(' ', '');

      /*
            <tr>
              <td colspan="2">
                <h5 style="text-align: center">
                ${(corte.montoEsperado === corte.ganancia) ? '¡TODO EN ORDEN¡' : 'INCONGRUENCIA CON MONTO ESPERADO Y MONTO EN CAJA'}
                <h5>
              </td>
            </tr>
      */
    }

    printEgreso(egresoconcepto: any): string {
      
      // OBTIENE LOS DATOS DEL USUARIO LOGEADO
      const user = this.authService.useJwtHelper();

      // FECHA Y HORA ACTUAL
      const date = this.authLocalstorage.getCurrentDateAndHour();
      const fecha = date.fecha;
      const hora = date.hora;

      const innerHTML = `
        <html>
        <head>
        <title>
          
        </title>
        <style>
        body {
          padding: 0px;
          marging: 0px;
          font-family: 'Arial';
          font-size: 10px;
          line-height: 10px;
          text-align: center;
        }
        p {
          font-size: 11px;
          line-height: 11px;
          text-align: center;
        }
        table {
          font-size: 10px;
          padding: 0px;
          marging: 0px;
          line-height: 10px;
          display: table;
          cellpadding: 0;
          cellspacing: 0;
          border-collapse: collapse;
          width: 100%;
        }
        @page 
        {
          size:  auto;   /* auto es el valor inicial */
          margin: 0mm auto;  /* afecta el margen en la configuración de impresión */
        }
        </style>
        </head>
        <body>
          <p style="font-weight: bold;">EGRESO</p>
          <p> ${fecha} ${hora}</p>
          <table>
            <tr>
              <td colspan="2" style="text-align: center">
                ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
                <label style="font-weight: bold;">Cajero</label>
              </td>
              <td>
              ${user.nombre}
              </td>
            </tr>
            <tr>
              <td>
                <label style="font-weight: bold;">Turno</label>
              </td>
              <td>
              ${user.horaEntrada} - ${user.horaSalida}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
                ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
                <label style="font-weight: bold;">Concepto</label>
              </td>
              <td>
              ${egresoconcepto.concepto_concepto_idconcepto || egresoconcepto.concepto_idconcepto }
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Fecha</label>
              </td>
              <td>
                ${egresoconcepto.fecha}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Hora</label>
              </td>
              <td>
                ${egresoconcepto.hora}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Precio Por Pieza</label>
              </td>
              <td>
                ${this.commonService._formatMoney(egresoconcepto.precioConIva, 2, '.', ',')}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Cantidad</label>
              </td>
              <td>
                ${egresoconcepto.cantidad}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Subtotal</label>
              </td>
              <td>
                ${this.commonService._formatMoney(egresoconcepto.subtotal, 2, '.', ',')}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Total</label>
              </td>
              <td>
                ${this.commonService._formatMoney(egresoconcepto.total, 2, '.', ',')}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
                ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td colspan="2" style="font-weight: bold;">
                ${egresoconcepto.comentarios || ''}
              </td>
            </tr>
          </table>
        </body>
        </html> 
      `;
      
      return innerHTML.replace(' ', '');
    }


    printAbono(abono: AbonosInterface): string {

      // OBTIENE LOS DATOS DEL USUARIO LOGEADO
      const user = this.authService.useJwtHelper();

      // FECHA Y HORA ACTUAL
      const date = this.authLocalstorage.getCurrentDateAndHour();
      const fecha = date.fecha;
      const hora = date.hora;

      const innerHTML = `
        <html>
        <head>
        <title>
          
        </title>
        <style>
        body {
          padding: 0px;
          marging: 0px;
          font-family: 'Arial';
          font-size: 10px;
          line-height: 10px;
          text-align: center;
        }
        p {
          font-size: 11px;
          line-height: 11px;
          text-align: center;
        }
        table {
          font-size: 10px;
          padding: 0px;
          marging: 0px;
          line-height: 10px;
          display: table;
          cellpadding: 0;
          cellspacing: 0;
          border-collapse: collapse;
          width: 100%;
        }
        @page 
        {
          size:  auto;   /* auto es el valor inicial */
          margin: 0mm auto;  /* afecta el margen en la configuración de impresión */
        }
        </style>
        </head>
        <body>
          <table>
            <tr>
              <td colspan="2" style="text-align: center; font-weight: bold;">
                IMPRENTA IMMPRENZZA
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center; font-weight: bold;">
                Ramón Corona 167-A, Col. Centro
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center; font-weight: bold;">
                Ciudad Guzmán, Jal.
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center; font-weight: bold;">
                ventas@immprenzza.com
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
                ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
                ${fecha} ${hora}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
                ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
                <label style="font-weight: bold;">Cajero</label>
              </td>
              <td>
              ${user.nombre}
              </td>
            </tr>
            <tr>
              <td>
                <label style="font-weight: bold;">Turno</label>
              </td>
              <td>
              ${user.horaEntrada} - ${user.horaSalida}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
                ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
                <label style="font-weight: bold;">Orden Folio</label>
              </td>
              <td>
              ${abono.orden_idorden}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Fecha</label>
              </td>
              <td>
                ${abono.fecha}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Hora</label>
              </td>
              <td>
                ${abono.hora}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Adeudo Anterior</label>
              </td>
              <td>
                ${this.commonService._formatMoney(abono.adeudoAnterior, 2, '.', ',')}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Monto Abonado</label>
              </td>
              <td>
                ${this.commonService._formatMoney(abono.montoPagado, 2, '.', ',')}
              </td>
            </tr>
            <tr>
              <td>
                 <label style="font-weight: bold;">Adeudo Actual</label>
              </td>
              <td>
                ${this.commonService._formatMoney(abono.adeudoActual, 2, '.', ',')}
              </td>
            </tr>
          </table>
        </body>
        </html> 
      `;
      
      return innerHTML.replace(' ', '');
    }


    printOrden(ordens: any) {

      // OBTIENE LOS DATOS DEL USUARIO LOGEADO
      const user = this.authService.useJwtHelper();

      // FECHA Y HORA ACTUAL
      const date = this.authLocalstorage.getCurrentDateAndHour();
      const fecha = date.fecha;
      const hora = date.hora;

      let innerHTML = `
        <html>
        <head>
        <title>
           
        </title>
        <style>
        body {
          padding: 0px;
          marging: 0px;
          font-family: 'Arial';
          font-size: 10px;
          line-height: 10px;
          text-align: center;
        }
        p {
          font-size: 11px;
          line-height: 11px;
          text-align: center;
        }
        table {
          font-size: 10px;
          padding: 0px;
          marging: 0px;
          line-height: 10px;
          display: table;
          cellpadding: 0;
          cellspacing: 0;
          border-collapse: collapse;
          width: 100%;
        }
        @page 
        {
          size:  auto;   /* auto es el valor inicial */
          margin: 0mm auto;  /* afecta el margen en la configuración de impresión */
        }
        </style>
        </head>
        <body>
          <table>
            <tr>
              <td colspan="2" style="text-align: center; font-weight: bold;">
                IMPRENTA IMMPRENZZA
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center; font-weight: bold;">
                Ramón Corona 167-A, Col. Centro
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center; font-weight: bold;">
                Ciudad Guzmán, Jal.
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center; font-weight: bold;">
                ventas@immprenzza.com
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
              ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
                ${fecha} ${hora}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
              ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
              <label style="font-weight: bold;">Cajero</label>
              </td>
              <td>
              ${user.nombre}
              </td>
            </tr>
            <tr>
              <td>
              <label style="font-weight: bold;">Turno</label>
              </td>
              <td>
              ${user.horaEntrada} - ${user.horaSalida}
              </td>
            </tr>
            <tr>
              <td>
              <label style="font-weight: bold;">Folio</label>
              </td>
              <td>
              ${ordens.idorden}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
              ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
              <label style="font-weight: bold;">Cliente</label>
              </td>
              <td>
              ${ordens.cliente_razonsocial}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
              ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td colspan="2" style="font-weight: bold;">
              Productos: 
              </td>
            </tr>`;

            if (ordens.ordenesproducto) {
              for (const element in ordens.ordenesproducto) {
                if (ordens.ordenesproducto.hasOwnProperty(element)) {
                  innerHTML += `
                        <tr>
                          <td>
                            <label style="font-weight: bold;">
                              ${ordens.ordenesproducto[element].producto_producto_idproducto}
                            </label>
                          </td>
                          <td>
                            ${this.commonService._formatMoney(ordens.ordenesproducto[element].precio, 2, '.', ',')}
                          </td>
                        </tr>`;

                }
              }
            }

      innerHTML += `
            <tr>
              <td colspan="2" style="text-align: center">
              ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
              <label style="font-weight: bold;">Subtotal</label>
              </td>
              <td>
              ${this.commonService._formatMoney(ordens.subtotal, 2, '.', ',')}
              </td>
            </tr>
            <tr>
              <td>
              <label style="font-weight: bold;">Total</label>
              </td>
              <td>
              ${this.commonService._formatMoney(ordens.total, 2, '.', ',')}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
              ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td colspan="2" style="font-weight: bold;">
              Abonos: 
              </td>
            </tr>`;

            if (ordens.abonos) {

              for (const element in ordens.abonos) {
                if (ordens.abonos.hasOwnProperty(element)) { 

                  innerHTML += `
                        <tr>
                          <td>
                            <label style="font-weight: bold;">${ordens.abonos[element].fecha}</label>
                          </td>
                          <td>
                          ${this.commonService._formatMoney(ordens.abonos[element].montoPagado, 2, '.', ',')}
                          </td>
                        </tr>`;

                }
              }

            }

        innerHTML += `
            <tr>
              <td colspan="2" style="text-align: center">
              ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td>
              <label style="font-weight: bold;">Monto Abonado</label>
              </td>
              <td>
              ${this.commonService._formatMoney(ordens.abonado, 2, '.', ',')}
              </td>
            </tr>
            <tr>
              <td>
              <label style="font-weight: bold;">Monto Adeudado</label>
              </td>
              <td>
               ${this.commonService._formatMoney(ordens.adeudo, 2, '.', ',')}
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center">
              ------------------------------------------------------
              </td>
            </tr>
            <tr>
              <td colspan="2" style="font-weight: bold;">
              Estatus: 
              </td>
            </tr>
            <tr>
              <td colspan="2" style="text-align: center;">
              ${ordens.estado_estado_idestado}
              </td>
            </tr>
          </table>
        </body>
        </html> 
      `;
      const ventimp = window.open(' ', 'Orden Immprenzza', 'location=0,status=0,scrollbars=0');
      
      ventimp.document.write(innerHTML);
      ventimp.document.close();
      ventimp.print();
      ventimp.close();
    }




    printReporte(ordens: any) {
      let innerHTML = `
        <html>
        <head>
        <title>
          Reporte de Órdenes
        </title>
        <style>
        body {
          padding: 0px;
          marging: 0px;
          font-family: 'Arial';
          font-size: 10px;
          line-height: 10px;
          text-align: center;
        }
        p {
          font-size: 11px;
          line-height: 11px;
          text-align: center;
        }
        table {
          font-size: 10px;
          padding: 0px;
          marging: 0px;
          line-height: 10px;
          display: table;
          cellpadding: 0;
          cellspacing: 0;
          border-collapse: collapse;
          width: 100%;
        }
        </style>
        </head>
        <body>
          <h1 style="text-align: center;">Reporte de Órdenes</h1>
          <table>
            <tr>
              <th>
                Nó de Orden
              </th>
              <th>
                Cliente
              </th>
              <th>
                Subtotal
              </th>
              <th>
                Total
              </th>
              <th>
                Monto Abonado
              </th>
              <th>
                Monto Adeudado
              </th>
              <th>
                Factura
              </th>
              <th>
                Fecha
              </th>
              <th>
                Hora
              </th>
            </tr>`;

      for (const element in ordens) {
        if (ordens.hasOwnProperty(element)) {

          innerHTML += `
              <tr>
                <td>
                  ${ordens[element].idorden}
                </td>
                <td>
                  ${ordens[element].cliente_cliente_idcliente}
                </td>
                <td style="text-align: right;">
                  ${this.commonService._formatMoney(ordens[element].subtotal, 2, '.', ',')}
                </td>
                <td style="text-align: right;">
                  ${this.commonService._formatMoney(ordens[element].total, 2, '.', ',')}
                </td>
                <td style="text-align: right;">
                  ${this.commonService._formatMoney(ordens[element].abonado, 2, '.', ',')}
                </td>
                <td style="text-align: right;">
                  ${this.commonService._formatMoney(ordens[element].adeudo, 2, '.', ',')}
                </td>
                <td>
                  ${(ordens[element].factura) ? 'Si' : 'No'}
                </td>
                <td>
                  ${ordens[element].fecha}
                </td>
                <td>
                  ${ordens[element].hora}
                </td>
              </tr>`;
        }

      }

      innerHTML += 
          `</table>
        </body>
        </html> 
      `;
      const ventimp = window.open(' ', 'Reporte de Órdenes');
      ventimp.document.write(innerHTML);
      ventimp.document.close();
      ventimp.print();
      ventimp.close();
    }


}