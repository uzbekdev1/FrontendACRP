import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseContentType} from "@angular/http";
import {map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {Evento} from "../../eventos/eventos.model";

@Injectable()
export class ApiService {

    headers: HttpHeaders;

    constructor(private http: HttpClient) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }

    getMiembros(): Observable<Object> {
        return this.http.get(`${environment.apiBase}miembro/`,{headers: this.headers});
    }

    getCentros(): Observable<Object> {
        return this.http.get(`${environment.apiBase}centro/`,{headers: this.headers});
    }

    getEventos(): Observable<Object> {
        return this.http.get(`${environment.apiBase}evento/`,{headers: this.headers}).
        pipe(map((res:any)=>res.results),
            map((eventos:Evento[])=>
                eventos.map((evento)=>{
                    evento.fecha = new Date(evento.fecha)
                    return evento;
                })
            )
        );
    }

    getNoticia(): Observable<Object> {
        return this.http.get(`${environment.apiBase}noticia/`,{headers: this.headers});
    }

    getPublicacion(): Observable<Object> {
        return this.http.get(`${environment.apiBase}publicacion/`,{headers: this.headers});
    }

    getBoletines(): Observable<Object> {
        return this.http.get(`${environment.apiBase}boletin/`,{headers: this.headers});
    }

    getProyecto(): Observable<Object> {
        return this.http.get(`${environment.apiBase}proyecto/`,{headers: this.headers});
    }

    downloadPDF(url): any {
       return this.http.get(url, {responseType: 'blob'}).pipe(map(
            (res: any) => {
                return new Blob([res.blob()], { type: 'application/pdf' });
            })
        );
    }

}
