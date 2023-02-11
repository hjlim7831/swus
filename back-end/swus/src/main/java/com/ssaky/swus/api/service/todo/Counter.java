package com.ssaky.swus.api.service.todo;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.concurrent.atomic.AtomicInteger;

// Scheduler가 돌아가는지 확인하기 위한 테스트 Component
// @Scheduled 주석을 풀고 테스트 코드를 돌리면 됨
@Component
public class Counter {
    private AtomicInteger count = new AtomicInteger(0);

//    @Scheduled(fixedDelay = 5)
    public void scheduled(){
        this.count.incrementAndGet();
    }

    public int getInvocationCount(){
        return this.count.get();
    }
}
