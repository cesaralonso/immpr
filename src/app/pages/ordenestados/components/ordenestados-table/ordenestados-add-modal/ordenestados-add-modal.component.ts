import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdenestadosService } from './../ordenestados.service';
import { OrdenestadosInterface } from './../ordenestados.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdensService } from './../../../../ordens/components/ordens-table/ordens.service';
import { OrdensAddModalComponent } from './../../../../ordens/components/ordens-table/ordens-add-modal/ordens-add-modal.component';
import { EstadosService } from './../../../../estados/components/estados-table/estados.service';
import { EstadosAddModalComponent } from './../../../../estados/components/estados-table/estados-add-modal/estados-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./ordenestados-add-modal.component.scss')],
  templateUrl: './ordenestados-add-modal.component.html'
})
export class OrdenestadosAddModalComponent extends DialogComponent<OrdenestadosInterface, any> implements OnInit, OrdenestadosInterface {
  _orden: string[] = [];
  _estado: string[] = [];

  orden_idorden: number;
  estado_idestado: number;
  fecha: string;
  hora: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  orden_idordenAC: AbstractControl;
  estado_idestadoAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;

  constructor(
    private service: OrdenestadosService,
    private ordensService: OrdensService,
    private estadosService: EstadosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'orden_idordenAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'estado_idestadoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'fechaAC' : [''],
    'horaAC' : [''],
    });
    this.orden_idordenAC = this.form.controls['orden_idordenAC'];
    this.estado_idestadoAC = this.form.controls['estado_idestadoAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
  }
  ngOnInit() {
      this.getOrden();
      this.getEstado();

            
    // FECHA Y HORA ACTUAL
    const date = this.authLocalstorage.getCurrentDateAndHour();
    this.fecha = date.fecha;
    this.hora = date.hora;
  }
  ordenAddModalShow() {
      const disposable = this.dialogService.addDialog(OrdensAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.ordenShowToast(data);
          }
      });
  }
  ordenShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getOrden();
      } else {
          this.toastrService.error(result.message);
      }
  }
  estadoAddModalShow() {
      const disposable = this.dialogService.addDialog(EstadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.estadoShowToast(data);
          }
      });
  }
  estadoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getEstado();
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
  getEstado() {
      this.estadosService.all()
      .subscribe(
          (data: any) => this._estado = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: OrdenestadosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  orden_idorden: this.orden_idorden,
                  estado_idestado: this.estado_idestado,
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
