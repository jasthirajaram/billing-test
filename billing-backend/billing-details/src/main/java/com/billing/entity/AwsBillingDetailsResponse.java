package com.billing.entity;
import java.util.List;
import java.util.Map;

public class AwsBillingDetailsResponse {
    private Map<String, List<Map<String, Double>>> monthlyTotalAmounts;
    private Double totalAmount;
    private List<Aws> billingDetails;

    public AwsBillingDetailsResponse(Map<String, List<Map<String, Double>>> monthlyTotalAmounts, Double totalAmount, List<Aws> billingDetails) {
        this.monthlyTotalAmounts = monthlyTotalAmounts;
        this.totalAmount = totalAmount;
        this.billingDetails = billingDetails;
    }

    public Map<String, List<Map<String, Double>>> getMonthlyTotalAmounts() {
        return monthlyTotalAmounts;
    }

    public void setMonthlyTotalAmounts(Map<String, List<Map<String, Double>>> monthlyTotalAmounts) {
        this.monthlyTotalAmounts = monthlyTotalAmounts;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<Aws> getBillingDetails() {
        return billingDetails;
    }

    public void setBillingDetails(List<Aws> billingDetails) {
        this.billingDetails = billingDetails;
    }
}
