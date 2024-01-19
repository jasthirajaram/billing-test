package com.azure.entity;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "Azure")
public class Azure {

	@Id
	@Field("_id")
	private String id;

	@Field("ResourceType")
	private String resourceType;

	@Field("CostUSD")
	private double costUSD;

	@Field("Cost")
	private double cost;

	@Field("Currency")
	private String currency;

	@Field("UsageDate")
	private Date usageDate;
}
