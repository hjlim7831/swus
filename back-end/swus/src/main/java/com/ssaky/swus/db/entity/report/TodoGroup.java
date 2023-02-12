package com.ssaky.swus.db.entity.report;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.api.request.team.TeamTodoUpdateReq;
import lombok.*;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@ToString
@Slf4j
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TodoGroup {

    @Builder
    public TodoGroup(int round, int teamId, String content) {
        TodoGroupId id = TodoGroupId.builder()
                .round(round).teamId(teamId).build();
        this.id = id;
        this.content = content;
    }

    //현재시간 기준으로 해당 회차 완료 처리
    public void done() {
        log.debug("해당 회차를 완료처리하였습니다. "+LocalDate.now());
        this.studyAt = LocalDate.now();
    }

    public void updateContent(TeamTodoUpdateReq req, int round, int teamId) {
        TodoGroupId id = TodoGroupId.builder().teamId(teamId).round(round).build();
        this.content = req.getContent();
        this.id = id;

    }

    @EmbeddedId //복합키 매핑을 위한 어노테이션
    private TodoGroupId id;

    private String content;

    @Column(name = "study_at")
    private LocalDate studyAt;
}
