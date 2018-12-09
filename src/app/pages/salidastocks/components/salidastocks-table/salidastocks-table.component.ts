import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { SalidastocksInterface } from './salidastocks.interface';
import { SalidastocksResponseInterface } from './salidastocks-response.interface';
import { Component, OnInit } from '@angular/core';
import { SalidastocksService } from './salidastocks.service';
import { SalidastocksAddModalComponent } from './salidastocks-add-modal/salidastocks-add-modal.component';
import { SalidastocksEditModalComponent } from './salidastocks-edit-modal/salidastocks-edit-modal.component';

@Component({
selector: 'salidastocks-table',
templateUrl: './salidastocks-table.html',
styleUrls: ['./salidastocks-table.scss'],
})
export class SalidastocksTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsalidastock';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: SalidastocksService, 
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
            if (userModules[element].path === '/pages/salidastocks') {
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
        if (params['idordentarea'] !== undefined) {
          const idordentarea = +params['idordentarea'];
          this.findByIdOrdentarea(idordentarea);
          this.backpage = true;
        }
        if (params['idstock'] !== undefined) {
          const idstock = +params['idstock'];
          this.findByIdStock(idstock);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdOrdentarea(id: number): void {
      this.service
        .findByIdOrdentarea(id)
        .subscribe(
            (data: SalidastocksResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdStock(id: number): void {
      this.service
        .findByIdStock(id)
        .subscribe(
            (data: SalidastocksResponseInterface) => {
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
    addModalShow() {
      const disposable = this.dialogService.addDialog(SalidastocksAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(salidastocks: SalidastocksInterface) {
      const disposable = this.dialogService.addDialog(SalidastocksEditModalComponent, salidastocks)
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
          this.service.remove(item.idsalidastock, item.cantidad, item.stock_idstock)
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
         
        // IMPLEMENTAR EN SOFCREADOR   
        // VALIDA SI VIENE DE OTRA PÁGINA       
        this.route.params.subscribe(params => {
          if (params['idordentarea'] !== undefined) {
            const idordentarea = +params['idordentarea'];
            this.findByIdOrdentarea(idordentarea);
            this.backpage = true;
          }
          if (params['idstock'] !== undefined) {
            const idstock = +params['idstock'];
            this.findByIdStock(idstock);
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
            (data: SalidastocksResponseInterface) =>  {
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
