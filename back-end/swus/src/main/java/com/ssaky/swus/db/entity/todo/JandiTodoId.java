package com.ssaky.swus.db.entity.todo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.sql.Date;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JandiTodoId implements Serializable {
    // 복합키에는 Serializable 을 implement 해야 함

    @EqualsAndHashCode.Include
    @Column(name = "study_at")
    private Date studyAt;

    @EqualsAndHashCode.Include
    @Column(name = "member_id")
    private int memberId;

}
