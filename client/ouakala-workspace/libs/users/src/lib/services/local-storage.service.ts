import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken';
@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {
    constructor() {}

    public setToken(data: string) {
        localStorage.setItem(TOKEN, data);
    }

    public getToken(): string {
        const token = localStorage.getItem(TOKEN);
        if (token) {
            return token;
        }
        return '';
    }

    public removeToken() {
        localStorage.removeItem(TOKEN);
    }

    public isValidToken() {
        const token = this.getToken();
        if (token) {
            const decodeToken = JSON.parse(atob(token.split('.')[1]));
            return !this.isTokenExpired(decodeToken.exp);
        } else {
            return false;
        }
    }

    private isTokenExpired(expiration: number): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }

    public getUserId() {
        const token = this.getToken();
        if (token) {
            const decodeToken = JSON.parse(atob(token.split('.')[1]));
            if (decodeToken) {
                return decodeToken.userId;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}
