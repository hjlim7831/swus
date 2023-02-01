package com.ssaky.swus.api.service.group;

import com.ssaky.swus.db.repository.group.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardRepository boardRepository;

}
