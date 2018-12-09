import { ToastrService } from 'ngx-toastr';
import { FilesUploadModalService } from './file-upload-modal.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Response } from '@angular/http';
import { Component, OnInit, EventEmitter } from '@angular/core';


@Component({
  selector: 'files-service-modal',
  styleUrls: [('./files-upload-modal.component.scss')],
  templateUrl: './files-upload-modal.component.html'
})
export class FilesUploadModalComponent implements OnInit {

  id: number;
  referencia: string;
  descripcion: string;
  modalHeader: string;
  files: any[];

  constructor(private service: FilesUploadModalService, 
              private activeModal: NgbActiveModal,
              private toastrService: ToastrService) {
  }

  closeModal() {
    this.activeModal.close();
  }

  ngOnInit() {
    this.getFiles();
  }

  getFiles() {
    this.service.getFiles(this.id, this.referencia)
      .subscribe(
        (data) => {
          let cont = 0;
          const array = [];
          data.forEach(element => {
            if (element.tipoarchivo === 'application/pdf') {
              element.tipoarchivo = 'assets/img/pdf.png';
            } else if (element.tipoarchivo === 'application/xml') {
              element.tipoarchivo = 'assets/img/xml.png';
            } else if (element.tipoarchivo === 'image/jpeg') {
              element.tipoarchivo = element.urlarchivo;
            } else if (element.tipoarchivo === 'image/png') {
              element.tipoarchivo = element.urlarchivo;
            } else if (element.tipoarchivo === 'image/gif') {
              element.tipoarchivo = element.urlarchivo;
            } else if (element.tipoarchivo === 'application/vnd.openxmlformats-officedocument.pres') {
              element.tipoarchivo = 'assets/images/powerpoint.png';
            } else {
              element.tipoarchivo = 'assets/images/file.png';
            }
            array[cont] = element;
            cont ++;
          });
          this.files = array;
        },
      );
  }

  onDeleteConfirm(event, id): void {
    if (window.confirm('¿Estas seguro de querer eliminar este registro?')) {

      this.service.deleteArchivo(id)
        .subscribe(
          (data) => this.showToast(data),
          error => console.log(error),
          () => console.log('Delete completed')
        );

    } else {
      console.log('item.id cancelando', id);
    }
  }

  showToast(data) {
    if (data.status === 'success') {
      this.toastrService.success(data.message);
      this.getFiles();
    } else {
      this.toastrService.error(data.message);
    }
  }


}
