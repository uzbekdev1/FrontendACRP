import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Member, User} from '../users/user.model';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Centro} from "./centros.model";
import {RequestOptions} from "@angular/http";

@Injectable()
export class CentersService {

    headers: HttpHeaders;

    constructor(private http: HttpClient) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }
    getCenters(): Observable<Centro[]> {
        return this.http.get<Centro[]>(`${environment.apiBase}centro/`,{headers: this.headers}).pipe(
            map((res: any)=> res.results)
        );
    }

    addCenter(form: FormData){
        return this.http.post<any>(`${environment.apiBase}centro/`, form);
    }

    updateCenter(id, form){
        return this.http.patch(`${environment.apiBase}centro/${id}/`, form);
    }

    deleteCenter(center:Centro){
        return this.http.delete(`${environment.apiBase}centro/${center.id}/`, {headers: this.headers});
    }

} 