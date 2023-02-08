package com.ssaky.swus.api.request.team;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamInfoUpdateReq {
    private String teamName;
    private LocalDate beginAt;
    private LocalDate endAt;
    private String day;
    private LocalTime startTime;
    private LocalTime finishTime;

}
