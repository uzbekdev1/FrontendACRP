import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Member, User} from '../users/user.model';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Boletin} from "./boletines.model";
import {RequestOptions} from "@angular/http";
import {UsersService} from "../users/users.service";

@Injectable()
export class BoletinesService {

    headers: HttpHeaders;

    constructor(private http: HttpClient, private memberService: UsersService) {

        this.headers = new HttpHeaders({
            'Accept': 'application/json',
        });
    }
    getBoletines(): Observable<Boletin[]> {
        return this.http.get<Boletin[]>(`${environment.apiBase}boletin/`).pipe(
            map((res: any)=> {
                res.results.map((boletin: any)=>{
                    boletin.miembros = this.getAutoresByBoletin(boletin.autores);
                })
                return res.results;
            })
        );
    }
    getAutoresByBoletin(autoresId: number[]){
        const miembrosList = []
        autoresId.map((autorId)=> this.memberService.getMemberById(autorId).
        subscribe((member: Member)=> miembrosList.push(member)))
        return miembrosList
    }

    addBoletin(form: FormData){
        return this.http.post<any>(`${environment.apiBase}boletin/`, form);
    }

    updateBoletin(id, form: FormData){
        console.log(form.get('autores'))
        return this.http.patch(`${environment.apiBase}boletin/${id}/`, form, {headers:this.headers});
    }

    deleteBoletin(boletin: Boletin){
        return this.http.delete(`${environment.apiBase}boletin/${boletin.id}/`, {headers: this.headers});
    }
    downloadPDF(url): any {
        return this.http.get(url, {responseType: 'blob'}).pipe(map(
            (res: any) => {
                return new Blob([res.blob()], { type: 'application/pdf' });
            })
        );
    }
} 