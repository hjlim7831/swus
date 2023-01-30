package com.ssaky.swus.api.request.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class LoginReq {

    private String email;
    private String password;
}
