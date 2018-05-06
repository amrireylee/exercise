package com.fzk.exercise.manage.service.impl;

import com.fzk.exercise.manage.common.Const;
import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dao.UserMapper;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.service.IUserService;
import com.fzk.exercise.manage.utils.RandomUtils;
import com.fzk.exercise.manage.utils.SendEmailUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.net.ntp.TimeStamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.DigestUtils;

import java.util.List;


/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 11:14 2018/4/10
 */
@Service("iUserService")
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserMapper userMapper;

    public ServerResponse<User> login(String username,String password){
        int resultCount = userMapper.checkUserName(username);
        if (resultCount==0){
            return ServerResponse.createByErrorMessage("用户名不存在");
        }
        String md5Password = DigestUtils.md5DigestAsHex(password.getBytes());
        User user = userMapper.selectLogin(username,md5Password);

        if (user==null){
            return ServerResponse.createByErrorMessage("密码错误");
        }
        user.setPassword(StringUtils.EMPTY);
        return ServerResponse.createBySuccess("登陆成功",user);
    }

    @Transactional
    public ServerResponse<User> register(User user){
        int resultCount = userMapper.checkUserName(user.getUsername());
        if (resultCount>0){
            return ServerResponse.createByErrorMessage("用户已存在");
        }
        if(user.getRole()==null){
            user.setRole(Const.Role.ROLE_VIP);
        }
        user.setVipStatus(1);
        //MD5加密
        user.setPassword(DigestUtils.md5DigestAsHex(user.getPassword().getBytes()));

        int resultCount1 = userMapper.insertUser(user);
        if (resultCount1==0){
            return  ServerResponse.createByErrorMessage("注册失败");
        }
        user.setPassword("");
        return ServerResponse.createBySuccess("注册成功",user);
    }

    //找回密码
    @Transactional
    public ServerResponse<String> findPassword(String username,String email){
        int resultCount = userMapper.checkUserName(username);
        if (resultCount==0){
            return ServerResponse.createByErrorMessage("用户名不存在");
        }
        int emailCount = userMapper.checkUserNameAndEmail(username,email);
        if (emailCount==0){
            return ServerResponse.createByErrorMessage("用户名和邮箱不匹配或邮箱有误");
        }
        Integer userId = userMapper.getUserIdByEmail(email);
        User user = userMapper.selectById(userId);
        String key = RandomUtils.getRandom(4)+"";
        TimeStamp outDate = new TimeStamp(System.currentTimeMillis()+(long)(60*60*1000));//60分钟后过期,忽略毫秒数
        System.out.println("outDate.getDate():"+outDate.getDate());
        user.setUrl(key);
        user.setUpdateTime(outDate.getDate());
        int resultCount2 = userMapper.updateUserUrl(user);
        if (resultCount2==0){
            return ServerResponse.createByErrorMessage("sid没有被覆盖,无法找回密码");
        }
        System.out.println("key:"+key);
        SendEmailUtils.sendRegisterCode(email,key);
        return ServerResponse.createBySuccess("发送验证码成功！");
    }


    public ServerResponse verifyMail(String sid,String account){
        System.out.println(account);
        Integer userId = userMapper.getUserIdByEmail(account);
        System.out.println(userId);
        User user = userMapper.selectById(userId);
        System.out.println(user.toString());
        System.out.println("user.getUrl():"+user.getUrl());
        System.out.println(user.getUpdateTime());
        long outTime= user.getUpdateTime().getTime();
        System.out.println("outTime:"+outTime);
        TimeStamp outDate = new TimeStamp(System.currentTimeMillis());
        long nowTime=outDate.getTime();
        System.out.println("nowTime:"+nowTime);
        if(outTime<=nowTime){
            return ServerResponse.createByErrorMessage("verifyMail time is overdue");
        }else if("".equals(sid)){
            return ServerResponse.createByErrorMessage("sid is incomplete content");
        }else if(!sid.equals(user.getUrl())){
            return ServerResponse.createByErrorMessage("sid is error");
        }else{
            return ServerResponse.createBySuccess("no error",userId);
        }
    }

    public ServerResponse<String> resetPassword(String passwordNew,Integer userId){
        User user = userMapper.selectById(userId);
        user.setPassword(DigestUtils.md5DigestAsHex(passwordNew.getBytes()));
        int updateCount = userMapper.updateUser(user);
        if (updateCount>0){
            return ServerResponse.createBySuccessMessage("密码更新成功");
        }
        return ServerResponse.createByErrorMessage("密码更新失败");
    }

    public ServerResponse<User> updateInformation(User user){
        //username是不能被更新的
        //email也要进行校验，校验新的email是不是已经存在，并且存在的email如果相同的话，不能使当前的用户的email了
        int resultCount = userMapper.checkEmailByUserId(user.getEmail(),user.getId());
        if (resultCount>0){
            return ServerResponse.createByErrorMessage("email已经存在，请更换");
        }
        User updateUser = new User();
        updateUser.setId(user.getId());
        updateUser.setUsername(user.getUsername());
        updateUser.setEmail(user.getEmail());
        updateUser.setPhone(user.getPhone());

        int updateCount = userMapper.updateUser(updateUser);
        //todo print delete
        System.out.println("updateCount:"+updateCount);
        if (updateCount>0){
            return ServerResponse.createBySuccess("更新个人信息成功",updateUser);
        }
        return ServerResponse.createByErrorMessage("更新个人信息失败");

    }

    public ServerResponse<User> getInformation(Integer userId){
        User user = userMapper.selectById(userId);
        if (user==null){
            return ServerResponse.createByErrorMessage("用户名错误");
        }
        return ServerResponse.createBySuccess(user);
    }

    public boolean usernameVali(String username){
        int checkUserName = userMapper.checkUserName(username);
        return checkUserName == 0;
    }

    public boolean emailVali(String email){
        int checkUserName = userMapper.checkEmail(email);
        return checkUserName == 0;
    }


    //backend

    /*
      校验是否是管理员
      @param user
     * @return
     */
    public ServerResponse checkAdminRole(User user){
        if (user != null&&user.getRole().intValue() == Const.Role.ROLE_ADMIN){
            return ServerResponse.createBySuccess();
        }
        return ServerResponse.createByError();
    }

    public ServerResponse<PageInfo> list(User user, int pageNum, int pageSize){
        PageHelper.startPage(pageNum,pageSize);

        List<User> userList = userMapper.list(user);
        PageInfo pageResult = new PageInfo(userList);

        return ServerResponse.createBySuccess("查询成功",pageResult);
    }

    public ServerResponse addAdminRole(User user){
        int resultCount = userMapper.updateByPrimaryKeySelective(user);
        if (resultCount == 0){
            return ServerResponse.createByError();
        }
        return ServerResponse.createBySuccess();
    }

}
