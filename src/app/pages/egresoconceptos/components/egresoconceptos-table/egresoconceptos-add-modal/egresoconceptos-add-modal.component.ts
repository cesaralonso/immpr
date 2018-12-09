import { PrinterService } from './../../../../../shared/printer.service';
import { TicketsInterface } from './../../../../tickets/components/tickets-table/tickets.interface';
import { RegistradorasAddModalComponent } from './../../../../registradoras/components/registradoras-table/registradoras-add-modal/registradoras-add-modal.component';
import { RegistradorasInterface } from './../../../../registradoras/components/registradoras-table/registradoras.interface';
import { AuthService } from './../../../../../shared/auth.service';
import { TicketsService } from './../../../../tickets/components/tickets-table/tickets.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EgresoconceptosService } from './../egresoconceptos.service';
import { EgresoconceptosInterface } from './../egresoconceptos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConceptosService } from './../../../../conceptos/components/conceptos-table/conceptos.service';
import { ConceptosAddModalComponent } from './../../../../conceptos/components/conceptos-table/conceptos-add-modal/conceptos-add-modal.component';
import { EmpleadosService } from './../../../../empleados/components/empleados-table/empleados.service';
import { EmpleadosAddModalComponent } from './../../../../empleados/components/empleados-table/empleados-add-modal/empleados-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./egresoconceptos-add-modal.component.scss')],
  templateUrl: './egresoconceptos-add-modal.component.html'
})
export class EgresoconceptosAddModalComponent extends DialogComponent<EgresoconceptosInterface, any> implements OnInit, EgresoconceptosInterface {
  _concepto: string[] = [];
  _empleado: string[] = [];

  user: any;
  concepto_idconcepto: number;
  fecha: string;
  hora: string;
  precioConIva: number;
  cantidad: number;
  subtotal: number;
  total: number;
  empleado_idempleado: number;
  comentarios: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  concepto_idconceptoAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  precioConIvaAC: AbstractControl;
  cantidadAC: AbstractControl;
  subtotalAC: AbstractControl;
  totalAC: AbstractControl;
  empleado_idempleadoAC: AbstractControl;
  comentariosAC: AbstractControl;

  constructor(
    private service: EgresoconceptosService,
    private conceptosService: ConceptosService,
    private empleadosService: EmpleadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService,
    private authService: AuthService,
    private ticketsService: TicketsService,
    private printerService: PrinterService,
  ) {
    super(dialogService);
    this.form = fb.group({
    'concepto_idconceptoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'fechaAC' : [''],
    'horaAC' : [''],
    'precioConIvaAC' : [''],
    'cantidadAC' : ['',Validators.compose([Validators.maxLength(4)])],
    'subtotalAC' : [''],
    'totalAC' : [''],
    'empleado_idempleadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'comentariosAC' : [''],
    });
    this.concepto_idconceptoAC = this.form.controls['concepto_idconceptoAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
    this.precioConIvaAC = this.form.controls['precioConIvaAC'];
    this.cantidadAC = this.form.controls['cantidadAC'];
    this.subtotalAC = this.form.controls['subtotalAC'];
    this.totalAC = this.form.controls['totalAC'];
    this.empleado_idempleadoAC = this.form.controls['empleado_idempleadoAC'];
    this.comentariosAC = this.form.controls['comentariosAC'];
  }
  ngOnInit() {
      this.getConcepto();
      this.getEmpleado();
      
    // FECHA Y HORA ACTUAL
    const date = this.authLocalstorage.getCurrentDateAndHour();
    this.fecha = date.fecha;
    this.hora = date.hora;

    // DATOS DE USUARIO LOGEADO
    this.user = this.authService.useJwtHelper();
    this.empleado_idempleado = this.user.idempleado;

  }

 calculaIva() {
     // this.precioConIva = this.precioSinIva * 1.16;
     console.log('No se considera el IVA en el sistema');
 }

 calculaTotales() {
     // No se considera el IVA en el sistema
     this.subtotal = this.cantidad * this.precioConIva;
     this.total = this.cantidad * this.precioConIva;
 }

  conceptoAddModalShow() {
      const disposable = this.dialogService.addDialog(ConceptosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.conceptoShowToast(data);
          }
      });
  }
  conceptoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getConcepto();
      } else {
          this.toastrService.error(result.message);
      }
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
  getConcepto() {
      this.conceptosService.all()
      .subscribe(
          (data: any) => this._concepto = data.result,
      );
  }
  getEmpleado() {
      this.empleadosService.all()
      .subscribe(
          (data: any) => this._empleado = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }

  registradoraIngreso(idticket) {

    const registradora: RegistradorasInterface = {
        idregistradora: null,
        montoPagando: 0,
        montoIngresa: 0,
        montoEgresa: this.total,
        fecha: this.fecha,
        hora: this.hora,
        empleado_idempleado: this.user.idempleado,
        ticket_idticket: idticket,
    };

    const disposable = this.dialogService.addDialog(RegistradorasAddModalComponent, registradora)
    .subscribe( data => {
        if (data) {
            this.showToast(data);
        }
    });

  }

    printEgreso(egresoconcepto) {

        // IMPRIMIR / ABRIR CAJA Egreso
        const html = this.printerService.printEgreso(egresoconcepto);
        
        const vent = window.open(' ', 'Egreso', 'location=0,status=0,scrollbars=0');
        vent.document.write(html);
        vent.document.close();
        vent.print();
        vent.close();

        // Guardar Ticket
        const ticket: TicketsInterface = {
            'html': html,
        };

        this.ticketsService
            .insert(ticket)
            .subscribe(_data => {
                if (_data.success) {

                    // MOSTRAR AGREGAR EN REGISTRADORA
                    const idticket = _data.result.insertId;
                    this.registradoraIngreso(idticket);
                    
                } 
        });

    }

    showToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }

  onSubmit(values: EgresoconceptosInterface): void {
    this.submitted = true;
    if (this.form.valid) {

        const egresoconcepto = {
            concepto_idconcepto: this.concepto_idconcepto,
            fecha: this.fecha,
            hora: this.hora,
            precioConIva: this.precioConIva,
            cantidad: this.cantidad,
            subtotal: this.subtotal,
            total: this.total,
            empleado_idempleado: this.empleado_idempleado,
            comentarios: this.comentarios,
        };

      this.service
        .insert(egresoconcepto)
        .subscribe(
            (data: any) => {

                if (data.success) {

                    // IMPRIMIR / ABRIR CAJA egreso
                    this.printEgreso(egresoconcepto);

                    this.data = data;
                    this.confirm();
                    
                } else {
                    this.toastrService.error(data.message);
                }

            });

    }
  }
}
