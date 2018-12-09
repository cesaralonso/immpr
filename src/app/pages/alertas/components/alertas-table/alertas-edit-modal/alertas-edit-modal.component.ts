import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { AlertasService } from './../alertas.service';
import { AlertasInterface } from './../alertas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from './../../../../empleados/components/empleados-table/empleados.service';
import { EmpleadosAddModalComponent } from './../../../../empleados/components/empleados-table/empleados-add-modal/empleados-add-modal.component';
import { TipoalertasService } from './../../../../tipoalertas/components/tipoalertas-table/tipoalertas.service';
import { TipoalertasAddModalComponent } from './../../../../tipoalertas/components/tipoalertas-table/tipoalertas-add-modal/tipoalertas-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./alertas-edit-modal.component.scss')],
  templateUrl: './alertas-edit-modal.component.html'
})
export class AlertasEditModalComponent extends DialogComponent<AlertasInterface, any> implements OnInit, AlertasInterface {
  _empleado: string[] = [];
  _tipoalerta: string[] = [];

  idalerta: number;
  empleado_idempleado: number;
  tipoalerta_idtipoalerta: number;
  mensaje: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  empleado_idempleadoAC: AbstractControl;
  tipoalerta_idtipoalertaAC: AbstractControl;
  mensajeAC: AbstractControl;
  constructor(
      private service: AlertasService,
      private empleadosService: EmpleadosService,
      private tipoalertasService: TipoalertasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'empleado_idempleadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'tipoalerta_idtipoalertaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'mensajeAC' : ['',Validators.compose([Validators.required,Validators.maxLength(345)])],
  });
  this.empleado_idempleadoAC = this.form.controls['empleado_idempleadoAC'];
  this.tipoalerta_idtipoalertaAC = this.form.controls['tipoalerta_idtipoalertaAC'];
  this.mensajeAC = this.form.controls['mensajeAC'];
  }
  ngOnInit() {
      this.getEmpleado();
      this.getTipoalerta();
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
  tipoalertaAddModalShow() {
      const disposable = this.dialogService.addDialog(TipoalertasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.tipoalertaShowToast(data);
          }
      })
  }

  tipoalertaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getTipoalerta();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getEmpleado() {
      this.empleadosService.all()
      .subscribe(
          (data: any) => this._empleado = data.result,
      );
  }
  getTipoalerta() {
      this.tipoalertasService.all()
      .subscribe(
          (data: any) => this._tipoalerta = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: AlertasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idalerta: this.idalerta,
                  empleado_idempleado: this.empleado_idempleado,
                  tipoalerta_idtipoalerta: this.tipoalerta_idtipoalerta,
                  mensaje: this.mensaje
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
