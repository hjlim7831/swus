package com.ssaky.swus.db.entity.team;

import com.ssaky.swus.api.request.team.UpdateBoardReq;
import com.ssaky.swus.db.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "board")
@Entity
public class Board extends BaseDateEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private int boardId;    // 모집글id

    // 연관관계의 주인 (FK)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 연관관계의 주인 (FK)
    @OneToOne
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(nullable = false)
    private String title;

    @Lob
    private String content;

    private int views;      // 조회수

    @Column(nullable = false)
    private int number;     // 최종모집인원

    @Builder
    public Board(int memberId, int teamId, String title, String content, int number) {
        Member member = Member.builder().id(memberId).build();
        this.member = member;
        Team team = Team.builder().teamId(teamId).build();
        this.team = team;
        this.title = title;
        this.content = content;
        this.views = 0;
        this.number = number;
    }

    public void update(UpdateBoardReq updaterBoardReq) {
        this.title = updaterBoardReq.getTitle();
        this.content = updaterBoardReq.getContent();
        this.number = updaterBoardReq.getBoardNumber();
    }

    public void updateView(int views) {
        this.views = views + 1;
    }
}
