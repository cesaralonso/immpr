import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Si_usersService } from './../si_users.service';
import { Si_usersInterface } from './../si_users.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Si_rolsService } from './../../../../si_rols/components/si_rols-table/si_rols.service';
import { Si_rolsAddModalComponent } from './../../../../si_rols/components/si_rols-table/si_rols-add-modal/si_rols-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./si_users-edit-modal.component.scss')],
  templateUrl: './si_users-edit-modal.component.html'
})
export class Si_usersEditModalComponent extends DialogComponent<Si_usersInterface, any> implements OnInit, Si_usersInterface {
  _si_rol: string[] = [];

  idsi_user: number;
  usuario: string;
  email: string;
  password: string;
  Rol_idsi_rol: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  usuarioAC: AbstractControl;
  emailAC: AbstractControl;
  passwordAC: AbstractControl;
  Rol_idsi_rolAC: AbstractControl;
  constructor(
      private service: Si_usersService,
      private si_rolsService: Si_rolsService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'usuarioAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'emailAC' : ['',Validators.compose([Validators.required,Validators.maxLength(60)])],
    'passwordAC' : ['',Validators.compose([Validators.maxLength(60)])],
    'Rol_idsi_rolAC' : ['',Validators.compose([Validators.required,Validators.maxLength(4)])],
  });
  this.usuarioAC = this.form.controls['usuarioAC'];
  this.emailAC = this.form.controls['emailAC'];
  this.passwordAC = this.form.controls['passwordAC'];
  this.Rol_idsi_rolAC = this.form.controls['Rol_idsi_rolAC'];
  }
  ngOnInit() {
      this.getSi_rol();

      this.password = '';
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
  getSi_rol() {
      this.si_rolsService.all()
      .subscribe(
          (data: any) => this._si_rol = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: Si_usersInterface): void {
      this.submitted = true;
      if (this.form.valid) {

          if (this.password === '') {
              this.password = null;
          }

          this.service
              .update({
                  idsi_user: this.idsi_user,
                  usuario: this.usuario,
                  email: this.email,
                  password: this.password,
                  Rol_idsi_rol: this.Rol_idsi_rol,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
