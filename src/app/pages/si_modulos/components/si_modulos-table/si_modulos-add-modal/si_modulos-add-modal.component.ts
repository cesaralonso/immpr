import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Si_modulosService } from './../si_modulos.service';
import { Si_modulosInterface } from './../si_modulos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./si_modulos-add-modal.component.scss')],
  templateUrl: './si_modulos-add-modal.component.html'
})
export class Si_modulosAddModalComponent extends DialogComponent<Si_modulosInterface, any> implements OnInit, Si_modulosInterface {

  nombre: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  nombreAC: AbstractControl;

  constructor(
    private service: Si_modulosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
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
  onSubmit(values: Si_modulosInterface): void {
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
