


import { AuthService } from './../../../shared/auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class FeedEmpleadosService {
    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;
    private endPoint: string;
    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private authService: AuthService,
        private _baConfig: BaThemeConfigProvider) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.headers.append('Authorization', 'JWT ' + this.authService.token);
        this.options = new RequestOptions({ headers: this.headers });
        this.endPoint = `${this._configuration.ServerWithApiUrl}dashboard`;
       }
       all = () : Observable<any> => {
           return this._http.get(`${this.endPoint}/accuracytiempo`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       getData = ( id ) : Observable<any> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }

       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}


