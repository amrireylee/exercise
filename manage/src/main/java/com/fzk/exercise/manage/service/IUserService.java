package com.fzk.exercise.manage.service;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.model.User;
import com.github.pagehelper.PageInfo;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 11:13 2018/4/10
 */
public interface IUserService {
    ServerResponse<User> login(String username, String password);

    ServerResponse<User> register(User user);

    ServerResponse<String> findPassword(String username,String email);

    ServerResponse verifyMail(String sid,String account);

    ServerResponse<String> resetPassword(String passwordNew,Integer userId);

    ServerResponse<User> updateInformation(User user);

    ServerResponse<User> getInformation(Integer userId);

    ServerResponse checkAdminRole(User user);

    ServerResponse<PageInfo> list(User user, int pageNum, int pageSize);

    ServerResponse addAdminRole(User user);

    boolean usernameVali(String username);

    boolean emailVali(String email);
}
