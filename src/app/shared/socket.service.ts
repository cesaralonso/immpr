import { Configuration } from './../app.constants';
import { EmpleadosModule } from './../pages/empleados/empleados.module';
import { TareasModule } from './../pages/tareas/tareas.module';
import { TipoalertasModule } from './../pages/tipoalertas/tipoalertas.module';
import { AuthLocalstorage } from './auth-localstorage.service';
import { CommonService } from './common.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

declare let SockJS: any;
declare let SockReconnect: any;
declare let window: any;
declare let sock: any;

@Injectable()
export class SocketService {

  _sock: any;
  user: any;

  constructor(
    private authService: AuthService, 
    private commonService: CommonService, 
    private configuration: Configuration,
    private authLocalstorage: AuthLocalstorage) {

      this.user = this.authService.useJwtHelper(); 
      this._sock = sock;
      console.log('_sock', this._sock);
  }

  sender(send) {

      // FECHA Y HORA ACTUAL
      const date = new Date();
      const year = date.getFullYear();
      let month = (date.getMonth() + 1).toString();
      month = ((+month < 10) ? '0' : '') + month;
      let day = date.getDate().toString();
      day = ((+day < 10) ? '0' : '') + day;
      let hours = date.getHours().toString();
      hours = ((+hours < 10) ? '0' : '') + hours;
      let minutes = date.getMinutes().toString();
      minutes = ((+minutes < 10) ? '0' : '') + minutes;

      const fecha = `${year}-${month}-${day}`;
      const hora = `${hours}:${minutes}`;

      const _send = JSON.parse(send);

      // Send it now
      _send['user'] = this.user;
      _send['fecha'] = fecha;
      _send['hora'] = hora;

      const newsend = JSON.stringify(_send);

      console.log("send newsend", newsend);
      this._sock.send(newsend);
  }


}
