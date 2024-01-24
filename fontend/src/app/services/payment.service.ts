import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PaymentDTO } from '../dtos/payment/payment.dto';
import { CheckPaymentDTO } from '../dtos/payment/check.payment.dto';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiBaseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  // Method to process a payment and get the response
  processPayment(paymentDTO: PaymentDTO): Observable<any> {
    // Replace `any` with a more specific type if you have one
    return this.http.post<any>(`${this.apiBaseUrl}/payment`, paymentDTO);
  }
  checkPayment(CheckPaymentDTO: CheckPaymentDTO): Observable<any> {
    // Replace `any` with a more specific type if you have one
    return this.http.post<any>(`${this.apiBaseUrl}/payment/confirm`, CheckPaymentDTO);
  }
}
