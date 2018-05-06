
function logout(){
    var actionUrl = basePath+"user/logout.do";
    $.ajax({
        url:actionUrl,
        dataType: "json",
        type:"POST",
        async : false,
        success:function(data){
            if (data.status === 0) {
                JqueryConfirm.successConfirm(data.msg,redirectloginFun1());
            } else if (data.status === 1) {
                JqueryConfirm.errorConfirm(data.msg);
            }
        },
        error:function(data){
            JqueryConfirm.errorConfirm(data.msg);
        }
    })
}

function redirectloginFun1(){
    window.location.href = basePath;
}