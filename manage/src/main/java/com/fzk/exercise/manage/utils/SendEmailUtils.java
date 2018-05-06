package com.fzk.exercise.manage.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.internet.MimeMessage;
import java.util.Date;
import java.util.Properties;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 16:35 2018/1/7
 */
public class SendEmailUtils {

    /*@Autowired
    private static JavaMailSenderImpl javaMailSender; //自动注入的Bean
*/
    @Value("${spring.mail.username}")
    private static String Sender; //读取配置文件中的参数

    /**
     * 发送邮件
     * @param title   标题
     * @param titleWithName  是否在标题后添加 名称
     * @param content        内容
     * @param contentWithName   是否在内容后添加 名称
     * @param email     接收者的邮箱【注册人】
     */
    private static void  sendNormalEmail(
            String title,
            boolean titleWithName,
            String content,
            boolean contentWithName,
            String email
    ){
        JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();

        String dName="喵喵喵喵喵";
        //MimeMessage message = null;
        try {
            javaMailSender.setHost("smtp.163.com");
            javaMailSender.setDefaultEncoding("utf-8");
//      mailSender.setPort(465);
            javaMailSender.setUsername("18234820929@163.com");
            javaMailSender.setPassword("amrirey.3034666");
            //加认证机制
            Properties javaMailProperties = new Properties();
            javaMailProperties.put("mail.smtp.auth", true);
            javaMailProperties.put("mail.smtp.host", "smtp.163.com");
            javaMailProperties.put("mail.smtp.starttls.enable", true);
            javaMailProperties.put("mail.smtp.starttls.required",true);
            javaMailProperties.put("mail.smtp.socketFactory.port", "465");
            javaMailProperties.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
            javaMailProperties.put("mail.smtp.timeout", 5000);
            javaMailSender.setJavaMailProperties(javaMailProperties);
            //创建邮件内容
            //使用JavaMail的MimeMessage，支付更加复杂的邮件格式和内容
            MimeMessage msg = javaMailSender.createMimeMessage();
            //创建MimeMessageHelper对象，处理MimeMessage的辅助类
            MimeMessageHelper helper = new MimeMessageHelper(msg, true);
            //使用辅助类MimeMessage设定参数
            title= titleWithName?title +"-"+dName:title; //标题内容
            helper.setFrom("18234820929@163.com");
            helper.setTo(email);
            helper.setSubject(title);
            if(contentWithName) {
                content += "<p style='text-align:right'>" +dName+ "</p>";
                content += "<p style='text-align:right'>" + DateTimeUtil.dateToStr(new Date())+"</p>";
            }
            helper.setText(content,true);


            javaMailSender.send(msg);
            /*message = javaMailSender.createMimeMessage();//创建要发送的信息
            MimeMessageHelper helper=new MimeMessageHelper(message,true);
            helper.setFrom("18234820929@163.com"); //设置 谁发送的new InternetAddress(Sender,dName,"UTF-8")
            helper.setTo(email);//发给谁 【接收者的邮箱】
            title= titleWithName?title +"-"+dName:title; //标题内容
            helper.setSubject(title);//发送邮件的辩题
            if(contentWithName) {
                content += "<p style='text-align:right'>" +dName+ "</p>";
                content += "<p style='text-align:right'>" + DateTimeUtil.dateToStr(new Date())+"</p>";
            }
            helper.setText(content,true);//发送的内容 是否为html*/
        }catch (Exception e){
            e.printStackTrace();
        }
    }


    /**
     * 发送 注册时的验证码
     * @param email   接收者的邮箱【注册人】
     * @param code    验证码
     */
    public static void sendRegisterCode(String email, String code){
        final StringBuffer sb= new StringBuffer();//实例化一个StringBuffer
        sb.append("<h2>"+email+",您好！<h2>")
                .append("<p style='color:red'>此次修改密码的验证码是："+code+"</p>")
                .append("</br></br></br></br>"+new Date());
        System.out.println("sb:"+sb);
       // new Thread(new Runnable() {
        //    @Override
        //    public void run() {
                sendNormalEmail("修改密码", true, sb.toString(), true, email);
        //    }
       // }).start();
    }


    /**
     * 注册成功时的提示邮件
     * @param email 接收的邮箱地址 【注册人】
     * @param pwd 初始密码
     * @param url 登陆地址
     */
    public void sendRegisterSuc(final String email, String pwd, String url) {
        final StringBuffer sb = new StringBuffer();
        sb.append("<h3>恭喜您，注册成功！</h3>")
                .append("<h2>初始化密码是：<b style='color:#F00'>").append(pwd).append("</b>，请不要告诉任何人！</h2>")
                .append("请及时<a href='").append(url).append("'>登陆网站</a>修改密码。");
        new Thread(new Runnable() {
            @Override
            public void run() {
                sendNormalEmail("注册成功", true, sb.toString(), true, email);
            }
        }).start();
    }

    /**
     * 注册成功时的提示邮件
     * @param email 接收的邮箱地址  【注册人】
     * @param pwd 初始密码
     * @param url 登陆地址
     */
    public void sendFindPwdSuc(final String email, String pwd, String url) {
        final StringBuffer sb = new StringBuffer();
        sb.append("<h3>恭喜您，密码找回成功！</h3>")
                .append("<h2>系统随机密码是：<b style='color:#F00'>").append(pwd).append("</b>，请不要告诉任何人！</h2>")
                .append("请及时<a href='").append(url).append("'>登陆网站</a>修改密码。");

        new Thread(new Runnable() {
            @Override
            public void run() {
                sendNormalEmail("成功找回密码", true, sb.toString(), true, email);
            }
        }).start();
    }

    /**
     * 新用户注册通过
     * @param email 接收邮箱地址（管理员的）
     * @param nickname 注册人姓名
     * @param regEmail 注册人邮箱
     * @param url 地址
     */
    public void sendOnRegister(final String email, String nickname, String regEmail, String url) {
        final StringBuffer sb = new StringBuffer();
        sb.append("<a href='").append(url).append("'><h1>姓名：").append(nickname).append("</h1></a>");
        sb.append("<h3>注册邮箱：").append(regEmail).append("</h3>");
        new Thread(new Runnable() {
            @Override
            public void run() {
                sendNormalEmail("新用户注册通知", true, sb.toString(), true, email);
            }
        }).start();
    }


}
