import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CheckoutsService } from './../checkouts.service';
import { CheckoutsInterface } from './../checkouts.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from './../../../../empleados/components/empleados-table/empleados.service';
import { EmpleadosAddModalComponent } from './../../../../empleados/components/empleados-table/empleados-add-modal/empleados-add-modal.component';
import { CheckoutestadosService } from './../../../../checkoutestados/components/checkoutestados-table/checkoutestados.service';
import { CheckoutestadosAddModalComponent } from './../../../../checkoutestados/components/checkoutestados-table/checkoutestados-add-modal/checkoutestados-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./checkouts-edit-modal.component.scss')],
  templateUrl: './checkouts-edit-modal.component.html'
})
export class CheckoutsEditModalComponent extends DialogComponent<CheckoutsInterface, any> implements OnInit, CheckoutsInterface {
  _empleado: string[] = [];
  _checkoutestado: string[] = [];

  idcheckout: number;
  empleado_idempleado: number;
  fecha: string;
  horaEntra: string;
  checkoutestado_idcheckoutestado: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  empleado_idempleadoAC: AbstractControl;
  fechaAC: AbstractControl;
  horaEntraAC: AbstractControl;
  checkoutestado_idcheckoutestadoAC: AbstractControl;
  constructor(
      private service: CheckoutsService,
      private empleadosService: EmpleadosService,
      private checkoutestadosService: CheckoutestadosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'empleado_idempleadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'fechaAC' : [''],
    'horaEntraAC' : [''],
    'checkoutestado_idcheckoutestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
  });
  this.empleado_idempleadoAC = this.form.controls['empleado_idempleadoAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.horaEntraAC = this.form.controls['horaEntraAC'];
  this.checkoutestado_idcheckoutestadoAC = this.form.controls['checkoutestado_idcheckoutestadoAC'];
  }
  ngOnInit() {
      this.getEmpleado();
      this.getCheckoutestado();
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
  checkoutestadoAddModalShow() {
      const disposable = this.dialogService.addDialog(CheckoutestadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.checkoutestadoShowToast(data);
          }
      })
  }

  checkoutestadoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getCheckoutestado();
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
  getCheckoutestado() {
      this.checkoutestadosService.all()
      .subscribe(
          (data: any) => this._checkoutestado = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: CheckoutsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idcheckout: this.idcheckout,
                  empleado_idempleado: this.empleado_idempleado,
                  fecha: this.fecha,
                  horaEntra: this.horaEntra,
                  checkoutestado_idcheckoutestado: this.checkoutestado_idcheckoutestado,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
