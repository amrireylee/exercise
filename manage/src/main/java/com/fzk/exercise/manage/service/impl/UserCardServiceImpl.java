package com.fzk.exercise.manage.service.impl;

import com.fzk.exercise.manage.common.ServerResponse;
import com.fzk.exercise.manage.dao.UserCardMapper;
import com.fzk.exercise.manage.dao.UserMapper;
import com.fzk.exercise.manage.model.User;
import com.fzk.exercise.manage.model.UserCard;
import com.fzk.exercise.manage.service.IUserCardService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 10:05 2018/4/11
 */
@Service("iUserCardService")
public class UserCardServiceImpl implements IUserCardService {

    @Autowired
    private UserCardMapper userCardMapper;

    @Autowired
    private UserMapper userMapper;

    //list
    public ServerResponse<PageInfo> list(UserCard userCard, int pageNum, int pageSize ){
        PageHelper.startPage(pageNum,pageSize);
        List<UserCard> userCardList = userCardMapper.list(userCard);
        PageInfo pageResult = new PageInfo(userCardList);
        return ServerResponse.createBySuccess("查询成功",pageResult);
    }

    //发卡：userid,start_time,end_time
    //续卡: userid,end_time
    @Transactional
    public ServerResponse<UserCard> addNewUserCard(UserCard userCard){
        //发卡
        if (userCard.getStartTime()!=null){
            User user = new User();
            user.setId(userCard.getUserId());
            user.setVipStatus(0);
            int updateUserResult = userMapper.updateByPrimaryKeySelective(user);
            if (updateUserResult == 0){
                return ServerResponse.createByErrorMessage("发卡失败！（updateUser）");
            }
            userCard.setLostStatus(0);
            userCard.setUseStatus(0);
            userCard.setDelFlag(0);
            int resultCount = userCardMapper.grantCard(userCard);
            if (resultCount > 0){
                return ServerResponse.createBySuccess("发卡成功！",userCard);
            }
            return ServerResponse.createByErrorMessage("发卡失败！（grantCard）");
        }
        //续卡
        else{
            int resultCount = userCardMapper.updateCard(userCard);
            if (resultCount > 0){
                return ServerResponse.createBySuccess("续卡成功！",userCard);
            }
            return ServerResponse.createByErrorMessage("续卡失败！");
        }
    }

    //挂失
    public ServerResponse<UserCard> lostUserCard(Integer cardId){
        int resultCount = userCardMapper.cardLostStatus(cardId);
        if (resultCount==0){
            return ServerResponse.createByErrorMessage("挂失失败,检查会员卡卡号是否正确！");
        }
        return ServerResponse.createBySuccessMessage("挂失成功！");
    }

    //补卡
    public ServerResponse<UserCard> replaceUserCard(Integer cardId){
        int resultCount = userCardMapper.cardUseStatus(cardId);
        if (resultCount==0){
            return ServerResponse.createByErrorMessage("补卡失败,检查会员卡卡号是否正确！");
        }
        return ServerResponse.createBySuccessMessage("补卡成功！");
    }

    //退卡
    public ServerResponse<UserCard> deleteUserCard(Integer cardId){
        int resultCount = userCardMapper.cardDelStatus(cardId);
        if (resultCount==0){
            return ServerResponse.createByErrorMessage("退卡失败,检查会员卡卡号是否正确！");
        }
        User user = new User();
        user.setId(cardId);
        user.setVipStatus(1);
        int updateUserResult = userMapper.updateByPrimaryKeySelective(user);
        if (updateUserResult == 0){
            return ServerResponse.createByErrorMessage("退卡失败！（updateUser）");
        }
        return ServerResponse.createBySuccessMessage("退卡成功！");
    }



}
