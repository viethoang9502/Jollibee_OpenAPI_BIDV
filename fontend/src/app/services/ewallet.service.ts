import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaymentDTO } from '../dtos/payment/payment.dto';

@Injectable({
  providedIn: 'root'
})
export class EwalletService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/ewallet/auth`);
  }

  createEwallet(link: string): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/ewallet`, { link });
  }

  createMoney(paymentDTO: PaymentDTO): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/ewallet/create`, paymentDTO);
  }

  createConfirm(data: string): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/ewallet/confirm`, { data });
  }

  receiveMoney(paymentDTO: PaymentDTO): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/ewallet/receive`, paymentDTO);
  }
  saveFacebookAccountId(facebookAccountId: number): Observable<any> {
    const url = '${this.apiBaseUrl}/users/addFacebookAccountId'; // Replace with your API endpoint
    return this.http.post(url, { facebookAccountId });
  }
}
