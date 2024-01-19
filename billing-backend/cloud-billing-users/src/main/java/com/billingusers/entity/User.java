package com.billingusers.entity;

import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users-billing")
public class User {
	@Id
	private String id;

	@NotBlank
	private String firstName;

	@NotBlank
	private String lastName;

	@NotBlank
    @Indexed(unique = true)
	private String userName;

	@NotBlank
	@Indexed(unique = true)
	private String email;

	@NotBlank
	private String password;
	
	private boolean isActive;
}
