import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { OrdenproductosService } from './../ordenproductos.service';
import { OrdenproductosInterface } from './../ordenproductos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdensService } from './../../../../ordens/components/ordens-table/ordens.service';
import { OrdensAddModalComponent } from './../../../../ordens/components/ordens-table/ordens-add-modal/ordens-add-modal.component';
import { ProductosService } from './../../../../productos/components/productos-table/productos.service';
import { ProductosAddModalComponent } from './../../../../productos/components/productos-table/productos-add-modal/productos-add-modal.component';
import { TipopreciosService } from './../../../../tipoprecios/components/tipoprecios-table/tipoprecios.service';
import { TipopreciosAddModalComponent } from './../../../../tipoprecios/components/tipoprecios-table/tipoprecios-add-modal/tipoprecios-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./ordenproductos-add-modal.component.scss')],
  templateUrl: './ordenproductos-add-modal.component.html'
})
export class OrdenproductosAddModalComponent extends DialogComponent<OrdenproductosInterface, any> implements OnInit, OrdenproductosInterface {
  _orden: string[] = [];
  _producto: string[] = [];
  _tipoprecio: string[] = [];

  orden_idorden: number;
  producto_idproducto: number;
  cantidad: number;
  ancho: number;
  alto: number;
  tipoprecio_idtipoprecio: number;
  precio: number;

  withFormula: boolean = false;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  orden_idordenAC: AbstractControl;
  producto_idproductoAC: AbstractControl;
  cantidadAC: AbstractControl;
  anchoAC: AbstractControl;
  altoAC: AbstractControl;
  tipoprecio_idtipoprecioAC: AbstractControl;
  precioAC: AbstractControl;

  constructor(
    private service: OrdenproductosService,
    private ordensService: OrdensService,
    private productosService: ProductosService,
    private tipopreciosService: TipopreciosService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'orden_idordenAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'producto_idproductoAC' : [''],
    'cantidadAC' : ['',Validators.compose([Validators.maxLength(4)])],
    'anchoAC' : [''],
    'altoAC' : [''],
    'tipoprecio_idtipoprecioAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'precioAC' : [''],
    });
    this.orden_idordenAC = this.form.controls['orden_idordenAC'];
    this.producto_idproductoAC = this.form.controls['producto_idproductoAC'];
    this.cantidadAC = this.form.controls['cantidadAC'];
    this.anchoAC = this.form.controls['anchoAC'];
    this.altoAC = this.form.controls['altoAC'];
    this.tipoprecio_idtipoprecioAC = this.form.controls['tipoprecio_idtipoprecioAC'];
    this.precioAC = this.form.controls['precioAC'];
  }
  ngOnInit() {
      this.getOrden();
      this.getProducto();
      this.getTipoprecio();

      // INICIALIZA
      this.ancho = 1;
      this.alto = 1;
  }

  verificaFormula() {
      const formula: string = this.producto_idproducto.toString().split(',')[1];
      if (formula === 'ANCHO POR ALTO POR PRECIO') {
          this.withFormula = true;
      } else {
          this.withFormula = false;
      }
  }

  calcularPrecio() {
    const calculo = {
        'idtipoprecio': this.tipoprecio_idtipoprecio,
        'ancho': this.ancho,
        'alto': this.alto,
        'cantidad': this.cantidad,
        'producto_idproducto': this.producto_idproducto,
    };

    this.service.calcularPrecio(calculo)
      .subscribe( data => {
          if (data) {
            if (data.success) {
                this.precio = data.result;
                this.toastrService.success(data.message);
            } else {
                this.toastrService.error(data.message);
            }
          }
      });
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
  tipoprecioAddModalShow() {
      const disposable = this.dialogService.addDialog(TipopreciosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.tipoprecioShowToast(data);
          }
      });
  }
  tipoprecioShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getTipoprecio();
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
  getProducto() {
      this.productosService.all()
      .subscribe(
          (data: any) => this._producto = data.result,
      );
  }
  getTipoprecio() {
      this.tipopreciosService.all()
      .subscribe(
          (data: any) => this._tipoprecio = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: OrdenproductosInterface): void {
    this.submitted = true;
    if (this.form.valid) {
        
      const idproducto: string = this.producto_idproducto.toString().split(',')[0];
      this.service
        .insert({
                  orden_idorden: this.orden_idorden,
                  producto_idproducto: +idproducto,
                  cantidad: this.cantidad,
                  ancho: this.ancho,
                  alto: this.alto,
                  tipoprecio_idtipoprecio: this.tipoprecio_idtipoprecio,
                  precio: this.precio,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
