import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { TareasService } from './../tareas.service';
import { TareasInterface } from './../tareas.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductosService } from './../../../../productos/components/productos-table/productos.service';
import { ProductosAddModalComponent } from './../../../../productos/components/productos-table/productos-add-modal/productos-add-modal.component';
import { AreasService } from './../../../../areas/components/areas-table/areas.service';
import { AreasAddModalComponent } from './../../../../areas/components/areas-table/areas-add-modal/areas-add-modal.component';

@Component({
  selector: 'add-service-modal',
  styleUrls: [('./tareas-add-modal.component.scss')],
  templateUrl: './tareas-add-modal.component.html'
})
export class TareasAddModalComponent extends DialogComponent<TareasInterface, any> implements OnInit, TareasInterface {
  _producto: string[] = [];
  _area: string[] = [];

  producto_idproducto: number;
  area_idarea: number;
  nombre: string;
  duracionEstimada: number;
  // costoEstimado: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;
  producto_idproductoAC: AbstractControl;
  area_idareaAC: AbstractControl;
  nombreAC: AbstractControl;
  duracionEstimadaAC: AbstractControl;
  // costoEstimadoAC: AbstractControl;

  constructor(
    private service: TareasService,
    private productosService: ProductosService,
    private areasService: AreasService,
    fb: FormBuilder,
    private toastrService: ToastrService,
    private authLocalstorage: AuthLocalstorage,
    dialogService: DialogService
  ) {
    super(dialogService);
    this.form = fb.group({
    'producto_idproductoAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'area_idareaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'nombreAC' : ['',Validators.compose([Validators.required,Validators.maxLength(45)])],
    'duracionEstimadaAC' : [''],
    // 'costoEstimadoAC' : [''],
    });
    this.producto_idproductoAC = this.form.controls['producto_idproductoAC'];
    this.area_idareaAC = this.form.controls['area_idareaAC'];
    this.nombreAC = this.form.controls['nombreAC'];
    this.duracionEstimadaAC = this.form.controls['duracionEstimadaAC'];
    // this.costoEstimadoAC = this.form.controls['costoEstimadoAC'];
  }
  ngOnInit() {
      this.getProducto();
      this.getArea();
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
  getProducto() {
      this.productosService.all()
      .subscribe(
          (data: any) => this._producto = data.result,
      );
  }
  getArea() {
      this.areasService.all()
      .subscribe(
          (data: any) => this._area = data.result,
      );
  }
  confirm() {
    this.result = this.data;
    this.close();
  }
  onSubmit(values: TareasInterface): void {
    this.submitted = true;
    if (this.form.valid) {
      this.service
        .insert({
                  producto_idproducto: this.producto_idproducto,
                  area_idarea: this.area_idarea,
                  nombre: this.nombre,
                  duracionEstimada: this.duracionEstimada,
                  costoEstimado: 0,
        })
        .subscribe(
            (data: any) => {
              this.data = data;
              this.confirm();
            });
    }
  }
}
