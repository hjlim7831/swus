package com.ssaky.swus.db.entity.todo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.api.request.todo.TodoCreateReq;
import com.ssaky.swus.api.request.todo.TodoUpdateReq;
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
public class TodoPrivate {


    public TodoPrivate(TodoCreateReq req, int memberId){
        this.content = req.getContent();
        Member member = Member.builder().id(memberId).build();
        this.member = member;
        this.todoDone = "N";
    }

    public void update(TodoUpdateReq req){
        this.content = req.getContent();
        this.todoDone = req.getTodoDone();
    }

    @Builder
    public TodoPrivate(int num){
        this.num = num;
    }

    @Id
    @GeneratedValue
    private int num;

    @Column(name = "todo_done")
    private String todoDone;

    private String content;

    @JsonIgnore
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
