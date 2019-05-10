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
    // addUser(user:User){
    //     return this.http.post(this.url, user);
    // }
    //
    // updateUser(user:User){
    //     return this.http.put(this.url, user);
    // }
    //
    // deleteUser(id: number) {
    //     return this.http.delete(this.url + "/" + id);
    // }
} 