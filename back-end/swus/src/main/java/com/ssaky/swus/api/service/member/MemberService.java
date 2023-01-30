package com.ssaky.swus.api.service.member;

import com.ssaky.swus.api.controller.auth.SignUpDTO;
import com.ssaky.swus.api.domain.member.Member;

import java.util.Optional;

public interface MemberService {

    public int join(SignUpDTO form);

    public boolean validateDuplicateEmail(String email);

    public Member findOne(int userId);

    public Optional<Member> findOneByEmail(String email);
}
