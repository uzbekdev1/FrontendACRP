import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Member, User} from '../users/user.model';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Proyecto} from "./proyectos.model";
import {RequestOptions} from "@angular/http";
import {UsersService} from "../users/users.service";

@Injectable()
export class ProyectosService {

    headers: HttpHeaders;

    constructor(private http: HttpClient, private memberService: UsersService) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }
    getProyectos(): Observable<Proyecto[]> {
        return this.http.get<Proyecto[]>(`${environment.apiBase}proyecto/`,{headers: this.headers}).pipe(
            map((res: any)=> {
                res.results.map((proyect: any)=>{
                    proyect.autores = this.getAutoresByProyecto(proyect.miembros);
                })
                return res.results;
            })
        );
    }

    getAutoresByProyecto(autoresId: number[]){
        const miembrosList = []
        autoresId.map((autorId)=> this.memberService.getMemberById(autorId).
        subscribe((member: Member)=> miembrosList.push(member)))
        return miembrosList
    }

    addProyecto(form: FormData){
        return this.http.post<any>(`${environment.apiBase}proyecto/`, form);
    }

    updateProyecto(id, form){
        return this.http.patch(`${environment.apiBase}proyecto/${id}/`, form);
    }

    deleteProyecto(proyecto: Proyecto){
        return this.http.delete(`${environment.apiBase}proyecto/${proyecto.id}/`, {headers: this.headers});
    }
    downloadPDF(url): any {
        return this.http.get(url, {responseType: 'blob'}).pipe(map(
            (res: any) => {
                return new Blob([res.blob()], { type: 'application/pdf' });
            })
        );
    }


} 