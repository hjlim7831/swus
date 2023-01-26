package com.ssaky.swus.db.repository;

import com.ssaky.swus.db.entity.Board;
import com.ssaky.swus.db.entity.item.Item;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class BoardRepository {
    private final EntityManager em;

    /**
     *  CREATE, UPDATE
     */
    public void save(Board board) {
        if (board.getId() == null) { //게시글의 id가 없으면 (이미 등록된 아이템이라면)
            em.persist(board); //CREATE
        } else { //게시글이 있으면
            em.merge(board); //UPDATE
        }
    }

    /**
     * DELETE
     */
    public void delete(Long id) {
        Board board = em.find(Board.class, id);
        em.remove(board);
    }

    /**
     * READ
     */
    public Board findOne(Long id) {
        return em.find(Board.class, id);
    }

    public List<Board> findAll() {
        return em.createQuery("select b from Board b", Board.class)
                .getResultList();
    }

}
