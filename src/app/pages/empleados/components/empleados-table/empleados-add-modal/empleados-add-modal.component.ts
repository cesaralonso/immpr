import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { EmpleadosService } from './../empleados.service';
import { EmpleadosInterface } from './../empleados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AreasService } from './../../../../areas/components/areas-table/areas.service';
import { AreasAddModalComponent } from './../../../../areas/components/areas-table/areas-add-modal/areas-add-modal.component';
import { PersonasService } from './../../../../personas/components/personas-table/personas.service';
import { PersonasAddModalComponent } from './../../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';
import { Si_usersService } from './../../../../si_users/components/si_users-table/si_users.service';
import { Si_usersAddModalComponent } from './../../../../si_users/components/si_users-table/si_users-add-modal/si_users-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./empleados-add-modal.component.scss')],
  templateUrl: './empleados-add-modal.component.html'
})
export class EmpleadosAddModalComponent extends DialogComponent<EmpleadosInterface, any> implements OnInit, EmpleadosInterface {
  _area: string[] = [];
  _persona: string[] = [];
  _si_user: string[] = [];

  area_idarea: number;
  persona_idpersona: number;
  idlector: number;
  fechaIngreso: string;
  eficiencia: number;
  si_user_idsi_user: number;
  horaEntrada: string;
  horaSalida: string;
  horaComidaInicia: string;
  horaComidaTermina: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  area_idareaAC: AbstractControl;
  persona_idpersonaAC: AbstractControl;
  idlectorAC: AbstractControl;
  fechaIngresoAC: AbstractControl;
  eficienciaAC: AbstractControl;
  si_user_idsi_userAC: AbstractControl;
  horaEntradaAC: AbstractControl;
  horaSalidaAC: AbstractControl;
  horaComidaIniciaAC: AbstractControl;
  horaComidaTerminaAC: AbstractControl;

  constructor(
    private service: EmpleadosService,
    private areasService: AreasService,
    private personasService: PersonasService,
    private si_usersService: Si_usersService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'area_idareaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'persona_idpersonaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'idlectorAC' : ['',Validators.compose([Validators.maxLength(4)])],
    'fechaIngresoAC' : [''],
    'eficienciaAC' : [''],
    'si_user_idsi_userAC' : ['',Validators.compose([Validators.required,Validators.maxLength(4)])],
    'horaEntradaAC' : [''],
    'horaSalidaAC' : [''],
    'horaComidaIniciaAC' : [''],
    'horaComidaTerminaAC' : [''],
    });
    this.area_idareaAC = this.form.controls['area_idareaAC'];
    this.persona_idpersonaAC = this.form.controls['persona_idpersonaAC'];
    this.idlectorAC = this.form.controls['idlectorAC'];
    this.fechaIngresoAC = this.form.controls['fechaIngresoAC'];
    this.eficienciaAC = this.form.controls['eficienciaAC'];
    this.si_user_idsi_userAC = this.form.controls['si_user_idsi_userAC'];
    this.horaEntradaAC = this.form.controls['horaEntradaAC'];
    this.horaSalidaAC = this.form.controls['horaSalidaAC'];
    this.horaComidaIniciaAC = this.form.controls['horaComidaIniciaAC'];
    this.horaComidaTerminaAC = this.form.controls['horaComidaTerminaAC'];
  }
  ngOnInit() {
      this.getArea();
      this.getPersona();
      this.getSi_user();
  }
  areaAddModalShow() {
      const disposable = this.dialogService.addDialog(AreasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.areaShowToast(data);
          }
      });
  }
  areaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getArea();
      } else {
          this.toastrService.error(result.message);
      }
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
  si_userAddModalShow() {
      const disposable = this.dialogService.addDialog(Si_usersAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.si_userShowToast(data);
          }
      });
  }
  si_userShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getSi_user();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getArea() {
      this.areasService.all()
      .subscribe(
          (data: any) => this._area = data.result,
      );
  }
  getPersona() {
      this.personasService.all()
      .subscribe(
          (data: any) => this._persona = data.result,
      );
  }
  getSi_user() {
      this.si_usersService.all()
      .subscribe(
          (data: any) => this._si_user = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: EmpleadosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  area_idarea: this.area_idarea,
                  persona_idpersona: this.persona_idpersona,
                  idlector: this.idlector,
                  fechaIngreso: this.fechaIngreso,
                  eficiencia: this.eficiencia,
                  si_user_idsi_user: this.si_user_idsi_user,
                  horaEntrada: this.horaEntrada,
                  horaSalida: this.horaSalida,
                  horaComidaInicia: this.horaComidaInicia,
                  horaComidaTermina: this.horaComidaTermina,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
