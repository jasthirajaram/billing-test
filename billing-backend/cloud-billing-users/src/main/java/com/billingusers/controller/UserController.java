package com.billingusers.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.billingusers.dto.UserDto;
import com.billingusers.entity.LoginRequest;
import com.billingusers.exceptions.UsernameAlreadyExistsException;
import com.billingusers.service.UserService;

@RestController
@RequestMapping("/auth")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationManager authenticationManager;

	@PostMapping("/register")
	public ResponseEntity<?> createUser(@RequestBody UserDto user) {
		try {
			// Attempt to create a user
			UserDto savedUser = userService.createUser(user);
			return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
		} catch (UsernameAlreadyExistsException e) {
			// Username already exists - handle this exception
			return new ResponseEntity<>("Username already exists", HttpStatus.CONFLICT);
		} catch (Exception e) {
			// Other unexpected exceptions
			return new ResponseEntity<>("Failed to create user", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/getallusers")
	public ResponseEntity<List<UserDto>> getAllUsers() {
		List<UserDto> users = userService.getAllUsers();
		return new ResponseEntity<>(users, HttpStatus.OK);
	}

	@GetMapping("/getuserbyid/{id}")
	public ResponseEntity<UserDto> getUserById(@PathVariable("id") String userId) {
		UserDto user = userService.getUserById(userId);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping("/getuserbyname/{username}")
	public ResponseEntity<UserDto> getUserByUsername(@PathVariable("username") String userName) {
		UserDto user = userService.getUserByUsername(userName);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@PutMapping("/updateuser/{id}")
	public ResponseEntity<UserDto> updateUser(@PathVariable("id") String userId, @RequestBody UserDto user) {
		user.setId(userId);
		UserDto updatedUser = userService.updateUser(user);
		return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}

	@DeleteMapping("/deleteuser/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable("id") String userId) {
		userService.deleteUser(userId);
		return new ResponseEntity<>("User successfully deleted", HttpStatus.OK);
	}

	@PostMapping("/token")
	public String getToken(@RequestBody LoginRequest loginRequest) {
		Authentication authenticate = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));
		if (authenticate.isAuthenticated()) {
			String res = userService.generateToken(loginRequest.getUserName());
			String result = "{\"token\":\"" + res + "\"}";
			return result;
			//return userService.generateToken(loginRequest.getUserName());
		} else {
			throw new RuntimeException("invalid access");
		}
	}

	@GetMapping("/validate")
	public String validateToken(@RequestParam("token") String token) {
		userService.validateToken(token);
		return "Token is valid";
	}

//	@PostMapping("/authenticate")
//	public String authenticateAndGetToken(@RequestBody LoginRequest loginRequest) {
//		Authentication authentication = authenticationManager.authenticate(
//				new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));
//		if (authentication.isAuthenticated()) {
//			String res = jwtService.generateToken(loginRequest.getUserName());
//			String result = "{\"token\":\"" + res + "\"}";
//			return result;
//		} else {
//			throw new UsernameNotFoundException("Invalid username or password");
//		}
//	}
}
