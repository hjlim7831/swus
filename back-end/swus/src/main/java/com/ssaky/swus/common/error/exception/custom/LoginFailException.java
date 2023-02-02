package com.ssaky.swus.common.error.exception.custom;

import com.ssaky.swus.common.error.exception.EntityNotFoundException;

public class LoginFailException extends EntityNotFoundException {
    public LoginFailException(String email) {
        super(email + " user not found");
    }
}
