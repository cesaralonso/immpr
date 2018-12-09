import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { RegistradorasService } from './../registradoras.service';
import { RegistradorasInterface } from './../registradoras.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from './../../../../empleados/components/empleados-table/empleados.service';
import { EmpleadosAddModalComponent } from './../../../../empleados/components/empleados-table/empleados-add-modal/empleados-add-modal.component';
import { TicketsService } from './../../../../tickets/components/tickets-table/tickets.service';
import { TicketsAddModalComponent } from './../../../../tickets/components/tickets-table/tickets-add-modal/tickets-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./registradoras-add-modal.component.scss')],
  templateUrl: './registradoras-add-modal.component.html'
})
export class RegistradorasAddModalComponent extends DialogComponent<RegistradorasInterface, any> implements OnInit, RegistradorasInterface {
  _empleado: string[] = [];
  // _ticket: string[] = [];

  montoIngresa: number;
  montoEgresa: number;
  montoPagando: number;
  fecha: string;
  hora: string;
  empleado_idempleado: number;
  ticket_idticket: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  montoIngresaAC: AbstractControl;
  montoEgresaAC: AbstractControl;
  montoPagandoAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  empleado_idempleadoAC: AbstractControl;
  // ticket_idticketAC: AbstractControl;

  constructor(
    private service: RegistradorasService,
    private empleadosService: EmpleadosService,
    private ticketsService: TicketsService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'montoIngresaAC' : [''],
    'montoEgresaAC' : [''],
    'montoPagandoAC' : [''],
    'fechaAC' : [''],
    'horaAC' : [''],
    'empleado_idempleadoAC' : ['', Validators.compose([ Validators.required, Validators.maxLength(11)])],
    // 'ticket_idticketAC' : ['', Validators.compose([ Validators.required, Validators.maxLength(11)])],
    });
    this.montoIngresaAC = this.form.controls['montoIngresaAC'];
    this.montoEgresaAC = this.form.controls['montoEgresaAC'];
    this.montoPagandoAC = this.form.controls['montoPagandoAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
    this.empleado_idempleadoAC = this.form.controls['empleado_idempleadoAC'];
    // this.ticket_idticketAC = this.form.controls['ticket_idticketAC'];
  }
  ngOnInit() {
      this.getEmpleado();
      // this.getTicket();
      
        // FECHA Y HORA ACTUAL
        const fechahora = this.authLocalstorage.getCurrentDateAndHour();
        this.fecha = fechahora.fecha;
        this.hora = fechahora.hora;
  }


calcularCambio() {
    this.montoEgresa = +this.montoIngresa - +this.montoPagando;
}



  empleadoAddModalShow() {
      const disposable = this.dialogService.addDialog(EmpleadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.empleadoShowToast(data);
          }
      });
  }
  empleadoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getEmpleado();
      } else {
          this.toastrService.error(result.message);
      }
  }
  /*
  ticketAddModalShow() {
      const disposable = this.dialogService.addDialog(TicketsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.ticketShowToast(data);
          }
      });
  }
  ticketShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getTicket();
      } else {
          this.toastrService.error(result.message);
      }
  }
  */
  getEmpleado() {
      this.empleadosService.all()
      .subscribe(
          (data: any) => this._empleado = data.result,
      );
  }
  /*
  getTicket() {
      this.ticketsService.all()
      .subscribe(
          (data: any) => this._ticket = data.result,
      );
  }
  */
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: RegistradorasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  montoIngresa: this.montoIngresa,
                  montoEgresa: this.montoEgresa,
                  montoPagando: this.montoPagando,
                  fecha: this.fecha,
                  hora: this.hora,
                  empleado_idempleado: this.empleado_idempleado,
                  // ticket_idticket: this.ticket_idticket,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
