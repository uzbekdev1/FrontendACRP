import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Member, User} from '../users/user.model';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Noticia} from "./noticias.model";
import {RequestOptions} from "@angular/http";

@Injectable()
export class NoticiasService {

    headers: HttpHeaders;

    constructor(private http: HttpClient) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }
    getNoticias(): Observable<Noticia[]> {
        return this.http.get<Noticia[]>(`${environment.apiBase}noticia/`,{headers: this.headers}).pipe(
            map((res: any)=> res.results)
        );
    }

    addNoticia(form: FormData){
        return this.http.post<any>(`${environment.apiBase}noticia/`, form);
    }

    updateNoticia(id, form){
        return this.http.patch(`${environment.apiBase}noticia/${id}/`, form);
    }

    deleteNoticia(noticia: Noticia){
        return this.http.delete(`${environment.apiBase}noticia/${noticia.id}/`, {headers: this.headers});
    }

} 