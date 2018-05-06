package com.fzk.exercise.manage.controller.portal;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.service.IOrderItemService;
import com.fzk.exercise.manage.service.IOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.util.Map;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 17:41 2018/4/12
 */
@Controller
@RequestMapping("/order/")
public class OrderController {

    @Autowired
    private static final Logger logger= LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private IOrderService iOrderService;

    @Autowired
    private IOrderItemService iOrderItemService;

    //创建订单
    @RequestMapping(value = "create.do", method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse create(HttpSession session, @RequestBody Map<String,Object> params){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        Integer userId = Integer.parseInt(params.get("userId").toString());
        BigInteger orderNo = BigInteger.valueOf(Long.valueOf(params.get("orderNo").toString()));
        String remark = params.get("remark").toString();
        Integer paymentType = Integer.valueOf(params.get("paymentType").toString());
        if (user.getRole().equals(Const.Role.ROLE_ADMIN)) {
            return iOrderService.createOrder(userId,orderNo,paymentType,remark);
        }
            return iOrderService.createOrder(user.getId(),orderNo,paymentType,remark);
    }

    @RequestMapping(value = "cancel.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse cancel(HttpSession session,BigInteger orderNo){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        return iOrderService.cancel(user.getId(),orderNo);
    }

    //todo 获取购物车明细
    @RequestMapping("get_order_cart_product.do")
    @ResponseBody
    public ServerResponse getOrderCartProduct(HttpSession session){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        return ServerResponse.createBySuccess(iOrderItemService.list(user.getId()));
    }

    //获取订单明细
    @RequestMapping("detail.do")
    @ResponseBody
    public ServerResponse detail(HttpSession session,BigInteger orderNo){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        return iOrderService.getOrderDetail(user.getId(),orderNo);
    }

    //获取购物车里的产品明细
    @RequestMapping("list.do")
    @ResponseBody
    public ServerResponse list(HttpSession session,
                               @RequestParam(value = "pageNum",defaultValue = "1") int pageNum,
                               @RequestParam(value = "pageSize",defaultValue = "10") int pageSize){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        return iOrderService.getOrderList(user.getId(),pageNum,pageSize);
    }

    @RequestMapping("query_order_pay_status.do")
    @ResponseBody
    public ServerResponse<Boolean> queryOrderPayStatus(HttpSession session, BigInteger orderNo){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }

        ServerResponse serverResponse =  iOrderService.queryOrderPayStatus(user.getId(),orderNo);
        if (serverResponse.isSuccess()){
            return ServerResponse.createBySuccess(true);
        }
        return ServerResponse.createBySuccess(false);
    }


}
