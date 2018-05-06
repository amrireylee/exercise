package com.fzk.exercise.manage.dto;

import com.fzk.exercise.manage.model.OrderItem;

import java.math.BigDecimal;
import java.util.List;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 14:01 2018/4/12
 */
public class OrderCartDto {
    List<OrderItem> orderItemDtoList;
    private BigDecimal cartTotalPrice;

    public OrderCartDto() {
    }

    public OrderCartDto(List<OrderItem> orderItemDtoList, BigDecimal cartTotalPrice) {
        this.orderItemDtoList = orderItemDtoList;
        this.cartTotalPrice = cartTotalPrice;
    }

    public List<OrderItem> getOrderItemDtoList() {
        return orderItemDtoList;
    }

    public void setOrderItemDtoList(List<OrderItem> orderItemDtoList) {
        this.orderItemDtoList = orderItemDtoList;
    }

    public BigDecimal getCartTotalPrice() {
        return cartTotalPrice;
    }

    public void setCartTotalPrice(BigDecimal cartTotalPrice) {
        this.cartTotalPrice = cartTotalPrice;
    }
}
