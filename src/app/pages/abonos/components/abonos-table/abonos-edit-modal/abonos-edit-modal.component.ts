import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { AbonosService } from './../abonos.service';
import { AbonosInterface } from './../abonos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdensService } from './../../../../ordens/components/ordens-table/ordens.service';
import { OrdensAddModalComponent } from './../../../../ordens/components/ordens-table/ordens-add-modal/ordens-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./abonos-edit-modal.component.scss')],
  templateUrl: './abonos-edit-modal.component.html'
})
export class AbonosEditModalComponent extends DialogComponent<AbonosInterface, any> implements OnInit, AbonosInterface {
  _orden: string[] = [];

  idabono: number;
  orden_idorden: number;
  adeudoAnterior: number;
  montoPagado: number;
  adeudoActual: number;
  fecha: string;
  hora: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  orden_idordenAC: AbstractControl;
  adeudoAnteriorAC: AbstractControl;
  montoPagadoAC: AbstractControl;
  adeudoActualAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  constructor(
      private service: AbonosService,
      private ordensService: OrdensService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'orden_idordenAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'adeudoAnteriorAC' : [''],
    'montoPagadoAC' : [''],
    'adeudoActualAC' : [''],
    'fechaAC' : [''],
    'horaAC' : [''],
  });
  this.orden_idordenAC = this.form.controls['orden_idordenAC'];
  this.adeudoAnteriorAC = this.form.controls['adeudoAnteriorAC'];
  this.montoPagadoAC = this.form.controls['montoPagadoAC'];
  this.adeudoActualAC = this.form.controls['adeudoActualAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.horaAC = this.form.controls['horaAC'];
  }
  ngOnInit() {
      this.getOrden();
  }

  ordenAddModalShow() {
      const disposable = this.dialogService.addDialog(OrdensAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.ordenShowToast(data);
          }
      })
  }

  ordenShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getOrden();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getOrden() {
      this.ordensService.all()
      .subscribe(
          (data: any) => this._orden = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: AbonosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idabono: this.idabono,
                  orden_idorden: this.orden_idorden,
                  adeudoAnterior: this.adeudoAnterior,
                  montoPagado: this.montoPagado,
                  adeudoActual: this.adeudoActual,
                  fecha: this.fecha,
                  hora: this.hora,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
