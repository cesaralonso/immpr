import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { StocksService } from './../stocks.service';
import { StocksInterface } from './../stocks.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./stocks-add-modal.component.scss')],
  templateUrl: './stocks-add-modal.component.html'
})
export class StocksAddModalComponent extends DialogComponent<StocksInterface, any> implements OnInit, StocksInterface {

  nombre: string;
  cantidad: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  nombreAC: AbstractControl;
  cantidadAC: AbstractControl;

  constructor(
    private service: StocksService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'nombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'cantidadAC' : ['',Validators.compose([Validators.maxLength(5)])],
    });
    this.nombreAC = this.form.controls['nombreAC'];
    this.cantidadAC = this.form.controls['cantidadAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: StocksInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  nombre: this.nombre,
                  cantidad: this.cantidad,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
