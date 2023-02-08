package com.ssaky.swus.api.response.group;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.db.entity.group.Board;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BoardGetResp {

    // board table
    private final String title;
    private final String content;
    private final int views;
    private final LocalDate writeAt;
    private final Integer boardNumber;

    // group table
//    private final String category;
//    private final int groupNumber;
//    private final LocalDate beginAt;
//    private final LocalDate endAt;
//    private final LocalTime startTime;
//    private final LocalTime finishTime;

    public BoardGetResp(Board board) {
        this.title = board.getTitle();
        this.content = board.getContent();
        this.views = board.getViews();
        this.writeAt = board.getCreateAt();
        this.boardNumber = board.getNumber();
    }

    @Builder
    public BoardGetResp(String title, String content, int views, LocalDate writeAt, int boardNumber) {
        this.title = title;
        this.content = content;
        this.views = views;
        this.writeAt = writeAt;
        this.boardNumber = boardNumber;
    }
}
