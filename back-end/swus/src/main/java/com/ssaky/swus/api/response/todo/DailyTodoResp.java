package com.ssaky.swus.api.response.todo;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Value;

import java.util.Date;

@Value
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class DailyTodoResp {
    private Date idStudyAt;
    private int todoDoneCount;
}
