package com.ssaky.swus.db.entity.member;

import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.db.entity.group.Board;
import com.ssaky.swus.db.entity.todo.JandiTodo;
import com.ssaky.swus.db.entity.todo.TodoPrivate;
import lombok.*;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.List;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
@ToString
public class Member {

    @Builder
    public Member(int id) {
        this.id = id;
    }

    public Member(SignUpReq form){
        this.email = form.getEmail();
        this.password = form.getPassword();
        this.nickname = form.getNickname();
        this.answer = form.getAnswer();
        this.questionId = form.getQuestionId();
    }

    @Builder
    public Member(String email, int id){
        this.email = email;
        this.id = id;
    }

    @Builder
    public Member(String email, String password, String nickname){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    @Builder
    public Member(String email, String password, String nickname, int questionId, String answer){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.questionId = questionId;
        this.answer = answer;
    }

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private int id;

    private String email;
    private String password;
    private String nickname;
    
    @Column(name = "question_id")
    private int questionId;

    private String answer;

    private String token;

    @OneToMany(mappedBy = "member", fetch= LAZY)
    private List<Board> boards = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch=LAZY)
    private List<TodoPrivate> todoPrivates = new ArrayList<>();

    @OneToMany(mappedBy = "member", fetch=LAZY)
    private List<JandiTodo> jandiTodos = new ArrayList<>();

}
