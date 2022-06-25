import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    public baseUrl = 'http://localhost:3000/api/v1/';

    constructor(private _localStorageService: LocalStorageService, private _router: Router) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const token = this._localStorageService.getToken();
        const isAPIUrl = request.url.startsWith(this.baseUrl);

        if (token && isAPIUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        } else {
            this._router.navigate(['/login']);
        }
        return next.handle(request);
    }
}
