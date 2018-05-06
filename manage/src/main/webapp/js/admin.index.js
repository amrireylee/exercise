// login-username
$(function() {
    $.ajax({
        url:basePath+'manage/user/getUserInfo.do',
        type:'POST', //GET
        async:true,
        timeout:5000,    //超时时间
        dataType:'json',
        success:function(data){
            $("#login-username").text(data.data.username);
        }
    });
});