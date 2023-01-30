package com.ssaky.swus.api.service.member;

import com.ssaky.swus.db.entity.member.Question;

import java.util.List;

public interface QuestionService {

    public List<Question> findAll();
}
