package com.ssaky.swus.api.request.auth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
public class CheckPwdReq {

    private String email;

    private int questionId;

    private String answer;

    @Builder
    public CheckPwdReq(String email, int questionId, String answer){
        this.email = email;
        this.questionId = questionId;
        this.answer = answer;
    }
}
