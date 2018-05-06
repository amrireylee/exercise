package com.fzk.exercise.manage.service.impl;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dao.OrderItemMapper;
import com.fzk.exercise.manage.dao.OrderMapper;
import com.fzk.exercise.manage.dto.OrderCartDto;
import com.fzk.exercise.manage.dto.OrderDto;
import com.fzk.exercise.manage.model.Order;
import com.fzk.exercise.manage.model.OrderItem;
import com.fzk.exercise.manage.service.IOrderItemService;
import com.fzk.exercise.manage.service.IOrderService;
import com.fzk.exercise.manage.utils.BigDecimalUtil;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 10:07 2018/4/12
 */
@Service("iOrderService")
public class OrderServiceImpl implements IOrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private OrderItemMapper orderItemMapper;

    @Autowired
    private IOrderItemService iOrderItemService;

    @Transactional
    public ServerResponse<Object> createOrder(Integer userId,BigInteger orderNo,Integer paymentType,String remark){

        //获取数据
        OrderCartDto orderCartDto = iOrderItemService.listByOrderNo(orderNo);

        //计算这个订单的总价
        List<OrderItem> orderItemList = orderCartDto.getOrderItemDtoList();
        BigDecimal payment = orderCartDto.getCartTotalPrice();

        //生成订单
        Order order = this.assembleOrder(userId,orderItemList,payment,paymentType,remark);
        if (order ==null){
            return ServerResponse.createByErrorMessage("生成订单错误");
        }
        if (CollectionUtils.isEmpty(orderItemList)){
            return ServerResponse.createByErrorMessage("没有选择课程，无法生成订单");
        }

        //mybatis 批量插入
        orderItemMapper.batchInsert(orderItemList);

        //清空一个购物车
        this.cleatOrderCart(orderItemList);
        return ServerResponse.createBySuccess("生成订单成功",order);

    }

    //根据orderNo和userId查询订单详情
    public ServerResponse<OrderDto> getOrderDetail(Integer userId,BigInteger orderNo){
        Order order = orderMapper.selectByUserIdAndOrderNo(userId,orderNo);
        if (order !=null){
            List<OrderItem> orderItemList = orderItemMapper.getByOrderNoUserId(orderNo,userId);
            OrderDto orderDto = assembleOrderDto(order, orderItemList);
            if (orderDto==null){
                return ServerResponse.createByErrorMessage("查询失败");
            }
            return ServerResponse.createBySuccess("查询成功",orderDto);
        }
        return ServerResponse.createByErrorMessage("没有找到该订单");
    }

    public ServerResponse<String> cancel(Integer userId,BigInteger orderNo){
        Order order = orderMapper.selectByUserIdAndOrderNo(userId,orderNo);
        if (order == null){
            return ServerResponse.createByErrorMessage("该用户此订单不存在");
        }
        if (order.getStatus() != Const.OrderStatusEnum.NO_PAY.getCode()){
            return ServerResponse.createByErrorMessage("已付款，无法取消订单");
        }
        Order updateOrder = new Order();
        updateOrder.setId(order.getId());
        updateOrder.setStatus(Const.OrderStatusEnum.CANCELED.getCode());

        int rowCount  = orderMapper.updateByPrimaryKeySelective(updateOrder);
        if (rowCount>0){
            return ServerResponse.createBySuccess();
        }
        return ServerResponse.createByError();
    }

    //分页查询订单
    public ServerResponse<PageInfo> getOrderList(Integer userId, int pageNum, int pageSize){
        PageHelper.startPage(pageNum,pageSize);
        List<Order> orderList = orderMapper.selectByUserId(userId);
        List<OrderDto> orderDtoList = assembleOrderDtoList(orderList,userId);
        PageInfo pageResult = new PageInfo(orderList);
        pageResult.setList(orderDtoList);
        return ServerResponse.createBySuccess(pageResult);

    }

    //付款后修改状态为：已付款
    public ServerResponse queryOrderPayStatus(Integer userId,BigInteger orderNo){
        Order order = orderMapper.selectByUserIdAndOrderNo(userId,orderNo);
        if (order==null){
            return ServerResponse.createByErrorMessage("用户没有该订单");
        }
        if (order.getStatus() >= Const.OrderStatusEnum.PAID.getCode()){
            return ServerResponse.createBySuccess();
        }

        return ServerResponse.createByError();
    }


    //--------------------------------------------------------------
    //backend

    public ServerResponse<PageInfo> managerList(Order order,int pageNum,int pageSize){
        PageHelper.startPage(pageNum,pageSize);
        List<Order> orderList = orderMapper.search(order);
        List<OrderDto> orderDtoList = this.assembleOrderDtoList(orderList,null);
        PageInfo pageResult = new PageInfo(orderList);
        pageResult.setList(orderDtoList);

        return ServerResponse.createBySuccess(pageResult);

    }

    public ServerResponse<OrderDto> managerDetail(BigInteger orderNo){
        Order order = orderMapper.selectByOrderNo(orderNo);
        if (order != null){
            List<OrderItem> orderItemList = orderItemMapper.getByOrderNo(orderNo);
            OrderDto orderDto = assembleOrderDto(order,orderItemList);
            return ServerResponse.createBySuccess(orderDto);
        }
        return ServerResponse.createByErrorMessage("订单不存在");
    }

    public ServerResponse<PageInfo> managerSearch(Order order,int pageNum,int pageSize){
        PageHelper.startPage(pageNum,pageSize);
        List<Order> orderList = orderMapper.search(order);
        if (CollectionUtils.isNotEmpty(orderList)){
            List<OrderDto> orderDtoList = Lists.newArrayList();
            for (int i = 0; i < orderList.size(); i++) {
                List<OrderItem> orderItemList = orderItemMapper.getByOrderNo(orderList.get(i).getOrderNo());
                OrderDto orderDto = assembleOrderDto(order,orderItemList);
                orderDtoList.add(orderDto);
            }
            PageInfo pageResult = new PageInfo(orderList);
            pageResult.setList(orderDtoList);
            return ServerResponse.createBySuccess(pageResult);
        }
        return ServerResponse.createByErrorMessage("订单不存在");
    }

    public ServerResponse<String> pay(BigInteger orderNo){
        Order order = orderMapper.selectByOrderNo(orderNo);
        if (order != null){
            if (order.getStatus()==Const.OrderStatusEnum.NO_PAY.getCode()){
                order.setStatus(Const.OrderStatusEnum.PAID.getCode());
                order.setPaymentTime(new Date());
                orderMapper.updateByPrimaryKeySelective(order);
                return ServerResponse.createBySuccessMessage("订单完成");
            }
        }
        return ServerResponse.createByErrorMessage("订单不存在");
    }

    public ServerResponse<String> manageSuccess(BigInteger orderNo){
        Order order = orderMapper.selectByOrderNo(orderNo);
        if (order != null){
            if (order.getStatus()==Const.OrderStatusEnum.PAID.getCode()){
                order.setStatus(Const.OrderStatusEnum.ORDER_SUCCESS.getCode());
                orderMapper.updateByPrimaryKeySelective(order);
                return ServerResponse.createBySuccessMessage("订单完成");
            }
        }
        return ServerResponse.createByErrorMessage("订单不存在");
    }


    /*--------------------------------------------------------------------------*/

    private Order assembleOrder(Integer userId,List<OrderItem> orderItemList,BigDecimal payment,Integer paymentType,String remark){
        Order order = new Order();
        BigInteger orderNo = orderItemList.get(0).getOrderNo();
        order.setOrderNo(orderNo);
        order.setStatus(Const.OrderStatusEnum.NO_PAY.getCode());
        order.setPaymentType(paymentType);
        order.setPayment(payment);
        order.setUserId(userId);
        order.setRemark(remark);
        order.setPaymentTime(new Date());
        order.setCreateTime(new Date());
        int rowCount = orderMapper.insert(order);
        if (rowCount > 0){
            return order;
        }
        return null;
    }

    //清空购物车
    private void cleatOrderCart(List<OrderItem> orderItemList){
        for (OrderItem item : orderItemList) {
            orderItemMapper.deleteByPrimaryKey(item.getId());
        }
    }

    private OrderDto assembleOrderDto(Order order, List<OrderItem> orderItemList) {
        OrderCartDto orderCartDto = new OrderCartDto();
        //声明一个总价
        BigDecimal orderItemsTotalPrice = new BigDecimal("0");

        if (CollectionUtils.isNotEmpty(orderItemList)){
            for (OrderItem orderItem : orderItemList) {
                orderItemsTotalPrice = BigDecimalUtil.add(orderItemsTotalPrice.doubleValue(),
                        orderItem.getCurrentUnitPrice().doubleValue());
            }
        }
        orderCartDto.setOrderItemDtoList(orderItemList);
        orderCartDto.setCartTotalPrice(orderItemsTotalPrice);

        OrderDto orderDto = new OrderDto();
        orderDto.setOrder(order);
        orderDto.setOrderCartDto(orderCartDto);
        return orderDto;
    }

    private List<OrderDto> assembleOrderDtoList(List<Order> orderList,Integer userId){
        List<OrderDto> orderDtoList = Lists.newArrayList();
        for (Order item : orderList) {
            List<OrderItem> orderItemList = Lists.newArrayList();
            if (userId == null){
                //todo 管理员查询的时候不需要传userId
                orderItemList = orderItemMapper.getByOrderNo(item.getOrderNo());
            }else {
                orderItemList = orderItemMapper.getByOrderNoUserId(item.getOrderNo(),userId);
            }
            OrderDto orderDto = assembleOrderDto(item,orderItemList);
            orderDtoList.add(orderDto);
        }
        return orderDtoList;
    }
}
