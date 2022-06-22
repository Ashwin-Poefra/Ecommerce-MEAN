import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    public baseUrl = 'http://localhost:3000/api/v1/categories';

    constructor(private _httpClient: HttpClient) {}

    public getCategories(): Observable<Category[]> {
        return this._httpClient.get<Category[]>(`${this.baseUrl}`);
    }

    public getCategoryById(categoryId: string): Observable<Category> {
        return this._httpClient.get<Category>(`${this.baseUrl}/${categoryId}`);
    }

    public createCategory(category: Category): Observable<Category> {
        return this._httpClient.post<Category>(`${this.baseUrl}`, category);
    }

    public updateCategory(category: Category, categoryId: string): Observable<Category> {
        return this._httpClient.put<Category>(`${this.baseUrl}/${categoryId}`, category);
    }

    public deleteCategory(categoryId: string): Observable<object> {
        return this._httpClient.delete<object>(`${this.baseUrl}/${categoryId}`);
    }
}
