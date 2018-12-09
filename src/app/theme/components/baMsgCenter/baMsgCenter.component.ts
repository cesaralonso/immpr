import { SocketService } from './../../../shared/socket.service';
import { AlertasInterface } from './../../../pages/alertas/components/alertas-table/alertas.interface';
import { ToastrService } from 'ngx-toastr';
import { AlertasResponseInterface } from './../../../pages/alertas/components/alertas-table/alertas-response.interface';
import { AlertasService } from './../../../pages/alertas/components/alertas-table/alertas.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../shared/auth.service';
import { BaMsgCenterService } from './baMsgCenter.service';

@Component({
  selector: 'ba-msg-center',
  providers: [BaMsgCenterService],
  styleUrls: ['./baMsgCenter.scss'],
  templateUrl: './baMsgCenter.html'
})
export class BaMsgCenter implements OnInit {

  chatcontent: string = '';
  recibidas: AlertasInterface = [];
  totalNoLeidas: number = 0;
  user;
  message;

  constructor(
      private _baMsgCenterService: BaMsgCenterService,
      private service: AlertasService,
      private authService: AuthService,
      private socketService: SocketService,
      private toastrService: ToastrService) {
  }
  ngOnInit() {
    this.getAll();
    this.user = this.authService.useJwtHelper();
  }

  sendMessage() {
    // The object to send
    const send = {
      'message': this.message,
      'username': this.user.nombre,
    };
    
    this.message = '';
    this.socketService.sender(JSON.stringify(send));
  }

  marcarComoLeidas() {
      this.service
        .marcarComoLeidas(this.recibidas)
        .subscribe(   
          (data: AlertasResponseInterface) =>  {
                if (data.success) {
                  this.toastrService.success(data.message);
                  this.getAll();
                } 
            },
            error => console.log(error),
            () => console.log('Get all Items complete'));
  }

    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: AlertasResponseInterface) => {
                if (data.success) {

                  if (data.result.recibidas) {
                    let _totalNoLeidas = 0;
                    const _recibidas = [];

                    for (const element in data.result.recibidas) {
                      if (data.result.recibidas.hasOwnProperty(element)) {

                        if (data.result.recibidas[element].tipoalerta_tipoalerta_idtipoalerta === 'TAREA') {
                           data.result.recibidas[element]['idordentarea'] = data.result.recibidas[element].mensaje.split('|')[1];
                        } else {
                          data.result.recibidas[element]['idordentarea'] = null;
                        }

                        if (!data.result.recibidas[element].leida) {
                          _recibidas.push(data.result.recibidas[element]);
                          _totalNoLeidas++;
                        }

                      }
                    }
                    this.totalNoLeidas = _totalNoLeidas;
                    this.recibidas = _recibidas;
                  }

                } 
            },
            error => console.log(error),
            () => console.log('Get all Items complete'));
    } 



}
