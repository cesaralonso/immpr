import { AuthService } from './../../../../shared/auth.service';
import { ProductosService } from './../../../productos/components/productos-table/productos.service';
import { TipopreciosService } from './../../../tipoprecios/components/tipoprecios-table/tipoprecios.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { OrdenproductosInterface } from './ordenproductos.interface';
import { OrdenproductosResponseInterface } from './ordenproductos-response.interface';
import { Component, OnInit } from '@angular/core';
import { OrdenproductosService } from './ordenproductos.service';
import { OrdenproductosAddModalComponent } from './ordenproductos-add-modal/ordenproductos-add-modal.component';
import { OrdenproductosEditModalComponent } from './ordenproductos-edit-modal/ordenproductos-edit-modal.component';
import { OrdentareasInterface } from './../../../ordentareas/components/ordentareas-table/ordentareas.interface';
import { OrdentareasAddModalComponent } from './../../../ordentareas/components/ordentareas-table/ordentareas-add-modal/ordentareas-add-modal.component';

@Component({
selector: 'ordenproductos-table',
templateUrl: './ordenproductos-table.html',
styleUrls: ['./ordenproductos-table.scss'],
})
export class OrdenproductosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idordenproducto';
    sortOrder = 'asc';
    backpage: boolean;

    _producto = [];
    _tipoprecio = [];

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: OrdenproductosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private tipopreciosService: TipopreciosService, 
      private productosService: ProductosService, 
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
            if (userModules[element].path === '/pages/ordenproductos') {
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
        if (params['idorden'] !== undefined) {
          const idorden = +params['idorden'];
          this.findByIdOrden(idorden);
          this.backpage = true;
        }
        if (params['idproducto'] !== undefined) {
          const idproducto = +params['idproducto'];
          this.findByIdProducto(idproducto);
          this.backpage = true;
        }
        if (params['idtipoprecio'] !== undefined) {
          const idtipoprecio = +params['idtipoprecio'];
          this.findByIdTipoprecio(idtipoprecio);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });

      this.getTipoprecio();
      this.getProducto();
    }


    getTipoprecio() {
      this.tipopreciosService.all()
        .subscribe((data) => {
          this._tipoprecio = data.result;
        });
    }

    getProducto() {
      this.productosService.all()
        .subscribe((data) => {
          this._producto = data.result;
        });
    }

    private findByIdOrden(id: number): void {
      this.service
        .findByIdOrden(id)
        .subscribe(
            (data: OrdenproductosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdProducto(id: number): void {
      this.service
        .findByIdProducto(id)
        .subscribe(
            (data: OrdenproductosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdTipoprecio(id: number): void {
      this.service
        .findByIdTipoprecio(id)
        .subscribe(
            (data: OrdenproductosResponseInterface) => {
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
    insertOrdentarea(ordenproductos: OrdenproductosInterface) {
      const ordentarea: OrdentareasInterface = {
        ordenproducto_idordenproducto: ordenproductos.idordenproducto
      }
      const disposable = this.dialogService.addDialog(OrdentareasAddModalComponent, ordentarea)
      .subscribe( data => {
          if (data) {
          this.ordentareaShowToast(data);
          }
      });
    }
    ordentareaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrdentarea(ordenproductos: OrdenproductosInterface) {
      this.router.navigate([`/pages/ordentareas/ordenproducto/${ordenproductos.idordenproducto}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(OrdenproductosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(ordenproductos: OrdenproductosInterface) {
      const disposable = this.dialogService.addDialog(OrdenproductosEditModalComponent, ordenproductos)
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
          this.service.remove(item.idordenproducto)
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

        this.route.params.subscribe(params => {
          if (params['idorden'] !== undefined) {
            const idorden = +params['idorden'];
            this.findByIdOrden(idorden);
            this.backpage = true;
          }
          if (params['idproducto'] !== undefined) {
            const idproducto = +params['idproducto'];
            this.findByIdProducto(idproducto);
            this.backpage = true;
          }
          if (params['idtipoprecio'] !== undefined) {
            const idtipoprecio = +params['idtipoprecio'];
            this.findByIdTipoprecio(idtipoprecio);
            this.backpage = true;
          }
          if (!this.backpage) {
            this.getAll();
          }
        });

      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: OrdenproductosResponseInterface) =>  {
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
