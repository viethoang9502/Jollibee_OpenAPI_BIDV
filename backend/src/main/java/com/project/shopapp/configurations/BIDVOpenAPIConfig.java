package com.project.shopapp.configurations;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
public class BIDVOpenAPIConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
