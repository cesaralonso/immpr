import { AuthService } from './../../auth.service';
import { ArchivosResponseInterface } from './../../../pages/archivos/components/archivos-table/archivos-response.interface';
import { ArchivosInterface } from './../../../pages/archivos/components/archivos-table/archivos.interface';
import { Configuration } from './../../../app.constants';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UploadModalService {

    private actionUrl: string;
    private headers: Headers;

    private options: RequestOptions;
    private endPoint: string;
    

    constructor(
        private _http: Http, 
        private _configuration: Configuration,
        private authService: AuthService ) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.options = new RequestOptions({ headers: this.headers });
        this.endPoint = `${this._configuration.ServerWithApiUrl}archivo`;
        this.headers.append('Authorization', 'JWT ' + this.authService.token);
    }

    setFile = ( archivo: ArchivosInterface ) : Observable<ArchivosResponseInterface> => {
        return this._http.post(this.endPoint, archivo, this.options)
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }

}


