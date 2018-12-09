import { AuthService } from './../../../../shared/auth.service';
import { Si_usersResponseInterface } from './si_users-response.interface';
import { Observable } from 'rxjs/Observable';
import { Si_usersInterface } from './si_users.interface';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Configuration } from '../../../../app.constants';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class Si_usersService {
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
        this.endPoint = `${this._configuration.ServerWithApiUrl}si_user`;
       }
       findByIdSi_rol = ( id ) : Observable<Si_usersResponseInterface> => {
           return this._http.get(`${this.endPoint}/si_rol/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       all = () : Observable<Si_usersResponseInterface> => {
           return this._http.get(this.endPoint, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       findById = ( id ) : Observable<Si_usersResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       update = ( si_user: Si_usersInterface ) : Observable<Si_usersResponseInterface> => {
           return this._http.patch(this.endPoint, si_user, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       remove= ( id ) : Observable<Si_usersResponseInterface> => {
           return this._http.delete(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       exist = ( id ) : Observable<Si_usersResponseInterface> => {
           return this._http.get(`${this.endPoint}/${id}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       count = () : Observable<Si_usersResponseInterface> => {
           return this._http.get(`${this.endPoint}`, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       insert = ( si_user: Si_usersInterface ) : Observable<Si_usersResponseInterface> => {
           return this._http.post(this.endPoint, si_user, this.options)
               .map((response: Response) => response.json())
               .catch(this.handleError);
       }
       private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
