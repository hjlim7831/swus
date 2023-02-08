package com.ssaky.swus.api.request.group;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
public class UpdateBoardReq {

    @NotBlank(message = "모집글 카테고리를 입력해주세요")
    private String category;

    @NotBlank(message = "모집글 제목을 입력해주세요")
    private String title;
    private String content;

    @NotBlank(message = "모집글 요일을 입력해주세요")
    private String day;

    @NotNull(message = "모집인원을 입력해주세요")
    private Integer boardNumber;

    private LocalDate beginAt;
    private LocalDate endAt;

//    @NotBlank(message = "그룹 시작시간을 입력해주세요")
    private LocalTime startTime;

//    @NotBlank(message = "그룹 종료시간을 입력해주세요")
    private LocalTime finishTime;

    @Builder
    public UpdateBoardReq(String category, String title, String content, String day, Integer boardNumber, LocalDate beginAt, LocalDate endAt, LocalTime startTime, LocalTime finishTime) {
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
