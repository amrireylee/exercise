var id = '';
$(function() {
    id = $Utils.getUrlParameters().id;
    fillDataFun(id);

    $.ajax({
        url:basePath+'manage/user/getUserInfo.do',
        type:'POST', //GET
        async:true,
        timeout:5000,    //超时时间
        dataType:'json',
        success:function(data){
            $("#loginUsername").text(data.data.username);
        }
    });
});


function fillDataFun(id){
    //请求展示数据
    if(id){
        $.ajax({
            type: "get",
            url: basePath + "manage/user/list.do",
            data: {
                id: id
            },
            dataType: "json",
            async : false,
            success: function (data) {
                if (data.status === 0 && data.data) {
                    userList = data.data.list;
                    //console.log(salesData);
                    for(var i = 0;i<userList.length;i++){

                        $("#detailUserId").val(userList[i].id);
                        $("#detailUsername").val(userList[i].username);
                        $("#detaiElmail").val(userList[i].email);
                        $("#detailPhone").val(userList[i].phone);
                        $("#detailRole").val(userList[i].role);
                        $("#detailVipStatus").val(userList[i].vipStatus);
                    }
                }
            }
        });
    }

}


/*---------------------------------*/


function backBtnFun(){
    window.history.go(-1);
}