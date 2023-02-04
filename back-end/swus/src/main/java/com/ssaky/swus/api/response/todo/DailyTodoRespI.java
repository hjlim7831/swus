package com.ssaky.swus.api.response.todo;

import java.sql.Date;

public interface DailyTodoRespI {

    Date getStudyAt();
    int getTodoDoneCount();
}
