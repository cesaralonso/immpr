import { AuthService } from './../../../../shared/auth.service';
import { Si_rolsService } from './../../../si_rols/components/si_rols-table/si_rols.service';
import { Si_modulosService } from './../../../si_modulos/components/si_modulos-table/si_modulos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { Si_permisosInterface } from './si_permisos.interface';
import { Si_permisosResponseInterface } from './si_permisos-response.interface';
import { Component, OnInit } from '@angular/core';
import { Si_permisosService } from './si_permisos.service';
import { Si_permisosAddModalComponent } from './si_permisos-add-modal/si_permisos-add-modal.component';
import { Si_permisosEditModalComponent } from './si_permisos-edit-modal/si_permisos-edit-modal.component';

@Component({
selector: 'si_permisos-table',
templateUrl: './si_permisos-table.html',
styleUrls: ['./si_permisos-table.scss'],
})
export class Si_permisosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsi_permiso';
    sortOrder = 'asc';
    backpage: boolean;

    _si_rol = [];
    _si_modulo = [];

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: Si_permisosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private si_modulosService: Si_modulosService, 
      private si_rolsService: Si_rolsService, 
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
            if (userModules[element].path === '/pages/si_permisos') {
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
        if (params['idsi_modulo'] !== undefined) {
          const idsi_modulo = +params['idsi_modulo'];
          this.findByIdSi_modulo(idsi_modulo);
          this.backpage = true;
        }
        if (params['idsi_rol'] !== undefined) {
          const idsi_rol = +params['idsi_rol'];
          this.findByIdSi_rol(idsi_rol);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });

      this.getRol();
      this.getModulo();
    }

    getRol() {
      this.si_rolsService.all()
        .subscribe((data) => {
          this._si_rol = data.result;
        });
    }

    getModulo() {
      this.si_modulosService.all()
        .subscribe((data) => {
          this._si_modulo = data.result;
        });
    }

    private findByIdSi_modulo(id: number): void {
      this.service
        .findByIdSi_modulo(id)
        .subscribe(
            (data: Si_permisosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdSi_rol(id: number): void {
      this.service
        .findByIdSi_rol(id)
        .subscribe(
            (data: Si_permisosResponseInterface) => {
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
      const disposable = this.dialogService.addDialog(Si_permisosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(si_permisos: Si_permisosInterface) {
      const disposable = this.dialogService.addDialog(Si_permisosEditModalComponent, si_permisos)
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
          this.service.remove(item.idsi_permiso)
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
            (data: Si_permisosResponseInterface) =>  {
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
