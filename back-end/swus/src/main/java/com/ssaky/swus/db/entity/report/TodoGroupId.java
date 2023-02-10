package com.ssaky.swus.db.entity.report;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

//회차별 투두의 복합키가 되는 클래스
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Embeddable
@Getter
@NoArgsConstructor
@Builder
public class TodoGroupId implements Serializable {
    // 복합키에는 Serializable 을 implement 해야 함

    public TodoGroupId(int teamId, int round) {
        this.teamId = teamId;
        this.round = round;
    }

    @EqualsAndHashCode.Include
    private int round;

    @EqualsAndHashCode.Include
    @Column(name = "team_id")
    private int teamId;


}
