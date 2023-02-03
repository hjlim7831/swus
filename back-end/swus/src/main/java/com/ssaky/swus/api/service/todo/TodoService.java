package com.ssaky.swus.api.service.todo;

import com.ssaky.swus.api.request.todo.TodoCreateReq;
import com.ssaky.swus.api.request.todo.TodoUpdateReq;
import com.ssaky.swus.api.response.auth.todo.TodoGetResp;
import com.ssaky.swus.common.error.exception.InvalidValueException;
import com.ssaky.swus.db.entity.todo.TodoPrivate;
import com.ssaky.swus.db.repository.todo.TodoRepository;
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
public class TodoService {

    private final TodoRepository todoRepository;

    @Transactional
    public int save(TodoCreateReq req, int memberId){
        TodoPrivate todo = new TodoPrivate(req, memberId);
        return todoRepository.save(todo);
    }

    public List<TodoGetResp> getList(int memberId){
        return todoRepository.findList(memberId);
    }

    @Transactional
    public void update(int num, TodoUpdateReq req, int memberId){
        Optional<TodoPrivate> todoPrivate = todoRepository.findOne(num, memberId);
        if (todoPrivate.isPresent()){
            todoPrivate.get().update(req);
        } else {
            throw new InvalidValueException("invalid num");
        }
    }

    @Transactional
    public void delete(int num, int memberId){
        Optional<TodoPrivate> todoPrivate = todoRepository.findOne(num, memberId);
        if (todoPrivate.isPresent() ){
            todoRepository.delete(todoPrivate.get());
        } else{
            throw new InvalidValueException("invalid num");
        }

    }

}
