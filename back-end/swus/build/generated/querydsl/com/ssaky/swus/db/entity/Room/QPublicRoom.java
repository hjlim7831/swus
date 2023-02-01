package com.ssaky.swus.db.entity.Room;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QPublicRoom is a Querydsl query type for PublicRoom
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPublicRoom extends EntityPathBase<PublicRoom> {

    private static final long serialVersionUID = -828073668L;

    public static final QPublicRoom publicRoom = new QPublicRoom("publicRoom");

    public final NumberPath<Integer> count = createNumber("count", Integer.class);

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath session_name = createString("session_name");

    public final StringPath type = createString("type");

    public QPublicRoom(String variable) {
        super(PublicRoom.class, forVariable(variable));
    }

    public QPublicRoom(Path<? extends PublicRoom> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPublicRoom(PathMetadata metadata) {
        super(PublicRoom.class, metadata);
    }

}

