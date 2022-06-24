import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';
@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() {}

    setToken(data: string) {
        localStorage.setItem(TOKEN, data);
    }

    getToken(): string {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            return token;
        }
        return '';
    }

    removeToken() {
        localStorage.removeItem(TOKEN);
    }
}
