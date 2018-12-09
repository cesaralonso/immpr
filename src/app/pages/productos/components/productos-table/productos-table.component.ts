import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ProductosInterface } from './productos.interface';
import { ProductosResponseInterface } from './productos-response.interface';
import { Component, OnInit } from '@angular/core';
import { ProductosService } from './productos.service';
import { ProductosAddModalComponent } from './productos-add-modal/productos-add-modal.component';
import { ProductosEditModalComponent } from './productos-edit-modal/productos-edit-modal.component';
import { OrdenproductosInterface } from './../../../ordenproductos/components/ordenproductos-table/ordenproductos.interface';
import { OrdenproductosAddModalComponent } from './../../../ordenproductos/components/ordenproductos-table/ordenproductos-add-modal/ordenproductos-add-modal.component';
import { TareasInterface } from './../../../tareas/components/tareas-table/tareas.interface';
import { TareasAddModalComponent } from './../../../tareas/components/tareas-table/tareas-add-modal/tareas-add-modal.component';

@Component({
selector: 'productos-table',
templateUrl: './productos-table.html',
styleUrls: ['./productos-table.scss'],
})
export class ProductosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idproducto';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: ProductosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private authService: AuthService,
      private route: ActivatedRoute, 
      private router: Router) {
        
      // Buscar permisos del usuario en el módulo
      const user = this.authService.useJwtHelper();
      
      if (user.super) {
        this.updateable = true;
        this.deleteable = true;
        this.writeable = true;
      } else {
        const userModules = this.authService.getUserModules();
        if (userModules[0]) {
          for (const element in userModules) {
            if (userModules[element].path === '/pages/productos') {
              this.updateable = userModules[element].updateable;
              this.deleteable = userModules[element].deleteable;
              this.writeable = userModules[element].writeable;
            }
          }
        }
      }
    }
    ngOnInit() {
      this.route.params.subscribe(params => {
        if (params['idarea'] !== undefined) {
          const idarea = +params['idarea'];
          this.findByIdArea(idarea);
          this.backpage = true;
        }
        if (params['idformula'] !== undefined) {
          const idformula = +params['idformula'];
          this.findByIdFormula(idformula);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdArea(id: number): void {
      this.service
        .findByIdArea(id)
        .subscribe(
            (data: ProductosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdFormula(id: number): void {
      this.service
        .findByIdFormula(id)
        .subscribe(
            (data: ProductosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    backPage() {
        window.history.back();
    }
    insertOrdenproducto(productos: ProductosInterface) {
      const ordenproducto: OrdenproductosInterface = {
        producto_idproducto: productos.idproducto
      }
      const disposable = this.dialogService.addDialog(OrdenproductosAddModalComponent, ordenproducto)
      .subscribe( data => {
          if (data) {
          this.ordenproductoShowToast(data);
          }
      });
    }
    ordenproductoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrdenproducto(productos: ProductosInterface) {
      this.router.navigate([`/pages/ordenproductos/producto/${productos.idproducto}`]);
    }
    insertTarea(productos: ProductosInterface) {
      const tarea: TareasInterface = {
        producto_idproducto: productos.idproducto
      }
      const disposable = this.dialogService.addDialog(TareasAddModalComponent, tarea)
      .subscribe( data => {
          if (data) {
          this.tareaShowToast(data);
          }
      });
    }
    tareaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewTarea(productos: ProductosInterface) {
      this.router.navigate([`/pages/tareas/producto/${productos.idproducto}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ProductosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(productos: ProductosInterface) {
      const disposable = this.dialogService.addDialog(ProductosEditModalComponent, productos)
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
          this.service.remove(item.idproducto)
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
            (data: ProductosResponseInterface) =>  {
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
