package com.billing.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.billing.entity.Aws;
import com.billing.entity.AwsAggregateResult;
import com.billing.service.AwsService;

@RestController
@RequestMapping("/aws")
public class AwsController {

	@Autowired
	private AwsService awsService;

	@GetMapping("/month")
	public ResponseEntity<List<Aws>> getBillingDetailsForDuration(@RequestParam(name = "months") int months) {
		List<Aws> billingDetails = awsService.getBillingDetailsForDuration(months);
		return new ResponseEntity<>(billingDetails, HttpStatus.OK);
	}

	@GetMapping("/data/count")
	public Long getDataCount() {
		return awsService.getCountOfData();
	}

	@GetMapping("/getall")
	public ResponseEntity<List<Aws>> getAllServices() {
		List<Aws> awsData = awsService.getAllServices();
		System.out.println(awsData);
		return new ResponseEntity<List<Aws>>(awsData, HttpStatus.OK);
	}

	@PostMapping("/save")
	public ResponseEntity<Aws> save(@RequestBody Aws aws) {
		return ResponseEntity.status(HttpStatus.CREATED).body(awsService.save(aws));
	}

	@GetMapping("/service/startdate/enddate")
	public ResponseEntity<List<Aws>> getDataByServiceAndDateRange(@RequestParam String service,
			@RequestParam String startDate, @RequestParam String endDate) {
		List<Aws> data = awsService.getDataByServiceAndDateRange(service, startDate, endDate);
		return ResponseEntity.ok(data);
	}

	@GetMapping("/service/months")
	public ResponseEntity<List<Aws>> getBillingDetailsForDuration(@RequestParam("service") String service,
			@RequestParam("months") int months) {

		List<Aws> billingDetails = awsService.getBillingDetailsForDuration(service, months);

		if (billingDetails.isEmpty()) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(billingDetails);
		}
	}

	@GetMapping("/distinct-services")
	public ResponseEntity<String[]> getDistinctServices() {
		String[] distinctServices = awsService.getUniqueServicesAsArray();
		if (distinctServices.length == 0) {
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.ok(distinctServices);
		}
	}

	@GetMapping("/billing-details")
	public ResponseEntity<Map<String, Object>> getBillingDetails(
			@RequestParam(value = "service"/* , required = false */) String service,
			@RequestParam /* (required = false) */ String startDate, @RequestParam(required = false) String endDate,
			@RequestParam(defaultValue = "0"/* required = false */) Integer months) {

		if (service == null || service.isEmpty() && startDate == null || startDate.isEmpty() && endDate == null || endDate.isEmpty() && months <= 0) {
			Map<String, Object> emptyBillingDetailsResponse = new LinkedHashMap<>();
			emptyBillingDetailsResponse.put("message", "Enter valid input.");
			return ResponseEntity.badRequest().body(emptyBillingDetailsResponse);
		}

		try {
			// Replace the following placeholders with your actual service calls
			List<Aws> billingDetails = awsService.getBillingDetails(service, startDate, endDate, months);

			System.out.println("Service : " + service);
			System.out.println("Start Date : " + startDate);
			System.out.println("End Date : " + endDate);
			System.out.println("Months : " + months);
			List<Map<String, Double>> monthlyTotalAmounts = awsService.calculateMonthlyTotalBills(billingDetails);

			Double totalAmount = awsService.getTotalAmount(service, startDate, endDate, months);
			List<Map<String, Object>> billingPeriod = awsService.generateBillingPeriod(startDate, endDate, months);
			
			List<AwsAggregateResult> aggregateResults = awsService.getServiceTopFiveTotalCosts(startDate, endDate, months);
			// Create a response map
			Map<String, Object> response = new LinkedHashMap<>();
			response.put("billingDetails", billingDetails);
			response.put("monthlyTotalAmounts", monthlyTotalAmounts);
			response.put("totalAmount", totalAmount);
			response.put("billingPeriod", billingPeriod);
			response.put("top5Services", aggregateResults);

//	            // Fetch top 10 services if no specific service is selected
//	            if (service == null || service.isEmpty()) {
//	                List<Map<String, Object>> top10Services = awsService.getTop10Services(billingDetails);
//	                response.put("top10Services", top10Services);
//	            } 

			if (billingDetails.isEmpty()) {
				Map<String, Object> emptyBillingDetailsResponse = new LinkedHashMap<>();
				emptyBillingDetailsResponse.put("message", "No billing details available.");
				return ResponseEntity.ok(emptyBillingDetailsResponse);
			} else {
				return ResponseEntity.ok(response);
			}
		} catch (IllegalArgumentException e) {
			// Handle the exception, return an error response or log the error message
			Map<String, Object> errorResponse = new LinkedHashMap<>();
			errorResponse.put("error", e.getMessage());
			return ResponseEntity.badRequest().body(errorResponse);
		}
	}
}