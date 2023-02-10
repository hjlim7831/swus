package com.ssaky.swus.common.error.exception.custom;

import com.ssaky.swus.common.error.exception.ErrorCode;
import com.ssaky.swus.common.error.exception.InvalidValueException;

public class UncorrectAnswerException extends InvalidValueException {

    public UncorrectAnswerException(String message) {
        super(message, ErrorCode.UNCORRECT_ANSWER_FOR_PASSWORD);
    }
}
