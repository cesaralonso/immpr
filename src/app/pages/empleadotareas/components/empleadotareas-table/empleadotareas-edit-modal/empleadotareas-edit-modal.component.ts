import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EmpleadotareasService } from './../empleadotareas.service';
import { EmpleadotareasInterface } from './../empleadotareas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from './../../../../empleados/components/empleados-table/empleados.service';
import { EmpleadosAddModalComponent } from './../../../../empleados/components/empleados-table/empleados-add-modal/empleados-add-modal.component';
import { OrdentareasService } from './../../../../ordentareas/components/ordentareas-table/ordentareas.service';
import { OrdentareasAddModalComponent } from './../../../../ordentareas/components/ordentareas-table/ordentareas-add-modal/ordentareas-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./empleadotareas-edit-modal.component.scss')],
  templateUrl: './empleadotareas-edit-modal.component.html'
})
export class EmpleadotareasEditModalComponent extends DialogComponent<EmpleadotareasInterface, any> implements OnInit, EmpleadotareasInterface {
  _empleado: string[] = [];
  _ordentarea: string[] = [];

  idempleadotarea: number;
  empleado_idempleado: number;
  ordentarea_idordentarea: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  empleado_idempleadoAC: AbstractControl;
  ordentarea_idordentareaAC: AbstractControl;
  constructor(
      private service: EmpleadotareasService,
      private empleadosService: EmpleadosService,
      private ordentareasService: OrdentareasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'empleado_idempleadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'ordentarea_idordentareaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.empleado_idempleadoAC = this.form.controls['empleado_idempleadoAC'];
  this.ordentarea_idordentareaAC = this.form.controls['ordentarea_idordentareaAC'];
  }
  ngOnInit() {
      this.getEmpleado();
      this.getOrdentarea();
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
  ordentareaAddModalShow() {
      const disposable = this.dialogService.addDialog(OrdentareasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.ordentareaShowToast(data);
          }
      })
  }

  ordentareaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getOrdentarea();
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
  getOrdentarea() {
      this.ordentareasService.all()
      .subscribe(
          (data: any) => this._ordentarea = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: EmpleadotareasInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idempleadotarea: this.idempleadotarea,
                  empleado_idempleado: this.empleado_idempleado,
                  ordentarea_idordentarea: this.ordentarea_idordentarea,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
