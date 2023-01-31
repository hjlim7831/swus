package com.ssaky.swus.api.request.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CheckPwdReq {

    private String email;

    @JsonProperty("question_id")
    private int questionId;

    private String answer;
}
