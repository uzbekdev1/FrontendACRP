import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

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
}
