package com.ssaky.swus.db.repository.todo;

import lombok.Getter;

@Getter
public class MemberTodoCount {

    public MemberTodoCount(int memberId, Long todoCount){
        this.memberId = memberId;
        this.todoCount = todoCount.intValue();
    }

    private int memberId;
    private int todoCount;
}
