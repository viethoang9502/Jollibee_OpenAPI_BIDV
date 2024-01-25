import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { CheckPaymentDTO } from 'src/app/dtos/payment/check.payment.dto';
import { interval } from 'rxjs';
import Swal from 'sweetalert2';
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
      interval(1000).pipe(take(120)).subscribe((x) => {
        this.countdown = 120 - x;
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
        this.resDesc = response.resDesc;
        this.apiStatus = '200 OK';
        const messageContent = `Status call API from OpenAPI BIDV: ${this.apiStatus}`;
        setTimeout(() => {
        // Hiển thị thông báo SweetAlert2
        Swal.fire({
          title: this.resDesc,
          text: messageContent,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#3085d6',
          customClass: {
            popup: 'custom-popup-class' // Bạn có thể tạo class CSS tùy chỉnh
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.cartService.clearCart();
            this.router.navigate(['/']);
          }


        });
      }, 70000);
      },
      error: (error) => {
        console.error('Error:', error);
        this.apiStatus = 'Thất bại';
      }
    });
  }
  // Additional methods for your component...
}
