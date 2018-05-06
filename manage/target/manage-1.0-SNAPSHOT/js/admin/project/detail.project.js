

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
            url: basePath + "manage/course/list.do",
            data: {
                id: id
            },
            dataType: "json",
            async : false,
            success: function (data) {
                if (data.status === 0 && data.data) {
                    projectList = data.data.list;
                    //console.log(salesData);
                    for(var i = 0;i<projectList.length;i++){

                        $("#detailCourseId").val(projectList[i].courseId);
                        $("#detailCourseName").val(projectList[i].courseName);
                        $("#detailProjectId").val(projectList[i].projectId);
                        $("#detailStartTime").val(projectList[i].startTime);
                        $("#detailEndTime").val(projectList[i].endTime);
                        $("#detailProjectSum").val(projectList[i].projectSum);
                        $("#detailCourseSum").val(projectList[i].courseSum);
                        $("#detailPlaceId").val(projectList[i].placeId);
                        $("#detailCourseTime").val(projectList[i].courseTime);
                        $("#detailUsername").val(projectList[i].username);
                        $("#detailMoney").val(projectList[i].money);
                        $("#detailImg").valid(projectList[i].img);

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