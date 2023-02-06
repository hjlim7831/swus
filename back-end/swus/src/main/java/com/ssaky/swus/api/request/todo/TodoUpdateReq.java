package com.ssaky.swus.api.request.todo;

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
public class TodoUpdateReq {

    @Builder
    public TodoUpdateReq(String todoDone, String content){
        this.todoDone = todoDone;
        this.content = content;
    }

    private String todoDone;
    String content;
}
