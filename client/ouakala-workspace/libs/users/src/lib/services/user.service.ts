import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public baseUrl = 'http://localhost:3000/api/v1/users';

    constructor(private _httpClient: HttpClient) {}

    public getUsers(): Observable<User[]> {
        return this._httpClient.get<User[]>(`${this.baseUrl}`);
    }

    public getUserById(userId: string): Observable<User> {
        return this._httpClient.get<User>(`${this.baseUrl}/${userId}`);
    }

    public createUser(user: User): Observable<User> {
        return this._httpClient.post<User>(`${this.baseUrl}`, user);
    }

    public updateUser(user: User, userId: string): Observable<User> {
        return this._httpClient.put<User>(`${this.baseUrl}/${userId}`, user);
    }

    public deleteUser(userId: string): Observable<object> {
        return this._httpClient.delete<object>(`${this.baseUrl}/${userId}`);
    }
}
