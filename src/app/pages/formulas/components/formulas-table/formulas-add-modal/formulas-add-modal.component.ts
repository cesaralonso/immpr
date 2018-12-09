import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { FormulasService } from './../formulas.service';
import { FormulasInterface } from './../formulas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./formulas-add-modal.component.scss')],
  templateUrl: './formulas-add-modal.component.html'
})
export class FormulasAddModalComponent extends DialogComponent<FormulasInterface, any> implements OnInit, FormulasInterface {

  formula: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  formulaAC: AbstractControl;

  constructor(
    private service: FormulasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'formulaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(145)])],
    });
    this.formulaAC = this.form.controls['formulaAC'];
  }
  ngOnInit() {
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: FormulasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  formula: this.formula,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
