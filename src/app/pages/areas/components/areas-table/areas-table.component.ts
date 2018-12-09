import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { AreasInterface } from './areas.interface';
import { AreasResponseInterface } from './areas-response.interface';
import { Component, OnInit } from '@angular/core';
import { AreasService } from './areas.service';
import { AreasAddModalComponent } from './areas-add-modal/areas-add-modal.component';
import { AreasEditModalComponent } from './areas-edit-modal/areas-edit-modal.component';
import { EmpleadosInterface } from './../../../empleados/components/empleados-table/empleados.interface';
import { EmpleadosAddModalComponent } from './../../../empleados/components/empleados-table/empleados-add-modal/empleados-add-modal.component';
import { ProductosInterface } from './../../../productos/components/productos-table/productos.interface';
import { ProductosAddModalComponent } from './../../../productos/components/productos-table/productos-add-modal/productos-add-modal.component';
import { TareasInterface } from './../../../tareas/components/tareas-table/tareas.interface';
import { TareasAddModalComponent } from './../../../tareas/components/tareas-table/tareas-add-modal/tareas-add-modal.component';

@Component({
selector: 'areas-table',
templateUrl: './areas-table.html',
styleUrls: ['./areas-table.scss'],
})
export class AreasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idarea';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: AreasService, 
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
            if (userModules[element].path === '/pages/areas') {
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
    insertEmpleado(areas: AreasInterface) {
      const empleado: EmpleadosInterface = {
        area_idarea: areas.idarea
      }
      const disposable = this.dialogService.addDialog(EmpleadosAddModalComponent, empleado)
      .subscribe( data => {
          if (data) {
          this.empleadoShowToast(data);
          }
      });
    }
    empleadoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewEmpleado(areas: AreasInterface) {
      this.router.navigate([`/pages/empleados/area/${areas.idarea}`]);
    }
    insertProducto(areas: AreasInterface) {
      const producto: ProductosInterface = {
        area_idarea: areas.idarea
      }
      const disposable = this.dialogService.addDialog(ProductosAddModalComponent, producto)
      .subscribe( data => {
          if (data) {
          this.productoShowToast(data);
          }
      });
    }
    productoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewProducto(areas: AreasInterface) {
      this.router.navigate([`/pages/productos/area/${areas.idarea}`]);
    }
    insertTarea(areas: AreasInterface) {
      const tarea: TareasInterface = {
        area_idarea: areas.idarea
      }
      const disposable = this.dialogService.addDialog(TareasAddModalComponent, tarea)
      .subscribe( data => {
          if (data) {
          this.tareaShowToast(data);
          }
      });
    }
    tareaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewTarea(areas: AreasInterface) {
      this.router.navigate([`/pages/tareas/area/${areas.idarea}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(AreasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(areas: AreasInterface) {
      const disposable = this.dialogService.addDialog(AreasEditModalComponent, areas)
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
          this.service.remove(item.idarea)
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
            (data: AreasResponseInterface) =>  {
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
