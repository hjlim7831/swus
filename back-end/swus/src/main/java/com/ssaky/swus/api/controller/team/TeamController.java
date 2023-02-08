package com.ssaky.swus.api.controller.team;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("my-groups")
public class TeamController {

    // [3] 그룹 종료 전환 my-groups/{team_id}/done

    // [4] 그룹명 조회 my-groups/{team_id}/name

}
