package com.ssaky.swus.api.domain.member;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
@NoArgsConstructor
public class Question {

    public Question(int id){
        this.id = id;
    }

    @Id @GeneratedValue
    @Column(name = "question_id")
    private int id;

    private String content;

    @OneToMany(mappedBy = "question", fetch=FetchType.LAZY)
    private List<Member> members = new ArrayList<>();
}
