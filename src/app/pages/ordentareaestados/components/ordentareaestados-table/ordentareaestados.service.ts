import { AuthService } from './../../../../shared/auth.service';
import { OrdentareaestadosResponseInterface } from './ordentareaestados-response.interface';
import { Observable } from 'rxjs/Observable';
import { OrdentareaestadosInterface } from './ordentareaestados.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class OrdentareaestadosService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}ordentareaestado`;
       }
       findByIdEstadoscrum = ( id ) : Observable<OrdentareaestadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/estadoscrum/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdOrdentarea = ( id ) : Observable<OrdentareaestadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/ordentarea/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<OrdentareaestadosResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<OrdentareaestadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( ordentareaestado: OrdentareaestadosInterface ) : Observable<OrdentareaestadosResponseInterface> => {
           return this._http.patch(this.endPoint, ordentareaestado, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<OrdentareaestadosResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<OrdentareaestadosResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<OrdentareaestadosResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( ordentareaestado: OrdentareaestadosInterface ) : Observable<OrdentareaestadosResponseInterface> => {
           return this._http.post(this.endPoint, ordentareaestado, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
