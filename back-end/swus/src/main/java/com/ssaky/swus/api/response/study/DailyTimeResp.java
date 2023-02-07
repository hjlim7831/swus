package com.ssaky.swus.api.response.study;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Value;

import java.util.Date;

@Value
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class DailyTimeResp {
    private Date idStudyAt;
    private int totalTime;
}
