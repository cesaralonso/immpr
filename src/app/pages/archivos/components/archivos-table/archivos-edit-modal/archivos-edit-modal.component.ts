import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ArchivosService } from './../archivos.service';
import { ArchivosInterface } from './../archivos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdentareasService } from './../../../../ordentareas/components/ordentareas-table/ordentareas.service';
import { OrdentareasAddModalComponent } from './../../../../ordentareas/components/ordentareas-table/ordentareas-add-modal/ordentareas-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./archivos-edit-modal.component.scss')],
  templateUrl: './archivos-edit-modal.component.html'
})
export class ArchivosEditModalComponent extends DialogComponent<ArchivosInterface, any> implements OnInit, ArchivosInterface {
  _ordentarea: string[] = [];

  idarchivo: number;
  ordentarea_idordentarea: number;
  url: string;
  tipo: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  ordentarea_idordentareaAC: AbstractControl;
  urlAC: AbstractControl;
  tipoAC: AbstractControl;
  constructor(
      private service: ArchivosService,
      private ordentareasService: OrdentareasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'ordentarea_idordentareaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'urlAC' : ['',Validators.compose([Validators.required,Validators.maxLength(255)])],
    'tipoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(65)])],
  });
  this.ordentarea_idordentareaAC = this.form.controls['ordentarea_idordentareaAC'];
  this.urlAC = this.form.controls['urlAC'];
  this.tipoAC = this.form.controls['tipoAC'];
  }
  ngOnInit() {
      this.getOrdentarea();
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
  getOrdentarea() {
      this.ordentareasService.all()
      .subscribe(
          (data: any) => this._ordentarea = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: ArchivosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idarchivo: this.idarchivo,
                  ordentarea_idordentarea: this.ordentarea_idordentarea,
                  url: this.url,
                  tipo: this.tipo,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
