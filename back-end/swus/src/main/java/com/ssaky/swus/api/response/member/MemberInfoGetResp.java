package com.ssaky.swus.api.response.member;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Value
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class MemberInfoGetResp {
    private String email;
    private String nickname;

}
