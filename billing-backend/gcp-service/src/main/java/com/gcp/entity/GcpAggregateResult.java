package com.gcp.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GcpAggregateResult {
	private String serviceDescription;
	private double totalCost;
}
