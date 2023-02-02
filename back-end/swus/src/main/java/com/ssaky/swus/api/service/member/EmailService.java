package com.ssaky.swus.api.service.member;

import com.ssaky.swus.db.entity.member.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    @Value("${spring.mail.username}")
    String sendFrom;

    @Autowired
    Environment env;

    public boolean sendEmail(Member member){

        String sendTo = member.getEmail();
        String mailTitle = "[SWUS] 비밀번호 찾기 메일";

        MimeMessagePreparator preparator = new MimeMessagePreparator() {

            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                final MimeMessageHelper message = new MimeMessageHelper(mimeMessage,true,"UTF-8");

                message.setTo(sendTo);
                message.setFrom(sendFrom);	//env.getProperty("spring.mail.username")
                message.setSubject(mailTitle);
                message.setText(mailContent(member), true); //ture : html 형식 사용

                // Mail에 이미지 삽입
                message.addInline("swus", new ClassPathResource("static/img/swus.png"));

            }
        };

        try{
            emailSender.send(preparator);
        } catch (MailException e){
            return false;
        }
        return true;
    }

    public String mailContent(Member member){

        StringBuilder sb = new StringBuilder();
        sb.append("<head>");
        sb.append("<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n");
        sb.append("<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n");
        sb.append("<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@500&display=swap\" rel=\"stylesheet\">\n");
        sb.append("<style>\n");
        sb.append("#banner{background-color: #1A1E33;text-align:center;}\n");
        sb.append("legend{background-color:gray;color:white;");
        sb.append("padding: 5px 10px;border-radius:0.5em;}\n");
        sb.append("</style>\n</head>");
        sb.append("<body style=\"font-family: 'Inter', sans-serif\">\n");
        sb.append("<div id=\"banner\">\n");
        sb.append("<img src=\"cid:swus\" width=\"150\"> </div><br>");
        sb.append("<div>안녕하세요.");
        sb.append("<span style=\"font-weight:bold\">Study With Us</span>입니다.<br>");
        sb.append("요청하신 계정 정보는 다음과 같습니다.<br>");
        sb.append("</div><br>");
        sb.append("<div>\n <fieldset style=\"background-color: #EEEEEE\">");
        sb.append("<legend>계정정보</legend>");
        sb.append("<div style=\"line-height: 2em\">");
        sb.append("닉네임 : ").append(member.getNickname()).append("<br>");
        sb.append("비밀번호 : ").append(pwdEncrypt(member.getPassword())).append("<br>");
        sb.append("</div></fieldset></div></body>");

        return sb.toString();
    }

    public String pwdEncrypt(String password){
        int pwdLength = password.length();
        String pwdPre = password.substring(0, 2);
        StringBuilder pwdEncrypt = new StringBuilder();
        pwdEncrypt.append(pwdPre);
        for(int i = 0; i < pwdLength - 2; i++){
            pwdEncrypt.append("*");
        }
        return pwdEncrypt.toString();
    }

}
