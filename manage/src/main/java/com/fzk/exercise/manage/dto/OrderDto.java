package com.fzk.exercise.manage.dto;

import com.fzk.exercise.manage.model.Order;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 13:14 2018/4/12
 */
public class OrderDto {

    private Order order;

    //订单的明细
    private OrderCartDto orderCartDto;

    public OrderDto() {
    }

    public OrderDto(Order order, OrderCartDto orderCartDto) {
        this.order = order;
        this.orderCartDto = orderCartDto;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public OrderCartDto getOrderCartDto() {
        return orderCartDto;
    }

    public void setOrderCartDto(OrderCartDto orderCartDto) {
        this.orderCartDto = orderCartDto;
    }
}
