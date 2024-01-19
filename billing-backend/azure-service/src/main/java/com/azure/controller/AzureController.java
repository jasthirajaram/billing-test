package com.azure.controller;

import java.util.ArrayList;
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

import com.azure.entity.Azure;
import com.azure.entity.AzureAggregateResult;
import com.azure.service.AzureService;

@RestController
@RequestMapping("/azure")
public class AzureController {

	@Autowired
	private AzureService azureService;

	@GetMapping("/data/count")
	public Long getDataCount() {
		return azureService.getCountOfData();
	}

	@GetMapping("/getall")
	public ResponseEntity<List<Azure>> getAllData() {
		List<Azure> getData = azureService.getAll();
		return ResponseEntity.ok(getData);
	}

	@GetMapping("/distinctresourceType")
	public ResponseEntity<List<String>> getDistinctResourceType() {
		List<String> resource = azureService.getDistinctResourceType();
		return ResponseEntity.ok(resource);
	}

	@GetMapping("/dataBetweenDates")
	public ResponseEntity<List<Azure>> getDataBetweenDates(@RequestParam("startDate") String startDate,
			@RequestParam("endDate") String endDate) {
		List<Azure> betweenDates = azureService.getAllDataBydateRange(startDate, endDate);
		return ResponseEntity.ok(betweenDates);
	}

	@GetMapping("/dataByMonths")
	public ResponseEntity<List<Azure>> getDataByMonths(@RequestParam("months") int months) {
		List<Azure> betweenMonths = azureService.getAllDataByMonths(months);
		return ResponseEntity.ok(betweenMonths);
	}

	@GetMapping("/resourcetype/Dates")
	public ResponseEntity<List<Azure>> getDataByServiceDespAndDates(@RequestParam("ResourseType") String resourseType,
			@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate) {
		List<Azure> betweenServiceAndDates = azureService.getDataByResourseTypeAndDateRange(resourseType, startDate,
				endDate);
		return ResponseEntity.ok(betweenServiceAndDates);
	}

