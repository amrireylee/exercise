package com.fzk.exercise.manage.dao;

import com.fzk.exercise.manage.model.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UserMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    int checkUserName(@Param("username") String username);

    int checkEmail(@Param("email") String email);

    User selectLogin(@Param("username") String username, @Param("password") String password);

    int insertUser(User user);

    int checkUserNameAndEmail(@Param("username") String username, @Param("email") String email);

    int getUserIdByEmail(@Param("email") String email);

    User selectById(@Param("id") Integer userId);

    int updateUserUrl(User user);

    int updateUser(User user);

    int checkEmailByUserId(@Param("email") String email,@Param("id") Integer userId);

    List<User> list(User user);
}