import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import * as countriesLib from 'i18n-iso-countries';

declare const require: any;
@Injectable({
    providedIn: 'root'
})
export class UserService {
    public baseUrl = 'http://localhost:3000/api/v1/users';

    constructor(private _httpClient: HttpClient) {
        countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    }

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

    getCountries(): { id: string; name: string }[] {
        return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
            return {
                id: entry[0],
                name: entry[1]
            };
        });
    }

    getCountry(countryKey: string): string {
        return countriesLib.getName(countryKey, 'en');
    }
}
