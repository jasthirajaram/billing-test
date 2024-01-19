package com.billingusers.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
	private String id;
    private  String firstName;
    private String lastName;
    private String userName;
    private String email;
    private String password;
    private boolean isActive;
}
