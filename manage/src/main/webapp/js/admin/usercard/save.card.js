var id = '';
$(function() {
    id = $Utils.getUrlParameters().userId;
    fillDataFun(id);
console.info(id);

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

    $("#editStartDate").datetimepicker({
        language: "zh-CN",
        autoclose: true,//选中之后自动隐藏日期选择框
        clearBtn: true,//清除按钮
        todayBtn: true,//今日按钮
        startView:2,
        minView:0,
        minuteStep:1,
        startDate:new Date(),
        initialDate:new Date(),
        format: "yyyy-mm-dd hh:ii:ss"//日期格式
    }).on("click",function(){
        $("#editStartDate").datetimepicker("setEndDate",$("#editEndDate").val())
    });

    $("#editEndDate").datetimepicker({
        language: "zh-CN",
        autoclose: true,//选中之后自动隐藏日期选择框
        clearBtn: true,//清除按钮
        todayBtn: true,//今日按钮
        startView:2,
        minView:0,
        minuteStep:1,
        startDate:new Date(),
        initialDate:new Date(),
        format: "yyyy-mm-dd hh:ii:ss"//日期格式
    }).on("click",function(){
        $("#editEndDate").datetimepicker("setStartDate",$("#editStartDate").val())
    });
});


function fillDataFun(id){
    //请求展示数据
    if(id){
        $("#editUserId").val(id);
    }
}



/*---------------------------------*/

//拼装表单数据
function buildReqData(){
    //id
    var userId = $("#editUserId").val();
    //start
    var startTime = $("#editStartDate").val();
    //end
    var endTime = $("#editEndDate").val();

    return JSON.stringify({
        userId : userId,
        startTime : startTime,
        endTime : endTime
    });
}


function saveCardFun(){
    $("#saveCardFun").attr('disabled','disabled');
    if($("#saveCardForm").valid()){
        // 校验
        var actionUrl = basePath+"manage/user_card/save_update.do";
        //保存信息
        $.ajax({
            url:actionUrl,
            dataType: "json",
            data:buildReqData(),
            type:"post",
            contentType:"application/json;charset=UTF-8",
            async : false,
            success:function(data){
                $("#saveUserBtn").removeAttr('disabled');
                if (data.status === 0) {
                    JqueryConfirm.successConfirm(data.msg,redirectCardFun());
                }else if(data.status === 1){
                    JqueryConfirm.errorConfirm(data.msg);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#saveUserBtn").removeAttr('disabled');
            }
        })
    }else{
        $("#saveGroundBtn").removeAttr('disabled');
    }
}

function redirectCardFun(){
    window.location.href = basePath + "../../admin/usercard/search-user-card.html";
}
