import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { CiudadsInterface } from './ciudads.interface';
import { CiudadsResponseInterface } from './ciudads-response.interface';
import { Component, OnInit } from '@angular/core';
import { CiudadsService } from './ciudads.service';
import { CiudadsAddModalComponent } from './ciudads-add-modal/ciudads-add-modal.component';
import { CiudadsEditModalComponent } from './ciudads-edit-modal/ciudads-edit-modal.component';
import { PersonasInterface } from './../../../personas/components/personas-table/personas.interface';
import { PersonasAddModalComponent } from './../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';

@Component({
selector: 'ciudads-table',
templateUrl: './ciudads-table.html',
styleUrls: ['./ciudads-table.scss'],
})
export class CiudadsTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idciudad';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: CiudadsService, 
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
            if (userModules[element].path === '/pages/ciudads') {
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
    insertPersona(ciudads: CiudadsInterface) {
      const persona: PersonasInterface = {
        ciudad_idciudad: ciudads.idciudad
      }
      const disposable = this.dialogService.addDialog(PersonasAddModalComponent, persona)
      .subscribe( data => {
          if (data) {
          this.personaShowToast(data);
          }
      });
    }
    personaShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewPersona(ciudads: CiudadsInterface) {
      this.router.navigate([`/pages/personas/ciudad/${ciudads.idciudad}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(CiudadsAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(ciudads: CiudadsInterface) {
      const disposable = this.dialogService.addDialog(CiudadsEditModalComponent, ciudads)
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
          this.service.remove(item.idciudad)
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
            (data: CiudadsResponseInterface) =>  {
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
