package com.fzk.exercise.manage.dao;

import com.fzk.exercise.manage.model.Order;
import org.apache.ibatis.annotations.Param;

import java.math.BigInteger;
import java.util.List;

public interface OrderMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Order record);

    int insertSelective(Order record);

    Order selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Order record);

    int updateByPrimaryKey(Order record);

    Order selectByOrderNo(BigInteger orderNo);

    List<Order> search(Order order);

    List<Order> selectAllOrder();

    Order selectByUserIdAndOrderNo(@Param("userId") Integer userId, @Param("orderNo") BigInteger orderNo);

    List<Order> selectByUserId(Integer userId);

}