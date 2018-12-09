import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { AuthLocalstorage } from './../../../../../shared/auth-localstorage.service';
import { SalidastocksService } from './../salidastocks.service';
import { SalidastocksInterface } from './../salidastocks.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OrdentareasService } from './../../../../ordentareas/components/ordentareas-table/ordentareas.service';
import { OrdentareasAddModalComponent } from './../../../../ordentareas/components/ordentareas-table/ordentareas-add-modal/ordentareas-add-modal.component';
import { StocksService } from './../../../../stocks/components/stocks-table/stocks.service';
import { StocksAddModalComponent } from './../../../../stocks/components/stocks-table/stocks-add-modal/stocks-add-modal.component';
@Component({
  selector: 'edit-service-modal',
  styleUrls: [('./salidastocks-edit-modal.component.scss')],
  templateUrl: './salidastocks-edit-modal.component.html'
})
export class SalidastocksEditModalComponent extends DialogComponent<SalidastocksInterface, any> implements OnInit, SalidastocksInterface {
  _ordentarea: string[] = [];
  _stock: string[] = [];

  ordentarea_idordentarea: number;
  stock_idstock: number;
  cantidad: number;

  modalHeader: string;
  data: any;
  form: FormGroup;
  submitted: boolean = false;

  ordentarea_idordentareaAC: AbstractControl;
  stock_idstockAC: AbstractControl;
  cantidadAC: AbstractControl;
  constructor(
      private service: SalidastocksService,
      private ordentareasService: OrdentareasService,
      private stocksService: StocksService,
      fb: FormBuilder,
      private toastrService: ToastrService,
      private authLocalstorage: AuthLocalstorage,
      dialogService: DialogService,
  ) {
  super(dialogService);
  this.form = fb.group({
    'ordentarea_idordentareaAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'stock_idstockAC' : ['',Validators.compose([Validators.required,Validators.maxLength(11)])],
    'cantidadAC' : ['',Validators.compose([Validators.required,Validators.maxLength(5)])],
  });
  this.ordentarea_idordentareaAC = this.form.controls['ordentarea_idordentareaAC'];
  this.stock_idstockAC = this.form.controls['stock_idstockAC'];
  this.cantidadAC = this.form.controls['cantidadAC'];
  }
  ngOnInit() {
      this.getOrdentarea();
      this.getStock();
  }

  ordentareaAddModalShow() {
      const disposable = this.dialogService.addDialog(OrdentareasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.ordentareaShowToast(data);
          }
      })
  }

  ordentareaShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getOrdentarea();
      } else {
          this.toastrService.error(result.message);
      }
  }
  stockAddModalShow() {
      const disposable = this.dialogService.addDialog(StocksAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.stockShowToast(data);
          }
      })
  }

  stockShowToast(result) {
      if (result.success) {
          this.toastrService.success(result.message);
          this.getStock();
      } else {
          this.toastrService.error(result.message);
      }
  }
  getOrdentarea() {
      this.ordentareasService.all()
      .subscribe(
          (data: any) => this._ordentarea = data.result,
      );
  }
  getStock() {
      this.stocksService.all()
      .subscribe(
          (data: any) => this._stock = data.result,
      );
  }
  confirm() {
      this.result = this.data;
      this.close();
  }
  onSubmit(values: SalidastocksInterface): void {
      this.submitted = true;
      if (this.form.valid) {
          this.service
              .update({
                  ordentarea_idordentarea: this.ordentarea_idordentarea,
                  stock_idstock: this.stock_idstock,
                  cantidad: this.cantidad,
              })
              .subscribe(
                  (data: any) => {
                      this.data = data;
                      this.confirm();
              });
          }
  }
}
