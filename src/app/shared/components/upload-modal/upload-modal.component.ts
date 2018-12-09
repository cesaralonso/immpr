import { ArchivosInterface } from './../../../pages/archivos/components/archivos-table/archivos.interface';
import { ToastrService } from 'ngx-toastr';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadModalService } from './upload-modal.service';
import { Response } from '@angular/http';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { NgUploaderOptions } from 'ngx-uploader';
import { Configuration } from './../../../app.constants';


@Component({
  selector: 'upload-service-modal',
  styleUrls: [('./upload-modal.component.scss')],
  templateUrl: './upload-modal.component.html'
})
export class UploadModalComponent implements OnInit {

  id: number;
  descripcion: string;
  referencia: string;
  modalHeader: string;

  defaultPicture = 'assets/images/file.png';

  profile: any = {
    picture: 'assets/images/file.png',
  };

  fileUploaderOptions: NgUploaderOptions = {
    url: `${this._configuration.imageServerWithApiUrl}cargaArchivo/ordentarea-`,

  };

  uploadCompled(event: any) {
    if (event.done) {
      const response = JSON.parse(event.response);
      if (response.status === 'success') {
        const archivo: ArchivosInterface = {
            ordentarea_idordentarea: this.id,
            tipo: response.type,
            url: response.src,
        };
        
        this.service.setFile(archivo)
          .subscribe(
            (data: any) => this.showToast(data),
            error => console.log(error),
            () => this.activeModal.close());
      }
    }
  }

  showToast(data) {
    if (data.success) {
      this.toastrService.success(data.message);
    } else {
      this.toastrService.error(data.message);
    }
  }

  constructor(private service: UploadModalService, 
              private activeModal: NgbActiveModal,
              private toastrService: ToastrService, 
              private _configuration: Configuration ) {
  }

  closeModal() {
    this.activeModal.close();
  }

  ngOnInit() {
  }
}
