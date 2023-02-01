package com.ssaky.swus.db.entity.Room;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QGroupRoom is a Querydsl query type for GroupRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QGroupRoom extends EntityPathBase<GroupRoom> {

    private static final long serialVersionUID = -462808414L;

    public static final QGroupRoom groupRoom = new QGroupRoom("groupRoom");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath type = createString("type");

    public QGroupRoom(String variable) {
        super(GroupRoom.class, forVariable(variable));
    }

    public QGroupRoom(Path<? extends GroupRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QGroupRoom(PathMetadata metadata) {
        super(GroupRoom.class, metadata);
    }

}

