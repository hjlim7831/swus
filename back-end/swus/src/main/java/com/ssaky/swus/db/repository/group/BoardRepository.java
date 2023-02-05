package com.ssaky.swus.db.repository.group;

import com.ssaky.swus.db.entity.group.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Integer> {

}