	@GetMapping("/resourseType/months")
	public ResponseEntity<List<Azure>> getDataByServicedescAndMonths(
			@RequestParam("ResourseType") String serviceDescription, @RequestParam("months") int months) {
		List<Azure> betweenServiceAndMonths = azureService.getDataByResourseTypeAndMonths(serviceDescription, months);
		return ResponseEntity.ok(betweenServiceAndMonths);
	}

//		    @GetMapping("/details")
//		    public ResponseEntity<Map<String, Object>> getBillingDetails(
//		            @RequestParam(value="ResourseType",required = false) String resourceType,
//		            @RequestParam(required = false) String startDate,
//		            @RequestParam(required = false) String endDate,
//		            @RequestParam(required = false) Integer months
//		    ) {
//		        List<Azure> billingDetails = azureService.getBillingDetails(resourceType, startDate, endDate, months);
//
//		        if (billingDetails.isEmpty()) {
//		            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new LinkedHashMap<>());
//		        }
//
//		        double totalCost = billingDetails.stream().mapToDouble(Azure::getCost).sum();
//		        Map<String, Double> monthlyTotalBills = azureService.calculateMonthlyTotalBills(billingDetails);
//		        List<Map<String, Object>> top5ResourceTypes = new ArrayList<>();
//
//		        // Check if only resourceType is selected
//		        if (resourceType != null && startDate == null && endDate == null && months == null) {
//		            // If only resourceType is selected, return only billingDetails, totalCost, and monthlyTotalBills
//		            Map<String, Object> response = new LinkedHashMap<>();
//		            response.put("billingDetails", billingDetails);
//		            response.put("totalCost", totalCost);
//		            response.put("monthlyTotalBills", monthlyTotalBills);
//		            return ResponseEntity.ok(response);
//		        }
//
//		        // If other parameters (startDate, endDate, months) are used, get top 5 resource types
//		        top5ResourceTypes = azureService.getTop5ResourseType(billingDetails);
//
//		        // Prepare the response map
//		        Map<String, Object> response = new LinkedHashMap<>();
//		        response.put("billingDetails", billingDetails);
//		        response.put("totalCost", totalCost);
//		        response.put("monthlyTotalBills", monthlyTotalBills);
//		        if (!top5ResourceTypes.isEmpty()) {
//		            response.put("top5ResourceTypes", top5ResourceTypes);
//		        }
//
//		        return ResponseEntity.ok(response);
//		    }

//	@GetMapping("/details")
//	public ResponseEntity<Map<String, Object>> getBillingDetails(
//			@RequestParam(value = "ResourseType") String resourceType,
//			@RequestParam String startDate, @RequestParam String endDate,
//			@RequestParam(defaultValue = "0") Integer months) {
//		List<Azure> billingDetails = azureService.getBillingDetails(resourceType, startDate, endDate, months);
//
//		if (billingDetails.isEmpty()) {
//			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new LinkedHashMap<>());
//		}
//
//		double totalCost = billingDetails.stream().mapToDouble(Azure::getCost).sum();
//		List<Map<String, Double>> monthlyTotalBills = azureService.calculateMonthlyTotalBills(billingDetails);
//		List<AzureAggregateResult> top5ResourceTypes = new ArrayList<>();
//		List<Map<String, Object>> billingPeriod = azureService.generateBillingPeriod(startDate, endDate, months);
//
//		// Check if only resourceType is selected
//		if (resourceType != null && startDate == null && endDate == null && months == null) {
//			// If only resourceType is selected, return only billingDetails, totalCost, and
//			// monthlyTotalBills
//			Map<String, Object> response = new LinkedHashMap<>();
//			response.put("billingDetails", billingDetails);
//			response.put("totalCost", totalCost);
//			response.put("monthlyTotalBills", monthlyTotalBills);
//			response.put("billingPeriod", billingPeriod);
//
//			return ResponseEntity.ok(response);
//		}
//
//		// If other parameters (startDate, endDate, months) are used, get top 5 resource
//		// types
//		top5ResourceTypes = azureService.getServiceTopFiveTotalCosts(startDate, endDate, months);
//
//		// Prepare the response map
//		Map<String, Object> response = new LinkedHashMap<>();
//		response.put("billingDetails", billingDetails);
//		response.put("totalCost", totalCost);
//		response.put("monthlyTotalBills", monthlyTotalBills);
//		response.put("billingPeriod", billingPeriod);
//		if (!top5ResourceTypes.isEmpty()) {
//			response.put("top5ResourceTypes", top5ResourceTypes);
//		}
//
//		return ResponseEntity.ok(response);
//	}

	@GetMapping("details")
	public ResponseEntity<Map<String, Object>> getBillingDetails(
			@RequestParam(value = "ResourseType"/* , required = false */) String resourceType,
			@RequestParam /* (required = false) */ String startDate, @RequestParam(required = false) String endDate,
			@RequestParam(defaultValue = "0"/* required = false */) Integer months) {

		if (resourceType == null || resourceType.isEmpty() && startDate == null || startDate.isEmpty() && endDate == null || endDate.isEmpty() && months <= 0) {
			Map<String, Object> emptyBillingDetailsResponse = new LinkedHashMap<>();
			emptyBillingDetailsResponse.put("message", "Enter valid input.");
			return ResponseEntity.badRequest().body(emptyBillingDetailsResponse);
		}

		try {
			// Replace the following placeholders with your actual service calls
			List<Azure> billingDetails = azureService.getBillingDetails(resourceType, startDate, endDate, months);

			System.out.println("Service : " + resourceType);
			System.out.println("Start Date : " + startDate);
			System.out.println("End Date : " + endDate);
			System.out.println("Months : " + months);
			List<Map<String, Double>> monthlyTotalAmounts = azureService.calculateMonthlyTotalBills(billingDetails);

			Double totalAmount = billingDetails.stream().mapToDouble(Azure::getCost).sum();
			List<Map<String, Object>> billingPeriod = azureService.generateBillingPeriod(startDate, endDate, months);

			List<AzureAggregateResult> aggregateResults = azureService.getServiceTopFiveTotalCosts(startDate, endDate, months);
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
