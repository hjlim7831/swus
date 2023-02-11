package com.ssaky.swus.common.error.exception.custom;

import com.ssaky.swus.common.error.exception.BusinessException;
import com.ssaky.swus.common.error.exception.ErrorCode;

//공용 열람실의 인원 제한을 넘어가는 사용자가 접속했을 경우 발생되는 예외
public class OverCapacityException extends BusinessException {

    public OverCapacityException(int limit, int count) {
        super("Limit is "+limit+" but " + count, ErrorCode.ROOM_IS_FULL);
    }
}
