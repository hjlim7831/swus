package com.ssaky.swus.db.entity.member;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -1025078989L;

    public static final QMember member = new QMember("member1");

    public final StringPath answer = createString("answer");

    public final StringPath email = createString("email");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final ListPath<com.ssaky.swus.db.entity.todo.JandiTodo, com.ssaky.swus.db.entity.todo.QJandiTodo> jandiTodos = this.<com.ssaky.swus.db.entity.todo.JandiTodo, com.ssaky.swus.db.entity.todo.QJandiTodo>createList("jandiTodos", com.ssaky.swus.db.entity.todo.JandiTodo.class, com.ssaky.swus.db.entity.todo.QJandiTodo.class, PathInits.DIRECT2);

    public final StringPath nickname = createString("nickname");

    public final StringPath password = createString("password");

    public final NumberPath<Integer> questionId = createNumber("questionId", Integer.class);

    public final ListPath<com.ssaky.swus.db.entity.todo.TodoPrivate, com.ssaky.swus.db.entity.todo.QTodoPrivate> todoPrivates = this.<com.ssaky.swus.db.entity.todo.TodoPrivate, com.ssaky.swus.db.entity.todo.QTodoPrivate>createList("todoPrivates", com.ssaky.swus.db.entity.todo.TodoPrivate.class, com.ssaky.swus.db.entity.todo.QTodoPrivate.class, PathInits.DIRECT2);

    public final StringPath token = createString("token");

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

