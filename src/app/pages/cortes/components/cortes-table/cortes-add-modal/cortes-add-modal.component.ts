import { PrinterService } from './../../../../../shared/printer.service';
import { AuthService } from './../../../../../shared/auth.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { CortesService } from './../cortes.service';
import { CortesInterface } from './../cortes.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosService } from './../../../../empleados/components/empleados-table/empleados.service';
import { EmpleadosAddModalComponent } from './../../../../empleados/components/empleados-table/empleados-add-modal/empleados-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./cortes-add-modal.component.scss')],
  templateUrl: './cortes-add-modal.component.html'
})
export class CortesAddModalComponent extends DialogComponent<CortesInterface, any> implements OnInit, CortesInterface {
  _empleado: string[] = [];

  montoInicial: number;
  inicia_idempleado: number;
  fechaInicia: string;
  horaInicia: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  montoInicialAC: AbstractControl;
  inicia_idempleadoAC: AbstractControl;
  fechaIniciaAC: AbstractControl;
  horaIniciaAC: AbstractControl;

  constructor(
    private service: CortesService,
    private empleadosService: EmpleadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    private printerService: PrinterService,
    private authService: AuthService,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'montoInicialAC' : ['', Validators.compose([Validators.required])],
    'inicia_idempleadoAC' : ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
    'fechaIniciaAC' : ['', Validators.compose([Validators.required])],
    'horaIniciaAC' : ['', Validators.compose([Validators.required])],
    });
    this.montoInicialAC = this.form.controls['montoInicialAC'];
    this.inicia_idempleadoAC = this.form.controls['inicia_idempleadoAC'];
    this.fechaIniciaAC = this.form.controls['fechaIniciaAC'];
    this.horaIniciaAC = this.form.controls['horaIniciaAC'];
  }
  ngOnInit() {
      this.getEmpleado();

    // FECHA Y HORA ACTUAL
    const date = this.authLocalstorage.getCurrentDateAndHour();
    this.fechaInicia = date.fecha;
    this.horaInicia = date.hora;
      
    // OBTIENE LOS DATOS DEL USUARIO LOGEADO
    const user = this.authService.useJwtHelper();
    this.inicia_idempleado = user.idempleado;

    // ENVIAR A IMPRESIÓN Y ABRE CAJA
    const corte = {
      fechaInicia: this.fechaInicia,
      horaInicia: this.horaInicia,
      inicia_idempleado: this.inicia_idempleado,
    };
    
    const html = this.printerService.printCorteInicio(corte);                    
    const ventimp = window.open(' ', 'Corte Inicio');
    ventimp.document.write(html);
    ventimp.document.close();
    ventimp.print();
    ventimp.close();

  }
  empleadoAddModalShow() {
      const disposable = this.dialogService.addDialog(EmpleadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.empleadoShowToast(data);
          }
      });
  }
  empleadoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getEmpleado();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getEmpleado() {
      this.empleadosService.all()
      .subscribe(
          (data: any) => this._empleado = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: CortesInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  montoInicial: this.montoInicial,
                  inicia_idempleado: this.inicia_idempleado,
                  fechaInicia: this.fechaInicia,
                  horaInicia: this.horaInicia,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
