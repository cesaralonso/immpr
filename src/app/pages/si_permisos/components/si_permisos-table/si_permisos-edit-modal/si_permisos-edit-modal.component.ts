import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Si_permisosService } from './../si_permisos.service';
import { Si_permisosInterface } from './../si_permisos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Si_rolsService } from './../../../../si_rols/components/si_rols-table/si_rols.service';
import { Si_rolsAddModalComponent } from './../../../../si_rols/components/si_rols-table/si_rols-add-modal/si_rols-add-modal.component';
import { Si_modulosService } from './../../../../si_modulos/components/si_modulos-table/si_modulos.service';
import { Si_modulosAddModalComponent } from './../../../../si_modulos/components/si_modulos-table/si_modulos-add-modal/si_modulos-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./si_permisos-edit-modal.component.scss')],
  templateUrl: './si_permisos-edit-modal.component.html'
})
export class Si_permisosEditModalComponent extends DialogComponent<Si_permisosInterface, any> implements OnInit, Si_permisosInterface {
  _si_rol: string[] = [];
  _si_modulo: string[] = [];

  idsi_permiso: number;
  acceso: boolean;
  Rol_idsi_rol: number;
  Modulo_idsi_modulo: number;
  readable: boolean;
  writeable: boolean;
  updateable: boolean;
  deleteable: boolean;
  read_own: boolean;
  write_own: boolean;
  update_own: boolean;
  delete_own: boolean;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  accesoAC: AbstractControl;
  Rol_idsi_rolAC: AbstractControl;
  Modulo_idsi_moduloAC: AbstractControl;
  readableAC: AbstractControl;
  writeableAC: AbstractControl;
  updateableAC: AbstractControl;
  deleteableAC: AbstractControl;
  read_ownAC: AbstractControl;
  write_ownAC: AbstractControl;
  update_ownAC: AbstractControl;
  delete_ownAC: AbstractControl;
  constructor(
      private service: Si_permisosService,
      private si_rolsService: Si_rolsService,
      private si_modulosService: Si_modulosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'accesoAC' : [''],
    'Rol_idsi_rolAC' : ['',Validators.compose([Validators.required,Validators.maxLength(4)])],
    'Modulo_idsi_moduloAC' : ['',Validators.compose([Validators.required,Validators.maxLength(4)])],
    'readableAC' : [''],
    'writeableAC' : [''],
    'updateableAC' : [''],
    'deleteableAC' : [''],
    'read_ownAC' : [''],
    'write_ownAC' : [''],
    'update_ownAC' : [''],
    'delete_ownAC' : [''],
  });
  this.accesoAC = this.form.controls['accesoAC'];
  this.Rol_idsi_rolAC = this.form.controls['Rol_idsi_rolAC'];
  this.Modulo_idsi_moduloAC = this.form.controls['Modulo_idsi_moduloAC'];
  this.readableAC = this.form.controls['readableAC'];
  this.writeableAC = this.form.controls['writeableAC'];
  this.updateableAC = this.form.controls['updateableAC'];
  this.deleteableAC = this.form.controls['deleteableAC'];
  this.read_ownAC = this.form.controls['read_ownAC'];
  this.write_ownAC = this.form.controls['write_ownAC'];
  this.update_ownAC = this.form.controls['update_ownAC'];
  this.delete_ownAC = this.form.controls['delete_ownAC'];
  }
  ngOnInit() {
      this.getSi_rol();
      this.getSi_modulo();
  }

  si_rolAddModalShow() {
      const disposable = this.dialogService.addDialog(Si_rolsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.si_rolShowToast(data);
          }
      })
  }

  si_rolShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getSi_rol();
      } else {
          this.toastrService.error(result.message);
      }
  }
  si_moduloAddModalShow() {
      const disposable = this.dialogService.addDialog(Si_modulosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.si_moduloShowToast(data);
          }
      })
  }

  si_moduloShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getSi_modulo();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getSi_rol() {
      this.si_rolsService.all()
      .subscribe(
          (data: any) => this._si_rol = data.result,
      );
  }
  getSi_modulo() {
      this.si_modulosService.all()
      .subscribe(
          (data: any) => this._si_modulo = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: Si_permisosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idsi_permiso: this.idsi_permiso,
                  acceso: this.acceso,
                  Rol_idsi_rol: this.Rol_idsi_rol,
                  Modulo_idsi_modulo: this.Modulo_idsi_modulo,
                  readable: this.readable,
                  writeable: this.writeable,
                  updateable: this.updateable,
                  deleteable: this.deleteable,
                  read_own: this.read_own,
                  write_own: this.write_own,
                  update_own: this.update_own,
                  delete_own: this.delete_own,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
