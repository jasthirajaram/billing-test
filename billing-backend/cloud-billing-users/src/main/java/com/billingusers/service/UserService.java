package com.billingusers.service;

import java.util.List;

import com.billingusers.dto.UserDto;

public interface UserService {

	public UserDto createUser(UserDto user);

	public UserDto getUserById(String userId);

	public UserDto getUserByUsername(String userName);

	public List<UserDto> getAllUsers();

	public UserDto updateUser(UserDto user);

	public void deleteUser(String userId);
	
	public void validateToken(String token);
	
	public String generateToken(String username);

}