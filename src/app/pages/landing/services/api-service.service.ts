import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseContentType} from "@angular/http";
import {map} from "rxjs/operators";
import {environment} from "../../../../environments/environment";
import {Evento} from "../../eventos/eventos.model";
import {Member} from "../../users/user.model";
import Swal from "sweetalert2";

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
        return this.http.get(`${environment.apiBase}miembro/`, {headers: this.headers});
    }

    getJuntaDirectiva(): Observable<Object> {
        return this.http.get(`${environment.apiBase}juntaDirectiva/`, {headers: this.headers});
    }

    getCentros(): Observable<Object> {
        return this.http.get(`${environment.apiBase}centro/`, {headers: this.headers});
    }

    getEventos(): Observable<Object> {
        return this.http.get(`${environment.apiBase}evento/`, {headers: this.headers}).pipe(map((res: any) => res.results),
            map((eventos: Evento[]) =>
                eventos.map((evento) => {
                    evento.fecha = new Date(evento.fecha)
                    return evento;
                })
            )
        );
    }

    getNoticia(): Observable<Object> {
        return this.http.get(`${environment.apiBase}noticia/`, {headers: this.headers});
    }

    getPublicacion(): Observable<Object> {
        return this.http.get(`${environment.apiBase}publicacion/`, {headers: this.headers});
    }

    getBoletines(): Observable<Object> {
        return this.http.get(`${environment.apiBase}boletin/`, {headers: this.headers});
    }

    getProyecto(): Observable<Object> {
        return this.http.get(`${environment.apiBase}proyecto/`, {headers: this.headers});
    }

    downloadPDF(url): any {
        return this.http.get(url, {responseType: 'blob'}).pipe(map(
            (res: any) => {
                return new Blob([res.blob()], {type: 'application/pdf'});
            })
        );
    }

    sendMensaje(mensaje: any) {
        const form: FormData = new FormData()
        form.append('nombreRemitente', mensaje.nombreRemitente)
        form.append('correoRemitente', mensaje.correoRemitente)
        form.append('telefonoRemitente', mensaje.telefonoRemitente)
        form.append('fecha', new Date().toISOString().substr(0, 10))
        form.append('mensaje', mensaje.mensaje)
        this.getJuntaDirectiva().subscribe((miembros: any) => {
            miembros.results.map((miembro: Member) => {
                form.append('miembros', miembro.id.toString())
            })
            this.http.post<any>(`${environment.apiBase}mensaje/`, form).subscribe(()=>{
                Swal({
                    position: 'top-end',
                    type: 'success',
                    title: 'Mensaje Enviado',
                    text: 'La Junta Directiva recibirá su mensaje y lo contactará pronto',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        })
    }
}
