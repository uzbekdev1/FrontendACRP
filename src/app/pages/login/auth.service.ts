import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import Swal from 'sweetalert2';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    headers: HttpHeaders;

    constructor(private http: HttpClient,
                public router: Router) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }

    login(form) {
        const formData = new FormData()
        formData.append('username', form.username)
        formData.append('password', form.password)
        this.http.post(`${environment.apiBase}login/`, formData).subscribe((res: any) => {
            localStorage.setItem('access_token', res.token)
            localStorage.setItem('miembro_id', res.miembro_id)
            Swal({
                position: 'top-end',
                type: 'success',
                title: 'Autenticación Satisfactoria',
                text: 'Se ha autenticado correctamente',
                showConfirmButton: false,
                timer: 1500
            });
            this.router.navigate(['/home'])
        }, error1 => {
            Swal({
                type: 'error',
                title: 'Autenticación Fallida!',
                text: 'No puede autenticarse, usuario o contraseña incorrectos',

            })
        })
    }

    isAuthenticated() {
        return localStorage.getItem('access_token')
    }

    logout() {
        localStorage.removeItem('access_token')
    }
}
