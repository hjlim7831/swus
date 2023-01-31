package com.ssaky.swus.db.entity.member;

import com.ssaky.swus.api.request.auth.SignUpReq;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Table(name="user")
@NoArgsConstructor
@ToString
public class Member {

    public Member(SignUpReq form){
        this.email = form.getEmail();
        this.password = form.getPassword();
        this.nickname = form.getNickname();
        this.answer = form.getAnswer();
        Question question = new Question(form.getQuestionId());
        this.question = question;
    }

    public Member(String email, String password, String nickname, int questionId, String answer){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        Question question = new Question(questionId);
        this.question = question;
        this.answer = answer;
    }

    @Id
    @GeneratedValue
    @Column(name = "user_id")
    private int id;

    private String email;
    private String password;
    private String nickname;
    
    // 연관관계 매핑
    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "question_id")
    private Question question; // 연관관계의 주인이 됨

    private String answer;

    private String token;


}
