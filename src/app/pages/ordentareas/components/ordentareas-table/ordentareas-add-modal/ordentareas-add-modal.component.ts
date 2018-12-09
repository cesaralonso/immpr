import { TareasInterface } from './../../../../tareas/components/tareas-table/tareas.interface';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdentareasService } from './../ordentareas.service';
import { OrdentareasInterface } from './../ordentareas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TareasService } from './../../../../tareas/components/tareas-table/tareas.service';
import { TareasAddModalComponent } from './../../../../tareas/components/tareas-table/tareas-add-modal/tareas-add-modal.component';
import { OrdenproductosService } from './../../../../ordenproductos/components/ordenproductos-table/ordenproductos.service';
import { OrdenproductosAddModalComponent } from './../../../../ordenproductos/components/ordenproductos-table/ordenproductos-add-modal/ordenproductos-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./ordentareas-add-modal.component.scss')],
  templateUrl: './ordentareas-add-modal.component.html'
})
export class OrdentareasAddModalComponent extends DialogComponent<OrdentareasInterface, any> implements OnInit, OrdentareasInterface {
  _tarea: string[] = [];
  _ordenproducto: string[] = [];

  tarea_idtarea: number;
  ordenproducto_idordenproducto: number;
  especificaciones: string;
  fechaInicio: string;
  horaInicio: string;
  fechaEstimada: string;
  horaEstimada: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  tarea_idtareaAC: AbstractControl;
  ordenproducto_idordenproductoAC: AbstractControl;
  especificacionesAC: AbstractControl;
  fechaInicioAC: AbstractControl;
  horaInicioAC: AbstractControl;
  fechaEstimadaAC: AbstractControl;
  horaEstimadaAC: AbstractControl;

  constructor(
    private service: OrdentareasService,
    private tareasService: TareasService,
    private ordenproductosService: OrdenproductosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'tarea_idtareaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'ordenproducto_idordenproductoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'especificacionesAC' : ['',Validators.compose([Validators.maxLength(245)])],
    'fechaInicioAC' : [''],
    'horaInicioAC' : [''],
    'fechaEstimadaAC' : [''],
    'horaEstimadaAC' : [''],
    });
    this.tarea_idtareaAC = this.form.controls['tarea_idtareaAC'];
    this.ordenproducto_idordenproductoAC = this.form.controls['ordenproducto_idordenproductoAC'];
    this.especificacionesAC = this.form.controls['especificacionesAC'];
    this.fechaInicioAC = this.form.controls['fechaInicioAC'];
    this.horaInicioAC = this.form.controls['horaInicioAC'];
    this.fechaEstimadaAC = this.form.controls['fechaEstimadaAC'];
    this.horaEstimadaAC = this.form.controls['horaEstimadaAC'];
  }
  ngOnInit() {
      this.getTarea();
      this.getOrdenproducto();

        // FECHA Y HORA ACTUAL
        const fechahora = this.authLocalstorage.getCurrentDateAndHour();
        this.fechaInicio = fechahora.fecha;
        this.horaInicio = fechahora.hora;
  }

  calcularEstimada() {
      const tareatiempoinicio = {
          idtarea: this.tarea_idtarea, 
          fechaInicio: this.fechaInicio, 
          horaInicio: this.horaInicio,
      };

      this.service.getTiempoEstimado(tareatiempoinicio)
        .subscribe(data => {
            this.fechaEstimada = data.result.fechaEstimada;
            this.horaEstimada = data.result.horaEstimada;
        });
  }

  tareaAddModalShow() {
      const disposable = this.dialogService.addDialog(TareasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.tareaShowToast(data);
          }
      });
  }
  tareaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getTarea();
      } else {
          this.toastrService.error(result.message);
      }
  }
  ordenproductoAddModalShow() {
      const disposable = this.dialogService.addDialog(OrdenproductosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.ordenproductoShowToast(data);
          }
      });
  }
  ordenproductoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getOrdenproducto();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getTarea() {
      this.tareasService.allByAreaWithIdOrdenProducto(this.ordenproducto_idordenproducto)
      .subscribe(
          (data: any) => this._tarea = data.result,
      );
  }
  getOrdenproducto() {
      this.ordenproductosService.all()
      .subscribe(
          (data: any) => this._ordenproducto = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: OrdentareasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  tarea_idtarea: this.tarea_idtarea,
                  ordenproducto_idordenproducto: this.ordenproducto_idordenproducto,
                  especificaciones: this.especificaciones,
                  fechaInicio: this.fechaInicio,
                  horaInicio: this.horaInicio,
                  fechaEstimada: this.fechaEstimada,
                  horaEstimada: this.horaEstimada,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
