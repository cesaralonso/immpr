import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EstadosService } from './../estados.service';
import { EstadosInterface } from './../estados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./estados-add-modal.component.scss')],
  templateUrl: './estados-add-modal.component.html'
})
export class EstadosAddModalComponent extends DialogComponent<EstadosInterface, any> implements OnInit, EstadosInterface {

  nombre: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  nombreAC: AbstractControl;

  constructor(
    private service: EstadosService,
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
  onSubmit(values: EstadosInterface): void {
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
