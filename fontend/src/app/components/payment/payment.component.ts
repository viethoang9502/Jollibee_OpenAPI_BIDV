import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { OrderService } from '../../services/order.service'; // Adjust the path as necessary



@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})

export class PaymentComponent implements OnInit {
  @ViewChild('qrInput') qrInput!: ElementRef<HTMLInputElement>;
  @ViewChild('qrImg') qrImg!: ElementRef<HTMLImageElement>;

  preValue: string | undefined;
  totalAmount: number | undefined;

  constructor(private orderService: OrderService) { }

  ngOnInit() {this.totalAmount = this.orderService.getTotalAmount();
  }

  generateQRCode() {
    const qrValue = this.qrInput.nativeElement.value.trim();
    if (!qrValue || this.preValue === qrValue) return;

    this.preValue = qrValue;
    const generateBtn = document.querySelector(".generateBtn") as HTMLButtonElement;
    generateBtn.innerText = "Generating QR Code...";

    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;
    this.qrImg.nativeElement.src = qrImageUrl;

    this.qrImg.nativeElement.onload = () => {
      const qrBox = document.querySelector(".qr_box") as HTMLElement;
      qrBox.classList.add("active");
      generateBtn.innerText = "Generate QR Code";
    };
  }

  clearQRCode() {
    this.qrInput.nativeElement.value = '';
    this.preValue = '';
    const qrBox = document.querySelector(".qr_box") as HTMLElement;
    qrBox.classList.remove("active");
  }
}
