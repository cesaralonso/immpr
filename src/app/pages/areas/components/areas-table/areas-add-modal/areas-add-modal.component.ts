import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { AreasService } from './../areas.service';
import { AreasInterface } from './../areas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./areas-add-modal.component.scss')],
  templateUrl: './areas-add-modal.component.html'
})
export class AreasAddModalComponent extends DialogComponent<AreasInterface, any> implements OnInit, AreasInterface {

  nombre: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  nombreAC: AbstractControl;

  constructor(
    private service: AreasService,
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
  onSubmit(values: AreasInterface): void {
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
