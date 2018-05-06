package com.fzk.exercise.manage.controller.backend;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.PlaceReserve;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.service.IPlaceReserveService;
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
 * @Date: Created in 17:15 2018/4/19
 */
@Controller
@RequestMapping("/manage/place_reserve/")
public class PlaceReserveManageController {

    Logger logger = LoggerFactory.getLogger(CourseManageController.class);

    @Autowired
    private IPlaceReserveService iPlaceReserveService;

    @Autowired
    private IUserService iUserService;

    @RequestMapping(value = "save.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse save(HttpSession session, @RequestBody PlaceReserve placeReserve){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iPlaceReserveService.saveOrUpdatePlace(placeReserve);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }
/*
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
*/
    @RequestMapping(value = "list.do",method = RequestMethod.GET)
    @ResponseBody
    public ServerResponse getList(HttpSession session,
                                  PlaceReserve placeReserve,
                                  @RequestParam(value = "pageNum",defaultValue = "1") int pageNum,
                                  @RequestParam(value = "pageSize",defaultValue = "10") int pageSize)
    {
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");

        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iPlaceReserveService.search(placeReserve,pageNum,pageSize);
        }else{
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "delete.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse delete(HttpSession session, PlaceReserve placeReserve){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iPlaceReserveService.delete(placeReserve.getId());
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }
}
