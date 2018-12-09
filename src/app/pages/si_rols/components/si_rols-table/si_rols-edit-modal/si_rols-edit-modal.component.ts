import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Si_rolsService } from './../si_rols.service';
import { Si_rolsInterface } from './../si_rols.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./si_rols-edit-modal.component.scss')],
  templateUrl: './si_rols-edit-modal.component.html'
})
export class Si_rolsEditModalComponent extends DialogComponent<Si_rolsInterface, any> implements OnInit, Si_rolsInterface {

  idsi_rol: number;
  nombre: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  nombreAC: AbstractControl;
  constructor(
      private service: Si_rolsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'nombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
  });
  this.nombreAC = this.form.controls['nombreAC'];
  }
  ngOnInit() {
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: Si_rolsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idsi_rol: this.idsi_rol,
                  nombre: this.nombre,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
