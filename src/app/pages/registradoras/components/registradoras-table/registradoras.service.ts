import { AuthService } from './../../../../shared/auth.service';
import { RegistradorasResponseInterface } from './registradoras-response.interface';
import { Observable } from 'rxjs/Observable';
import { RegistradorasInterface } from './registradoras.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RegistradorasService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}registradora`;
       }
       
       totalPorFechas = ( fechainicial, fechafinal ) : Observable<number> => {
           return this._http.get(`${this.endPoint}/totalPorFechas/${fechainicial}/${fechafinal}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdEmpleado = ( id ) : Observable<RegistradorasResponseInterface> => {
           return this._http.get(`${this.endPoint}/empleado/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdTicket = ( id ) : Observable<RegistradorasResponseInterface> => {
           return this._http.get(`${this.endPoint}/ticket/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<RegistradorasResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<RegistradorasResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( registradora: RegistradorasInterface ) : Observable<RegistradorasResponseInterface> => {
           return this._http.patch(this.endPoint, registradora, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<RegistradorasResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<RegistradorasResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<RegistradorasResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( registradora: RegistradorasInterface ) : Observable<RegistradorasResponseInterface> => {
           return this._http.post(this.endPoint, registradora, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
