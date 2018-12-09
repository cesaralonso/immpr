import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdentareaestadosService } from './../ordentareaestados.service';
import { OrdentareaestadosInterface } from './../ordentareaestados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdentareasService } from './../../../../ordentareas/components/ordentareas-table/ordentareas.service';
import { OrdentareasAddModalComponent } from './../../../../ordentareas/components/ordentareas-table/ordentareas-add-modal/ordentareas-add-modal.component';
import { EstadoscrumsService } from './../../../../estadoscrums/components/estadoscrums-table/estadoscrums.service';
import { EstadoscrumsAddModalComponent } from './../../../../estadoscrums/components/estadoscrums-table/estadoscrums-add-modal/estadoscrums-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./ordentareaestados-edit-modal.component.scss')],
  templateUrl: './ordentareaestados-edit-modal.component.html'
})
export class OrdentareaestadosEditModalComponent extends DialogComponent<OrdentareaestadosInterface, any> implements OnInit, OrdentareaestadosInterface {
  _ordentarea: string[] = [];
  _estadoscrum: string[] = [];

  idordentareaestado: number;
  ordentarea_idordentarea: number;
  estadoscrum_idestadoscrum: number;
  fecha: string;
  hora: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  ordentarea_idordentareaAC: AbstractControl;
  estadoscrum_idestadoscrumAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  constructor(
      private service: OrdentareaestadosService,
      private ordentareasService: OrdentareasService,
      private estadoscrumsService: EstadoscrumsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'ordentarea_idordentareaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'estadoscrum_idestadoscrumAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'fechaAC' : [''],
    'horaAC' : [''],
  });
  this.ordentarea_idordentareaAC = this.form.controls['ordentarea_idordentareaAC'];
  this.estadoscrum_idestadoscrumAC = this.form.controls['estadoscrum_idestadoscrumAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.horaAC = this.form.controls['horaAC'];
  }
  ngOnInit() {
      this.getOrdentarea();
      this.getEstadoscrum();
  }

  ordentareaAddModalShow() {
      const disposable = this.dialogService.addDialog(OrdentareasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.ordentareaShowToast(data);
          }
      })
  }

  ordentareaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getOrdentarea();
      } else {
          this.toastrService.error(result.message);
      }
  }
  estadoscrumAddModalShow() {
      const disposable = this.dialogService.addDialog(EstadoscrumsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.estadoscrumShowToast(data);
          }
      })
  }

  estadoscrumShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getEstadoscrum();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getOrdentarea() {
      this.ordentareasService.all()
      .subscribe(
          (data: any) => this._ordentarea = data.result,
      );
  }
  getEstadoscrum() {
      this.estadoscrumsService.all()
      .subscribe(
          (data: any) => this._estadoscrum = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: OrdentareaestadosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idordentareaestado: this.idordentareaestado,
                  ordentarea_idordentarea: this.ordentarea_idordentarea,
                  estadoscrum_idestadoscrum: this.estadoscrum_idestadoscrum,
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
