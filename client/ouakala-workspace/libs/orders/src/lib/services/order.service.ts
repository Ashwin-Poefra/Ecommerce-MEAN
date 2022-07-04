import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { Order } from '../models/order';
import { OrderItem } from '../models/order-item';
import { StripeService } from 'ngx-stripe';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    public baseUrl = 'http://localhost:3000/api/v1/orders';

    constructor(private _httpClient: HttpClient, private _stripeService: StripeService) {}

    public getOrders(): Observable<Order[]> {
        return this._httpClient.get<Order[]>(`${this.baseUrl}`);
    }

    public getOrderById(orderId: string): Observable<Order> {
        return this._httpClient.get<Order>(`${this.baseUrl}/${orderId}`);
    }

    public saveOrder(order: Order): Observable<Order> {
        return this._httpClient.post<Order>(`${this.baseUrl}`, order);
    }

    public updateOrder(orderStatus: { status: string }, orderId: string): Observable<Order> {
        return this._httpClient.put<Order>(`${this.baseUrl}/${orderId}`, orderStatus);
    }

    public deleteOrder(orderId: string): Observable<object> {
        return this._httpClient.delete<object>(`${this.baseUrl}/${orderId}`);
    }

    getOrdersCount(): Observable<number> {
        return this._httpClient.get<number>(`${this.baseUrl}/get/count`).pipe(map((objectValue: any) => objectValue.orderCount));
    }

    getTotalSales(): Observable<number> {
        return this._httpClient.get<number>(`${this.baseUrl}/get/total-sales`).pipe(map((objectValue: any) => objectValue.totalsales));
    }

    createCheckoutSession(orderItem: OrderItem[]) {
        return this._httpClient.post(`${this.baseUrl}/create-checkout-session`, orderItem).pipe(
            switchMap((session: any) => {
                return this._stripeService.redirectToCheckout({ sessionId: session.id });
            })
        );
    }

    setCacheOrderDate(order: Order) {
        localStorage.setItem('orderData', JSON.stringify(order));
    }

    getCacheOrderDate(): Order {
        return JSON.parse(localStorage.getItem('orderData') || '{}');
    }

    removeCacheOrderDate() {
        return localStorage.removeItem('orderData');
    }
}
