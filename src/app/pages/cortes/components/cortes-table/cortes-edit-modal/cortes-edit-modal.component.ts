import { PrinterService } from './../../../../../shared/printer.service';
import { AuthService } from './../../../../../shared/auth.service';
import { RegistradorasService } from './../../../../registradoras/components/registradoras-table/registradoras.service';
import { EgresoconceptosService } from './../../../../egresoconceptos/components/egresoconceptos-table/egresoconceptos.service';
import { AbonosService } from './../../../../abonos/components/abonos-table/abonos.service';
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
  selector: 'edit-service-modal',
  styleUrls: [('./cortes-edit-modal.component.scss')],
  templateUrl: './cortes-edit-modal.component.html'
})
export class CortesEditModalComponent extends DialogComponent<CortesInterface, any> implements OnInit, CortesInterface {
  _empleado: string[] = [];

  idcorte: number;
  montoInicial: number;
  montoFinal: number;
  ganancia: number;
  inicia_idempleado: number;
  finaliza_idempleado: number;
  fechaInicia: string;
  horaInicia: string;
  fechaFInaliza: string;
  horaFinaliza: string;

  montoEsperado: number = 0;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  montoInicialAC: AbstractControl;
  montoFinalAC: AbstractControl;
  gananciaAC: AbstractControl;
  inicia_idempleadoAC: AbstractControl;
  finaliza_idempleadoAC: AbstractControl;
  fechaIniciaAC: AbstractControl;
  horaIniciaAC: AbstractControl;
  fechaFInalizaAC: AbstractControl;
  horaFinalizaAC: AbstractControl;
  constructor(
      private service: CortesService,
      private empleadosService: EmpleadosService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      private authService: AuthService,
      private registradorasService: RegistradorasService,
      private printerService: PrinterService,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'montoInicialAC' : ['', Validators.compose([Validators.required])],
    'montoFinalAC' : ['', Validators.compose([Validators.required])],
    'gananciaAC' : [''],
    'inicia_idempleadoAC' : ['', Validators.compose([Validators.required, Validators.maxLength(11)])],
    'finaliza_idempleadoAC' : ['', Validators.compose([Validators.maxLength(11)])],
    'fechaIniciaAC' : ['', Validators.compose([Validators.required])],
    'horaIniciaAC' : ['', Validators.compose([Validators.required])],
    'fechaFInalizaAC' : ['', Validators.compose([Validators.required])],
    'horaFinalizaAC' : ['', Validators.compose([Validators.required])],
  });
  this.montoInicialAC = this.form.controls['montoInicialAC'];
  this.montoFinalAC = this.form.controls['montoFinalAC'];
  this.gananciaAC = this.form.controls['gananciaAC'];
  this.inicia_idempleadoAC = this.form.controls['inicia_idempleadoAC'];
  this.finaliza_idempleadoAC = this.form.controls['finaliza_idempleadoAC'];
  this.fechaIniciaAC = this.form.controls['fechaIniciaAC'];
  this.horaIniciaAC = this.form.controls['horaIniciaAC'];
  this.fechaFInalizaAC = this.form.controls['fechaFInalizaAC'];
  this.horaFinalizaAC = this.form.controls['horaFinalizaAC'];
  }
  ngOnInit() {
      this.getEmpleado();

    // FECHA Y HORA ACTUAL
    const date = this.authLocalstorage.getCurrentDateAndHour();
    this.fechaFInaliza = date.fecha;
    this.horaFinaliza = date.hora;

    // OBTIENE LOS DATOS DEL USUARIO LOGEADO
    const user = this.authService.useJwtHelper();
    this.finaliza_idempleado = user.idempleado;

    this.calcularMontoEsperado();
  }

  calcularMontoEsperado() {

      // Obtener la suma total de egresos para la fechainicia hasta la fechafinaliza
    let totalEgresos: number = 0;
    let totalIngresos: number = 0;

    console.log("this.fechaInicia", this.fechaInicia);
    console.log("this.fechaFInaliza", this.fechaFInaliza);
    this.registradorasService.totalPorFechas(this.fechaInicia, this.fechaFInaliza)
        .subscribe(
          (registradora: any) => {

            totalEgresos = registradora.result[0].egreso || 0;
            totalIngresos = registradora.result[0].ingreso || 0;

            this.montoEsperado = totalIngresos - totalEgresos;

            // ENVIAR A IMPRESIÓN Y ABRE CAJA
            const corte = {
                fechaFInaliza: this.fechaFInaliza,
                horaFinaliza: this.horaFinaliza,
                finaliza_idempleado: this.inicia_idempleado,
                montoEsperado: this.montoEsperado,
            };
            const html = this.printerService.printCorteFin(corte);

            const ventimp = window.open(' ', 'Corte Cierre');
            ventimp.document.write(html);
            ventimp.document.close();
            ventimp.print();
            ventimp.close();

          });

  }

    calcularMontoAcumulado() {
        this.ganancia = ((+this.montoFinal) - (+this.montoInicial));
    }

  empleadoAddModalShow() {
      const disposable = this.dialogService.addDialog(EmpleadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.empleadoShowToast(data);
          }
      })
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
              .update({
                  idcorte: this.idcorte,
                  montoInicial: this.montoInicial,
                  montoFinal: this.montoFinal,
                  ganancia: this.ganancia,
                  inicia_idempleado: this.inicia_idempleado,
                  finaliza_idempleado: this.finaliza_idempleado,
                  fechaInicia: this.fechaInicia,
                  horaInicia: this.horaInicia,
                  fechaFInaliza: this.fechaFInaliza,
                  horaFinaliza: this.horaFinaliza,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
