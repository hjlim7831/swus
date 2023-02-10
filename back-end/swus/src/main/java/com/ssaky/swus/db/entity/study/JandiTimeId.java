package com.ssaky.swus.db.entity.study;

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
public class JandiTimeId implements Serializable {

    @EqualsAndHashCode.Include
    @Column(name = "study_at")
    private Date studyAt;

    @EqualsAndHashCode.Include
    @Column(name = "member_id")
    private int memberId;

}
