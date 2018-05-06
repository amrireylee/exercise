package com.fzk.exercise.manage.dao;

import com.fzk.exercise.manage.model.OrderItem;
import org.apache.ibatis.annotations.Param;

import java.math.BigInteger;
import java.util.List;

public interface OrderItemMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(OrderItem record);

    int insertSelective(OrderItem record);

    OrderItem selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(OrderItem record);

    int updateByPrimaryKey(OrderItem record);

    OrderItem selectOrderByUserIdCourseId(@Param("userId") Integer userId, @Param("courseId") Integer courseId);

    void batchInsert(@Param("orderItemList")List<OrderItem> orderItemList);

    int deleteByUserIdOrderItemIds(@Param("userId") Integer userId,@Param("orderItemIdsList") List<String> orderItemIdsList);

    List<OrderItem> selectOrderItemListByUserId(Integer userId);

    List<OrderItem> getByOrderNoUserId(@Param("orderNo") BigInteger orderNo, @Param("userId") Integer userId);

    List<OrderItem> getByOrderNo(@Param("orderNo") BigInteger orderNo);

    int sumByProjectId(@Param("projectId") Integer projectId);
    //sumByCourseId
    int sumByCourseId(@Param("courseId") Integer courseId);

}