package com.ssaky.swus.api.service.member;

import com.ssaky.swus.api.request.auth.LoginReq;
import com.ssaky.swus.api.request.auth.SignUpReq;
import com.ssaky.swus.db.entity.member.Member;

import java.util.Optional;

public interface MemberService {

    public int join(SignUpReq form);

    public boolean validateDuplicateEmail(String email);

    public Member findOne(int userId);

    public Optional<Member> findOneByEmail(String email);

    public Optional<Member> login(LoginReq form);
}
