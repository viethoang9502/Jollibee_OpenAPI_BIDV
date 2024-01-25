// // import { 
// //     HttpClient,
// //   } from '@angular/common/http';
// // import { Injectable } from '@angular/core';
// // import { Observable } from 'rxjs';
// // @Injectable({
// // providedIn: 'root'
// // })
// // export class ApiBIDV {

// //     private baseUrlToken = "https://openapi.bidv.com.vn/bidv/sandbox/openapi/oauth2/token"
// //     private baseUrl = "https://openapi.bidv.com.vn/bidv/sandbox/open-banking/"
// //     private hasCalledGetBranchs = false; 
// //     constructor(private http: HttpClient) {}

// //     getBranchs(): Observable<any> {
// //         this.hasCalledGetBranchs = true;
// //         const url = this.baseUrl + "qrcode/check/v1"
// //         const body = {}
// //         const headers = {
// //           "Content-Length": "0",
// //           "Host": "<calculated when request is sent>",
// //           "Postman-Token": "<calculated when request is sent>",
// //           "Access-Control-Allow-Origin":"http://localhost:4200",
// //           "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE",
// //           "Cache-Control": "no-cache",
// //           "Accept-Encoding": "gzip, deflate, br",
// //           "Connection": "keep-alive",
// //           "Accept": "application/json",
// //           "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
// //           "Authorization": "Bearer AAIgNzgyNWFhZTI5ZjkzYTczZmRjM2JlZGRkNWU1N2M0YjjF5euFtxU7NaDNHS-brIhsLnzYH-QVyjuQKzctTPlZZjswENGo4YP1HWVes8Ce-_e-9ajfoN5mRhAoGcfg-5c_UuJPFPzXP52AJcXTXFzJOKfTgiN27NvIaYTadfeWj-k",
// //           "Content-Type": "application/json",
// //           "Cookie": "session_store_id=KOzRvvqZev9A; 908681d7d547b2e6ca0bbda1f49c6763=8048af7c0c6f7c35e543efd0d602b939",
// //           "Origin": "https://openapi.bidv.com.vn",
// //           "Referer": "https://openapi.bidv.com.vn/devportal/vi/product/4155/api/4149",
// //           "Sec-Fetch-Dest": "empty",
// //           "Sec-Fetch-Mode": "cors",
// //           "Sec-Fetch-Site": "same-origin",
// //           "Timestamp": "546101936",
// //           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
// //           "X-API-Interaction-ID": "viethoang9502",
// //           "sec-ch-ua": "Google Chrome;v=119, Chromium;v=119, Not?A_Brand;v=24",
// //           "sec-ch-ua-mobile": "?0",
// //           "sec-ch-ua-platform": "Windows"
// //         }
// //         return this.http.post(url, body, {
// //           headers: headers 
// //         })
        
// //     }
// //     hasCalledGetBranchs1(): boolean {
// //         return this.hasCalledGetBranchs;
// //       }
    
// // }

// // <div class="qr_box">
// //     <header>
// //       <h1>QR Code Generator</h1>
// //       <p>Paste URL or Enter TEXT to create QR-Code</p>
// //     </header>
  
// //     <input #qrInput type="text" placeholder="Enter URL or TEXT">
// //     <button class="generateBtn" (click)="generateQRCode()">Generate QR Code</button>
    
// //     <!-- Container cho logos -->
// //     <img #qrImg src="" alt="qr-code" class="imgQR">
// //     <div class="logos-container">
// //       <!-- Logo BIDV -->
// //       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Logo_BIDV.svg/2560px-Logo_BIDV.svg.png" alt="BIDV Logo" class="logo">
  
// //       <!-- Divider -->
// //       <div class="divider"></div>
  
// //       <!-- Logo Jollibee -->
// //       <img src="https://download.logo.wine/logo/Jollibee/Jollibee-Logo.wine.png" alt="Jollibee Logo" class="logo">
// //     </div>
// //     <p class="total-amount">{{ totalAmount }} VND</p>
// //     <p class="sotaikhoan">STK: 52011602182</p>
// //     <p>
// //         <span class="text-green">Chi nhánh </span>
// //         <span class="text-red">Jollibee </span>
// //         <span class="text-green">cơ sở Vincom Bà Triệu</span>
// //     </p>
// //   </div>
// //   <p class="total-amount">{{ totalAmount }} VND</p>
// setTimeout(() => {
//   alert(this.resDesc);
//     this.cartService.clearCart();
//     this.router.navigate(['/orders']);
  
// }, 10000); // 60000 milliseconds = 60 seconds
// },