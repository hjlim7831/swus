package com.ssaky.swus.api.response.group;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BoardGetResp {

    // member table
    private final String nickname;
    private final String email;

    // board table
    private final String title;
    private final String content;
    private final int views;
    private final LocalDate writeAt;
    private final Integer boardNumber;

    // group table
    private final String category;
    private final LocalDate beginAt;
    private final LocalDate endAt;
    private final String day;
    private final LocalTime startTime;
    private final LocalTime finishTime;
    private final int teamNumber;

    @Builder

    public BoardGetResp(String nickname, String email, String title, String content, int views, LocalDate writeAt, Integer boardNumber, String category, LocalDate beginAt, LocalDate endAt, String day, LocalTime startTime, LocalTime finishTime, int teamNumber) {
        this.nickname = nickname;
        this.email = email;
        this.title = title;
        this.content = content;
        this.views = views;
        this.writeAt = writeAt;
        this.boardNumber = boardNumber;
        this.category = category;
        this.beginAt = beginAt;
        this.endAt = endAt;
        this.day = day;
        this.startTime = startTime;
        this.finishTime = finishTime;
        this.teamNumber = teamNumber;
    }
}
