import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Member, User} from './user.model';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";

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
        return this.http.get<Member[]>(`${environment.apiBase}miembro/`,{headers: this.headers}).pipe(
            map((res: any)=> res.results)
        );
    }
    getMemberById(id): Observable<Member> {
        return this.http.get<Member>(`${environment.apiBase}miembro/${id}/`,{headers: this.headers})
    }
    getMemberActive(): Observable<Member> {
        const memberActiveId = localStorage.getItem('miembro_id')
        return this.http.get<Member>(`${environment.apiBase}miembro/${memberActiveId}/`,{headers: this.headers}).pipe(
            map((res: any)=> res)
        );
    }
    addUser(user:User){
        const formData = new FormData()
        formData.append('first_name', user.first_name)
        formData.append('last_name', user.last_name)
        formData.append('username', user.username)
        formData.append('email', user.email)
        formData.append('password', user.password)
        formData.append('miembro.foto', user.miembro.foto)
        formData.append('miembro.centro', user.miembro.centro)
        formData.append('miembro.cargo', user.miembro.cargo)
        formData.append('miembro.categoria', user.miembro.categoria)
        formData.append('miembro.resumenCV', user.miembro.resumenCV)
        return this.http.post(`${environment.apiBase}user/`, formData);
    }

    updateMember(user:User){
        return this.http.put(`${environment.apiBase}user/`, user);
    }

    deleteUser(id: number) {
        return this.http.delete(`${environment.apiBase}user/${id}/`);
    }
} 