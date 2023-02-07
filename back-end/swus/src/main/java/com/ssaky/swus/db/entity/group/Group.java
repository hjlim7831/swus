package com.ssaky.swus.db.entity.group;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@NoArgsConstructor
@Entity
public class Group extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupId;            // 그룹id

    private String groupName;       // 그룹명

    @Lob
    private String groupInfo;       // 그룹설명

    private String category;        // 카테고리

    private LocalDate beginAt;      // 시작날짜

    private LocalDate endAt;        // 종료날짜

    private String day;             // 요일

    private LocalTime startTime;    // 시작시간

    private LocalDate finishTime;   // 종료시간

    private int number;             // 현그룹인원(유동)

    private String group_done;      // 그룹 스터디완료여부

}
