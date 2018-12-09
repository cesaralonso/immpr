import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { FormulasInterface } from './formulas.interface';
import { FormulasResponseInterface } from './formulas-response.interface';
import { Component, OnInit } from '@angular/core';
import { FormulasService } from './formulas.service';
import { FormulasAddModalComponent } from './formulas-add-modal/formulas-add-modal.component';
import { FormulasEditModalComponent } from './formulas-edit-modal/formulas-edit-modal.component';
import { ProductosInterface } from './../../../productos/components/productos-table/productos.interface';
import { ProductosAddModalComponent } from './../../../productos/components/productos-table/productos-add-modal/productos-add-modal.component';

@Component({
selector: 'formulas-table',
templateUrl: './formulas-table.html',
styleUrls: ['./formulas-table.scss'],
})
export class FormulasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idformula';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: FormulasService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.getAll();
    }
    insertProducto(formulas: FormulasInterface) {
      const producto: ProductosInterface = {
        formula_idformula: formulas.idformula
      }
      const disposable = this.dialogService.addDialog(ProductosAddModalComponent, producto)
      .subscribe( data => {
          if (data) {
          this.productoShowToast(data);
          }
      });
    }
    productoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewProducto(formulas: FormulasInterface) {
      this.router.navigate([`/pages/productos/formula/${formulas.idformula}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(FormulasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(formulas: FormulasInterface) {
      const disposable = this.dialogService.addDialog(FormulasEditModalComponent, formulas)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      },
      error => console.log(error),
      () => console.log('Modified complete'));
    }
    onDeleteConfirm(event, item): void {
      if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {
          this.service.remove(item.idformula)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }
    showToast(result) {
      if (result.success) {
        this.toastrService.success(result.message);
        this.getAll();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: FormulasResponseInterface) =>  {
                if (data.success) {
                  this.data = data.result;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
