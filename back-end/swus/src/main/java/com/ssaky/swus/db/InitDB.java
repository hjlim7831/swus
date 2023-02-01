package com.ssaky.swus.db;

import com.ssaky.swus.db.entity.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Component
@RequiredArgsConstructor
public class InitDB {

    private final InitService initService;

    @PostConstruct
    public void init(){
//        initService.dbInitQuestion();
//        initService.dbInitMember();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService{

        private final EntityManager em;

        public void dbInitMember(){
            System.out.println("Init" + this.getClass());

            Member member1 = new Member("hjlim7831@gmail.com", "ssafy", "이매", 1, "보리");
            em.persist(member1);

        }
    }
}
