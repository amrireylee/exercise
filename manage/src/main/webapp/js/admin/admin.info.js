$(function() {

    $.ajax({
        url:basePath+'manage/user/getUserInfo.do',
        type:'POST', //GET
        async:true,
        timeout:5000,    //超时时间
        dataType:'json',
        success:function(data){
            $("#loginUsername").text(data.data.username);
            $("#userCreateTime").text(data.data.createTime);
            $("#userPhone").text(data.data.phone);
            $("#userEmail").text(data.data.email);
            $("#username1").text(data.data.username);
            $("#username").text(data.data.username);
        }
    });
});