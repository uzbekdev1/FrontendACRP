import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('access_token')
        if(token){
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${token}`
                }
            });

            console.log('REQUEST', request)
        }
        return next.handle(request);
    }
}