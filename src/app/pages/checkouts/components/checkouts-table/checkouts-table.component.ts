import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CheckoutsInterface } from './checkouts.interface';
import { CheckoutsResponseInterface } from './checkouts-response.interface';
import { Component, OnInit } from '@angular/core';
import { CheckoutsService } from './checkouts.service';
import { CheckoutsAddModalComponent } from './checkouts-add-modal/checkouts-add-modal.component';
import { CheckoutsEditModalComponent } from './checkouts-edit-modal/checkouts-edit-modal.component';

@Component({
selector: 'checkouts-table',
templateUrl: './checkouts-table.html',
styleUrls: ['./checkouts-table.scss'],
})
export class CheckoutsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcheckout';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos de escritura y eliminación
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: CheckoutsService, 
      private toastrService: ToastrService, 
      private authService: AuthService, 
      private dialogService: DialogService, 
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
            if (userModules[element].path === '/pages/checkouts') {
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
        if (params['idcheckoutestado'] !== undefined) {
          const idcheckoutestado = +params['idcheckoutestado'];
          this.findByIdCheckoutestado(idcheckoutestado);
          this.backpage = true;
        }
        if (params['idempleado'] !== undefined) {
          const idempleado = +params['idempleado'];
          this.findByIdEmpleado(idempleado);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdCheckoutestado(id: number): void {
      this.service
        .findByIdCheckoutestado(id)
        .subscribe(
            (data: CheckoutsResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdEmpleado(id: number): void {
      this.service
        .findByIdEmpleado(id)
        .subscribe(
            (data: CheckoutsResponseInterface) => {
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
      const disposable = this.dialogService.addDialog(CheckoutsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(checkouts: CheckoutsInterface) {
      const disposable = this.dialogService.addDialog(CheckoutsEditModalComponent, checkouts)
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
          this.service.remove(item.idcheckout)
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
            (data: CheckoutsResponseInterface) =>  {
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
