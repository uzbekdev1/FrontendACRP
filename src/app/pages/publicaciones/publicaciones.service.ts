import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Member, User} from '../users/user.model';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Publicacion} from "./publicaciones.model";
import {RequestOptions} from "@angular/http";
import {UsersService} from "../users/users.service";

@Injectable()
export class PublicacionesService {

    headers: HttpHeaders;

    constructor(private http: HttpClient, private memberService: UsersService) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }
    getPublicaciones(): Observable<Publicacion[]> {
        return this.http.get<Publicacion[]>(`${environment.apiBase}publicacion/`,{headers: this.headers}).pipe(
            map((res: any)=> {
                res.results.map((publicacion: any)=>{
                    publicacion.miembros = this.getAutoresByPublicacion(publicacion.autores);
                })
                return res.results;
            })
        );
    }

    addPublicacion(form: FormData){
        return this.http.post<any>(`${environment.apiBase}publicacion/`, form);
    }

    updatePublicacion(id, form){
        return this.http.patch(`${environment.apiBase}publicacion/${id}/`, form);
    }

    deletePublicacion(publicacion: Publicacion){
        return this.http.delete(`${environment.apiBase}publicacion/${publicacion.id}/`, {headers: this.headers});
    }

    getAutoresByPublicacion(autoresId: number[]){
        const miembrosList = []
        autoresId.map((autorId)=> this.memberService.getMemberById(autorId).
        subscribe((member: Member)=> miembrosList.push(member)))
        return miembrosList
    }
    downloadPDF(url): any {
        return this.http.get(url, {responseType: 'blob'}).pipe(map(
            (res: any) => {
                return new Blob([res.blob()], { type: 'application/pdf' });
            })
        );
    }
} 