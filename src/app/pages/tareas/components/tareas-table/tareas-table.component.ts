import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { TareasInterface } from './tareas.interface';
import { TareasResponseInterface } from './tareas-response.interface';
import { Component, OnInit } from '@angular/core';
import { TareasService } from './tareas.service';
import { TareasAddModalComponent } from './tareas-add-modal/tareas-add-modal.component';
import { TareasEditModalComponent } from './tareas-edit-modal/tareas-edit-modal.component';
import { OrdentareasInterface } from './../../../ordentareas/components/ordentareas-table/ordentareas.interface';
import { OrdentareasAddModalComponent } from './../../../ordentareas/components/ordentareas-table/ordentareas-add-modal/ordentareas-add-modal.component';

@Component({
selector: 'tareas-table',
templateUrl: './tareas-table.html',
styleUrls: ['./tareas-table.scss'],
})
export class TareasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idtarea';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: TareasService, 
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
            if (userModules[element].path === '/pages/tareas') {
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
        if (params['idarea'] !== undefined) {
          const idarea = +params['idarea'];
          this.findByIdArea(idarea);
          this.backpage = true;
        }
        if (params['idproducto'] !== undefined) {
          const idproducto = +params['idproducto'];
          this.findByIdProducto(idproducto);
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
            (data: TareasResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdProducto(id: number): void {
      this.service
        .findByIdProducto(id)
        .subscribe(
            (data: TareasResponseInterface) => {
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
    insertOrdentarea(tareas: TareasInterface) {

      console.log("tareas", tareas);
      const ordentarea: OrdentareasInterface = {
        tarea_idtarea: tareas.idtarea
      }
      const disposable = this.dialogService.addDialog(OrdentareasAddModalComponent, ordentarea)
      .subscribe( data => {
          if (data) {
          this.ordentareaShowToast(data);
          }
      });
    }
    ordentareaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrdentarea(tareas: TareasInterface) {
      this.router.navigate([`/pages/ordentareas/tarea/${tareas.idtarea}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(TareasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(tareas: TareasInterface) {
      const disposable = this.dialogService.addDialog(TareasEditModalComponent, tareas)
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
          this.service.remove(item.idtarea)
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
            (data: TareasResponseInterface) =>  {
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
