package com.ssaky.swus.api.request.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class SignUpReq {

    private String email;
    private String password;
    private String nickname;

    private int questionId;
    private String answer;

}
