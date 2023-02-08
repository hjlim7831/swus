package com.ssaky.swus.db.entity.group;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDate;

@Getter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseDateEntity {

    @CreatedDate
    private LocalDate createAt;

//    @LastModifiedDate
//    private LocalDate modifiedAt;
}
