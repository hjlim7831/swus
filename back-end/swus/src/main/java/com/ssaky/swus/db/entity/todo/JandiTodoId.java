package com.ssaky.swus.db.entity.todo;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.sql.Date;

@Embeddable
public class JandiTodoId implements Serializable {
    private Date studyAt;
    private int memberId;
}
