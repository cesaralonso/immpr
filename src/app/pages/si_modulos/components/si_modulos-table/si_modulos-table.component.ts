import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Si_modulosInterface } from './si_modulos.interface';
import { Si_modulosResponseInterface } from './si_modulos-response.interface';
import { Component, OnInit } from '@angular/core';
import { Si_modulosService } from './si_modulos.service';
import { Si_modulosAddModalComponent } from './si_modulos-add-modal/si_modulos-add-modal.component';
import { Si_modulosEditModalComponent } from './si_modulos-edit-modal/si_modulos-edit-modal.component';
import { Si_permisosInterface } from './../../../si_permisos/components/si_permisos-table/si_permisos.interface';
import { Si_permisosAddModalComponent } from './../../../si_permisos/components/si_permisos-table/si_permisos-add-modal/si_permisos-add-modal.component';
import { Si_reportesInterface } from './../../../si_reportes/components/si_reportes-table/si_reportes.interface';
import { Si_reportesAddModalComponent } from './../../../si_reportes/components/si_reportes-table/si_reportes-add-modal/si_reportes-add-modal.component';

@Component({
selector: 'si_modulos-table',
templateUrl: './si_modulos-table.html',
styleUrls: ['./si_modulos-table.scss'],
})
export class Si_modulosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsi_modulo';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: Si_modulosService, 
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
            if (userModules[element].path === '/pages/si_modulos') {
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
    insertSi_permiso(si_modulos: Si_modulosInterface) {
      const si_permiso: Si_permisosInterface = {
        Modulo_idsi_modulo: si_modulos.idsi_modulo
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
    viewSi_permiso(si_modulos: Si_modulosInterface) {
      this.router.navigate([`/pages/si_permisos/si_modulo/${si_modulos.idsi_modulo}`]);
    }
    insertSi_reporte(si_modulos: Si_modulosInterface) {
      const si_reporte: Si_reportesInterface = {
        Modulo_idsi_modulo: si_modulos.idsi_modulo
      }
      const disposable = this.dialogService.addDialog(Si_reportesAddModalComponent, si_reporte)
      .subscribe( data => {
          if (data) {
          this.si_reporteShowToast(data);
          }
      });
    }
    si_reporteShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewSi_reporte(si_modulos: Si_modulosInterface) {
      this.router.navigate([`/pages/si_reportes/si_modulo/${si_modulos.idsi_modulo}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(Si_modulosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(si_modulos: Si_modulosInterface) {
      const disposable = this.dialogService.addDialog(Si_modulosEditModalComponent, si_modulos)
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
          this.service.remove(item.idsi_modulo)
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
            (data: Si_modulosResponseInterface) =>  {
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
