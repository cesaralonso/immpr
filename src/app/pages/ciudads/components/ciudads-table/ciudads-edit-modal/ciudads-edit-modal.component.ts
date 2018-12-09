import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CiudadsService } from './../ciudads.service';
import { CiudadsInterface } from './../ciudads.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./ciudads-edit-modal.component.scss')],
  templateUrl: './ciudads-edit-modal.component.html'
})
export class CiudadsEditModalComponent extends DialogComponent<CiudadsInterface, any> implements OnInit, CiudadsInterface {

  idciudad: number;
  nombre: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  nombreAC: AbstractControl;
  constructor(
      private service: CiudadsService,
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
  onSubmit(values: CiudadsInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idciudad: this.idciudad,
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
