package com.project.shopapp.controllers;

import com.google.gson.JsonParser;
import com.project.shopapp.dtos.PaymentDTO;
import com.project.shopapp.services.payment.IPaymentService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("${api.prefix}/payment")
public class PaymentController {
    @Autowired
    private IPaymentService paymentService;

    @GetMapping("/auth")
    public ResponseEntity<String> getToken(){
        String auth = paymentService.getToken();
        if(auth == null)
            return ResponseEntity.badRequest().body("get token failed");
        return ResponseEntity.ok(auth);
    }

    @PostMapping("")
    public ResponseEntity<String> initOtp(PaymentDTO paymentDTO){
        String body = paymentService.initOtp(paymentDTO.getAmount());
        if(body == null)
            return ResponseEntity.badRequest().body(new JSONObject("{\n  \"message\": \"initOtp failed\"\n}").toString());
        return ResponseEntity.ok(new JSONObject(body).toString());
    }

    @PostMapping("/confirm")
    public ResponseEntity<String> confirm(@RequestBody String json){
        String body = paymentService.confirm(json);
        if(body == null)
            return ResponseEntity.badRequest().body(new JSONObject("{\n  \"message\": \"Confirm OTP failed\"\n}").toString());
        return ResponseEntity.ok(new JSONObject(body).toString());
    }
}
