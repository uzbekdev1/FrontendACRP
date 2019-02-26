import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseContentType} from "@angular/http";
import {map} from "rxjs/operators";

@Injectable()
export class ApiService {
    token: string;

    headers: HttpHeaders;

    constructor(private http: HttpClient) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }

    getMiembros(): Observable<Object> {
        return this.http.get(`http://127.0.0.1:8000/api/miembro/`,{headers: this.headers});
    }

    getCentros(): Observable<Object> {
        return this.http.get(`http://127.0.0.1:8000/api/centro/`,{headers: this.headers});
    }

    getEventos(): Observable<Object> {
        return this.http.get(`http://127.0.0.1:8000/api/evento/`,{headers: this.headers});
    }

    getNoticia(): Observable<Object> {
        return this.http.get(`http://127.0.0.1:8000/api/noticia/`,{headers: this.headers});
    }

    getPublicacion(): Observable<Object> {
        return this.http.get(`http://127.0.0.1:8000/api/publicacion/`,{headers: this.headers});
    }

    getBoletines(): Observable<Object> {
        return this.http.get(`http://127.0.0.1:8000/api/boletin/`,{headers: this.headers});
    }

    getProyecto(): Observable<Object> {
        return this.http.get(`http://127.0.0.1:8000/api/proyecto/`,{headers: this.headers});
    }

    downloadPDF(url): any {
       return this.http.get(url, {responseType: 'blob'}).pipe(map(
            (res: any) => {
                return new Blob([res.blob()], { type: 'application/pdf' });
            })
        );
    }

}
