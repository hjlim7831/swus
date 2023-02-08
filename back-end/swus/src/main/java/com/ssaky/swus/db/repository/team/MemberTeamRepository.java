package com.ssaky.swus.db.repository.team;

import com.ssaky.swus.db.entity.team.MemberTeam;
import com.ssaky.swus.db.entity.team.MemberTeamId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberTeamRepository extends JpaRepository<MemberTeam, MemberTeamId> {

    @Transactional
    void delete(MemberTeam memberTeam);

    @Transactional
    void deleteAll();

    List<MemberTeam> findAll();

    @Transactional
    MemberTeam save(MemberTeam memberTeam);

    <T> List<T> findByIdMemberId(int memberId, Class<T> type);

    <T> List<T> findByIdTeamId(int teamId, Class<T> type);

    <T> Optional<T> findByIdMemberIdAndIdTeamId(int memberId, int teamId, Class<T> type);

    <T> Optional<T> findByIdTeamIdAndFirstByOrderByCreateAtAsc(int teamId, Class<T> type);

}
