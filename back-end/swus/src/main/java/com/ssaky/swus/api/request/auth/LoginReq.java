package com.ssaky.swus.api.request.auth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
public class LoginReq {

    private String email;
    private String password;

    @Builder
    public LoginReq(String email, String password){
        this.email = email;
        this.password = password;
    }
}
