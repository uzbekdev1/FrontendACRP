import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../environments/environment";
import {map} from "rxjs/operators";
import {Evento} from "./eventos.model";

@Injectable()
export class EventosService {

    headers: HttpHeaders;

    constructor(private http: HttpClient) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }
    getEventos(): Observable<Evento[]> {
        return this.http.get<Evento[]>(`${environment.apiBase}evento/`,{headers: this.headers}).pipe(
            map((res: any)=> res.results)
        );
    }

    addEvento(evento: Evento){
        const body = {
            nombre: evento.nombre,
            centro: evento.centro,
            categoria: evento.categoria,
            direccion: evento.direccion,
            descripcion: evento.descripcion,
            fecha: evento.fecha.toISOString().substr(0,10),
        }
        return this.http.post<any>(`${environment.apiBase}evento/`, body);
    }

    updateEvento(evento){
        const body = {
            nombre: evento.nombre,
            centro: evento.centro,
            categoria: evento.categoria,
            direccion: evento.direccion,
            descripcion: evento.descripcion,
            fecha: evento.fecha.toISOString().substr(0,10),
        }
        console.log('nuevo evento', body)
        return this.http.put(`${environment.apiBase}evento/${evento.id}/`, body);
    }

    deleteEvento(evento: Evento){
        return this.http.delete(`${environment.apiBase}evento/${evento.id}/`, {headers: this.headers});
    }

} 