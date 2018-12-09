import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { PersonasInterface } from './personas.interface';
import { PersonasResponseInterface } from './personas-response.interface';
import { Component, OnInit } from '@angular/core';
import { PersonasService } from './personas.service';
import { PersonasAddModalComponent } from './personas-add-modal/personas-add-modal.component';
import { PersonasEditModalComponent } from './personas-edit-modal/personas-edit-modal.component';
import { ClientesInterface } from './../../../clientes/components/clientes-table/clientes.interface';
import { ClientesAddModalComponent } from './../../../clientes/components/clientes-table/clientes-add-modal/clientes-add-modal.component';
import { EmpleadosInterface } from './../../../empleados/components/empleados-table/empleados.interface';
import { EmpleadosAddModalComponent } from './../../../empleados/components/empleados-table/empleados-add-modal/empleados-add-modal.component';

@Component({
selector: 'personas-table',
templateUrl: './personas-table.html',
styleUrls: ['./personas-table.scss'],
})
export class PersonasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idpersona';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: PersonasService, 
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
            if (userModules[element].path === '/pages/personas') {
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
        if (params['idciudad'] !== undefined) {
          const idciudad = +params['idciudad'];
          this.findByIdCiudad(idciudad);
          this.backpage = true;
        }
        if (params['idsexo'] !== undefined) {
          const idsexo = +params['idsexo'];
          this.findByIdSexo(idsexo);
          this.backpage = true;
        }
        if (!this.backpage) {
          this.getAll();
        }
      });
    }
    private findByIdCiudad(id: number): void {
      this.service
        .findByIdCiudad(id)
        .subscribe(
            (data: PersonasResponseInterface) => {
                if (data.success) {
                this.data = data.result;
                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    private findByIdSexo(id: number): void {
      this.service
        .findByIdSexo(id)
        .subscribe(
            (data: PersonasResponseInterface) => {
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
    insertCliente(personas: PersonasInterface) {
      const cliente: ClientesInterface = {
        persona_idpersona: personas.idpersona
      }
      const disposable = this.dialogService.addDialog(ClientesAddModalComponent, cliente)
      .subscribe( data => {
          if (data) {
          this.clienteShowToast(data);
          }
      });
    }
    clienteShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewCliente(personas: PersonasInterface) {
      this.router.navigate([`/pages/clientes/persona/${personas.idpersona}`]);
    }
    insertEmpleado(personas: PersonasInterface) {
      const empleado: EmpleadosInterface = {
        persona_idpersona: personas.idpersona
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
    viewEmpleado(personas: PersonasInterface) {
      this.router.navigate([`/pages/empleados/persona/${personas.idpersona}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(PersonasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(personas: PersonasInterface) {
      const disposable = this.dialogService.addDialog(PersonasEditModalComponent, personas)
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
          this.service.remove(item.idpersona)
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
            (data: PersonasResponseInterface) =>  {
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
