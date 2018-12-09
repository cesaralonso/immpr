import { AuthService } from './../../../../../shared/auth.service';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdensService } from './../ordens.service';
import { OrdensInterface } from './../ordens.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientesService } from './../../../../clientes/components/clientes-table/clientes.service';
import { ClientesAddModalComponent } from './../../../../clientes/components/clientes-table/clientes-add-modal/clientes-add-modal.component';
import { ProductosService } from './../../../../productos/components/productos-table/productos.service';
import { ProductosAddModalComponent } from './../../../../productos/components/productos-table/productos-add-modal/productos-add-modal.component';
import { OrdenproductosService } from './../../../../ordenproductos/components/ordenproductos-table/ordenproductos.service';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./ordens-add-modal.component.scss')],
  templateUrl: './ordens-add-modal.component.html'
})
export class OrdensAddModalComponent extends DialogComponent<OrdensInterface, any> implements OnInit, OrdensInterface {
  _cliente: string[] = [];
  _producto: string[] = [];

clienteRewriteable: boolean = false;

  cliente_idcliente: number;
  fecha: string;
  hora: string;
  fechaEntregaEstimada: string;
  horaEntregaEstimada: string;
  subtotal: number;
  total: number;
  cubierto: number;
  abonado: number;
  adeudo: number;
  factura: boolean;
  comentarios: string;
  ordenproducto: any[];

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  cliente_idclienteAC: AbstractControl;
  fechaAC: AbstractControl;
  horaAC: AbstractControl;
  fechaEntregaEstimadaAC: AbstractControl;
  horaEntregaEstimadaAC: AbstractControl;
  facturaAC: AbstractControl;
  comentariosAC: AbstractControl;
  ordenproductoAC: AbstractControl;

  constructor(
    private service: OrdensService,
    private authService: AuthService, 
    private clientesService: ClientesService,
    private productosService: ProductosService,
    private ordenproductosService: OrdenproductosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'cliente_idclienteAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'fechaAC' : [''],
    'horaAC' : [''],
    'fechaEntregaEstimadaAC' : [''],
    'horaEntregaEstimadaAC' : [''],
    'facturaAC' : [''],
    'comentariosAC' : [''],
    'ordenproductoAC' : [''],
    });
    this.cliente_idclienteAC = this.form.controls['cliente_idclienteAC'];
    this.fechaAC = this.form.controls['fechaAC'];
    this.horaAC = this.form.controls['horaAC'];
    this.fechaEntregaEstimadaAC = this.form.controls['fechaEntregaEstimadaAC'];
    this.horaEntregaEstimadaAC = this.form.controls['horaEntregaEstimadaAC'];
    this.facturaAC = this.form.controls['facturaAC'];
    this.comentariosAC = this.form.controls['comentariosAC'];
    this.ordenproductoAC = this.form.controls['ordenproductoAC'];

    // Buscar permisos del usuario en el módulo
    const user = this.authService.useJwtHelper();

    if (user.super) {
        this.clienteRewriteable = true;
    } else {
        const userModules = this.authService.getUserModules();
        if (userModules[0]) {
            for (const element in userModules) {
                if (userModules.hasOwnProperty(element)) {
                    if (userModules[element].path === '/pages/clientes') {
                        this.clienteRewriteable = userModules[element].writeable;
                    }
                } 
            }
        }
    }
  }
  ngOnInit() {
      this.getCliente();
      this.getProducto();
    
    // FECHA Y HORA ACTUAL
    const date = this.authLocalstorage.getCurrentDateAndHour();
    this.fecha = date.fecha;
    this.hora = date.hora;

    // SET
    this.subtotal = 0;
    this.total = 0;
    this.cubierto = 0;
    this.abonado = 0;
    this.adeudo = 0;
  }
  clienteAddModalShow() {
      const disposable = this.dialogService.addDialog(ClientesAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.clienteShowToast(data);
          }
      });
  }
  clienteShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getCliente();
      } else {
          this.toastrService.error(result.message);
      }
  }
  productoAddModalShow() {
      const disposable = this.dialogService.addDialog(ProductosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.productoShowToast(data);
          }
      });
  }
  productoShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getProducto();
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
  getProducto() {
      this.productosService.all()
      .subscribe(
          (data: any) => this._producto = data.result,
      );
  }
  postOrdenproducto(data) {
      this.ordenproductosService.insert(data)
      .subscribe(
          (result: any) => {
              this.data = result;
              this.confirm();
          });
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: OrdensInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  cliente_idcliente: this.cliente_idcliente,
                  fecha: this.fecha,
                  hora: this.hora,
                  fechaEntregaEstimada: this.fechaEntregaEstimada,
                  horaEntregaEstimada: this.horaEntregaEstimada,
                  subtotal: this.subtotal,
                  total: this.total,
                  cubierto: this.cubierto,
                  abonado: this.abonado,
                  adeudo: this.adeudo,
                  factura: this.factura,
                  comentarios: this.comentarios
        })
        .subscribe(
            (data: any) => {
            
              if (data.success) {
                    /*
                  this.ordenproducto.forEach(element => {
                      this.postOrdenproducto({
                          orden_idorden: data.result.insertId,
                          producto_idproducto: +element,
                      });
                  });
              } else { */
                  this.data = data;
                  this.confirm();
              }
            });
    }
  }
}
