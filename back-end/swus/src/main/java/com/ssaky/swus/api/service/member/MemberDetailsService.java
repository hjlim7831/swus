package com.ssaky.swus.api.service.member;

import com.ssaky.swus.db.entity.member.Member;
import com.ssaky.swus.db.entity.member.MemberDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberDetailsService implements UserDetailsService {

    @Autowired
    MemberService memberService;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        Optional<Member> member = memberService.findOneByEmail(email);

        if (member.isPresent()){
            return new MemberDetails(member.get());
        }else {
            throw new UsernameNotFoundException(email);
        }
    }
}
