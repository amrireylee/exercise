package com.fzk.exercise.manage.controller.portal;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.service.IUserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 20:31 2018/4/10
 */
@Controller
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService iUserService;

    @RequestMapping("/index")
    public String index(){
        return "user/index";
    }

    @RequestMapping(value = "login.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<User> login(@RequestBody Map<String,Object> params, HttpSession session) {
        System.out.println(params.get("username")+"---"+params.get("password"));
        ServerResponse<User> response = iUserService.login(params.get("username").toString(),params.get("password").toString());
        if (response.isSuccess()){
            session.setAttribute(Const.CURRENT_USER,response.getData());
        }
//        System.out.println(response.getData().toString());
        return response;
    }

    @RequestMapping(value = "logout.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<String> logout(HttpSession session){
        session.removeAttribute(Const.CURRENT_USER);
        return ServerResponse.createBySuccess();
    }

    @RequestMapping(value = "register.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<User> register(@RequestBody User user){

        return iUserService.register(user);
    }

    @RequestMapping(value = "username_vali.do",method = RequestMethod.POST)
    @ResponseBody
    public boolean usernameVali(@RequestParam("username") String username){

        return iUserService.usernameVali(username);
    }

    @RequestMapping(value = "email_vali.do",method = RequestMethod.POST)
    @ResponseBody
    public boolean emailVali(@RequestParam("email") String email){

        return iUserService.emailVali(email);
    }

    /**
     * 找回密码
     * @param email     用户邮箱
     * @param request
     * @return
     */
    @RequestMapping(value ="find_pwd.do",method = RequestMethod.POST)
    @ResponseBody
    public  ServerResponse findPwd(
            @RequestParam(value = "username",defaultValue = "",required = true) String username,
            @RequestParam(value = "email",defaultValue = "",required = true) String email,
            HttpServletRequest request
    ){
        if (!StringUtils.isNotEmpty(username)){
            return   ServerResponse.createByErrorMessage("用户名不能为空");
        }
        if (!StringUtils.isNotEmpty(email)){
            return   ServerResponse.createByErrorMessage("邮箱不能为空");
        }
        try {
            ServerResponse serverResponse = iUserService.findPassword(username,email);
            System.out.println("getMsg:"+serverResponse.getMsg());
            if (serverResponse.isSuccess()){
                return ServerResponse.createBySuccess("修改密码成功！");
            }

            /*String url="http:192.168.0.17:8080/member/login";
            String randPwd = RandomTools.randomCode();//随机产生一个密码
            member.setPassword(SecurityUtil.md5(email,randPwd));
            member=memberService.updateMember(member);*/
            //发送邮件通知 用户
            return ServerResponse.createByErrorMessage("修改密码失败！"+serverResponse.getMsg());
        }catch (Exception e){
            return ServerResponse.createByErrorMessage("修改密码失败!！"+e.getMessage());
        }
    }

    @RequestMapping(value ="verify.do",method = RequestMethod.POST)
    @ResponseBody
    public  ServerResponse<Integer> verify(@RequestParam("sid") String sid, @RequestParam("email") String email){

        ServerResponse<Integer> response= iUserService.verifyMail(sid,email);
        if (response.isSuccess()){
            return ServerResponse.createBySuccess(response.getMsg(),response.getData());
        }
        return response;
    }

    //通过验证码重置密码
    @RequestMapping(value = "forget_reset_password.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<String> forgetResetPassword(@RequestBody Map<String,Object> params){
        Integer userId = Integer.valueOf(params.get("userId").toString());
        String passwordNew = params.get("passwordNew").toString();
        return iUserService.resetPassword(passwordNew,userId);
    }

    //登录状态中的重置密码
    @RequestMapping(value = "reset_password.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<String> resetPassword(HttpSession session, String passwordNew){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorMessage("用户未登录");
        }
        return iUserService.resetPassword(passwordNew,user.getId());
    }

    @RequestMapping(value = "update_information.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<User> updateInformation(HttpSession session,User user){
        User currentUser = (User) session.getAttribute(Const.CURRENT_USER);
        if (currentUser==null){
            return ServerResponse.createByErrorMessage("用户未登录");
        }
        //auths.setId(currentAuths.getId());
        //auths.setUsername(currentAuths.getUsername());
        ServerResponse<User> response = iUserService.updateInformation(user);
        /*if (response.isSuccess()){
            session.setAttribute(Const.CURRENT_USER,response.getData());
        }*/
        return response;
    }

    @RequestMapping(value = "get_information.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<User> getInformation(HttpSession session){
        User currentUser = (User) session.getAttribute(Const.CURRENT_USER);
        if (currentUser==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录,需要强制登陆status = 10");
        }
        return iUserService.getInformation(currentUser.getId());
    }
}
