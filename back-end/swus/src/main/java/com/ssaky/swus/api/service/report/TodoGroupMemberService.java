package com.ssaky.swus.api.service.report;

import com.ssaky.swus.api.request.report.TodoGroupMemberCreateReq;
import com.ssaky.swus.api.request.report.TodoGroupMemberUpdateReq;
import com.ssaky.swus.api.response.report.TodoGroupMemberGetResp;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.report.TodoGroupMember;
import com.ssaky.swus.db.repository.report.TodoGroupMemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
@Slf4j
public class TodoGroupMemberService {


    private final TodoGroupMemberRepository todoGroupMemberRepository;

    @Transactional
    public int save(TodoGroupMemberCreateReq req, int memberId){
        TodoGroupMember todo = new TodoGroupMember(req, memberId);
        return todoGroupMemberRepository.save(todo);
    }

    public List<TodoGroupMemberGetResp> getList(int memberId, int groupId, int round){
        return todoGroupMemberRepository.findTodoGroupMemberList(memberId, groupId, round);
    }

    @Transactional
    public void update(int num, TodoGroupMemberUpdateReq req){
        Optional<TodoGroupMember> todoGroupMember = todoGroupMemberRepository.findOne(num);
        if (todoGroupMember.isPresent()){
            todoGroupMember.get().update(req);
        } else {
            throw new InvalidValueException("invalid num");
        }
    }

    @Transactional
    public void delete(int num){
        Optional<TodoGroupMember> todoGroupMember = todoGroupMemberRepository.findOne(num);
        if (todoGroupMember.isPresent() ){
            todoGroupMemberRepository.delete(todoGroupMember.get());
        } else{
            throw new InvalidValueException("invalid num");
        }
    }

}
