package com.fzk.exercise.manage.controller.backend;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.service.IUserService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Map;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 12:13 2018/4/11
 */
@Controller
@RequestMapping("/manage/user")
public class UserManageController {
    @Autowired
    private IUserService iUserService;

    @RequestMapping(value = "login.do", method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<User> login(@RequestBody Map<String,Object> params, HttpSession session){
        ServerResponse<User> response = iUserService.login(params.get("username").toString(),params.get("password").toString());
        if (response.isSuccess()){
            User user = response.getData();
            if (user.getRole()== Const.Role.ROLE_ADMIN){
                //说明是管理员
                session.setAttribute(Const.CURRENT_USER,user);
            }else {
                return ServerResponse.createByErrorMessage("不是管理员，无法登录");
            }
        }
        return response;
    }

    @RequestMapping(value = "list.do", method = RequestMethod.GET)
    @ResponseBody
    public ServerResponse<PageInfo> getAllUser(User user,
                                               @RequestParam(value = "pageNum",defaultValue = "1") int pageNum,
                                               @RequestParam(value = "pageSize",defaultValue = "10") int pageSize){
        ServerResponse<PageInfo> response = iUserService.list(user,pageNum,pageSize);
        return response;
    }

    @RequestMapping(value = "addAdmin.do", method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse addAdmin(User user){
        ServerResponse response = iUserService.addAdminRole(user);
        return response;
    }

    //登录状态中获取用户信息
    @RequestMapping(value = "getUserInfo.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<User> resetPassword(HttpSession session){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorMessage("用户未登录");
        }
        return ServerResponse.createBySuccess(user);
    }

}
