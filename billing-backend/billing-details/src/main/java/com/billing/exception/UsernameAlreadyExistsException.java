package com.billing.exception;

public class UsernameAlreadyExistsException extends RuntimeException {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public UsernameAlreadyExistsException(String message) {
        super(message);
    }

    // Optionally, you can include additional constructors or custom logic as needed
}

