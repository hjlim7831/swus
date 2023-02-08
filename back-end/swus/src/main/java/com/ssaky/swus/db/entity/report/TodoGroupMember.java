package com.ssaky.swus.db.entity.report;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.api.request.report.TodoGroupMemberCreateReq;
import com.ssaky.swus.api.request.report.TodoGroupMemberUpdateReq;
import com.ssaky.swus.db.entity.group.Team;
import com.ssaky.swus.db.entity.member.Member;
import lombok.Builder;
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
public class TodoGroupMember {

    @Id
    @GeneratedValue
    private int num;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    //레포트 엔티티 생성 후 연관관계 짓기
    private int round; //회차

    //그룹 엔티티 생성 후 주석 풀기
    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "todo_done")
    private String todoDone;

    private String content;


    public TodoGroupMember(TodoGroupMemberCreateReq req, int memberId){

        Team team = Team.builder().teamId(req.getGroupId()).build();
        this.team = team;
        Member member = Member.builder().id(memberId).build();
        this.member = member;

        this.content = req.getContent();
        this.round = req.getRound();
        this.todoDone = "N";
    }

    @Builder
    public TodoGroupMember(int num){
        this.num = num;
    }

    public void update(TodoGroupMemberUpdateReq req){
        this.content = req.getContent();
        this.todoDone = req.getTodoDone();
    }
}
