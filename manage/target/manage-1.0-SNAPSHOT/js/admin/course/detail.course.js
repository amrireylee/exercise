

var id = '';
var imgPathPre = 'http://localhost:8080/img/';
$(function() {
    id = $Utils.getUrlParameters().courseId;
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
                    courseList = data.data.list;
                    //console.log(salesData);
                    for(var i = 0;i<courseList.length;i++){

                        $("#detailCourseId").val(courseList[i].courseId);
                        $("#detailCourseName").val(courseList[i].courseName);
                        $("#detailCourseDesc").val(courseList[i].courseDesc);
                        $("#detailProjectName").val(courseList[i].projectName);
                        $("#detailProjectSum").val(courseList[i].projectSum);
                        $("#detailCourseSum").val(courseList[i].courseSum);
                        $("#detailStartTime").val(courseList[i].startTime);
                        $("#detailEndTime").val(courseList[i].endTime);
                        $("#detailPlaceId").val(courseList[i].placeId);
                        $("#detailCourseTime").val(courseList[i].courseTime);
                        $("#detailUsername").val(courseList[i].username);
                        $("#detailMoney").val(courseList[i].money);
                        $("#detailImg").html("<img src="+imgPathPre+courseList[i].img+" class='col-xs-10'>");
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