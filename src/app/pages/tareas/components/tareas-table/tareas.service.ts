import { AuthService } from './../../../../shared/auth.service';
import { TareasResponseInterface } from './tareas-response.interface';
import { Observable } from 'rxjs/Observable';
import { TareasInterface } from './tareas.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TareasService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}tarea`;
       }

       allByAreaWithIdOrdenProducto = (idordenproducto) : Observable<TareasResponseInterface> => {
           return this._http.get(`${this.endPoint}/ordenproducto/${idordenproducto}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdArea = ( id ) : Observable<TareasResponseInterface> => {
           return this._http.get(`${this.endPoint}/area/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findByIdProducto = ( id ) : Observable<TareasResponseInterface> => {
           return this._http.get(`${this.endPoint}/producto/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<TareasResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<TareasResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( tarea: TareasInterface ) : Observable<TareasResponseInterface> => {
           return this._http.patch(this.endPoint, tarea, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<TareasResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<TareasResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<TareasResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( tarea: TareasInterface ) : Observable<TareasResponseInterface> => {
           return this._http.post(this.endPoint, tarea, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
