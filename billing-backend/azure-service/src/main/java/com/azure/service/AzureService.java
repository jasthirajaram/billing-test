package com.azure.service;

import java.util.List;
import java.util.Map;

import com.azure.entity.Azure;
import com.azure.entity.AzureAggregateResult;

public interface AzureService {

	// getting all data from months
	public List<Azure> getAllDataByMonths(int months);

	public Long getCountOfData();

	// to get all the data
	public List<Azure> getAll();

	// getting the unique Resource Type
	public List<String> getDistinctResourceType();

	// getting all data between dates
	public List<Azure> getAllDataBydateRange(String startDate, String endDate);

	// getting the data by resourseType and daterange
	public List<Azure> getDataByResourseTypeAndDateRange(String resourseType, String startDate, String endDate);

	// getting the data by resourseType and months
	public List<Azure> getDataByResourseTypeAndMonths(String resourseType, int months);

	// getting the top 5 resourseType
//	public List<Map<String, Object>> getTop5ResourseType(List<Azure> billingDetails);

	// main method
	public List<Azure> getBillingDetails(String resourseType, String startDate, String endDate, Integer months);

	// getting totalcostMonthly
	public List<Map<String, Double>> calculateMonthlyTotalBills(List<Azure> billingDetails);

	public List<Map<String, Object>> generateBillingPeriod(String startDate, String endDate, Integer months);

	public List<Azure> getBillingDetailsUsingRangeAndDate(String startDate, String endDate, Integer months);

	public List<AzureAggregateResult> getServiceTopFiveTotalCosts(String startDate, String endDate, Integer months);

}
