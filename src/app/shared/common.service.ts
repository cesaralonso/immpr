import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';


@Injectable()
export class CommonService {

  constructor() {
  }
  
  toInt(tochange: any): number {
      return +tochange;
  }

  // Formatea tipo moneda
  _formatMoney(cantidad: number, c: any, d: any, t: any) {
          c = isNaN(c = Math.abs(c)) ? 2 : c, 
          d = d === undefined ? '.' : d, 
          t = t === undefined ? ',' : t;
          const s = cantidad < 0 ? '-' : '';
          const i = String(cantidad = parseInt(Math.abs(Number(cantidad) || 0).toFixed(c)));
          let j;
          j = (j = i.length) > 3 ? j % 3 : 0;
      return "$ " + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(cantidad - +i).toFixed(c).slice(2) : "");
  }

  // Función para convertir un JSON en CSV
  JSONToCSVConvertor(json, reportTitle, showLabel) {
      const arrData = typeof json !== 'object' ? JSON.parse(json) : json;
      let csv = '';
      csv += reportTitle + '\r\n\n';
      if (showLabel) {
          let row = '';
          //Títulos de columnas
          for (let index in arrData[0]) {
              //Comas
              row += index + ',';
          }
          row = row.slice(0, -1);
          csv += row + '\r\n';
      }
      //Renglones
      for (let i = 0; i < arrData.length; i++) {
          let row = '';
          //Columnas
          for (let index in arrData[i]) {
              row += '"' + arrData[i][index] + '",';
          }
          row.slice(0, row.length - 1);
          csv += row + '\r\n';
      }
      if (csv === '') {
          alert('Invalid data');
          return;
      }
      let fileName = 'Immprenzza_';
      fileName += reportTitle.replace(/ /g,'_');
      const uri = `data:text/csv;charset=utf-8,${(csv)}`;
      const link = document.createElement('a');
      // link.style = 'visibility:hidden';
      link.href = uri;
      link.download = fileName + '.csv';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  }


}