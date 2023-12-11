package com.project.shopapp.services.payment;

public interface IPaymentService {
    String getToken();
    String initOtp(int amount);
    String confirm(String body);

}
