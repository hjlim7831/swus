package com.ssaky.swus.db.entity.study;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.db.entity.member.Member;
import lombok.*;

import javax.persistence.*;

import java.sql.Date;

import static javax.persistence.FetchType.LAZY;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity
@Getter
@NoArgsConstructor
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class JandiTime {

    @EqualsAndHashCode.Include
    @EmbeddedId
    private JandiTimeId id;

    @MapsId("memberId") // 이렇게만 지정해 주면 PK가 됨
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    public Member member;

    @Column(name = "target_time")
    private int targetTime;

    @Column(name = "total_time")
    private int totalTime;

    @Builder
    public JandiTime(Date studyAt, Study study) {
        JandiTimeId id = JandiTimeId.builder()
                .memberId(study.getMemberId())
                .studyAt(studyAt).build();
        this.id = id;
        Member member = Member.builder().id(study.getMemberId()).build();
        this.member = member;
        this.targetTime = study.getTargetTime();
        this.totalTime = study.getNowTotalTime();
    }
}
