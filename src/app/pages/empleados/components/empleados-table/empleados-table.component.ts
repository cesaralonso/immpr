import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EmpleadosInterface } from './empleados.interface';
import { EmpleadosResponseInterface } from './empleados-response.interface';
import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from './empleados.service';
import { EmpleadosAddModalComponent } from './empleados-add-modal/empleados-add-modal.component';
import { EmpleadosEditModalComponent } from './empleados-edit-modal/empleados-edit-modal.component';
import { AlertasInterface } from './../../../alertas/components/alertas-table/alertas.interface';
import { AlertasAddModalComponent } from './../../../alertas/components/alertas-table/alertas-add-modal/alertas-add-modal.component';
import { CheckoutsInterface } from './../../../checkouts/components/checkouts-table/checkouts.interface';
import { CheckoutsAddModalComponent } from './../../../checkouts/components/checkouts-table/checkouts-add-modal/checkouts-add-modal.component';
import { EgresoconceptosInterface } from './../../../egresoconceptos/components/egresoconceptos-table/egresoconceptos.interface';
import { EgresoconceptosAddModalComponent } from './../../../egresoconceptos/components/egresoconceptos-table/egresoconceptos-add-modal/egresoconceptos-add-modal.component';
import { EmpleadotareasInterface } from './../../../empleadotareas/components/empleadotareas-table/empleadotareas.interface';
import { EmpleadotareasAddModalComponent } from './../../../empleadotareas/components/empleadotareas-table/empleadotareas-add-modal/empleadotareas-add-modal.component';

@Component({
selector: 'empleados-table',
templateUrl: './empleados-table.html',
styleUrls: ['./empleados-table.scss'],
})
export class EmpleadosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idempleado';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: EmpleadosService, 
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
            if (userModules[element].path === '/pages/empleados') {
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
        if (params['idarea'] !== undefined) {
          const idarea = +params['idarea'];
          this.findByIdArea(idarea);
          this.backpage = true;
        }
        if (params['idpersona'] !== undefined) {
          const idpersona = +params['idpersona'];
          this.findByIdPersona(idpersona);
          this.backpage = true;
        }
        if (params['idsi_user'] !== undefined) {
          const idsi_user = +params['idsi_user'];
          this.findByIdSi_user(idsi_user);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });

    }

    private findByIdArea(id: number): void {
      this.service
        .findByIdArea(id)
        .subscribe(
            (data: EmpleadosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdPersona(id: number): void {
      this.service
        .findByIdPersona(id)
        .subscribe(
            (data: EmpleadosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdSi_user(id: number): void {
      this.service
        .findByIdSi_user(id)
        .subscribe(
            (data: EmpleadosResponseInterface) => {
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
    insertAlerta(empleados: EmpleadosInterface) {
      const alerta: AlertasInterface = {
        empleado_idempleado: empleados.idempleado
      }
      const disposable = this.dialogService.addDialog(AlertasAddModalComponent, alerta)
      .subscribe( data => {
          if (data) {
          this.alertaShowToast(data);
          }
      });
    }
    alertaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewAlerta(empleados: EmpleadosInterface) {
      this.router.navigate([`/pages/alertas/empleado/${empleados.idempleado}`]);
    }
    insertCheckout(empleados: EmpleadosInterface) {
      const checkout: CheckoutsInterface = {
        empleado_idempleado: empleados.idempleado
      }
      const disposable = this.dialogService.addDialog(CheckoutsAddModalComponent, checkout)
      .subscribe( data => {
          if (data) {
          this.checkoutShowToast(data);
          }
      });
    }
    checkoutShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewCheckout(empleados: EmpleadosInterface) {
      this.router.navigate([`/pages/checkouts/empleado/${empleados.idempleado}`]);
    }
    insertEgresoconcepto(empleados: EmpleadosInterface) {
      const egresoconcepto: EgresoconceptosInterface = {
        empleado_idempleado: empleados.idempleado
      }
      const disposable = this.dialogService.addDialog(EgresoconceptosAddModalComponent, egresoconcepto)
      .subscribe( data => {
          if (data) {
          this.egresoconceptoShowToast(data);
          }
      });
    }
    egresoconceptoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewEgresoconcepto(empleados: EmpleadosInterface) {
      this.router.navigate([`/pages/egresoconceptos/empleado/${empleados.idempleado}`]);
    }
    insertEmpleadotarea(empleados: EmpleadosInterface) {
      const empleadotarea: EmpleadotareasInterface = {
        empleado_idempleado: empleados.idempleado
      }
      const disposable = this.dialogService.addDialog(EmpleadotareasAddModalComponent, empleadotarea)
      .subscribe( data => {
          if (data) {
          this.empleadotareaShowToast(data);
          }
      });
    }
    empleadotareaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewEmpleadotarea(empleados: EmpleadosInterface) {
      this.router.navigate([`/pages/empleadotareas/empleado/${empleados.idempleado}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EmpleadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(empleados: EmpleadosInterface) {
      const disposable = this.dialogService.addDialog(EmpleadosEditModalComponent, empleados)
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
          this.service.remove(item.idempleado)
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
            (data: EmpleadosResponseInterface) =>  {
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
