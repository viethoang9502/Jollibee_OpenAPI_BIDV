package com.project.shopapp.services.payment;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class PaymentService implements IPaymentService{
    private String key = "7825aae29f93a73fdc3beddd5e57c4b8";
    private String secret = "2da23c15823448f73a2843186764867a";

    @Override
    public String getToken() {
        //create auth
        String auth = createAuth();
        String endpoint = "https://openapi.bidv.com.vn/bidv/sandbox/paygate-oauth/oauth2/token";
        try{
            URL url = new URL(endpoint);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            connection.setRequestProperty("Authorization", "Basic " + auth);
            connection.setDoOutput(true);
            String formData = "grant_type=client_credentials&scope=ewallet";
            try (OutputStream os = connection.getOutputStream()) {
                byte[] input = formData.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
            try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
                String inputLine;
                StringBuilder content = new StringBuilder();

                while ((inputLine = in.readLine()) != null) {
                    content.append(inputLine);
                }
                JSONObject jsonObject = new JSONObject(content.toString());
                return jsonObject.getString("access_token");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String initOtp(int amount) {
        String requestUrl = "https://openapi.bidv.com.vn/bidv/sandbox/open-banking/qrcode/initotp/v1"; // Replace with your API endpoint
        String jsonInputString = "{\n" +
                "  \"otpType\": \"SOFTOTP\",\n" +
                "  \"sms\": \"QK KHONG CAP MA OTP CHO NGUOI KHAC, KHONG NHAP TREN WEB,UNG DUNG KHAC. Ma OTP cua GD voi so tien 111111 VND tren BIDV Smartbanking cua QK la 123456\",\n" +
                "  \"otpInfo\": {\n" +
                "    \"transId\": \"1212693\",\n" +
                "    \"serviceCode\": \"1150\",\n" +
                "    \"providerCode\": \"321000\",\n" +
                "    \"fromAccount\": \"63110000797152\",\n" +
                "    \"amount\": \"" + amount + "\",\n" +
                "    \"toAccount\": \"0\",\n" +
                "    \"userName\": \"0965031298\",\n" +
                "    \"mobileNo\": \"0965031298\",\n" +
                "    \"sessionId\": \"8ec454a2ec914913a198c3ead0cabb76\",\n" +
                "    \"channel\": \"6015\",\n" +
                "    \"deviceid\": \"1130370\",\n" +
                "    \"clientid\": \"1130370\",\n" +
                "    \"lang\": \"VN\",\n" +
                "    \"signData\": \"cfWtDZ2a0q5M68BfNZUeqMiaXD1utshlfDcpdx8cYP8=\"\n" +
                "  }\n" +
                "}"; // Replace with your JSON content

        HttpURLConnection connection = null;
        try {
            URL url = new URL(requestUrl);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json; utf-8");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + getToken());
            connection.setRequestProperty("X-Client-Certificate", "MIID5zCCAs+gAwIBAgIUKJF12GBKxmgbd44pviCeH1cTubwwDQYJKoZIhvcNAQELBQAwgYIxCzAJBgNVBAYTAlZOMQ8wDQYDVQQIDAZIYSBOb2kxJTAjBgNVBAoMHFZJTkhPTUVTIEpPSU5UIFNUT0NLIENPTVBBTlkxFjAUBgNVBAMMDSoudmluaG9tZXMudm4xIzAhBgkqhkiG9w0BCQEWFGh1b25naHY2QHZpbml0aXMubmV0MB4XDTIzMTAxNzA4NDgyNFoXDTMzMTAxNDA4NDgyNFowgYIxCzAJBgNVBAYTAlZOMQ8wDQYDVQQIDAZIYSBOb2kxJTAjBgNVBAoMHFZJTkhPTUVTIEpPSU5UIFNUT0NLIENPTVBBTlkxFjAUBgNVBAMMDSoudmluaG9tZXMudm4xIzAhBgkqhkiG9w0BCQEWFGh1b25naHY2QHZpbml0aXMubmV0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjCnKiUF3JMvfdsqs99oZ6HSXOqC4Mmpvvly1r9tlmVcKXrw71pHXRjZcYOOJuIHJDLXsMf9xDFBhLrNNNXQogrHf4Uvn2A5p7GVng9Q0R+S0vjnRUYSONNYjJUeJufOqAekJmlnLiwzGk13kigJbuByLDIYDWQJNz/T/3rUE8Fxdqz87s4PH8xYX87i08VTcGTV0+XXC5ygcP1wYj6HeGE2qdBN2aa8CafdTD5YnvrxsnmvilpMYLCkyraVafr7sjbxeF/vtp/D1Ya4wnLorgW34zptUagEdn2jVCOhMl1WRBCm7pAqJfwa3MTlfjleioLRDYy0EuQxZA+VaQk/V3wIDAQABo1MwUTAdBgNVHQ4EFgQUbwX4z+l9RcZsfQ2MEzddVkriEEswHwYDVR0jBBgwFoAUbwX4z+l9RcZsfQ2MEzddVkriEEswDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAgIVn9Tj7x2ZK5RlY+LgjhfPpE5CKOX/ufYSMwOTi7qidgGTwmtRnk4u+W2Ba3XCh4O3pjzTD25xt41R7QLoy5+3b2aP31hn+dC2f86dTC/PQK4Z2Iv1vzXfOjVMO9sr4geLTG7NizhvFpPCVEbpiZ/4tgQEZndR5oy3HmQ34pBOlt8BEAFMaMy6FxE6zhuV2MEDO0HiV64+dWNSvUR/QmCGllGpkNBajqUbC5MwW1bOYH7tlFTGxqjLk66JcSwyG2esOeG2DzlELXwgr/LcD4gLi5QHKl6m7J0lexBPCaOsKLzF5dgYo24ojW+AyRMrCL6IV/K/j+VlVKKMDuwCdVA==");
            connection.setRequestProperty("X-API-Interaction-ID", "2510078634622976");
            connection.setRequestProperty("Timestamp", "1091543203");
            connection.setRequestProperty("X-JWS-Signature", "kidricfadhakoh");
            connection.setRequestProperty("User-Agent", "viethoang9502");
            connection.setDoOutput(true);

            try (java.io.OutputStream os = connection.getOutputStream()) {
                byte[] input = jsonInputString.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
            if(connection.getResponseCode() != 200)
                return null;
            try (java.io.BufferedReader br = new java.io.BufferedReader(
                    new java.io.InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                return response.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    @Override
    public String confirm(String body) {
        String requestUrl = "https://openapi.bidv.com.vn/bidv/sandbox/open-banking/qrcode/payment/v1";

        HttpURLConnection connection = null;
        try {
            URL url = new URL(requestUrl);
            connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json; utf-8");
            connection.setRequestProperty("Accept", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + getToken());
            connection.setRequestProperty("X-Client-Certificate", "MIID5zCCAs+gAwIBAgIUKJF12GBKxmgbd44pviCeH1cTubwwDQYJKoZIhvcNAQELBQAwgYIxCzAJBgNVBAYTAlZOMQ8wDQYDVQQIDAZIYSBOb2kxJTAjBgNVBAoMHFZJTkhPTUVTIEpPSU5UIFNUT0NLIENPTVBBTlkxFjAUBgNVBAMMDSoudmluaG9tZXMudm4xIzAhBgkqhkiG9w0BCQEWFGh1b25naHY2QHZpbml0aXMubmV0MB4XDTIzMTAxNzA4NDgyNFoXDTMzMTAxNDA4NDgyNFowgYIxCzAJBgNVBAYTAlZOMQ8wDQYDVQQIDAZIYSBOb2kxJTAjBgNVBAoMHFZJTkhPTUVTIEpPSU5UIFNUT0NLIENPTVBBTlkxFjAUBgNVBAMMDSoudmluaG9tZXMudm4xIzAhBgkqhkiG9w0BCQEWFGh1b25naHY2QHZpbml0aXMubmV0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAjCnKiUF3JMvfdsqs99oZ6HSXOqC4Mmpvvly1r9tlmVcKXrw71pHXRjZcYOOJuIHJDLXsMf9xDFBhLrNNNXQogrHf4Uvn2A5p7GVng9Q0R+S0vjnRUYSONNYjJUeJufOqAekJmlnLiwzGk13kigJbuByLDIYDWQJNz/T/3rUE8Fxdqz87s4PH8xYX87i08VTcGTV0+XXC5ygcP1wYj6HeGE2qdBN2aa8CafdTD5YnvrxsnmvilpMYLCkyraVafr7sjbxeF/vtp/D1Ya4wnLorgW34zptUagEdn2jVCOhMl1WRBCm7pAqJfwa3MTlfjleioLRDYy0EuQxZA+VaQk/V3wIDAQABo1MwUTAdBgNVHQ4EFgQUbwX4z+l9RcZsfQ2MEzddVkriEEswHwYDVR0jBBgwFoAUbwX4z+l9RcZsfQ2MEzddVkriEEswDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAgIVn9Tj7x2ZK5RlY+LgjhfPpE5CKOX/ufYSMwOTi7qidgGTwmtRnk4u+W2Ba3XCh4O3pjzTD25xt41R7QLoy5+3b2aP31hn+dC2f86dTC/PQK4Z2Iv1vzXfOjVMO9sr4geLTG7NizhvFpPCVEbpiZ/4tgQEZndR5oy3HmQ34pBOlt8BEAFMaMy6FxE6zhuV2MEDO0HiV64+dWNSvUR/QmCGllGpkNBajqUbC5MwW1bOYH7tlFTGxqjLk66JcSwyG2esOeG2DzlELXwgr/LcD4gLi5QHKl6m7J0lexBPCaOsKLzF5dgYo24ojW+AyRMrCL6IV/K/j+VlVKKMDuwCdVA==");
            connection.setRequestProperty("X-API-Interaction-ID", "2510078634622976");
            connection.setRequestProperty("Timestamp", "1091543203");
            connection.setRequestProperty("X-JWS-Signature", "kidricfadhakoh");
            connection.setRequestProperty("User-Agent", "viethoang9502");
            connection.setDoOutput(true);

            try (java.io.OutputStream os = connection.getOutputStream()) {
                byte[] input = body.getBytes(StandardCharsets.UTF_8);
                os.write(input, 0, input.length);
            }
            if(connection.getResponseCode() != 200)
                return null;
            try (java.io.BufferedReader br = new java.io.BufferedReader(
                    new java.io.InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8))) {
                StringBuilder response = new StringBuilder();
                String responseLine;
                while ((responseLine = br.readLine()) != null) {
                    response.append(responseLine.trim());
                }
                return response.toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }
    }

    private String createAuth(){
        String authString = key + ":" + secret;
        return Base64.getEncoder().encodeToString(authString.getBytes());
    }
}
