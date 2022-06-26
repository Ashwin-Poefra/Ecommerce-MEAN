import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private _localStorageService: LocalStorageService, private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = this._localStorageService.getToken();

        if (token) {
            const decodeToken = JSON.parse(atob(token.split('.')[1]));
            if (decodeToken.isAdmin && !this.isTokenExpired(decodeToken.exp)) {
                return true;
            }
        }

        this._router.navigate(['/login']);
        return false;
    }

    isTokenExpired(expiration: number): boolean {
        return Math.floor(new Date().getTime() / 1000) >= expiration;
    }
}
