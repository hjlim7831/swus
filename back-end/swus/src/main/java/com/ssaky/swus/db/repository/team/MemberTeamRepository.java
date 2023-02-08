package com.ssaky.swus.db.repository.team;

import com.ssaky.swus.db.entity.team.MemberTeam;
import com.ssaky.swus.db.entity.team.MemberTeamId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberTeamRepository extends JpaRepository<MemberTeam, MemberTeamId> {

    void delete(MemberTeam memberTeam);

    MemberTeam save(MemberTeam memberTeam);

    <T> List<T> findByIdMemberId(int memberId, Class<T> type);

}
