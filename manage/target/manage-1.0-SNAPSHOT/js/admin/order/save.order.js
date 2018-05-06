
var $table = $('#table');
var userId='';
var usersId='';
var selectionIds='';
var orderNo  = '';
$(function () {
    usersId = $Utils.getUrlParameters().usersId;
    selectionIds = $Utils.getUrlParameters().selectionIds;
    orderNo = $Utils.getUrlParameters().orderNo;
    fillDataFun();


    $(document).on('focus', 'input[type="text"]', function() {
        $(this).parent().find('label').addClass('active');
    }).on('blur', 'input[type="text"]', function() {
        if ($(this).val() === '') {
            $(this).parent().find('label').removeClass('active');
        }
    });

    $.ajax({
        url:basePath+'manage/user/getUserInfo.do',
        type:'POST', //GET
        async:true,
        timeout:5000,    //超时时间
        dataType:'json',
        success:function(data){
            userId = data.data.id;
            $("#loginUsername").text(data.data.username);
        }
    });
});

function fillDataFun(){
    $("#userId").val(usersId);
    $("#courseName").val(selectionIds);

}

/*---------------------------------*/

//拼装表单数据
function buildReqData(){
    var selectionIds = selectionIds;

    return JSON.stringify({
        paymentType : $("#pay").val(),
        remark : $("#remark").val(),
        orderNo : orderNo,
        userId : usersId

    });
}


function savePlaceFun(){
    $("#savePlaceBtn").attr('disabled','disabled');
        // 校验
        var actionUrl = basePath+"manage/order/create.do";
        //保存信息
        $.ajax({
            url:actionUrl,
            dataType: "json",
            data:buildReqData(),
            type:"post",
            async : false,
            contentType:"application/json;charset=UTF-8",
            success:function(data){
                $("#savePlaceBtn").removeAttr('disabled');
                if (data.status === 0) {
                    JqueryConfirm.successConfirm(data.msg,redirectManageFun());
                }else if(data.status === 1){
                    JqueryConfirm.errorConfirm(data.msg);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#savePlaceBtn").removeAttr('disabled');
            }
        })

}

function redirectManageFun(){
    window.location.href = basePath + "../../admin/course/user-course.html";
}
function backBtnFun(){
    window.history.go(-1);
}
