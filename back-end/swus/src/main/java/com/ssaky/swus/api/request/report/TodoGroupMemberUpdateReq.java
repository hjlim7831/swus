package com.ssaky.swus.api.request.report;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;


@Getter
@NoArgsConstructor
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TodoGroupMemberUpdateReq {

    //업데이트할 때는 todo의 PK값이 넘어오기 때문에 필드를 만들 필요 없음

    String content;
    private String todoDone;
    @Builder
    public TodoGroupMemberUpdateReq(String todoDone, String content){
        this.todoDone = todoDone;
        this.content = content;
    }

}
