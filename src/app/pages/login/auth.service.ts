import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import Swal from 'sweetalert2';
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {Member} from "../users/user.model";
import {map, skip} from "rxjs/operators";

class Miembro {
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    headers: HttpHeaders;
    private _memberActive: BehaviorSubject<Member> = new BehaviorSubject<Member>(null)

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
            this.http.get<Member>(`${environment.apiBase}miembro/${res.miembro_id}/`, {headers: this.headers}).pipe(
                map((res: any) => res)).subscribe((memberActive: Member) => {
                console.log(memberActive);
                this._memberActive.next(memberActive)
            });
            Swal({
                position: 'top-end',
                type: 'success',
                title: 'Autenticación Satisfactoria',
                text: 'Se ha autenticado correctamente',
                showConfirmButton: false,
                timer: 2000
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
        const token = localStorage.getItem('access_token')
        const miembro_id = localStorage.getItem('miembro_id')
        if(token && miembro_id ){
            if( !this._memberActive.getValue())
            this.http.get<Member>(`${environment.apiBase}miembro/${miembro_id}/`, {headers: this.headers}).pipe(
                map((res: any) => res)).subscribe((memberActive: Member) => {
                console.log(memberActive);
                this._memberActive.next(memberActive)
            });
            return true
        }
        this.logout()
        return false
    }

    logout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('miembro_id')
    }

    get getMemberActive(): BehaviorSubject<Miembro> {
        return this._memberActive;
    }

    getRolMemberActive(){
        return this._memberActive.pipe(skip(1)).subscribe(member=>member.rol)
    }
}
