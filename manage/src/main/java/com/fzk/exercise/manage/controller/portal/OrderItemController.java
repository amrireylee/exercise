package com.fzk.exercise.manage.controller.portal;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dto.OrderCartDto;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.service.IOrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.util.Map;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 17:59 2018/4/12
 */
@Controller
@RequestMapping("/order_item/")
public class OrderItemController {
    @Autowired
    private IOrderItemService iOrderItemService;

    @RequestMapping(value = "save.do",method = RequestMethod.POST)
    @ResponseBody
    public ServerResponse<OrderCartDto> save(HttpSession session,
                                             @RequestBody Map<String,Object> params){

        Integer usersId = Integer.parseInt(params.get("usersId").toString());
        String courseListIds = params.get("courseListIds").toString();
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        if (user.getRole().equals(Const.Role.ROLE_ADMIN)){
            return iOrderItemService.save(usersId,courseListIds);
        }
        return iOrderItemService.save(user.getId(),courseListIds);
    }

    @RequestMapping("detail.do")
    @ResponseBody
    public ServerResponse<OrderCartDto> list(HttpSession session,
                                             @RequestParam(value = "orderNo") BigInteger orderNo){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        return ServerResponse.createBySuccess(iOrderItemService.listByOrderNo(orderNo));
    }

    @RequestMapping("delete.do")
    @ResponseBody
    public ServerResponse<OrderCartDto> deleteProduct(HttpSession session, String productIds){
        User user = (User) session.getAttribute(Const.CURRENT_USER);
        if (user==null){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        return iOrderItemService.delete(user.getId(),productIds);
    }
}
