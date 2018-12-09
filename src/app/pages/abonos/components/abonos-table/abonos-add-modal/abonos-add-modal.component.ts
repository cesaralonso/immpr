import { PrinterService } from './../../../../../shared/printer.service';
import { TicketsInterface } from './../../../../tickets/components/tickets-table/tickets.interface';
import { TicketsService } from './../../../../tickets/components/tickets-table/tickets.service';
import { AbonosModule } from './../../../abonos.module';
import { AuthService } from './../../../../../shared/auth.service';
import { RegistradorasInterface } from './../../../../registradoras/components/registradoras-table/registradoras.interface';
import { RegistradorasAddModalComponent } from './../../../../registradoras/components/registradoras-table/registradoras-add-modal/registradoras-add-modal.component';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { AbonosService } from './../abonos.service';
import { AbonosInterface } from './../abonos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdensService } from './../../../../ordens/components/ordens-table/ordens.service';
import { OrdensAddModalComponent } from './../../../../ordens/components/ordens-table/ordens-add-modal/ordens-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./abonos-add-modal.component.scss')],
  templateUrl: './abonos-add-modal.component.html'
})
export class AbonosAddModalComponent extends DialogComponent<AbonosInterface, any> implements OnInit, AbonosInterface {
  _orden: string[] = [];

  orden_idorden: number;
  adeudoAnterior: number;
  montoPagado: number;
  adeudoActual: number;
  fecha: string;
  hora: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  orden_idordenAC: AbstractControl;
  adeudoAnteriorAC: AbstractControl;
  montoPagadoAC: AbstractControl;
  adeudoActualAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;

  constructor(
    private service: AbonosService,
    private ordensService: OrdensService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private printerService: PrinterService,
    dialogService: DialogService,
    private authService: AuthService,
    private ticketsService: TicketsService,
  ) {
    super(dialogService);
    this.form = fb.group({
    'orden_idordenAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'adeudoAnteriorAC' : [''],
    'montoPagadoAC' : [''],
    'fechaAC' : [''],
    'horaAC' : [''],
    });
    this.orden_idordenAC = this.form.controls['orden_idordenAC'];
    this.adeudoAnteriorAC = this.form.controls['adeudoAnteriorAC'];
    this.montoPagadoAC = this.form.controls['montoPagadoAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
  }
  ngOnInit() {
      this.getOrden();

        // FECHA Y HORA ACTUAL
        const date = this.authLocalstorage.getCurrentDateAndHour();
        this.fecha = date.fecha;
        this.hora = date.hora;
  }

  
  updateAdeudoActual(montoPagado: number, adeudoAnterior: number) {
      this.adeudoActual = (adeudoAnterior - montoPagado);
  }

  ordenAddModalShow() {
      const disposable = this.dialogService.addDialog(OrdensAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.ordenShowToast(data);
          }
      });
  }
  ordenShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getOrden();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getOrden() {
      this.ordensService.all()
      .subscribe(
          (data: any) => this._orden = data.result,
      );
  }

  registradoraIngreso() {

    // DATOS DE USUARIO LOGEADO
    const user = this.authService.useJwtHelper();

    const registradora: RegistradorasInterface = {
        idregistradora: null,
        montoPagando: this.montoPagado,
        montoIngresa: 0,
        montoEgresa: 0,
        fecha: this.fecha,
        hora: this.hora,
        empleado_idempleado: user.idempleado,
        // ticket_idticket: idticket,
    };

    const disposable = this.dialogService.addDialog(RegistradorasAddModalComponent, registradora)
    .subscribe( data => {
        if (data) {
            this.showToast(data);
        }
    });

  }

    printAbono(abono) {

        // IMPRIMIR / ABRIR CAJA Abono
        const html = this.printerService.printAbono(abono);
        
        const vent = window.open(' ', 'Abono a Orden', 'location=0,status=0,scrollbars=0');
        vent.document.write(html);
        vent.document.close();
        vent.print();
        vent.close();
        
        this.registradoraIngreso();
    }

    showToast(result) {
        if (result.success) {
        this.toastrService.success(result.message);
        } else {
        this.toastrService.error(result.message);
        }
    }

  confirm() {
    this.result = this.data;
    this.close();
  }

  onSubmit(values: AbonosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
    
        const abono: AbonosInterface = {
            orden_idorden: this.orden_idorden,
            adeudoAnterior: this.adeudoAnterior,
            montoPagado: this.montoPagado,
            adeudoActual: this.adeudoActual,
            fecha: this.fecha,
            hora: this.hora,
        };

      this.service
        .insert(abono)
        .subscribe(
            (data: any) => {
                if (data.success) {

                    // IMPRIMIR / ABRIR CAJA Abono
                    this.printAbono(abono);

                    this.data = data;
                    this.confirm();
                    
                } else {
                    this.toastrService.error(data.message);
                }

            });
    }
  }
}
