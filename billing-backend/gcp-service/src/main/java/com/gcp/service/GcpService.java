package com.gcp.service;


import java.util.List;
import java.util.Map;

import com.gcp.entity.Gcp;
import com.gcp.entity.GcpAggregateResult;

public interface GcpService {

	
	// getting all data
	public List<Gcp> getAllData();
	
	// getting the unique serviceDescription
	public List<String> getDistinctServiceDescriptions();
	
	
	//getting all data between dates 
	public List<Gcp> getAllDataBydateRange(String startDate, String endDate);
	
	
	// getting all data based on months
	public List<Gcp> getAllDataByMonths(int months);
	
	
	//getting the data by servicedesc and daterange
	public List<Gcp> getDataByServiceDescAndDateRange(String service, String startDate, String endDate);
	
	// getting the data by servicedesc and months
	public List<Gcp> getDataByServiceDescAndMonths(String serviceDesc, int months);
	
	//getting the top 5 servicedesc
//	public List<Map<String, Object>> getTop5ServiceDescriptions(List<Gcp> billingDetails);
	
	
	//main method
	public List<Gcp> getBillingDetails(String serviceDescription, String startDate, String endDate , Integer months);

	//getting totalcostMonthly
	//public Map<String, Double> calculateMonthlyTotalBills(List<Gcp> billingDetails);
	
	List<Map<String, Double>> calculateMonthlyTotalBills(List<Gcp> billingDetails);

	public List<Map<String, Object>> generateBillingPeriod(String startDate, String endDate, Integer months);
	
	public List<Gcp> getBillingDetailsUsingRangeAndDate(String startDate, String endDate, Integer months);
	
	public List<GcpAggregateResult> getServiceTopFiveTotalCosts(String startDate, String endDate, Integer months);
		
	//public List<Map<String, Object>> getMonthlyTotalAmounts(String serviceDesc, String startDate, String endDate,
	                                                      //  Integer months);
}
