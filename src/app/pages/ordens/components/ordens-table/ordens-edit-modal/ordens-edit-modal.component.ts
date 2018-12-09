import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdensService } from './../ordens.service';
import { OrdensInterface } from './../ordens.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from './../../../../clientes/components/clientes-table/clientes.service';
import { ClientesAddModalComponent } from './../../../../clientes/components/clientes-table/clientes-add-modal/clientes-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./ordens-edit-modal.component.scss')],
  templateUrl: './ordens-edit-modal.component.html'
})
export class OrdensEditModalComponent extends DialogComponent<OrdensInterface, any> implements OnInit, OrdensInterface {
  _cliente: string[] = [];

  idorden: number;
  cliente_idcliente: number;
  fecha: string;
  hora: string;
  fechaEntregaEstimada: string;
  horaEntregaEstimada: string;
  fechaEntregaReal: string;
  horaEntregaReal: string;
  subtotal: number;
  total: number;
  abonado: number;
  adeudo: number;
  factura: boolean;
  comentarios: string;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  cliente_idclienteAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  fechaEntregaEstimadaAC: AbstractControl;
  horaEntregaEstimadaAC: AbstractControl;
  fechaEntregaRealAC: AbstractControl;
  horaEntregaRealAC: AbstractControl;
  subtotalAC: AbstractControl;
  totalAC: AbstractControl;
  abonadoAC: AbstractControl;
  adeudoAC: AbstractControl;
  facturaAC: AbstractControl;
  comentariosAC: AbstractControl;
  constructor(
      private service: OrdensService,
      private clientesService: ClientesService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'cliente_idclienteAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'fechaAC' : [''],
    'horaAC' : [''],
    'fechaEntregaEstimadaAC' : [''],
    'horaEntregaEstimadaAC' : [''],
    'fechaEntregaRealAC' : [''],
    'horaEntregaRealAC' : [''],
    'subtotalAC' : [''],
    'totalAC' : [''],
    'abonadoAC' : [''],
    'adeudoAC' : [''],
    'facturaAC' : [''],
    'comentariosAC' : [''],
  });
  this.cliente_idclienteAC = this.form.controls['cliente_idclienteAC'];
  this.fechaAC = this.form.controls['fechaAC'];
  this.horaAC = this.form.controls['horaAC'];
  this.fechaEntregaEstimadaAC = this.form.controls['fechaEntregaEstimadaAC'];
  this.horaEntregaEstimadaAC = this.form.controls['horaEntregaEstimadaAC'];
  this.fechaEntregaRealAC = this.form.controls['fechaEntregaRealAC'];
  this.horaEntregaRealAC = this.form.controls['horaEntregaRealAC'];
  this.subtotalAC = this.form.controls['subtotalAC'];
  this.totalAC = this.form.controls['totalAC'];
  this.abonadoAC = this.form.controls['abonadoAC'];
  this.adeudoAC = this.form.controls['adeudoAC'];
  this.facturaAC = this.form.controls['facturaAC'];
  this.comentariosAC = this.form.controls['comentariosAC'];
  }
  ngOnInit() {
      this.getCliente();
  }

  clienteAddModalShow() {
      const disposable = this.dialogService.addDialog(ClientesAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.clienteShowToast(data);
          }
      })
  }

  clienteShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getCliente();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getCliente() {
      this.clientesService.all()
      .subscribe(
          (data: any) => this._cliente = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: OrdensInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idorden: this.idorden,
                  cliente_idcliente: this.cliente_idcliente,
                  fecha: this.fecha,
                  hora: this.hora,
                  fechaEntregaEstimada: this.fechaEntregaEstimada,
                  horaEntregaEstimada: this.horaEntregaEstimada,
                  fechaEntregaReal: this.fechaEntregaReal,
                  horaEntregaReal: this.horaEntregaReal,
                  subtotal: this.subtotal,
                  total: this.total,
                  abonado: this.abonado,
                  adeudo: this.adeudo,
                  factura: this.factura,
                  comentarios: this.comentarios,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
