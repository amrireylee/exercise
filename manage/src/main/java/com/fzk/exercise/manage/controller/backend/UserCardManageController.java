package com.fzk.exercise.manage.controller.backend;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.model.UserCard;
import com.fzk.exercise.manage.service.IUserCardService;
import com.fzk.exercise.manage.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 16:17 2018/4/13
 */
@Controller
@RequestMapping("/manage/user_card/")
public class UserCardManageController {

    @Autowired
    private IUserCardService iUserCardService;

    @Autowired
    private IUserService iUserService;

    @RequestMapping(value = "list.do",method = RequestMethod.GET)
    @ResponseBody
    public ServerResponse list(HttpSession session,
                               UserCard userCard,
                               @RequestParam(value = "pageNum",defaultValue = "1") int pageNum,
                               @RequestParam(value = "pageSize",defaultValue = "10") int pageSize){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iUserCardService.list(userCard,pageNum,pageSize);
        }else{
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "save_update.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse addCard(HttpSession session,
                                  @RequestBody UserCard userCard){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iUserCardService.addNewUserCard(userCard);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "lost.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse lostCard(HttpSession session,
                                  @RequestParam("cardId") Integer cardId){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iUserCardService.lostUserCard(cardId);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "replace.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse replaceCard(HttpSession session,
                                   @RequestParam("cardId") Integer cardId){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iUserCardService.replaceUserCard(cardId);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "delete.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse deleteCard(HttpSession session,
                                   @RequestParam("cardId") Integer cardId){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iUserCardService.deleteUserCard(cardId);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

}
