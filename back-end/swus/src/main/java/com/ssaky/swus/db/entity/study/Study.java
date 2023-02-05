package com.ssaky.swus.db.entity.study;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.db.entity.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
@ToString
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class Study {

    @Id
    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    Member member;

    @Column(name = "target_time")
    int targetTime;
    @Column(name = "now_core_time")
    int nowCoreTime;
    @Column(name = "now_total_time")
    int nowTotalTime;
}
