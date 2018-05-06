package com.fzk.exercise.manage.controller.backend;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.Place;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.service.IPlaceService;
import com.fzk.exercise.manage.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 14:23 2018/4/13
 */
@Controller
@RequestMapping("/manage/place/")
public class PlaceManageController {


    Logger logger = LoggerFactory.getLogger(CourseManageController.class);

    @Autowired
    private IPlaceService iPlaceService;

    @Autowired
    private IUserService iUserService;

    @RequestMapping(value = "save.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse save(HttpSession session,@RequestBody Place place){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            //增加产品业务逻辑
            return iPlaceService.saveOrUpdatePlace(place);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "get_detail.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse getDetail(HttpSession session,@RequestBody Place place){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");

        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iPlaceService.searchPlace(place,1,1);
        }else{
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "list.do",method = RequestMethod.GET)
    @ResponseBody
    public ServerResponse getList(HttpSession session,
                                  Place place,
                                  @RequestParam(value = "pageNum",defaultValue = "1") int pageNum,
                                  @RequestParam(value = "pageSize",defaultValue = "10") int pageSize)
    {
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");

        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iPlaceService.searchPlace(place,pageNum,pageSize);
        }else{
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping("delete.do")
    @ResponseBody
    public ServerResponse delete(HttpSession session, Place place){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iPlaceService.delete(place.getId());
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping("enable.do")
    @ResponseBody
    public ServerResponse enableUse(HttpSession session, Place place){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iPlaceService.enableOrDisableUse(place);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping("disable.do")
    @ResponseBody
    public ServerResponse disableUse(HttpSession session, Place place){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iPlaceService.enableOrDisableUse(place);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }
}
