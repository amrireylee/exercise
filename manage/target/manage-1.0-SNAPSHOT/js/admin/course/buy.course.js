var $table = $('#table');
var userId='';

var selectionIds = [];  //保存选中ids

$(function () {
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

    // bootstrap table初始化
    $table = $table.bootstrapTable({
        url: basePath+"manage/course/list.do",
        method:'get',
        queryParamsType:'', //传递参数（*）
        striped: true,
        search: false,
        searchOnEnterKey: true,
        showRefresh: true,
        showToggle: false,
        showColumns: true,
        minimumCountColumns: 2,
        showPaginationSwitch: false,
        clickToSelect: true,
        detailView: false,
        pagination: true,
        paginationLoop: false,
        pageSize: 10,                       //每页的记录行数（*）
        pageList: [10, 25, 50, 100],        //可供选择的每页的行数（*）
        classes: 'table table-hover table-no-bordered',
        sidePagination: 'server',
        queryParams: queryParams, //参数
        //silentSort: false,
        smartDisplay: false,
        idField: 'id',
        sortName: 'id',
        sortOrder: 'desc',
        escape: true,
        maintainSelected: true,
        toolbar: '#toolbar',
        responseHandler: responseHandler,
        columns: [
            {field: 'checkStatus',checkbox: true, valign: 'middle',align: 'center'},
            /*{field: 'Number', title: '序号', halign: 'center', formatter: 'numberFormatter'},*/
            {field: 'courseId', title: '课程ID', valign: 'middle',align: 'center',formatter : 'idFormatter'},
            {field: 'courseName', title: '课程名称', valign: 'middle',align: 'center'},
            {field: 'courseDesc', title: '课程描述', valign: 'middle',align: 'center'},
            {field: 'startTime', title: '开始时间', valign: 'middle',align: 'center'},
            {field: 'endTime', title: '结束时间', valign: 'middle',align: 'center'},
            {field: 'projectName', title: '项目名称', valign: 'middle',align: 'center'},
            {field: 'courseTime', title: '课时', valign: 'middle',align: 'center'},
            {field: 'placeId', title: '场地ID', valign: 'middle',align: 'center',formatter : 'placeIdFormatter'},
            {field: 'username', title: '教练名字', valign: 'middle',align: 'center'},
            {field: 'money', title: '价格', valign: 'middle',align: 'center'},
            {field: 'projectSum', title: '项目选择次数', valign: 'middle',align: 'center'},
            {field: 'courseSum', title: '课程选择次数', valign: 'middle',align: 'center'},
        ]
    }).on('all.bs.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();//提示工具
        $('[data-toggle="popover"]').popover();//弹出框工具
    });

    $('#saveModal').on('hide.bs.modal', function () {
        // 执行一些动作...
        $("#table").bootstrapTable('refresh');
    });

    //选中事件操作数组
    var union = function(array,ids){
        $.each(ids, function (i, id) {
            if($.inArray(id,array)===-1){
                array[array.length] = id;
            }
        });
        return array;
    };
    //取消选中事件操作数组
    var difference = function(array,ids){
        $.each(ids, function (i, id) {
            var index = $.inArray(id,array);
            if(index!==-1){
                array.splice(index, 1);
            }
        });
        return array;
    };
    var _ = {"union":union,"difference":difference};

    $table.on('check.bs.table check-all.bs.table uncheck.bs.table uncheck-all.bs.table', function (e, rows) {
        var ids = $.map(!$.isArray(rows) ? [rows] : rows, function (row) {
            return row.courseId;
        });
        func = $.inArray(e.type, ['check', 'check-all']) > -1 ? 'union' : 'difference';
        selectionIds = _[func](selectionIds, ids);
        console.info(selectionIds);
    });
});

//表格分页之前处理多选框数据
function responseHandler(res) {
    res.total = res.data.total;//总页数
    res.rows = res.data.list ;  //数据
    $.each(res.rows, function (i, row) {
        row.checkStatus = $.inArray(row.courseId, selectionIds) != -1;  //判断当前行的数据id是否存在与选中的数组，存在则将多选框状态变为true
    });

    return res;
}

function queryParams(params) {  //bootstrapTable自带参数
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize : params.pageSize,   //页面大小
        pageNum : params.pageNumber,  //页码
        sort : params.sort,  //排序列名
        sortOrder : params.order//排位命令（desc，asc）
    };
    return temp;
}

//todo 目前不需要
function idFormatter(index, row) {
    return [
        '<a class="btn btn-link" target="_blank" href='+row.courseId+'"../../../admin/user/search-user.html?id=">'+row.courseId+'</a>'
    ].join('');
}

function placeIdFormatter(index, row) {
    return [
        '<a class="btn btn-link" target="_blank" href='+row.placeId+'"../../../admin/user/search-user.html?id=">'+row.placeId+'</a>'
    ].join('');
}

var usersId = '';
//拼装表单数据
function buildReqData(){
    usersId = $("#txt_user_id").val();

    var ids = "";
    for(var i =0 ;i <selectionIds.length;i++){
        ids = ids+selectionIds[i]+",";
    }
console.info(ids);
    return JSON.stringify({
        usersId : usersId,
        courseListIds : ids
    });
}
var orderNo = '';
function buyBtnFun(){
    $("#buyBtn").attr('disabled','disabled');
        // 校验
        var actionUrl = basePath+"order_item/save.do";
        //保存信息
        $.ajax({
            url:actionUrl,
            dataType: "json",
            data:buildReqData(),
            type:"post",
            async : false,
            contentType:"application/json;charset=UTF-8",
            success:function(data){
                $("#buyBtn").removeAttr('disabled');
                if (data.status === 0) {
                    orderNo = data.data.orderItemDtoList[0].orderNo;
                    JqueryConfirm.successConfirm(data.msg,redirectManageFun());
                }else if(data.status === 1){
                    JqueryConfirm.errorConfirm(data.msg);
                }
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                $("#buyBtn").removeAttr('disabled');
            }
        })


}

function redirectManageFun() {
    window.location.href = basePath + "../../admin/order/save-order.html?usersId="+usersId+"&selectionIds="+selectionIds+"&orderNo="+orderNo;
}