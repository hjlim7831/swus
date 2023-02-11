package com.ssaky.swus.api.response.auth;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.db.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class LoginResp {
    private String nickname;
    private String email;
    private String accessToken;

    @Builder
    public LoginResp(Member member, String accessToken){
        this.nickname = member.getNickname();
        this.email = member.getEmail();
        this.accessToken = accessToken;
    }
}
