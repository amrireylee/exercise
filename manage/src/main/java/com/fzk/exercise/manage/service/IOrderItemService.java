package com.fzk.exercise.manage.service;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dto.OrderCartDto;

import java.math.BigInteger;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 11:23 2018/4/12
 */
public interface IOrderItemService {

    ServerResponse<OrderCartDto> save(Integer userId,String courseListIds);

    ServerResponse<OrderCartDto> delete(Integer userId,String orderItemIds);

    OrderCartDto listByOrderNo(BigInteger orderNo);

    OrderCartDto list(Integer userId);

}
