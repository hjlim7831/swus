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
@ToString
public class TodoGroupId implements Serializable {
    // 복합키에는 Serializable 을 implement 해야 함
    
    // save를 할 때, type이 같으면 그냥 알파벳 순서대로 집어넣는 것 같기도 하다
    // 이부분은 JPA Repository에서 복합키인 객체를 어떻게 저장하는지를 확인해야 할 것 같다

    public TodoGroupId(int round, int teamId) {
        this.round = round;
        this.teamId = teamId;
    }

    @EqualsAndHashCode.Include
    private int round;

    @EqualsAndHashCode.Include
    @Column(name = "team_id")
    private int teamId;


}
