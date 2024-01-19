package com.gcp.controller;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gcp.entity.Gcp;
import com.gcp.entity.GcpAggregateResult;
import com.gcp.service.GcpService;

@RequestMapping("/gcp")
@RestController
public class GcpController {

	@Autowired
	private GcpService gcpService;

	@GetMapping("/getall")
	public ResponseEntity<List<Gcp>> getAll() {

		List<Gcp> getall = gcpService.getAllData();
		return new ResponseEntity<List<Gcp>>(getall, HttpStatus.OK);
	}

	@GetMapping("/distinctServiceDescriptions")
	public ResponseEntity<List<String>> getDistinctServiceDescriptions() {
		List<String> serviceName = gcpService.getDistinctServiceDescriptions();
		return ResponseEntity.ok(serviceName);
	}

	@GetMapping("/dataBetweenDates")
	public ResponseEntity<List<Gcp>> getDataBetweenDates(@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate) {
		List<Gcp> betweenDates = gcpService.getAllDataBydateRange(startDate, endDate);
		return ResponseEntity.ok(betweenDates);
	}

	@GetMapping("/dataByMonths")
	public ResponseEntity<List<Gcp>> getDataByMonths(@RequestParam("months") int months) {
		List<Gcp> betweenMonths = gcpService.getAllDataByMonths(months);
		return ResponseEntity.ok(betweenMonths);
	}

	@GetMapping("/serviceDesc/Dates")
	public ResponseEntity<List<Gcp>> getDataByServiceDespAndDates(
			@RequestParam("serviceDescription") String serviceDescription, @RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate) {
		List<Gcp> betweenServiceAndDates = gcpService.getDataByServiceDescAndDateRange(serviceDescription, startDate,
				endDate);
		return ResponseEntity.ok(betweenServiceAndDates);
	}

	@GetMapping("/serviceDesc/months")
	public ResponseEntity<List<Gcp>> getDataByServicedescAndMonths(
			@RequestParam("serviceDescription") String serviceDescription,
			@RequestParam("months") int months){
		List<Gcp> betweenServiceAndMonths =gcpService.getDataByServiceDescAndMonths(serviceDescription,months);
		return ResponseEntity.ok(betweenServiceAndMonths);
	}
	
	@GetMapping("/details")
	public ResponseEntity<?> getBillingDetails(
	        @RequestParam String serviceDescription,
	        @RequestParam String startDate,
	        @RequestParam String endDate,
	        @RequestParam(defaultValue = "0") Integer months
	) {
	    if (serviceDescription == null && startDate == null && endDate == null && months == null) {
	        // If any required parameter is missing, return a response indicating the required fields
	        Map<String, String> errorResponse = new LinkedHashMap<>();
	        errorResponse.put("error", "Please select  required fields.");
	        return ResponseEntity.badRequest().body(errorResponse);
	    }

		try {
			// Replace the following placeholders with your actual service calls
			List<Gcp> billingDetails = gcpService.getBillingDetails(serviceDescription, startDate, endDate, months);

			System.out.println("Service : " + serviceDescription);
			System.out.println("Start Date : " + startDate);
			System.out.println("End Date : " + endDate);
			System.out.println("Months : " + months);
			List<Map<String, Double>> monthlyTotalAmounts = gcpService.calculateMonthlyTotalBills(billingDetails);

			Double totalAmount = billingDetails.stream().mapToDouble(Gcp::getCost).sum();
			List<Map<String, Object>> billingPeriod = gcpService.generateBillingPeriod(startDate, endDate, months);

			List<GcpAggregateResult> aggregateResults = gcpService.getServiceTopFiveTotalCosts(startDate, endDate, months);
			// Create a response map
			Map<String, Object> response = new LinkedHashMap<>();
			response.put("billingDetails", billingDetails);
			response.put("monthlyTotalAmounts", monthlyTotalAmounts);
			response.put("totalAmount", totalAmount);
			response.put("billingPeriod", billingPeriod);
			response.put("top5Services", aggregateResults);

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
