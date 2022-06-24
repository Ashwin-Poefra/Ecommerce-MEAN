import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    public baseUrl = 'http://localhost:3000/api/v1/users';

    constructor(private _httpClient: HttpClient) {}

    public login(email: string, password: string): Observable<User> {
        return this._httpClient.post<User>(`${this.baseUrl}/login`, { email, password });
    }
}
