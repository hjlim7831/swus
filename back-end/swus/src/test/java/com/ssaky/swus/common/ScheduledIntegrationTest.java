package com.ssaky.swus.common;

import com.ssaky.swus.api.service.todo.Counter;
import com.ssaky.swus.config.ScheduledConfig;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@SpringJUnitConfig(ScheduledConfig.class)
public class ScheduledIntegrationTest {

    @Autowired
    Counter counter;

    @Test
    public void givenSleepBy100ms() throws InterruptedException{
        Thread.sleep(100L);

        assertThat(counter.getInvocationCount()).isGreaterThan(0);

    }


}
