package com.ssaky.swus.api.controller.auth;

import lombok.Getter;

@Getter
public class SignUpDTO {

    private String email;
    private String password;
    private String nickname;

    private int questionId;
    private String answer;

}
