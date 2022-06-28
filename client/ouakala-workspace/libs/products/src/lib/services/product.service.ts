import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

    public getFilteredProductByCategoryIds(categoriesId: string[]): Observable<Product[]> {
        let params = new HttpParams();
        if (categoriesId) {
            params = params.append('categories', categoriesId.join(','));
        }
        return this._httpClient.get<Product[]>(`${this.baseUrl}`, { params: params });
    }

    public getFeaturedProducts(count: number): Observable<Product[]> {
        return this._httpClient.get<Product[]>(`${this.baseUrl}/get/featured/${count}`);
    }

    public getProductById(productId: string): Observable<Product> {
        return this._httpClient.get<Product>(`${this.baseUrl}/${productId}`);
    }

    public getProductsByIdCategory(categoryId: string): Observable<Product[]> {
        return this._httpClient.get<Product[]>(`${this.baseUrl}/get/category/${categoryId}`);
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

    public getProductsCount(): Observable<number> {
        return this._httpClient.get<number>(`${this.baseUrl}/get/count`).pipe(map((objectValue: any) => objectValue.productCount));
    }
}
