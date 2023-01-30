package com.ssaky.swus.api.domain.member;

import lombok.Getter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@ToString
public class Question {

    @Id @GeneratedValue
    @Column(name = "question_id")
    private int id;

    private String content;

    @OneToMany(mappedBy = "question", fetch=FetchType.LAZY)
    private List<Member> members = new ArrayList<>();
}
