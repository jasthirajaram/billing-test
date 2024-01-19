package com.billing.entity;


import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "AWS")
public class Aws {

	@Id
	@Field("_id")
	private String id;
	@Field("Service")
	private String service;
	@Field("BlendedCost")
    private double amount;
   
    @Field("StartDate")
    private  String startDate;
    
    @Field("EndDate")
    private String endDate;

}
