package com.gcp.entity;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "GCP")
public class Gcp {
	
	
	@Id
	@Field("_id")
	private String id;
	
	@Field("Service ID")
	private String serviceId;
	
	@Field("Date")
	private Date date;
	
	@Field("Service description")
	private String serviceDescription;
	
	@Field("Cost ($)")
	private double cost;

}
