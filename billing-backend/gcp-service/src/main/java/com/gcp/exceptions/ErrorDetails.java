package com.gcp.exceptions;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class ErrorDetails {
	private LocalDateTime dateTime;
	private String error;
	private String details;
}
