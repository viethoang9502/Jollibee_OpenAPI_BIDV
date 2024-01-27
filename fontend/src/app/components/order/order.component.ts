import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { OrderService } from '../../services/order.service';
import { TokenService } from '../../services/token.service';
import { environment } from 'src/environments/environment';
import { OrderDTO } from '../../dtos/order/order.dto';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/models/order';
import * as $AB from 'jquery';
import * as bootstrap from "bootstrap";
import { UserResponse } from 'src/app/responses/user/user.response';
import { EwalletDTO } from 'src/app/dtos/user/ewallet.dto';
import { UserService } from 'src/app/services/user.service';
import { SharedDataService } from 'src/app/services/share.data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  public totalOrderAmount: number = 0;
  myGroup: FormGroup;
  orderForm: FormGroup; // Đối tượng FormGroup để quản lý dữ liệu của form
  cartItems: { product: Product, quantity: number }[] = [];
  couponCode: string = '';
  userEnteredNumber: number = 0;
  totalAmountAll: number | undefined;
  userResponse?: UserResponse | null;
  enteredFacebookAccountId: number | undefined;
  token:string = '';
  public transactionDescription: string = '';
  totalAmount: number = 0; // Tổng tiền
  orderData: OrderDTO = {
    user_id: 0, // Thay bằng user_id thích hợp
    fullname: '', // Khởi tạo rỗng, sẽ được điền từ form
    email: '', // Khởi tạo rỗng, sẽ được điền từ form    
    phone_number: '', // Khởi tạo rỗng, sẽ được điền từ form
    address: '', // Khởi tạo rỗng, sẽ được điền từ form
    status: 'pending',
    note: '', // Có thể thêm trường ghi chú nếu cần
    total_money: 0, // Sẽ được tính toán dựa trên giỏ hàng và mã giảm giá
    payment_method: 'cod', // Mặc định là thanh toán khi nhận hàng (COD)
    shipping_method: 'express', // Mặc định là vận chuyển nhanh (Express)
    coupon_code: '', // Sẽ được điền từ form khi áp dụng mã giảm giá
    cart_items: []
  };
  dataOtp = {};
  id = -1;
  

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private orderService: OrderService,
    private sharedDataService: SharedDataService,
    private tokenService: TokenService,
    
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.myGroup = new FormGroup({
      someOtherControl: new FormControl(), // Thay thế 'someOtherControl' với tên của FormControl thực tế trong form của bạn
      // Thêm các FormControl khác nếu cần
    });
    // Tạo FormGroup và các FormControl tương ứng
    this.orderForm = this.formBuilder.group({
      fullname: ['', Validators.required], // fullname là FormControl bắt buộc      
      email: ['', [Validators.email]], // Sử dụng Validators.email cho kiểm tra định dạng email
      phone_number: ['', [Validators.required, Validators.minLength(6)]], // phone_number bắt buộc và ít nhất 6 ký tự
      address: ['', [Validators.required, Validators.minLength(5)]], // address bắt buộc và ít nhất 5 ký tự
      note: [''],
      shipping_method: ['express'],
      payment_method: ['cod']
    });
  }
  
  ngOnInit(): void {  
    
    this.sharedDataService.currentFacebookAccountId.subscribe(facebookAccountId => {
      this.enteredFacebookAccountId = facebookAccountId;
    });
    debugger
    //this.cartService.clearCart();
    this.orderData.user_id = this.tokenService.getUserId();  
    this.totalAmountAll = this.orderService.getTotalAmount();  
    // Lấy danh sách sản phẩm từ giỏ hàng
    debugger
    const cart = this.cartService.getCart();
    const productIds = Array.from(cart.keys()); // Chuyển danh sách ID từ Map giỏ hàng    

    // Gọi service để lấy thông tin sản phẩm dựa trên danh sách ID
    debugger    
    if(productIds.length === 0) {
      return;
    }    
    this.productService.getProductsByIds(productIds).subscribe({
      next: (products) => {            
        debugger
        // Lấy thông tin sản phẩm và số lượng từ danh sách sản phẩm và giỏ hàng
        this.cartItems = productIds.map((productId) => {
          debugger
          const product = products.find((p) => p.id === productId);
          if (product) {
            product.thumbnail = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
          }          
          return {
            product: product!,
            quantity: cart.get(productId)!
          };
        });
        console.log('haha');
      },
      complete: () => {
        debugger;
        this.calculateTotal()
      },
      error: (error: any) => {
        debugger;
        console.error('Error fetching detail:', error);
      }
    });        
  }
  closeModal(){
    (<any>$('#myModal')).modal('hide');
  }
  
  placeOrder() {
    debugger;
  
    if (this.orderForm.valid) {
      // Read the selected payment method from the form
      const paymentMethod = this.orderForm.get('payment_method')?.value;
  
      // Update the orderData with form values
      this.orderData = {
        ...this.orderData,
        ...this.orderForm.value
      };
      this.orderData.cart_items = this.cartItems.map(cartItem => ({
        product_id: cartItem.product.id,
        quantity: cartItem.quantity
      }));
      this.orderData.total_money = this.totalAmount;
  
      // Conditional behavior based on payment method
      if (paymentMethod === 'qr') {
        // If payment method is QR, place order and navigate to payment page
        this.orderService.placeOrder(this.orderData).subscribe({
          next: (response: Order) => {
            debugger;
            this.id = response.id;
            alert('Đặt hàng thành công');
            this.router.navigate(['/payment']);
          },
          error: (error: any) => {
            debugger;
            alert(`Lỗi khi đặt hàng: ${error}`);
          }
        });
      } else if (paymentMethod === 'ewallet') {
        // If payment method is eWallet, execute the subtraction logic
        this.subtractFacebookAccountId();
      }
    } else {
      alert('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
    }
  }
  
  subtractFacebookAccountId(): void {
    if (this.orderForm.valid) {
    this.orderService.placeOrder(this.orderData).subscribe({
      next: (response: Order) => {
        debugger;
        this.id = response.id;
        alert('Đặt hàng thành công');
      },
      error: (error: any) => {
        debugger;
        alert(`Lỗi khi đặt hàng: ${error}`);
      }
    });
      // Parse the entered value as a number
 
      if (this.enteredFacebookAccountId !== undefined) {
  
      // Retrieve and parse the current Facebook Account ID as a number
      // If it's not available, default to 0
  
      // Perform the mathematical subtraction
      const newFacebookAccountId = this.enteredFacebookAccountId + this.totalAmount;
      
      // Ensure the result is not negative, or handle it according to your needs
      if (newFacebookAccountId < 0) {
        alert("Không đủ tiền trong tài khoản.");
        return;
      }
  
      // Create an EwalletDTO with the new Facebook Account ID
      const ewalletDTO: EwalletDTO = new EwalletDTO({ facebook_account_id: newFacebookAccountId });
  
      this.userService.updateUserDetail1(this.token, ewalletDTO)
        .subscribe({
          next: (response) => {
            // Update the local storage with the new Facebook Account ID
            if (this.userResponse) {
              this.userResponse.facebook_account_id = newFacebookAccountId;
              this.userService.saveUserResponseToLocalStorage(this.userResponse);
            }
            // Optionally navigate the user to a different page or show a success message
          },
          error: (error) => {
            // Handle the error scenario, for instance, showing an error message
            alert(error.error.message);
          }
        });
      }
    }
  }
  

  
  // Hàm tính tổng tiền
  calculateTotal(): void {
      this.totalAmount = this.cartItems.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
      );
      this.orderService.setTotalAmount(this.totalAmount);
  }

  // Hàm xử lý việc áp dụng mã giảm giá
  applyCoupon(): void {
    // Check if the entered coupon code matches '123456'
    if (this.couponCode === '123456') {
      // Calculate the discount amount (10% of the total amount)
      const discount = this.totalAmount * 0.10;
  
      // Apply the discount to the total amount
      this.totalAmount -= discount;
  
      // Update the total money in the order data
      this.orderData.total_money = this.totalAmount;
  
      // Optionally, update the UI to show the new total amount
      // For example, you might want to refresh a total amount display
  
      // Show a success message for applying the coupon
      alert('Coupon applied successfully. 10% discount has been given.');
    } else {
      // Handle the case where the coupon code does not match
      alert('Invalid coupon code. Please try again.');
    }
    this.orderService.setTotalAmount(this.totalAmount);
  }
  
}
