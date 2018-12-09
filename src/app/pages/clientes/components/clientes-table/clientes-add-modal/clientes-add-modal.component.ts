import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ClientesService } from './../clientes.service';
import { ClientesInterface } from './../clientes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { PersonasAddModalComponent } from './../../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./clientes-add-modal.component.scss')],
  templateUrl: './clientes-add-modal.component.html'
})
export class ClientesAddModalComponent extends DialogComponent<ClientesInterface, any> implements OnInit, ClientesInterface {
  _persona: string[] = [];

  persona_idpersona: number;
  rfc: string;
  razonsocial: string;
  email: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  persona_idpersonaAC: AbstractControl;
  rfcAC: AbstractControl;
  razonsocialAC: AbstractControl;
  emailAC: AbstractControl;

  constructor(
    private service: ClientesService,
    private personasService: PersonasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'persona_idpersonaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'rfcAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'razonsocialAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'emailAC' : ['',Validators.compose([Validators.maxLength(45)])],
    });
    this.persona_idpersonaAC = this.form.controls['persona_idpersonaAC'];
    this.rfcAC = this.form.controls['rfcAC'];
    this.razonsocialAC = this.form.controls['razonsocialAC'];
    this.emailAC = this.form.controls['emailAC'];
  }
  ngOnInit() {
      this.getPersona();
  }
  personaAddModalShow() {
      const disposable = this.dialogService.addDialog(PersonasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.personaShowToast(data);
          }
      });
  }
  personaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getPersona();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getPersona() {
      this.personasService.all()
      .subscribe(
          (data: any) => this._persona = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: ClientesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  persona_idpersona: this.persona_idpersona,
                  rfc: this.rfc,
                  razonsocial: this.razonsocial,
                  email: this.email,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
