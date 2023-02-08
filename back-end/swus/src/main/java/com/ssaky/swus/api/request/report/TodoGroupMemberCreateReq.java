package com.ssaky.swus.api.request.report;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TodoGroupMemberCreateReq {

    private int groupId;
    private int round;
    private String content;
}
