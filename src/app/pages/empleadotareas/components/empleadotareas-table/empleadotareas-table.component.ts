import { AuthService } from './../../../../shared/auth.service';
import { EstadoscrumsService } from './../../../estadoscrums/components/estadoscrums-table/estadoscrums.service';
import { EmpleadosService } from './../../../empleados/components/empleados-table/empleados.service';
import { TareasService } from './../../../tareas/components/tareas-table/tareas.service';
import { EstadosService } from './../../../estados/components/estados-table/estados.service';
import { AuthLocalstorage } from './../../../../shared/auth-localstorage.service';
import { EmpleadotareaestadosService } from './../../../empleadotareaestados/components/empleadotareaestados-table/empleadotareaestados.service';

import { ArchivosAddModalComponent } from './../../../archivos/components/archivos-table/archivos-add-modal/archivos-add-modal.component';
import { ArchivosInterface } from './../../../archivos/components/archivos-table/archivos.interface';
import { OrdentareasInterface } from './../../../ordentareas/components/ordentareas-table/ordentareas.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { EmpleadotareasInterface } from './empleadotareas.interface';
import { EmpleadotareasResponseInterface } from './empleadotareas-response.interface';
import { Component, OnInit } from '@angular/core';
import { EmpleadotareasService } from './empleadotareas.service';
import { EmpleadotareasAddModalComponent } from './empleadotareas-add-modal/empleadotareas-add-modal.component';
import { EmpleadotareasEditModalComponent } from './empleadotareas-edit-modal/empleadotareas-edit-modal.component';
import { EmpleadotareaestadosInterface } from './../../../empleadotareaestados/components/empleadotareaestados-table/empleadotareaestados.interface';
import { EmpleadotareaestadosAddModalComponent } from './../../../empleadotareaestados/components/empleadotareaestados-table/empleadotareaestados-add-modal/empleadotareaestados-add-modal.component';


import { DndDropEvent, DropEffect } from 'ngx-drag-drop';


