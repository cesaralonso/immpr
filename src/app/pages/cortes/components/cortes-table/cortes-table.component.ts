import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CortesInterface } from './cortes.interface';
import { CortesResponseInterface } from './cortes-response.interface';
import { Component, OnInit } from '@angular/core';
import { CortesService } from './cortes.service';
import { CortesAddModalComponent } from './cortes-add-modal/cortes-add-modal.component';
import { CortesEditModalComponent } from './cortes-edit-modal/cortes-edit-modal.component';

@Component({
selector: 'cortes-table',
templateUrl: './cortes-table.html',
styleUrls: ['./cortes-table.scss'],
})
export class CortesTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcorte';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: CortesService, 
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
            if (userModules[element].path === '/pages/cortes') {
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
    private findByIdEmpleado(id: number): void {
      this.service
        .findByIdEmpleado(id)
        .subscribe(
            (data: CortesResponseInterface) => {
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
      const disposable = this.dialogService.addDialog(CortesAddModalComponent)
      .subscribe( data => {
          if (data) {
              this.showToast(data);
          }
      });
    }
    editModalShow(cortes: CortesInterface) {
      const disposable = this.dialogService.addDialog(CortesEditModalComponent, cortes)
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
          this.service.remove(item.idcorte)
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
      this.route.params.subscribe(params => {
        if (params['idempleado'] !== undefined) {
          const idempleado = +params['idempleado'];
          this.findByIdEmpleado(idempleado);
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
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: CortesResponseInterface) =>  {
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
