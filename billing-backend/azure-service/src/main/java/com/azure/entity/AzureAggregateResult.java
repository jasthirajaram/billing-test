package com.azure.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AzureAggregateResult {
	private String ResourceType;
	private double totalCost;
}
