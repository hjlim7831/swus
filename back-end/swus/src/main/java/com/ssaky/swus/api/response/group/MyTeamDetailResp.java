package com.ssaky.swus.api.response.group;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.db.entity.team.Team;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.Value;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@ToString
@NoArgsConstructor
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class MyTeamDetailResp {

    private String teamName;
    private String category;
    private String teamDone;
    private String leader;
    private String leaderEmail;
    private List<String> memberList;
    private LocalDate beginAt;
    private LocalDate endAt;
    private String day;
    private LocalTime startTime;
    private LocalTime finishTime;
    private int teamNumber;
    private int recruitmentNumber;
    private String teamInfo;

    public void setTeamInfo(Team team) {
        this.teamName = team.getTeamName();
        this.category = team.getCategory();
        this.teamDone = team.getTeamDone();
        this.beginAt = team.getBeginAt();
        this.endAt = team.getEndAt();
        this.day = team.getDay();
        this.startTime = team.getStartTime();
        this.finishTime = team.getFinishTime();
        this.teamNumber = team.getNumber();
        this.teamInfo = team.getTeamInfo();
    }

    public void setLeaderInfo(String leader, String leaderEmail) {
        this.leader = leader;
        this.leaderEmail = leaderEmail;
    }

    public void setMemberList(List<String> memberList) {
        this.memberList = memberList;
    }

    public void updateRecruitmentNumber(int recruitmentNumber) {
        this.recruitmentNumber = recruitmentNumber;
    }

}
