package com.ssaky.swus.api.service.member;

import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

import javax.mail.internet.MimeMessage;

public class EmailExample {

    MimeMessagePreparator preparator = new MimeMessagePreparator() {

        @Override
        public void prepare(MimeMessage mimeMessage) throws Exception {
            final MimeMessageHelper message = new MimeMessageHelper(mimeMessage,true,"UTF-8");

            message.setTo(email);                // 수신자 설정
            message.setFrom(sendFrom);            // env.getProperty("spring.mail.username")
            message.setSubject("[Zipper] 비밀번호 메일드립니다.");        // 메일 제목
            message.setText(mailContent, true); //ture : html 형식 사용

            //Mail에 img 삽입
//                File file = new ClassPathResource("static/img/website1.png").getFile();
//                FileSystemResource fsr = new FileSystemResource(file);
//                message.addInline("img", fsr);

//            ClassPathResource resource = new ClassPathResource("static/img/website1.png");
//            message.addInline("img", resource.getFile());

        }
    };

        javaMailSender.send(preparator);
}
}
