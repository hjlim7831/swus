package com.ssaky.swus.api.response.report;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

//해당 회차에 todo리스트 정보가 있는 유저들을 담기위한 데이터 모음
@Getter
@Setter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@AllArgsConstructor
public class MemberGetResp {
    private String nickname;
    private List<TodoGroupMemberGetResp> members;


}
