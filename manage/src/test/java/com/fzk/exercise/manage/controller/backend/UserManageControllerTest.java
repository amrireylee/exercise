package com.fzk.exercise.manage.controller.backend;

import com.fzk.exercise.manage.model.User;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 18:43 2018/4/16
 */
@RunWith(SpringJUnit4ClassRunner.class)  //使用junit4进行测试
@ContextConfiguration(locations={"classpath*:applicationContext.xml"})
public class UserManageControllerTest{

    @Autowired
    private UserManageController userManageController;

    @Test
    public void login() throws Exception {
    }

    @Test
    public void getAllUser() throws Exception {
        User user = new User();
        userManageController.getAllUser(user,0,10);
    }

    @Test
    public void addAdmin() throws Exception {
    }

    @Test
    public void resetPassword() throws Exception {
    }

}