package com.ssaky.swus.db.entity.team;

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
@ToString(exclude = {"member", "team"})
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class MemberTeam extends BaseDateEntity {

    @EqualsAndHashCode.Include
    @EmbeddedId
    private MemberTeamId id;

    @MapsId("memberId") // 이렇게만 지정해 주면 PK가 됨
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    public Member member;

    @MapsId("teamId") // 이렇게만 지정해 주면 PK가 됨
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "team_id")
    public Team team;

    private String isLeader;

    @Builder
    public MemberTeam(int memberId, int teamId) {
        MemberTeamId id = MemberTeamId.builder()
                .memberId(memberId).teamId(teamId).build();
        this.id = id;
        Member member = Member.builder().id(memberId).build();
        this.member = member;
        Team team = Team.builder().teamId(teamId).build();
        this.team = team;
        this.isLeader = "N";
    }

    public void setLeader() {
        this.isLeader = "Y";
    }

}
