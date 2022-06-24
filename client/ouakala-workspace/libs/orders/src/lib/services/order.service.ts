import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public baseUrl = 'http://localhost:3000/api/v1/orders';

    constructor(private _httpClient: HttpClient) {}

    public getOrders(): Observable<Order[]> {
        return this._httpClient.get<Order[]>(`${this.baseUrl}`);
    }

    public getOrderById(orderId: string): Observable<Order> {
        return this._httpClient.get<Order>(`${this.baseUrl}/${orderId}`);
    }

    public updateOrder(orderStatus: { status: string }, orderId: string): Observable<Order> {
        return this._httpClient.put<Order>(`${this.baseUrl}/${orderId}`, orderStatus);
    }

    public deleteOrder(orderId: string): Observable<object> {
        return this._httpClient.delete<object>(`${this.baseUrl}/${orderId}`);
    }
}
