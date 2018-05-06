package com.fzk.exercise.manage.service.impl;

import com.fzk.exercise.manage.common.ResponseCode;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dao.CourseMapper;
import com.fzk.exercise.manage.dao.OrderItemMapper;
import com.fzk.exercise.manage.dao.ProjectMapper;
import com.fzk.exercise.manage.dto.OrderCartDto;
import com.fzk.exercise.manage.model.Course;
import com.fzk.exercise.manage.model.OrderItem;
import com.fzk.exercise.manage.model.Project;
import com.fzk.exercise.manage.service.IOrderItemService;
import com.fzk.exercise.manage.utils.BigDecimalUtil;
import com.google.common.base.Splitter;
import com.google.common.collect.Lists;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;
import java.util.Random;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 11:23 2018/4/12
 */
@Service("iOrderItemService")
public class OrderItemServiceImpl implements IOrderItemService {
    @Autowired
    private OrderItemMapper orderItemMapper;

    @Autowired
    private CourseMapper courseMapper;

    @Autowired
    private ProjectMapper projectMapper;

    @Transactional
    public ServerResponse<OrderCartDto> save(Integer userId,String courseListIds){
        List<String> ids = Splitter.on(",").splitToList(courseListIds);
        System.out.println(ids.toString());
        List<Integer> courseListIdsList = Lists.newArrayList();
        for (int i = 0; i < ids.size()-1; i++) {
            System.out.println(ids.get(i));
            courseListIdsList.add(Integer.parseInt(ids.get(i)));
        }
        if (CollectionUtils.isNotEmpty(courseListIdsList)){
            List<Course> courseList = courseMapper.selectById(courseListIdsList);

            List<OrderItem> orderItemList = Lists.newArrayList();
            BigInteger thisOrderNo = generateOrderNo(userId);
            for (Course aCourseList : courseList) {
                OrderItem orderItem = orderItemMapper.selectOrderByUserIdCourseId(userId, aCourseList.getId());
                if (orderItem == null) {
                    //这个没有选中里,需要新增这个记录
                    OrderItem item = new OrderItem();
                    item.setUserId(userId);
                    item.setOrderNo(thisOrderNo);
                    System.out.println(aCourseList.toString());
                    System.out.println(aCourseList.getProjectId());
                    item.setProjectId(aCourseList.getProjectId());

                    Project project = projectMapper.selectByPrimaryKey(aCourseList.getProjectId());
                    item.setProjectName(project.getName());

                    item.setCourseId(aCourseList.getId());
                    item.setCurrentUnitPrice(aCourseList.getMoney());
                    item.setTotalPrice(aCourseList.getMoney());
                    item.setCreateTime(aCourseList.getCreateTime());
                    orderItemList.add(item);
                }
                //如果存在，提示已经添加，并不做任何处理
                //批量插入

            }
            if (orderItemList.size()>0){
                orderItemMapper.batchInsert(orderItemList);
            }
        }

        return ServerResponse.createBySuccess("添加成功",list(userId));
    }

    public ServerResponse<OrderCartDto> delete(Integer userId,String orderItemIds){
        List<String> orderItemIdsList = Splitter.on(",").splitToList(orderItemIds);
        if (CollectionUtils.isEmpty(orderItemIdsList)){
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),ResponseCode.ILLEGAL_ARGUMENT.getDesc());
        }
        orderItemMapper.deleteByUserIdOrderItemIds(userId,orderItemIdsList);
        //System.out.println(orderItemMapper.deleteByUserIdOrderItemIds(userId,orderItemList));
        return ServerResponse.createBySuccess(this.list(userId));
    }

    /*---------------------------------------------------------------------------------------*/

    public OrderCartDto listByOrderNo(BigInteger orderNo){
        OrderCartDto orderCartDto = new OrderCartDto();
        List<OrderItem> orderItemList =orderItemMapper.getByOrderNo(orderNo);

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
        return orderCartDto;
    }

    //多次用到的
    public OrderCartDto list(Integer userId){
        OrderCartDto orderCartDto = new OrderCartDto();
        List<OrderItem> orderItemList =orderItemMapper.selectOrderItemListByUserId(userId);

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
        return orderCartDto;
    }

    //订单号生成(用户id+时间戳+随机数0-99)
    private BigInteger generateOrderNo(Integer userId){
        long currentTime = System.currentTimeMillis();
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(userId).append(currentTime).append(new Random().nextInt(100));
        if (stringBuilder.toString().length()>20){
            return BigInteger.valueOf(Long.parseLong(stringBuilder.toString().substring(0,20)));
        }
        return BigInteger.valueOf(Long.parseLong(stringBuilder.toString()));
    }

    private BigDecimal getOrderTotalPrice(List<OrderItem> orderItemList){
        BigDecimal payment = new BigDecimal("0");
        for (OrderItem orderItem : orderItemList) {
            payment = BigDecimalUtil.add(payment.doubleValue(),orderItem.getTotalPrice().doubleValue());
        }
        return payment;
    }


}
