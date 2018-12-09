import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TipopreciosInterface } from './tipoprecios.interface';
import { TipopreciosResponseInterface } from './tipoprecios-response.interface';
import { Component, OnInit } from '@angular/core';
import { TipopreciosService } from './tipoprecios.service';
import { TipopreciosAddModalComponent } from './tipoprecios-add-modal/tipoprecios-add-modal.component';
import { TipopreciosEditModalComponent } from './tipoprecios-edit-modal/tipoprecios-edit-modal.component';
import { OrdenproductosInterface } from './../../../ordenproductos/components/ordenproductos-table/ordenproductos.interface';
import { OrdenproductosAddModalComponent } from './../../../ordenproductos/components/ordenproductos-table/ordenproductos-add-modal/ordenproductos-add-modal.component';

@Component({
selector: 'tipoprecios-table',
templateUrl: './tipoprecios-table.html',
styleUrls: ['./tipoprecios-table.scss'],
})
export class TipopreciosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtipoprecio';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: TipopreciosService, 
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
            if (userModules[element].path === '/pages/tipoprecios') {
              this.updateable = userModules[element].updateable;
              this.deleteable = userModules[element].deleteable;
              this.writeable = userModules[element].writeable;
            }
          }
        }
      }
    }
    ngOnInit() {
      this.getAll();
    }
    insertOrdenproducto(tipoprecios: TipopreciosInterface) {
      const ordenproducto: OrdenproductosInterface = {
        tipoprecio_idtipoprecio: tipoprecios.idtipoprecio
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
    viewOrdenproducto(tipoprecios: TipopreciosInterface) {
      this.router.navigate([`/pages/ordenproductos/tipoprecio/${tipoprecios.idtipoprecio}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TipopreciosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(tipoprecios: TipopreciosInterface) {
      const disposable = this.dialogService.addDialog(TipopreciosEditModalComponent, tipoprecios)
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
          this.service.remove(item.idtipoprecio)
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
            (data: TipopreciosResponseInterface) =>  {
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
