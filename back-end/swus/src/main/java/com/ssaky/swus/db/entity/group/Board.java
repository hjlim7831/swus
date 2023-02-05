package com.ssaky.swus.db.entity.group;

import com.ssaky.swus.db.entity.member.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;
import java.util.Date;

@Getter
@NoArgsConstructor
@ToString
@Table(name = "board")
@Entity
public class Board extends BaseTimeEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private int boardId;    // 모집글id

    // 연관관계의 주인
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 추후에 연관관계 매핑해줘야함
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private int groupId;

    @Column(nullable = false)
    private String title;

    @Lob
    private String content;

    private int views;      // 조회수

//    @Temporal(TemporalType.DATE)
//    @Column(name = "write_at")
//    private Date writeAt;   // 작성일

    @Column(nullable = false)
    private int number;     // 최종모집인원

    @Builder
    public Board(int memberId, String title, String content, int number) {
        Member member = Member.builder().id(memberId).build();
        this.member = member;
        this.title = title;
        this.content = content;
        this.views = 0;
        this.number = number;
    }
}
