import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ClientesInterface } from './clientes.interface';
import { ClientesResponseInterface } from './clientes-response.interface';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from './clientes.service';
import { ClientesAddModalComponent } from './clientes-add-modal/clientes-add-modal.component';
import { ClientesEditModalComponent } from './clientes-edit-modal/clientes-edit-modal.component';
import { OrdensInterface } from './../../../ordens/components/ordens-table/ordens.interface';
import { OrdensAddModalComponent } from './../../../ordens/components/ordens-table/ordens-add-modal/ordens-add-modal.component';

@Component({
selector: 'clientes-table',
templateUrl: './clientes-table.html',
styleUrls: ['./clientes-table.scss'],
})
export class ClientesTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idcliente';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: ClientesService, 
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
            if (userModules[element].path === '/pages/clientes') {
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
        if (params['idpersona'] !== undefined) {
          const idpersona = +params['idpersona'];
          this.findByIdPersona(idpersona);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdPersona(id: number): void {
      this.service
        .findByIdPersona(id)
        .subscribe(
            (data: ClientesResponseInterface) => {
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
    insertOrden(clientes: ClientesInterface) {
      const orden: OrdensInterface = {
        cliente_idcliente: clientes.idcliente
      }
      const disposable = this.dialogService.addDialog(OrdensAddModalComponent, orden)
      .subscribe( data => {
          if (data) {
          this.ordenShowToast(data);
          }
      });
    }
    ordenShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
            this.getAll();
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrden(clientes: ClientesInterface) {
      this.router.navigate([`/pages/ordens/cliente/${clientes.idcliente}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ClientesAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(clientes: ClientesInterface) {
      const disposable = this.dialogService.addDialog(ClientesEditModalComponent, clientes)
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
          this.service.remove(item.idcliente)
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
            (data: ClientesResponseInterface) =>  {
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
