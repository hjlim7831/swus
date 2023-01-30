package com.ssaky.swus.api.request.auth;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class SignUpDTO {

    private String email;
    private String password;
    private String nickname;

    private int questionId;
    private String answer;

}
