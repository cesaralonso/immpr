import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CheckoutestadosService } from './../checkoutestados.service';
import { CheckoutestadosInterface } from './../checkoutestados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./checkoutestados-edit-modal.component.scss')],
  templateUrl: './checkoutestados-edit-modal.component.html'
})
export class CheckoutestadosEditModalComponent extends DialogComponent<CheckoutestadosInterface, any> implements OnInit, CheckoutestadosInterface {

  idcheckoutestado: number;
  nombre: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  nombreAC: AbstractControl;
  constructor(
      private service: CheckoutestadosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'nombreAC' : ['',Validators.compose([Validators.required,Validators.maxLength(15)])],
  });
  this.nombreAC = this.form.controls['nombreAC'];
  }
  ngOnInit() {
  }

  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: CheckoutestadosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idcheckoutestado: this.idcheckoutestado,
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
