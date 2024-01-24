import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { CheckPaymentDTO } from 'src/app/dtos/payment/check.payment.dto';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup; // FormGroup to manage form data
  qrImageUrl: string = ''; // URL for the QR image
  errorDesc: string = ''; // Error description
  statusMessage: string = ''; // Status message for the transaction
  totalAmount: number | undefined;
  resDesc: string = '';
  apiStatus: string = '';
  countdown: number = 60;

  constructor(
    
    private cartService: CartService,
    private paymentService: PaymentService,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // Initialize the FormGroup with appropriate form controls
    this.paymentForm = this.formBuilder.group({
      // Example: 'amount': ['', [Validators.required, Validators.min(1)]]
      // Add other form controls as per your requirements
    });
  }

  ngOnInit(): void {
      this.checkPayment();
      this.initiatePayment();
      this.totalAmount = this.orderService.getTotalAmount();
      interval(1000).pipe(take(60)).subscribe((x) => {
        this.countdown = 60 - x;
        if (this.countdown === 0) {
          // Khi đồng hồ đếm ngược đạt đến 1 giây, chuyển hướng người dùng
          this.router.navigate(['/orders']);
        }
      });
  }

  initiatePayment(): void {
    if (!this.paymentForm.valid) {
      this.statusMessage = 'Invalid form data. Please check your input.';
      return;
    }

    // Call the payment service to process the payment
    this.paymentService.processPayment(this.paymentForm.value).subscribe({
      next: (response) => {
        this.handlePaymentResponse(response);
      },
      error: (error) => {
        this.errorDesc = `Error: ${error.message}`;
      },
      complete: () => {
        // Actions upon completion, if necessary
      }
    });
  }

  private handlePaymentResponse(response: any): void {
    if (response?.msg?.header?.errorCode === '000') {
      // Replace 'vietQRImage' with a path to the image in your assets folder
      this.qrImageUrl = 'assets/QRcode.png'; // Change 'myImage.png' to your actual image filename
      this.errorDesc = response.msg.header.errorDesc || 'No error description';
      this.statusMessage = '200 OK';
    } else {
      this.statusMessage = `Error processing payment: ${response?.msg?.header?.errorDesc || 'Unknown error'}`;
    }
  }
  
  checkPayment() {
    const checkPaymentDTO = new CheckPaymentDTO("Qrinfo_data");
    
    this.paymentService.checkPayment(checkPaymentDTO).subscribe({
      next: (response) => {
        // Xử lý phản hồi thành công
        this.resDesc = response.resDesc;
        this.apiStatus = '200 OK';
  
        // Thiết lập một timeout để hiển thị alert sau 60 giây
        // setTimeout(() => {
        //   alert(this.resDesc);
        //     this.cartService.clearCart();
        //     this.router.navigate(['/orders']);
          
        // }, 10000); // 60000 milliseconds = 60 seconds
      },
      error: (error) => {
        // Xử lý trường hợp lỗi
        console.error('Error:', error);
        this.apiStatus = 'Thất bại';
      }
    });
  }
  // Additional methods for your component...
}
