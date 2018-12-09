import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { OrdentareaestadosInterface } from './ordentareaestados.interface';
import { OrdentareaestadosResponseInterface } from './ordentareaestados-response.interface';
import { Component, OnInit } from '@angular/core';
import { OrdentareaestadosService } from './ordentareaestados.service';
import { OrdentareaestadosAddModalComponent } from './ordentareaestados-add-modal/ordentareaestados-add-modal.component';
import { OrdentareaestadosEditModalComponent } from './ordentareaestados-edit-modal/ordentareaestados-edit-modal.component';

@Component({
selector: 'ordentareaestados-table',
templateUrl: './ordentareaestados-table.html',
styleUrls: ['./ordentareaestados-table.scss'],
})
export class OrdentareaestadosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idordentareaestado';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: OrdentareaestadosService, 
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
            if (userModules[element].path === '/pages/ordentareaestados') {
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
        if (params['idestadoscrum'] !== undefined) {
          const idestadoscrum = +params['idestadoscrum'];
          this.findByIdEstadoscrum(idestadoscrum);
          this.backpage = true;
        }
        if (params['idordentarea'] !== undefined) {
          const idordentarea = +params['idordentarea'];
          this.findByIdOrdentarea(idordentarea);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdEstadoscrum(id: number): void {
      this.service
        .findByIdEstadoscrum(id)
        .subscribe(
            (data: OrdentareaestadosResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdOrdentarea(id: number): void {
      this.service
        .findByIdOrdentarea(id)
        .subscribe(
            (data: OrdentareaestadosResponseInterface) => {
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
      const disposable = this.dialogService.addDialog(OrdentareaestadosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(ordentareaestados: OrdentareaestadosInterface) {
      const disposable = this.dialogService.addDialog(OrdentareaestadosEditModalComponent, ordentareaestados)
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
          this.service.remove(item.idordentareaestado)
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
            (data: OrdentareaestadosResponseInterface) =>  {
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
