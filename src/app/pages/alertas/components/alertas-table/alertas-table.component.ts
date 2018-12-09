import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { AlertasInterface } from './alertas.interface';
import { AlertasResponseInterface } from './alertas-response.interface';
import { Component, OnInit } from '@angular/core';
import { AlertasService } from './alertas.service';
import { AlertasAddModalComponent } from './alertas-add-modal/alertas-add-modal.component';
import { AlertasEditModalComponent } from './alertas-edit-modal/alertas-edit-modal.component';

@Component({
selector: 'alertas-table',
templateUrl: './alertas-table.html',
styleUrls: ['./alertas-table.scss'],
})
export class AlertasTableComponent implements OnInit {
    enviadas = [];
    recibidas = [];
    data;

    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idalerta';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: AlertasService, 
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
            if (userModules[element].path === '/pages/alertas') {
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
        if (params['idempleado'] !== undefined) {
          const idempleado = +params['idempleado'];
          this.findByIdEmpleado(idempleado);
          this.backpage = true;
        }
        if (params['idtipoalerta'] !== undefined) {
          const idtipoalerta = +params['idtipoalerta'];
          this.findByIdTipoalerta(idtipoalerta);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdEmpleado(id: number): void {
      this.service
        .findByIdEmpleado(id)
        .subscribe(
            (data: AlertasResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdTipoalerta(id: number): void {
      this.service
        .findByIdTipoalerta(id)
        .subscribe(
            (data: AlertasResponseInterface) => {
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
      const disposable = this.dialogService.addDialog(AlertasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(alertas: AlertasInterface) {
      const disposable = this.dialogService.addDialog(AlertasEditModalComponent, alertas)
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
          this.service.remove(item.idalerta)
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
            (data: AlertasResponseInterface) =>  {
                if (data.success) {
                  this.enviadas = data.result.enviadas;
                  this.recibidas = data.result.recibidas;
                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
