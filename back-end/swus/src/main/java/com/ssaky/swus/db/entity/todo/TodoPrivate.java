package com.ssaky.swus.db.entity.todo;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.ssaky.swus.api.request.todo.TodoCreateReq;
import com.ssaky.swus.db.entity.member.Member;
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

    public TodoPrivate(TodoCreateReq req){
        this.content = req.getContent();
    }

    @Id
    @GeneratedValue
    private int num;

    @Column(name = "todo_done")
    private String todoDone;

    private String content;

    @ManyToOne(fetch= LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

}
