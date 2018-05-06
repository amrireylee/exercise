package com.fzk.exercise.manage.common;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import java.io.Serializable;

/**
 * @Author: Amrir
 * @Description:
 * @Date: Created in 14:10 2017/10/30
 */
@JsonSerialize(include = JsonSerialize.Inclusion.NON_NULL)
//保证序列化Json的时候，如果是null的对象，key也会消失
public class ServerResponse<T> implements Serializable {

    private int status;
    private String msg;
    private T data;

    /*四个构造方法*/
    private ServerResponse(int status){
        this.status = status;
    }
    private ServerResponse(int status,T data){
        this.status =status;
        this.data = data;
    }
    public ServerResponse(int status, String msg) {
        this.status = status;
        this.msg = msg;
    }
    public ServerResponse(int status, String msg, T data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    @JsonIgnore
    //使之不在Json序列化结果中
    public boolean isSuccess(){
        return this.status==ResponseCode.SUCCESS.getCode();
    }
    /*三个getter方法*/
    public int getStatus() {
        return status;
    }
    public String getMsg() {
        return msg;
    }
    public T getData() {
        return data;
    }
    /*四个Success方法*/
    public static <T> ServerResponse<T> createBySuccess(){
        return new ServerResponse<T>(ResponseCode.SUCCESS.getCode());
    }
    public static <T> ServerResponse<T> createBySuccessMessage(String msg){
        return new ServerResponse<T>(ResponseCode.SUCCESS.getCode(),msg);
    }
    public static <T> ServerResponse<T> createBySuccess(T data){
        return new ServerResponse<T>(ResponseCode.SUCCESS.getCode(),data);
    }
    public static <T> ServerResponse<T> createBySuccess(String msg,T data){
        return new ServerResponse<T>(ResponseCode.SUCCESS.getCode(),msg,data);
    }
    /*三个Error方法*/
    public static <T> ServerResponse<T> createByError(){
        return new ServerResponse<T>(ResponseCode.ERROR.getCode(),ResponseCode.ERROR.getDesc());
    }
    public static <T> ServerResponse<T> createByErrorMessage(String errorMessage){
        return new ServerResponse<T>(ResponseCode.ERROR.getCode(),errorMessage);
    }
    public static <T> ServerResponse<T> createByErrorCodeMessage(int errorCode,String errorMessage){
        return new ServerResponse<T>(errorCode,errorMessage);
    }

}
