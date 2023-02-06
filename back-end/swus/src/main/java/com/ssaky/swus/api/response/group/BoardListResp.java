package com.ssaky.swus.api.response.group;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@ToString
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BoardListResp {

    private int board_id;
    private String title;
//    private String category;
//    private String recruitmentDone;
    private LocalDate writeAt;
    private int views;

    @Builder
    public BoardListResp(int board_id, String title, LocalDate writeAt, int views) {
        this.board_id = board_id;
        this.title = title;
        this.writeAt = writeAt;
        this.views = views;
    }
}
