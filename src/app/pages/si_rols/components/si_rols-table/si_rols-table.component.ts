import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Si_rolsInterface } from './si_rols.interface';
import { Si_rolsResponseInterface } from './si_rols-response.interface';
import { Component, OnInit } from '@angular/core';
import { Si_rolsService } from './si_rols.service';
import { Si_rolsAddModalComponent } from './si_rols-add-modal/si_rols-add-modal.component';
import { Si_rolsEditModalComponent } from './si_rols-edit-modal/si_rols-edit-modal.component';
import { Si_permisosInterface } from './../../../si_permisos/components/si_permisos-table/si_permisos.interface';
import { Si_permisosAddModalComponent } from './../../../si_permisos/components/si_permisos-table/si_permisos-add-modal/si_permisos-add-modal.component';
import { Si_usersInterface } from './../../../si_users/components/si_users-table/si_users.interface';
import { Si_usersAddModalComponent } from './../../../si_users/components/si_users-table/si_users-add-modal/si_users-add-modal.component';

@Component({
selector: 'si_rols-table',
templateUrl: './si_rols-table.html',
styleUrls: ['./si_rols-table.scss'],
})
export class Si_rolsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsi_rol';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: Si_rolsService, 
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
            if (userModules[element].path === '/pages/si_rols') {
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
    insertSi_permiso(si_rols: Si_rolsInterface) {
      const si_permiso: Si_permisosInterface = {
        Modulo_idsi_modulo: si_rols.idsi_rol
      }
      const disposable = this.dialogService.addDialog(Si_permisosAddModalComponent, si_permiso)
      .subscribe( data => {
          if (data) {
          this.si_permisoShowToast(data);
          }
      });
    }
    si_permisoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewSi_permiso(si_rols: Si_rolsInterface) {
      this.router.navigate([`/pages/si_permisos/si_rol/${si_rols.idsi_rol}`]);
    }
    insertSi_user(si_rols: Si_rolsInterface) {
      const si_user: Si_usersInterface = {
        Rol_idsi_rol: si_rols.idsi_rol
      }
      const disposable = this.dialogService.addDialog(Si_usersAddModalComponent, si_user)
      .subscribe( data => {
          if (data) {
          this.si_userShowToast(data);
          }
      });
    }
    si_userShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewSi_user(si_rols: Si_rolsInterface) {
      this.router.navigate([`/pages/si_users/si_rol/${si_rols.idsi_rol}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(Si_rolsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(si_rols: Si_rolsInterface) {
      const disposable = this.dialogService.addDialog(Si_rolsEditModalComponent, si_rols)
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
          this.service.remove(item.idsi_rol)
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
            (data: Si_rolsResponseInterface) =>  {
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
