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
  selector: 'edit-service-modal',
  styleUrls: [('./egresoconceptos-edit-modal.component.scss')],
  templateUrl: './egresoconceptos-edit-modal.component.html'
})
export class EgresoconceptosEditModalComponent extends DialogComponent<EgresoconceptosInterface, any> implements OnInit, EgresoconceptosInterface {
  _concepto: string[] = [];
  _empleado: string[] = [];

  idegresoconcepto: number;
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
    'comentariosAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
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
  }

  conceptoAddModalShow() {
      const disposable = this.dialogService.addDialog(ConceptosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.conceptoShowToast(data);
          }
      })
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
      })
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
  onSubmit(values: EgresoconceptosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idegresoconcepto: this.idegresoconcepto,
                  concepto_idconcepto: this.concepto_idconcepto,
                  fecha: this.fecha,
                  hora: this.hora,
                  precioConIva: this.precioConIva,
                  cantidad: this.cantidad,
                  subtotal: this.subtotal,
                  total: this.total,
                  empleado_idempleado: this.empleado_idempleado,
                  comentarios: this.comentarios,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
