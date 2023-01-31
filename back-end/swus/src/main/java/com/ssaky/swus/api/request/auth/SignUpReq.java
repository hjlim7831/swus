package com.ssaky.swus.api.request.auth;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SignUpReq {

    private String email;
    private String password;
    private String nickname;

    @JsonProperty("question_id")
    private int questionId;
    private String answer;

    @Builder
    public SignUpReq(String email, String password, String nickname, int questionId, String answer){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.questionId = questionId;
        this.answer = answer;
    }



}
