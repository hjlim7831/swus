package com.ssaky.swus.db.entity.member;

import com.ssaky.swus.api.request.auth.SignUpReq;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor
@ToString
public class Member {

    public Member(SignUpReq form){
        this.email = form.getEmail();
        this.password = form.getPassword();
        this.nickname = form.getNickname();
        this.answer = form.getAnswer();
        this.questionId = form.getQuestionId();

    }

    public Member(String email, String password, String nickname, int questionId, String answer){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.questionId = questionId;
        this.answer = answer;
    }

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private int id;

    private String email;
    private String password;
    private String nickname;
    
    @Column(name = "question_id")
    private int questionId;

    private String answer;

    private String token;


}
