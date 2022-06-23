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

    public getProductById(productId: string): Observable<Product> {
        return this._httpClient.get<Product>(`${this.baseUrl}/${productId}`);
    }

    public createProduct(productData: FormData): Observable<Product> {
        return this._httpClient.post<Product>(`${this.baseUrl}`, productData);
    }

    public updateProduct(productData: FormData, productId: string): Observable<Product> {
        return this._httpClient.put<Product>(`${this.baseUrl}/${productId}`, productData);
    }

    public deleteProduct(productId: string): Observable<object> {
      return this._httpClient.delete<object>(`${this.baseUrl}/${productId}`);
  }
}
