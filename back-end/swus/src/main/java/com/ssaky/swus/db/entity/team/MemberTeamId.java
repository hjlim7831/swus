package com.ssaky.swus.db.entity.team;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberTeamId implements Serializable {

    @EqualsAndHashCode.Include
    @Column(name = "team_id")
    private int teamId;

    @EqualsAndHashCode.Include
    @Column(name = "member_id")
    private int memberId;

}
