package com.ssaky.swus.db.repository.study;

import com.ssaky.swus.db.entity.study.JandiTime;
import com.ssaky.swus.db.entity.study.JandiTimeId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface JandiStudyRepository extends JpaRepository<JandiTime, JandiTimeId> {

    JandiTime save(JandiTime jandiTime);

    @Modifying
    @Query("UPDATE Study s SET s.nowCoreTime = 0, s.nowTotalTime = 0")
    void initiateCoreAndTotalTime();
}
