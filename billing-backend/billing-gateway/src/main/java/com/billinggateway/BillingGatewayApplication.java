package com.billinggateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class BillingGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingGatewayApplication.class, args);
	}
}
