// import { 
//     HttpClient,
//   } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// @Injectable({
// providedIn: 'root'
// })
// export class ApiBIDV {

//     private baseUrlToken = "https://openapi.bidv.com.vn/bidv/sandbox/openapi/oauth2/token"
//     private baseUrl = "https://openapi.bidv.com.vn/bidv/sandbox/open-banking/"
//     constructor(private http: HttpClient) {}

//     getBranchs(): Observable<any> {
//         const url = this.baseUrl + "branchandatm/inquiry/v1"
//         const body = {}
//         const headers = {
//           "Content-Length": "0",
//           "Host": "<calculated when request is sent>",
//           "Postman-Token": "<calculated when request is sent>",
//           "Access-Control-Allow-Origin":"http://localhost:4200",
//           "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE",
//           "Cache-Control": "no-cache",
//           "Accept-Encoding": "gzip, deflate, br",
//           "Connection": "keep-alive",
//           "Accept": "application/json",
//           "Accept-Language": "en-US,en;q=0.9,vi;q=0.8",
//           "Authorization": "Bearer AAIgNzgyNWFhZTI5ZjkzYTczZmRjM2JlZGRkNWU1N2M0YjiMZSLaCN6pBl2wWQvYwX5jH4TrZ_u4_EWExhc1KBvVxpeLjw6OKHgnm98Z1-txzyijr-MvNUMDIkHI2eAhgEBdKmg7DPirOhDZhEY_d5J_s79UWBSWUPGGs_Q4KVGc1OE",
//           "Content-Type": "application/json",
//           "Cookie": "session_store_id=KOzRvvqZev9A; 908681d7d547b2e6ca0bbda1f49c6763=8048af7c0c6f7c35e543efd0d602b939",
//           "Origin": "https://openapi.bidv.com.vn",
//           "Referer": "https://openapi.bidv.com.vn/devportal/vi/product/4155/api/4149",
//           "Sec-Fetch-Dest": "empty",
//           "Sec-Fetch-Mode": "cors",
//           "Sec-Fetch-Site": "same-origin",
//           "Timestamp": "546101936",
//           "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
//           "X-API-Interaction-ID": "viethoang9502",
//           "sec-ch-ua": "Google Chrome;v=119, Chromium;v=119, Not?A_Brand;v=24",
//           "sec-ch-ua-mobile": "?0",
//           "sec-ch-ua-platform": "Windows"
//         }
//         return this.http.post(url, body, {
//           headers: headers 
//         })
//     }
// }