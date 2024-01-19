package com.billingusers.serviceimpl;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.billingusers.dto.UserDto;
import com.billingusers.entity.User;
import com.billingusers.exceptions.ResourceNotFoundException;
import com.billingusers.exceptions.UsernameAlreadyExistsException;
import com.billingusers.jwtservice.JwtService;
import com.billingusers.repository.UserRepository;
import com.billingusers.service.UserService;

@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public UserDto createUser(UserDto userDto) {
	    // Check if the username already exists in the database
	    if (userRepository.existsByUserName(userDto.getUserName())) {
	        throw new UsernameAlreadyExistsException("Username already exists");
	    }

	    // Proceed with user creation if the username doesn't exist
	    User user = modelMapper.map(userDto, User.class);
	    user.setPassword(passwordEncoder.encode(user.getPassword()));
	    user.setId(UUID.randomUUID().toString());
	    user.setActive(true);
	    
	    User savedUser = userRepository.save(user);
	    return modelMapper.map(savedUser, UserDto.class);
	}

	@Override
	public List<UserDto> getAllUsers() {
		List<User> users = userRepository.findAll();
		return users.stream().filter(User::isActive) // Filter only active users
				.map(user -> modelMapper.map(user, UserDto.class)).collect(Collectors.toList());
	}

	@Override
	public UserDto getUserById(String userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist by id " + userId));
		UserDto dtoUser = modelMapper.map(user, UserDto.class);
		return dtoUser;
	}

	@Override
	public UserDto getUserByUsername(String userName) {
		Optional<User> optionalUser = userRepository.findByUserName(userName);
		User user = optionalUser.orElseThrow(() -> new ResourceNotFoundException("User not found by " + userName));
		UserDto dtoUser = modelMapper.map(user, UserDto.class);
		return dtoUser;
	}

	@Override
	public UserDto updateUser(UserDto user) {
		User existingUser = userRepository.findById(user.getId())
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist by id " + user.getId()));
		existingUser.setFirstName(user.getFirstName());
		existingUser.setLastName(user.getLastName());
		existingUser.setEmail(user.getEmail());
		User updatedUser = userRepository.save(existingUser);
		return modelMapper.map(updatedUser, UserDto.class);
	}

	@Override
	public void deleteUser(String userId) {
		UserDto userDto = this.getUserById(userId);
		userDto.setActive(false);
		User user = modelMapper.map(userDto, User.class);
		userRepository.save(user);
	}

	public String generateToken(String username) {
        return jwtService.generateToken(username);
    }

    public void validateToken(String token) {
        jwtService.validateToken(token);
    }

}