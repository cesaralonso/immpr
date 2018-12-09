import { AuthService } from './../../../../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { ArchivosInterface } from './archivos.interface';
import { ArchivosResponseInterface } from './archivos-response.interface';
import { Component, OnInit } from '@angular/core';
import { ArchivosService } from './archivos.service';
import { ArchivosAddModalComponent } from './archivos-add-modal/archivos-add-modal.component';
import { ArchivosEditModalComponent } from './archivos-edit-modal/archivos-edit-modal.component';

@Component({
selector: 'archivos-table',
templateUrl: './archivos-table.html',
styleUrls: ['./archivos-table.scss'],
})
export class ArchivosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idarchivo';
    sortOrder = 'asc';
    backpage: boolean;

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: ArchivosService, 
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
            if (userModules[element].path === '/pages/archivos') {
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
    private findByIdOrdentarea(id: number): void {
      this.service
        .findByIdOrdentarea(id)
        .subscribe(
            (_data: ArchivosResponseInterface) => {
                if (_data.success) {

                  const array = [];
                  _data.result.forEach(element => {
                    if (element.tipo === 'application/pdf') {
                      element.imagen = 'assets/img/pdf.png';
                    } else if (element.tipo === 'application/xml') {
                      element.imagen = 'assets/img/xml.png';
                    } else if (element.tipo === 'image/jpeg') {
                      element.imagen = element.url;
                    } else if (element.tipo === 'image/png') {
                      element.imagen = element.url;
                    } else if (element.tipo === 'image/gif') {
                      element.imagen = element.url;
                    } else if (element.tipo === 'application/vnd.openxmlformats-officedocument.pres') {
                      element.imagen = 'assets/images/powerpoint.png';
                    } else {
                      element.imagen = 'assets/images/file.png';
                    }
                    array.push(element);
                  });
                  this.data = array;

                } else {
                this.toastrService.error(_data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    }
    backPage() {
        window.history.back();
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(ArchivosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(archivos: ArchivosInterface) {
      const disposable = this.dialogService.addDialog(ArchivosEditModalComponent, archivos)
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
          this.service.remove(item.idarchivo)
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
            (_data: ArchivosResponseInterface) => {
                if (_data.success) {

                  const array = [];
                  _data.result.forEach(element => {
                    if (element.tipo === 'application/pdf') {
                      element.imagen = 'assets/img/pdf.png';
                    } else if (element.tipo === 'application/xml') {
                      element.imagen = 'assets/img/xml.png';
                    } else if (element.tipo === 'image/jpeg') {
                      element.imagen = element.url;
                    } else if (element.tipo === 'image/png') {
                      element.imagen = element.url;
                    } else if (element.tipo === 'image/gif') {
                      element.imagen = element.url;
                    } else if (element.tipo === 'application/vnd.openxmlformats-officedocument.pres') {
                      element.imagen = 'assets/images/powerpoint.png';
                    } else {
                      element.imagen = 'assets/images/file.png';
                    }
                    array.push(element);
                  });
                  this.data = array;

                } else {
                  this.toastrService.error(_data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }


