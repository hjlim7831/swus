package com.ssaky.swus.api.request.team;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
public class WriteBoardReq {

    private String category;
    private String title;
    private String content;
    private String day;
    private int boardNumber;
    private LocalDate beginAt;
    private LocalDate endAt;
    private LocalTime startTime;
    private LocalTime finishTime;

    @Builder
    public WriteBoardReq(String category, String title, String content, String day, Integer boardNumber, LocalDate beginAt, LocalDate endAt, LocalTime startTime, LocalTime finishTime) {
        this.category = category;
        this.title = title;
        this.content = content;
        this.day = day;
        this.boardNumber = boardNumber;
        this.beginAt = beginAt;
        this.endAt = endAt;
        this.startTime = startTime;
        this.finishTime = finishTime;
    }
}
