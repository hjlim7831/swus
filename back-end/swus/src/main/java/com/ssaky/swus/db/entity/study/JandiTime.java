package com.ssaky.swus.db.entity.study;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.db.entity.member.Member;
import lombok.*;

import javax.persistence.*;

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

    @Column(name = "core_time")
    private int coreTime;

    @Column(name = "total_time")
    private int totalTime;

    @Builder
    public JandiTime(JandiTimeId id, int coreTime, int totalTime) {
        this.id = id;
        this.coreTime = coreTime;
        this.totalTime = totalTime;
    }
}
