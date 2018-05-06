package com.fzk.exercise.manage.controller.backend;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dto.OrderDto;
import com.fzk.exercise.manage.model.Order;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.service.IOrderItemService;
import com.fzk.exercise.manage.service.IOrderService;
import com.fzk.exercise.manage.service.IUserService;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.math.BigInteger;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 17:55 2018/4/12
 */
@Controller
@RequestMapping("/manage/order/")
public class OrderManageController {

    @Autowired
    private IUserService iUserService;

    @Autowired
    private IOrderService iOrderService;

    @Autowired
    private IOrderItemService iOrderItemService;


    //创建订单-后台创建
    @RequestMapping(value = "create.do", method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse create(HttpSession session, @RequestBody Order order){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        return iOrderService.createOrder(order.getUserId(),order.getOrderNo(),order.getPaymentType(),order.getRemark());
    }


    @RequestMapping(value = "order_list.do",method = RequestMethod.GET)
    @ResponseBody
    public ServerResponse<PageInfo> orderList(HttpSession session,
                                              Order order,
                                              @RequestParam(value = "pageNum" ,defaultValue = "1") int pageNum,
                                              @RequestParam(value = "pageSize" ,defaultValue = "10") int pageSize){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iOrderService.managerList(order,pageNum,pageSize);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "order_detail.do",method = RequestMethod.GET)
    @ResponseBody
    public ServerResponse<OrderDto> orderDetail(HttpSession session,
                                                @RequestParam(value = "orderNo") BigInteger orderNo){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iOrderService.managerDetail(orderNo);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping("search.do")
    @ResponseBody
    public ServerResponse<PageInfo> orderSearch(HttpSession session,
                                                Order order,
                                                @RequestParam(value = "pageNum" ,defaultValue = "1") int pageNum,
                                                @RequestParam(value = "pageSize" ,defaultValue = "10") int pageSize){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iOrderService.managerSearch(order,pageNum,pageSize);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }


    @RequestMapping(value = "pay.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<String> pay(HttpSession session,
                                      BigInteger orderNo){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iOrderService.pay(orderNo);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "pay_success.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<String> paySuccess(HttpSession session,
                                             BigInteger orderNo){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iOrderService.manageSuccess(orderNo);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

    @RequestMapping(value = "cancel.do",method = RequestMethod.GET)
    @ResponseBody
    public ServerResponse<String> cancel(HttpSession session,
                                         @RequestParam(value = "userId") Integer userId,
                                         @RequestParam(value = "orderNo") BigInteger orderNo){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.NEED_LOGIN.getCode(),"用户未登录，请登录管理员");
        }
        if (iUserService.checkAdminRole(user).isSuccess()){
            return iOrderService.cancel(userId,orderNo);
        }else {
            return ServerResponse.createByErrorMessage("无权限操作");
        }
    }

}
