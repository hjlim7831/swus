package com.ssaky.swus.api.domain.user;

import com.ssaky.swus.api.domain.user.User;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Question {

    @Id @GeneratedValue
    @Column(name = "question_id")
    private int id;

    private String content;

    @OneToMany(mappedBy = "question")
    private List<User> users = new ArrayList<>();
}
