import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TipopreciosService } from './../tipoprecios.service';
import { TipopreciosInterface } from './../tipoprecios.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./tipoprecios-add-modal.component.scss')],
  templateUrl: './tipoprecios-add-modal.component.html'
})
export class TipopreciosAddModalComponent extends DialogComponent<TipopreciosInterface, any> implements OnInit, TipopreciosInterface {

  nombre: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  nombreAC: AbstractControl;

  constructor(
    private service: TipopreciosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
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
  onSubmit(values: TipopreciosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
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
