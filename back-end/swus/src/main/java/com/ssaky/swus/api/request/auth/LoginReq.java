package com.ssaky.swus.api.request.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class LoginReq {

    private String email;
    private String password;

    @Builder
    public LoginReq(String email, String password){
        this.email = email;
        this.password = password;
    }
}
