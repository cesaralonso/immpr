import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EmpleadotareaestadosInterface } from './empleadotareaestados.interface';
import { EmpleadotareaestadosResponseInterface } from './empleadotareaestados-response.interface';
import { Component, OnInit } from '@angular/core';
import { EmpleadotareaestadosService } from './empleadotareaestados.service';
import { EmpleadotareaestadosAddModalComponent } from './empleadotareaestados-add-modal/empleadotareaestados-add-modal.component';
import { EmpleadotareaestadosEditModalComponent } from './empleadotareaestados-edit-modal/empleadotareaestados-edit-modal.component';

@Component({
selector: 'empleadotareaestados-table',
templateUrl: './empleadotareaestados-table.html',
styleUrls: ['./empleadotareaestados-table.scss'],
})
export class EmpleadotareaestadosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idempleadotareaestado';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: EmpleadotareaestadosService, 
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
            if (userModules[element].path === '/pages/empleadotareaestados') {
              this.updateable = userModules[element].updateable;
              this.deleteable = userModules[element].deleteable;
              this.writeable = userModules[element].writeable;
            }
          }
        }
      }
    }
    ngOnInit() {
      this.refill();
    }

    
    refill() {
      this.route.params.subscribe(params => {
        if (params['idempleadotarea'] !== undefined) {
          const idempleadotarea = +params['idempleadotarea'];
          this.findByIdEmpleadotarea(idempleadotarea);
          this.backpage = true;
        }
        if (params['idestadoscrum'] !== undefined) {
          const idestadoscrum = +params['idestadoscrum'];
          this.findByIdEstadoscrum(idestadoscrum);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }

    private findByIdEmpleadotarea(id: number): void {
      this.service
        .findByIdEmpleadotarea(id)
        .subscribe(
            (data: EmpleadotareaestadosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdEstadoscrum(id: number): void {
      this.service
        .findByIdEstadoscrum(id)
        .subscribe(
            (data: EmpleadotareaestadosResponseInterface) => {
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
      const disposable = this.dialogService.addDialog(EmpleadotareaestadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(empleadotareaestados: EmpleadotareaestadosInterface) {
      const disposable = this.dialogService.addDialog(EmpleadotareaestadosEditModalComponent, empleadotareaestados)
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
          this.service.remove(item.idempleadotareaestado)
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
        // this.getAll();
        this.refill();
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: EmpleadotareaestadosResponseInterface) =>  {
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
