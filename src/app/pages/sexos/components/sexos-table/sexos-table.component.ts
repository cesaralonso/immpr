import { Router, ActivatedRoute } from '@angular/router';
import { DialogService } from 'ng2-bootstrap-modal';
import { ToastrService } from 'ngx-toastr';
import { SexosInterface } from './sexos.interface';
import { SexosResponseInterface } from './sexos-response.interface';
import { Component, OnInit } from '@angular/core';
import { SexosService } from './sexos.service';
import { SexosAddModalComponent } from './sexos-add-modal/sexos-add-modal.component';
import { SexosEditModalComponent } from './sexos-edit-modal/sexos-edit-modal.component';
import { PersonasInterface } from './../../../personas/components/personas-table/personas.interface';
import { PersonasAddModalComponent } from './../../../personas/components/personas-table/personas-add-modal/personas-add-modal.component';

@Component({
selector: 'sexos-table',
templateUrl: './sexos-table.html',
styleUrls: ['./sexos-table.scss'],
})
export class SexosTableComponent implements OnInit {
    data;
    filterQuery = '';
    rowsOnPage = 10;
    sortBy = 'idsexo';
    sortOrder = 'asc';
    backpage: boolean;

    constructor(
      private service: SexosService, 
      private toastrService: ToastrService, 
      private dialogService: DialogService, 
      private route: ActivatedRoute, 
      private router: Router) {
    }
    ngOnInit() {
      this.getAll();
    }
    insertPersona(sexos: SexosInterface) {
      const persona: PersonasInterface = {
        sexo_idsexo: sexos.idsexo
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
    viewPersona(sexos: SexosInterface) {
      this.router.navigate([`/pages/personas/sexo/${sexos.idsexo}`]);
    }
    addModalShow() {
      const disposable = this.dialogService.addDialog(SexosAddModalComponent)
      .subscribe( data => {
          if (data) {
          this.showToast(data);
          }
      });
    }
    editModalShow(sexos: SexosInterface) {
      const disposable = this.dialogService.addDialog(SexosEditModalComponent, sexos)
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
          this.service.remove(item.idsexo)
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
            (data: SexosResponseInterface) =>  {
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
