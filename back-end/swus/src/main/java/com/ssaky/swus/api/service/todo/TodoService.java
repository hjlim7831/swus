package com.ssaky.swus.api.service.todo;

import com.ssaky.swus.api.request.todo.TodoCreateReq;
import com.ssaky.swus.db.entity.todo.TodoPrivate;
import com.ssaky.swus.db.repository.todo.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


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

}
