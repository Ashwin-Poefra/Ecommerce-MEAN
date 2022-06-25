import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public baseUrl = 'http://localhost:3000/api/v1/users';

    constructor(private _httpClient: HttpClient, private _localStorageService: LocalStorageService, private _router: Router) {}

    public login(email: string, password: string): Observable<User> {
        return this._httpClient.post<User>(`${this.baseUrl}/login`, { email, password });
    }
    public logout() {
        this._localStorageService.removeToken();
        this._router.navigate(['/login']);
    }
}
