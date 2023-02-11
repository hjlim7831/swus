package com.ssaky.swus.common.utils;

import lombok.extern.log4j.Log4j2;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

@Log4j2
public class DateUtils {

    /**
     * 어제 날짜 가져오기 (새벽 6시 기준으로 입력하므로)
     * @return java.sql.Date
     */
    public static Date getYesterday() {
        Calendar calendar = Calendar.getInstance(TimeZone.getTimeZone("Asia/Seoul"), Locale.KOREA);
        final SimpleDateFormat SDF = new SimpleDateFormat("yyyy-MM-dd");
        log.debug("Today: " + SDF.format(calendar.getTime()));

        calendar.add(Calendar.DATE, -1);

        String yesterdayStr = SDF.format(calendar.getTime());
        log.debug("Yesterday: " + yesterdayStr);

        return Date.valueOf(yesterdayStr);
    }
}
