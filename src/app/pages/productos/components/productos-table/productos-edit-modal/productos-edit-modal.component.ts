import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { ProductosService } from './../productos.service';
import { ProductosInterface } from './../productos.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormulasService } from './../../../../formulas/components/formulas-table/formulas.service';
import { FormulasAddModalComponent } from './../../../../formulas/components/formulas-table/formulas-add-modal/formulas-add-modal.component';
import { AreasService } from './../../../../areas/components/areas-table/areas.service';
import { AreasAddModalComponent } from './../../../../areas/components/areas-table/areas-add-modal/areas-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./productos-edit-modal.component.scss')],
  templateUrl: './productos-edit-modal.component.html'
})
export class ProductosEditModalComponent extends DialogComponent<ProductosInterface, any> implements OnInit, ProductosInterface {
  _formula: string[] = [];
  _area: string[] = [];

  idproducto: number;
  formula_idformula: number;
  nombre: string;
  area_idarea: number;
  duracionEstimada: number;
  precioPublico: number;
  precioMayoreo: number;
  precioMaquila: number;
  extraPor: string;
  extraPrecio: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  formula_idformulaAC: AbstractControl;
  nombreAC: AbstractControl;
  area_idareaAC: AbstractControl;
  duracionEstimadaAC: AbstractControl;
  precioPublicoAC: AbstractControl;
  precioMayoreoAC: AbstractControl;
  precioMaquilaAC: AbstractControl;
  extraPorAC: AbstractControl;
  extraPrecioAC: AbstractControl;
  constructor(
      private service: ProductosService,
      private formulasService: FormulasService,
      private areasService: AreasService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'formula_idformulaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'nombreAC' : ['',Validators.compose([Validators.required,Validators.maxLength(55)])],
    'area_idareaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'duracionEstimadaAC' : [''],
    'precioPublicoAC' : [''],
    'precioMayoreoAC' : [''],
    'precioMaquilaAC' : [''],
    'extraPorAC' : ['',Validators.compose([Validators.maxLength(45)])],
    'extraPrecioAC' : [''],
  });
  this.formula_idformulaAC = this.form.controls['formula_idformulaAC'];
  this.nombreAC = this.form.controls['nombreAC'];
  this.area_idareaAC = this.form.controls['area_idareaAC'];
  this.duracionEstimadaAC = this.form.controls['duracionEstimadaAC'];
  this.precioPublicoAC = this.form.controls['precioPublicoAC'];
  this.precioMayoreoAC = this.form.controls['precioMayoreoAC'];
  this.precioMaquilaAC = this.form.controls['precioMaquilaAC'];
  this.extraPorAC = this.form.controls['extraPorAC'];
  this.extraPrecioAC = this.form.controls['extraPrecioAC'];
  }
  ngOnInit() {
      this.getFormula();
      this.getArea();
  }

  formulaAddModalShow() {
      const disposable = this.dialogService.addDialog(FormulasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.formulaShowToast(data);
          }
      })
  }

  formulaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getFormula();
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
      })
  }

  areaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getArea();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getFormula() {
      this.formulasService.all()
      .subscribe(
          (data: any) => this._formula = data.result,
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
  onSubmit(values: ProductosInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  idproducto: this.idproducto,
                  formula_idformula: this.formula_idformula,
                  nombre: this.nombre,
                  area_idarea: this.area_idarea,
                  duracionEstimada: this.duracionEstimada,
                  precioPublico: this.precioPublico,
                  precioMayoreo: this.precioMayoreo,
                  precioMaquila: this.precioMaquila,
                  extraPor: this.extraPor,
                  extraPrecio: this.extraPrecio,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
