import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {

    private final RestTemplate restTemplate;

    // Đọc các giá trị từ application.properties
    @Value("${bidv.api.clientId}")
    private String clientId;

    @Value("${bidv.api.clientSecret}")
    private String clientSecret;

    @Value("${bidv.api.authUrl}")
    private String authUrl;

    public AuthenticationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getAccessToken() {
        Map<String, String> params = new HashMap<>();
        params.put("client_id", clientId);
        params.put("client_secret", clientSecret);
        params.put("grant_type", "client_credentials"); // Hoặc grant_type khác tùy thuộc vào yêu cầu của API

        // Gửi yêu cầu POST để lấy token
        String response = restTemplate.postForObject(authUrl, params, String.class);

        // Kiểm tra xem response có giá trị null hay không
        if (response != null) {
            // Xử lý và trích xuất token từ response
            // ...

            return response; // Trả về token đã lấy được
        } else {
            // Xử lý trường hợp response là null (có thể là lỗi)
            return null; // Hoặc xử lý theo cách khác tùy vào yêu cầu của bạn
        }
    }
}
