package com.ssaky.swus.api.response.study;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@ToString
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class DailyWeekdayTimeResp {
    private int weekday;
    private int totalTime;
    private int targetTime;

    public DailyWeekdayTimeResp(int weekday, DailyTimeResp resp) {
        this.weekday = weekday;
        this.totalTime = resp.getTotalTime();
        this.targetTime = resp.getTargetTime();
    }
}
