import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EstadoscrumsService } from './../estadoscrums.service';
import { EstadoscrumsInterface } from './../estadoscrums.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./estadoscrums-edit-modal.component.scss')],
  templateUrl: './estadoscrums-edit-modal.component.html'
})
export class EstadoscrumsEditModalComponent extends DialogComponent<EstadoscrumsInterface, any> implements OnInit, EstadoscrumsInterface {

  idestadoscrum: number;
  nombre: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  nombreAC: AbstractControl;
  constructor(
      private service: EstadoscrumsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'nombreAC' : ['',Validators.compose([Validators.required,Validators.maxLength(45)])],
  });
  this.nombreAC = this.form.controls['nombreAC'];
  }
  ngOnInit() {
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: EstadoscrumsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idestadoscrum: this.idestadoscrum,
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