@Component({
selector: 'empleadotareas-table',
templateUrl: './empleadotareas-table.html',
styleUrls: ['./empleadotareas-table.scss'],
})
export class EmpleadotareasTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idempleadotarea';
    sortOrder = 'asc';
    backpage: boolean;

    _estadoscrum: string[] = [];
    _tarea: string[] = [];
    _empleado: string[] = [];

    draggable;

    cajaTrabajando;
    cajaPorHacer;
    cajaHecha;
    cajaCancelada;

    fecha;
    hora;

    porhacerse = [];
    trabajando = [];
    hecha = [];
    cancelada = [];

    // Permisos en vista
    updateable: boolean = false;
    deleteable: boolean = false;
    writeable: boolean = false;

    constructor(
      private service: EmpleadotareasService, 
      private toastrService: ToastrService, 
      private authLocalstorage: AuthLocalstorage,
      private dialogService: DialogService, 
      private estadoscrumsService: EstadoscrumsService,
      private tareasService: TareasService,
      private empleadosService: EmpleadosService,
      private empleadotareaestadosService: EmpleadotareaestadosService,
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
            if (userModules[element].path === '/pages/empleadotareas') {
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

      // FECHA Y HORA ACTUAL
      const date = this.authLocalstorage.getCurrentDateAndHour();
      this.fecha = date.fecha;
      this.hora = date.hora;
      
      this.getEstadoscrum();
      this.getTarea();
      this.getEmpleado();
    }
 
    refill() {
      this.route.params.subscribe(params => {
        if (params['idempleado'] !== undefined) {
          const idempleado = +params['idempleado'];
          this.findByIdEmpleado(idempleado);
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
      this.iniciarDragAndDrop();
    }

    getEstadoscrum() {
        this.estadoscrumsService.all()
        .subscribe(
            (data: any) => this._estadoscrum = data.result,
        );
    }
    getTarea() {
        this.tareasService.all()
        .subscribe(
            (data: any) => this._tarea = data.result,
        );
    }
    getEmpleado() {
        this.empleadosService.all()
        .subscribe(
            (data: any) => this._empleado = data.result,
        );
    }

    expandMessage (item) {
      item.expanded = !item.expanded;
    }

    iniciarDragAndDrop() { 

        this.cajaTrabajando = document.getElementById('cajaTrabajando');  
        this.cajaHecha = document.getElementById('cajaHecha');  
        this.cajaPorHacer = document.getElementById('cajaPorHacer');  
        this.cajaCancelada = document.getElementById('cajaCancelada');  

        this.cajaTrabajando.addEventListener('dragenter', function(e) { e.preventDefault(); }, false);  
        this.cajaTrabajando.addEventListener('dragover', function(e) { e.preventDefault(); }, false);  

        this.cajaHecha.addEventListener('dragenter', function(e) { e.preventDefault(); }, false);  
        this.cajaHecha.addEventListener('dragover', function(e) { e.preventDefault(); }, false);  

        this.cajaPorHacer.addEventListener('dragenter', function(e) { e.preventDefault(); }, false);  
        this.cajaPorHacer.addEventListener('dragover', function(e) { e.preventDefault(); }, false);  

    }

    finalizado(e) { 
        const elemento = e.target; 
    } 
    
    arrastrado(e) { 
        const elemento = e.target;  
        e.dataTransfer.setData('Text', elemento.getAttribute('id'));  
        e.dataTransfer.setDragImage(e.target, 0, 0); 
    } 

    soltadoHecha(e) { 
        e.preventDefault();  
        const idempleadotarea = e.dataTransfer.getData('Text');  
        const elemento = document.getElementById(idempleadotarea); 
        document.getElementById('cajaHecha').appendChild(elemento);
        this.cambiarEstado(+idempleadotarea, 3);
    }

    soltadoTrabajando(e): void { 
        e.preventDefault();  
        const idempleadotarea = e.dataTransfer.getData('Text');
        const elemento = document.getElementById(idempleadotarea);
        document.getElementById('cajaTrabajando').appendChild(elemento);
        this.cambiarEstado(+idempleadotarea, 2);
    }

    soltadoPorHacer(e) { 
        e.preventDefault();  
        const idempleadotarea = e.dataTransfer.getData('Text');  
        const elemento = document.getElementById(idempleadotarea); 
        document.getElementById('cajaPorHacer').appendChild(elemento);
        this.cambiarEstado(+idempleadotarea, 1);
    }

    private cambiarEstado(idempleadotarea: number, estadoscrum: number): void {

      this.empleadotareaestadosService
        .insert({
                  empleadotarea_idempleadotarea: idempleadotarea,
                  estadoscrum_idestadoscrum: estadoscrum,
                  fecha: this.fecha,
                  hora: this.hora,
        })
        .subscribe(
            (data: any) => {
              this.showToast(data);
            },
            error => console.log(error),
            () => console.log('insertTrabajando complete'))
    }

    private findByIdEmpleado(id: number): void {
      this.service
        .findByIdEmpleado(id)
        .subscribe(
            (data: EmpleadotareasResponseInterface) => {
                if (data.success) {

                  let porhacerse = [];
                  let trabajando = [];
                  let hecha = [];
                  let cancelada = [];

                  if (data.result[0]) {
                    for (const element in data.result) {
                      if (data.result.hasOwnProperty(element)) {

                        if (data.result[element].estado_estado_idestado === 'POR HACERSE') {
                          porhacerse.push(data.result[element]);
                        } else if (data.result[element].estado_estado_idestado === 'TRABAJANDO') {
                          trabajando.push(data.result[element]);
                        } else if (data.result[element].estado_estado_idestado === 'HECHA') {
                          hecha.push(data.result[element]);
                        } else if (data.result[element].estado_estado_idestado === 'CANCELADA') {
                          cancelada.push(data.result[element]);
                        }
                        if (+element + 1 === data.result.length) {
                          this.porhacerse = porhacerse;
                          this.trabajando = trabajando;
                          this.hecha = hecha;
                          this.cancelada = cancelada;
                        }

                      }
                    }
                  }

                } else {
                this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'));
    }
    private findByIdOrdentarea(id: number): void {
      this.service
        .findByIdOrdentarea(id)
        .subscribe(
            (data: EmpleadotareasResponseInterface) => {
                if (data.success) {
                  
                  let porhacerse = [];
                  let trabajando = [];
                  let hecha = [];
                  let cancelada = [];

                  if (data.result[0]) {
                    for (const element in data.result) {
                      if (data.result.hasOwnProperty(element)) {

                        if (data.result[element].estado_estado_idestado === 'POR HACERSE') {
                          porhacerse.push(data.result[element]);
                        } else if (data.result[element].estado_estado_idestado === 'TRABAJANDO') {
                          trabajando.push(data.result[element]);
                        } else if (data.result[element].estado_estado_idestado === 'HECHA') {
                          hecha.push(data.result[element]);
                        } else if (data.result[element].estado_estado_idestado === 'CANCELADA') {
                          cancelada.push(data.result[element]);
                        }
                        if (+element + 1 === data.result.length) {
                          this.porhacerse = porhacerse;
                          this.trabajando = trabajando;
                          this.hecha = hecha;
                          this.cancelada = cancelada;
                        }

                      }

                    }
                  }

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

    insertArchivo(ordentareas: OrdentareasInterface) {
      const archivo: ArchivosInterface = {
        ordentarea_idordentarea: ordentareas.idordentarea
      };
      const disposable = this.dialogService.addDialog(ArchivosAddModalComponent, archivo)
      .subscribe( data => {
          if (data) {
          this.archivoShowToast(data);
          }
      });
    }
    archivoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);
        } else {
            this.toastrService.error(result.message);
        }
    }
    viewArchivo(ordentareas: OrdentareasInterface) {
      this.router.navigate([`/pages/archivos/ordentarea/${ordentareas.idordentarea}`]);
    }

    insertEmpleadotareaestado(empleadotareas: EmpleadotareasInterface) {
      const empleadotareaestado: EmpleadotareaestadosInterface = {
        empleadotarea_idempleadotarea: empleadotareas.idempleadotarea
      }
      const disposable = this.dialogService.addDialog(EmpleadotareaestadosAddModalComponent, empleadotareaestado)
      .subscribe( data => {
          if (data) {
          this.empleadotareaestadoShowToast(data);
          }
      });
    }
    empleadotareaestadoShowToast(result) {
        if (result.success) {
            this.toastrService.success(result.message);

            this.refill();

        } else {
            this.toastrService.error(result.message);
        }
    }
    viewOrdenTarea(empleadotareas: EmpleadotareasInterface) {
      this.router.navigate([`/pages/ordentareas/empleadotarea/${empleadotareas.idempleadotarea}`]);
    }
    viewEmpleadotareaestado(empleadotareas: EmpleadotareasInterface) {
      this.router.navigate([`/pages/empleadotareaestados/empleadotarea/${empleadotareas.idempleadotarea}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(EmpleadotareasAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(empleadotareas: EmpleadotareasInterface) {
      const disposable = this.dialogService.addDialog(EmpleadotareasEditModalComponent, empleadotareas)
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
          this.service.remove(item.idempleadotarea)
          .subscribe(
              (data) => this.showToast(data),
              error => console.log(error),
              () => console.log('Delete completed')
          );
      } else {
          console.log('item cancelado');
      }
    }

    onCancelConfirm(event, item: EmpleadotareasInterface): void {
      if (window.confirm('¿Estas seguro de querer cancelar este registro?')) {

          const empleadotareaestados = {
            'idempleadotareaestado': 0,
            'empleadotarea_idempleadotarea': item.idempleadotarea,
            'estadoscrum_idestadoscrum': 5, // CANCELADA
            'fecha': '',
            'hora': '',
            'baja': false,
            'created_by': 0,
            'created_at': '',
            'modified_at': '',
          };

          const disposable = this.dialogService.addDialog(EmpleadotareaestadosAddModalComponent, empleadotareaestados)
          .subscribe( data => {
              if (data) {
                this.showToast(data);
              }
          },
          error => console.log(error),
          () => console.log('Modified complete'));
      } else {
          console.log('item cancelado');
      }
    }
    showToast(result) {
      if (result.success) {
        this.toastrService.success(result.message);

        this.refill();
        
      } else {
        this.toastrService.error(result.message);
      }
    }
    private getAll(): void {
      this.service
        .all()
        .subscribe(
            (data: EmpleadotareasResponseInterface) => {
                if (data.success) {

                  const porhacerse = [];
                  const trabajando = [];
                  const hecha = [];

                  if (data.result[0]) {
                    for (const element in data.result) {
                      if (data.result.hasOwnProperty(element)) {

                        if (data.result[element].estado_estado_idestado === 'POR HACERSE') {
                          porhacerse.push(data.result[element]);
                        } else if (data.result[element].estado_estado_idestado === 'TRABAJANDO') {
                          trabajando.push(data.result[element]);
                        } else if (data.result[element].estado_estado_idestado === 'HECHA') {
                          hecha.push(data.result[element]);
                        }
                        if (+element + 1 === data.result.length) {
                          this.porhacerse = porhacerse;
                          this.trabajando = trabajando;
                          this.hecha = hecha;
                        }
                      }
                    }
                  }

                } else {
                  this.toastrService.error(data.message);
                }
            },
            error => console.log(error),
            () => console.log('Get all Items complete'))
    } 
  }
