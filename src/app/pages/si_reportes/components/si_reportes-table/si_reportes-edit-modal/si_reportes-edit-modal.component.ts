import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { Si_reportesService } from './../si_reportes.service';
import { Si_reportesInterface } from './../si_reportes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Si_modulosService } from './../../../../si_modulos/components/si_modulos-table/si_modulos.service';
import { Si_modulosAddModalComponent } from './../../../../si_modulos/components/si_modulos-table/si_modulos-add-modal/si_modulos-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./si_reportes-edit-modal.component.scss')],
  templateUrl: './si_reportes-edit-modal.component.html'
})
export class Si_reportesEditModalComponent extends DialogComponent<Si_reportesInterface, any> implements OnInit, Si_reportesInterface {
  _si_modulo: string[] = [];

  idsi_reporte: number;
  nombre: string;
  consulta: string;
  campos: string;
  Modulo_idsi_modulo: number;
  pfd: boolean;
  excel: boolean;
  print: boolean;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  nombreAC: AbstractControl;
  consultaAC: AbstractControl;
  camposAC: AbstractControl;
  Modulo_idsi_moduloAC: AbstractControl;
  pfdAC: AbstractControl;
  excelAC: AbstractControl;
  printAC: AbstractControl;
  constructor(
      private service: Si_reportesService,
      private si_modulosService: Si_modulosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'nombreAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'consultaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(400)])],
    'camposAC' : ['',Validators.compose([Validators.required,Validators.maxLength(140)])],
    'Modulo_idsi_moduloAC' : ['',Validators.compose([Validators.required,Validators.maxLength(4)])],
    'pfdAC' : [''],
    'excelAC' : [''],
    'printAC' : [''],
  });
  this.nombreAC = this.form.controls['nombreAC'];
  this.consultaAC = this.form.controls['consultaAC'];
  this.camposAC = this.form.controls['camposAC'];
  this.Modulo_idsi_moduloAC = this.form.controls['Modulo_idsi_moduloAC'];
  this.pfdAC = this.form.controls['pfdAC'];
  this.excelAC = this.form.controls['excelAC'];
  this.printAC = this.form.controls['printAC'];
  }
  ngOnInit() {
      this.getSi_modulo();
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
  onSubmit(values: Si_reportesInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idsi_reporte: this.idsi_reporte,
                  nombre: this.nombre,
                  consulta: this.consulta,
                  campos: this.campos,
                  Modulo_idsi_modulo: this.Modulo_idsi_modulo,
                  pfd: this.pfd,
                  excel: this.excel,
                  print: this.print,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
