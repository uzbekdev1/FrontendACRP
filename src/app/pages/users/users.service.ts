import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Member, User} from './user.model';
import {environment} from "../../../environments/environment";
import {concat, map} from "rxjs/operators";

@Injectable()
export class UsersService {

    headers: HttpHeaders;

    constructor(private http: HttpClient) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }

    getMembers(): Observable<Member[]> {
        return this.http.get<Member[]>(`${environment.apiBase}miembro/`, {headers: this.headers}).pipe(
            map((res: any) => res.results)
        );
    }

    getMemberById(id): Observable<Member> {
        return this.http.get<Member>(`${environment.apiBase}miembro/${id}/`, {headers: this.headers})
    }

    getMemberActive(): Observable<Member> {
        const memberActiveId = localStorage.getItem('miembro_id')
        return this.http.get<Member>(`${environment.apiBase}miembro/${memberActiveId}/`, {headers: this.headers}).pipe(
            map((res: any) => res)
        );
    }

    addUser(user: User) {
        const formData = new FormData()
        formData.append('first_name', user.first_name)
        formData.append('last_name', user.last_name)
        formData.append('username', user.username)
        formData.append('email', user.email)
        formData.append('password', user.password)
        formData.append('miembro.foto', user.miembro.foto)
        formData.append('miembro.centro', user.miembro.centro)
        formData.append('miembro.cargo', user.miembro.cargo)
        formData.append('miembro.rol', user.miembro.rol)
        formData.append('miembro.categoria', user.miembro.categoria)
        formData.append('miembro.resumenCV', user.miembro.resumenCV)
        return this.http.post(`${environment.apiBase}user/`, formData);
    }

    updateMember(user: User) {
        const formData = new FormData()
        formData.append('id', user.id.toString())
        formData.append('first_name', user.first_name)
        formData.append('last_name', user.last_name)
        formData.append('username', user.username)
        formData.append('email', user.email)
        if (user.password)
            formData.append('password', user.password)
        const formData2 = new FormData()
        formData2.append('id', user.miembro.id.toString())
        if (user.miembro.foto)
            formData2.append('foto', user.miembro.foto)
        formData2.append('centro', user.miembro.centro)
        formData2.append('cargo', user.miembro.cargo)
        formData2.append('rol', user.miembro.rol)
        formData2.append('categoria', user.miembro.categoria)
        formData2.append('resumenCV', user.miembro.resumenCV)
        formData2.append('activo', 'true')
        return this.http.patch(`${environment.apiBase}user/${user.id.toString()}/`, formData).pipe(concat(this.http.put(`${environment.apiBase}updateMiembro/${user.miembro.id.toString()}/`, formData2)));
    }

    deleteUser(id: number) {
        return this.http.delete(`${environment.apiBase}user/${id}/`);
    }
} 