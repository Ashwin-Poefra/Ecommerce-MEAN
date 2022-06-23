import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public baseUrl = 'http://localhost:3000/api/v1/products';

    constructor(private _httpClient: HttpClient) {}

    public getProducts(): Observable<Product[]> {
        return this._httpClient.get<Product[]>(`${this.baseUrl}`);
    }

    public createProduct(productData: FormData): Observable<Product> {
        return this._httpClient.post<Product>(`${this.baseUrl}`, productData);
    }
}
