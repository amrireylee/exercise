package com.fzk.exercise.manage.service;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dto.OrderDto;
import com.fzk.exercise.manage.model.Order;
import com.github.pagehelper.PageInfo;

import java.math.BigInteger;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 10:06 2018/4/12
 */
public interface IOrderService {
    ServerResponse<Object> createOrder(Integer userId,BigInteger orderNo,Integer paymentType,String remark);

    ServerResponse<OrderDto> getOrderDetail(Integer userId,BigInteger orderNo);

    ServerResponse<String> cancel(Integer userId,BigInteger orderNo);

    ServerResponse<PageInfo> getOrderList(Integer userId, int pageNum, int pageSize);

    ServerResponse queryOrderPayStatus(Integer userId,BigInteger orderNo);

    //backend
    ServerResponse<PageInfo> managerList(Order order,int pageNum,int pageSize);

    ServerResponse<OrderDto> managerDetail(BigInteger orderNo);

    ServerResponse<PageInfo> managerSearch(Order order, int pageNum, int pageSize);

    ServerResponse<String> pay(BigInteger orderNo);

    ServerResponse<String> manageSuccess(BigInteger orderNo);

}
