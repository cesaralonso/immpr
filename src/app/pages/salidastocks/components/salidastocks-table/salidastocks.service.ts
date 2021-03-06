import { AuthService } from './../../../../shared/auth.service';
import { SalidastocksResponseInterface } from './salidastocks-response.interface';
import { Observable } from 'rxjs/Observable';
import { SalidastocksInterface } from './salidastocks.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SalidastocksService {
    private actionUrl: string;
    private headers: Headers;
    private options: RequestOptions;
    private endPoint: string;
    constructor(
        private _http: Http,
        private _configuration: Configuration,
        private authService: AuthService) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');
        this.headers.append('Authorization', 'JWT ' + this.authService.token);
        this.options = new RequestOptions({ headers: this.headers });
        this.endPoint = `${this._configuration.ServerWithApiUrl}salidastock`;
       }
       findByIdOrdentarea = ( id ) : Observable<SalidastocksResponseInterface> => {
           return this._http.get(`${this.endPoint}/ordentarea/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdStock = ( id ) : Observable<SalidastocksResponseInterface> => {
           return this._http.get(`${this.endPoint}/stock/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<SalidastocksResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<SalidastocksResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( salidastock: SalidastocksInterface ) : Observable<SalidastocksResponseInterface> => {
           return this._http.patch(this.endPoint, salidastock, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id, cantidad, idstock ) : Observable<SalidastocksResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}/${cantidad}/${idstock}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<SalidastocksResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<SalidastocksResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( salidastock: SalidastocksInterface ) : Observable<SalidastocksResponseInterface> => {
           return this._http.post(this.endPoint, salidastock, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
