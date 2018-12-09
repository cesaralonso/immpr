import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from './../app.constants';
import { LoginInterface } from './../pages/login/login.interface';
import { LoginResponseInterface } from './../pages/login/login-response.interface';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
 

@Injectable()
export class AuthService {
    
    token: string;
    jwtHelper: JwtHelper = new JwtHelper();
    user_modules: any[];
    isLoggedIn: boolean = false;
    recordarSesion: boolean = false;

    loggedIn() {
        return tokenNotExpired();
    }

    toBoolean(object: any): boolean {
        return (object.toString() === 'true') ? true : false;
    }

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    private actionUrl: string;
    private headers: Headers;

    constructor(
        private _http: Http, 
        private _configuration: Configuration,
        private router: Router, 
        private toastrService: ToastrService) {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json; charset=UTF-8');

        // Recordar la sesión desde LocalStorage
        this.recordarSesion = (localStorage.getItem('recordarSesion') === 'true') ? true : false;
        
        if (this.recordarSesion) {
            this.isLoggedIn = (localStorage.getItem('isLoggedIn') === 'true') ? true : false;
            this.token = (localStorage.getItem('token')) ? localStorage.getItem('token') : '';
            this.user_modules = (localStorage.getItem('user_modules')) ? JSON.parse(localStorage.getItem('user_modules').toString()) : [];
        }
    }

    login(values: LoginInterface): Observable<any> {
        this.actionUrl = `${this._configuration.ServerWithApiUrl}si_user/login`;
        const toAdd = JSON.stringify(values);
        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <any>response.json())
            .catch(this.handleError)
            .do(response => {
                this.isLoggedIn = true;
                this.token = response.token;
                this.recordarSesion = values.recordarSesion;
                localStorage.setItem('recordarSesion', values.recordarSesion.toString());
                if (response.success) {

                    //Módulos permitidos a usuario
                    let modules = [];
                    response.modules.forEach(element => {

                        const path = '/pages/' + element.nombre.toLowerCase() + 's';
                        modules.push({
                            'nombre': element.nombre, 
                            'acceso': element.acceso, 
                            'path': path, 
                            'readable': element.readable, 
                            'writeable': element.writeable, 
                            'deleteable': element.deleteable, 
                            'updateable': element.updateable, 
                            'read_own': element.read_own, 
                            'write_own': element.write_own, 
                            'delete_own': element.delete_own, 
                            'update_own': element.update_own,
                        });
                    });

                    this.user_modules = modules;
                    
                    // IMPLEMENTADO PARA CHANGE-PASSWORD
                    localStorage.setItem('iduser', response.iduser);
                    localStorage.setItem('email', response.email);
                    localStorage.setItem('idempleado', response.idempleado);
                    localStorage.setItem('nombre', response.nombre);

                    localStorage.setItem('token', response.token);
                    if (values.recordarSesion) {
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('user_modules', JSON.stringify(modules));
                    }
                    
                    // Regresa a página anterior si viene de otra página o a dashboard
                    if (this.redirectUrl !== undefined) {
                        this.router.navigateByUrl(this.redirectUrl);
                    } else {
                        this.router.navigate(['pages/dashboard']);
                    }
                } 
            });
    }

    logout(): void {
        this.isLoggedIn = false;
        this.user_modules = [];
        if (this.recordarSesion) {
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            localStorage.removeItem('user_modules');
            localStorage.removeItem('recordarSesion');
            localStorage.removeItem('idempleado');
            localStorage.removeItem('nombre');
        }
        if (!this.isLoggedIn) {
            this.toastrService.success('Has cerrado sesión correctamente');
        }
    }

    useJwtHelper() {
        const token = this.token;
        if (token !== undefined) {
            return this.jwtHelper.decodeToken(token);
        } else {
            return false;
        }
    }
        
    getUserModules() {
        if (this.user_modules) {
            return this.user_modules;
        } else {
            return [];
        }
    }

    getUserModulesPaths() {
        if (this.user_modules !== undefined) {
            const user_modules = JSON.parse(JSON.stringify(this.user_modules));
            const modules: string[] = [];
            user_modules.forEach(element => {
                modules.push(element.path);
            });
            return modules;
        } else {
            return [];
        }
    }

    isAuthenticated() {
        if (this.isLoggedIn) {
            return true;
        } else {
            return false;
        }
    }
    
    modulePermission(module_path: string) {
        const modules = this.getUserModulesPaths();
        if (modules.indexOf(module_path) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }


}
