import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    headers: HttpHeaders;

    constructor(private http: HttpClient) {

        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }
    login(form){
      const formData = new FormData()
        formData.append('username', form.username)
        formData.append('password', form.password)
        this.http.post(`${environment.apiBase}login/`,formData).subscribe((token:any)=>{
          localStorage.setItem('access_token',token.token)

        })
    }

    isAuthenticated(){
        return localStorage.getItem('access_token')
    }

    logout(){
      localStorage.removeItem('access_token')
    }
}
