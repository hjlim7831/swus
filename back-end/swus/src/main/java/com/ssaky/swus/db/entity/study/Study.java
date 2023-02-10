package com.ssaky.swus.db.entity.study;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.api.request.study.CoreTimeReq;
import com.ssaky.swus.api.request.study.TargetTimeReq;
import com.ssaky.swus.api.request.study.TotalTimeReq;
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
    @Column(name = "member_id")
    private int memberId;

    @OneToOne(fetch = LAZY)
    @MapsId
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    Member member;

    @Column(name = "target_time")
    int targetTime;
    @Column(name = "now_core_time")
    int nowCoreTime;
    @Column(name = "now_total_time")
    int nowTotalTime;

    public Study(Member member){
        this.member = member;
    }

    public void updateTargetTime(TargetTimeReq req){
        this.targetTime = req.getTargetTime();
    }

    public void updateCoreTime(CoreTimeReq req){
        this.nowCoreTime = req.getNowCoreTime();
    }

    public void updateTotalTime(TotalTimeReq req){
        this.nowTotalTime = req.getNowTotalTime();
    }

}
