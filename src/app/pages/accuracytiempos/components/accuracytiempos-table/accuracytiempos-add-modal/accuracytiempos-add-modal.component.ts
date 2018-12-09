import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { AccuracytiemposService } from './../accuracytiempos.service';
import { AccuracytiemposInterface } from './../accuracytiempos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from './../../../../empleados/components/empleados-table/empleados.service';
import { EmpleadosAddModalComponent } from './../../../../empleados/components/empleados-table/empleados-add-modal/empleados-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./accuracytiempos-add-modal.component.scss')],
  templateUrl: './accuracytiempos-add-modal.component.html'
})
export class AccuracytiemposAddModalComponent extends DialogComponent<AccuracytiemposInterface, any> implements OnInit, AccuracytiemposInterface {
  _empleado: string[] = [];

  empleado_idempleado: number;
  retraso: string;
  fecha: string;
  accuracy: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  empleado_idempleadoAC: AbstractControl;
  retrasoAC: AbstractControl;
  fechaAC: AbstractControl;
  accuracyAC: AbstractControl;

  constructor(
    private service: AccuracytiemposService,
    private empleadosService: EmpleadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'empleado_idempleadoAC' : ['', Validators.compose([ Validators.required, Validators.maxLength(11)])],
    'retrasoAC' : [''],
    'fechaAC' : [''],
    'accuracyAC' : ['', Validators.compose([ Validators.maxLength(2)])],
    });
    this.empleado_idempleadoAC = this.form.controls['empleado_idempleadoAC'];
    this.retrasoAC = this.form.controls['retrasoAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.accuracyAC = this.form.controls['accuracyAC'];
  }
  ngOnInit() {
      this.getEmpleado();
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
  onSubmit(values: AccuracytiemposInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  empleado_idempleado: this.empleado_idempleado,
                  retraso: this.retraso,
                  fecha: this.fecha,
                  accuracy: this.accuracy,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
