var $table = $('#table');
var userId='';
var sonRes = '';

var subRes;
var tempRes;
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
    $table.bootstrapTable({
        url: basePath+"manage/order/order_list.do",
        method:'get',
        queryParamsType:'', //传递参数（*）
        striped: true,
        search: false,
        searchOnEnterKey: true,
        showRefresh: true,
        showToggle: true,
        showColumns: true,
        minimumCountColumns: 2,
        showPaginationSwitch: false,
        clickToSelect: true,
        detailView: true,
        detailFormatter:detailFormatter,
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
        responseHandler: function(res) {
            sonRes = res.data.list;
            return {
                "total": res.data.total,//总页数
                "rows": res.data.list   //数据
            };
        },
        columns: [
            /*{field: 'Number', title: '序号', halign: 'center', formatter: 'numberFormatter'},*/
            {field: 'order.id', title: '订单ID', valign: 'middle',align: 'center',formatter : 'idFormatter'},
            {field: 'order.orderNo', title: '订单号', valign: 'middle',align: 'center'},
            {field: 'order.userId', title: '用户ID', valign: 'middle',align: 'center'},
            {field: 'order.payment', title: '总价/元', valign: 'middle',align: 'center'},
            {field: 'order.paymentType', title: '付款状态', valign: 'middle',align: 'center',formatter : 'paymentTypeFormatter'},
            {field: 'order.status', title: '订单状态', valign: 'middle',align: 'center',formatter : 'statusFormatter'},
            {field: 'order.remark', title: '备注', valign: 'middle',align: 'center'},
            {field: 'order.paymentTime', title: '付款时间', valign: 'middle',align: 'center'},
            {field: 'action', title: '操作', valign: 'middle', align: 'left', formatter: 'actionFormatter', clickToSelect: false}
        ]/*,
        onExpandRow: function (index, row, $detail) {
            InitSubTable(index, row, $detail);
        }*/
    }).on('all.table', function (e, name, args) {
        $('[data-toggle="tooltip"]').tooltip();//提示工具
        $('[data-toggle="popover"]').popover();//弹出框工具
    });

    $('#saveModal').on('hide.bs.modal', function () {
        // 执行一些动作...
        $("#table").bootstrapTable('refresh');
    });

    function detailFormatter(index, row) {
        var html = [];
        console.info(row);
        tempRes = row.orderCartDto.cartTotalPrice;
        html.push('<p style="display:inline-block;font-size: 17px;word-spacing: 7px;letter-spacing: 2px;margin: 4px 18px 4px 0;"><b>总价:</b><b style="color: #1d6fa6"> ' + tempRes + ';</b></p>');
        html.push('<br>');


        $.each(row.orderCartDto.orderItemDtoList, function (key, value) {
            html.push('<br>');
            html.push('<br>');
            $.each(value, function (key, value) {
                if(value !== null){
                    if(key==='userId'){
                        html.push('<p style="display:inline-block;font-size: 17px;word-spacing: 7px;letter-spacing: 2px;margin: 4px 18px 4px 0;"><b>' + "用户id" + ':</b><b style="color: #1d6fa6"> ' + value + ';</b></p>');
                    }
                    if(key==='orderNo'){
                        html.push('<p style="display:inline-block;font-size: 17px;word-spacing: 7px;letter-spacing: 2px;margin: 4px 18px 4px 0;"><b>' + "订单Id" + ':</b><b style="color: #1d6fa6"> ' + value + ';</b></p>');
                    }
                    if(key==='projectId'){
                        html.push('<p style="display:inline-block;font-size: 17px;word-spacing: 7px;letter-spacing: 2px;margin: 4px 18px 4px 0;"><b>' + "项目Id" + ':</b><b style="color: #1d6fa6"> ' + value + ';</b></p>');
                    }
                    if(key==='projectName'){
                        html.push('<p style="display:inline-block;font-size: 17px;word-spacing: 7px;letter-spacing: 2px;margin: 4px 18px 4px 0;"><b>' + "项目名称" + ':</b><b style="color: #1d6fa6"> ' + value + ';</b></p>');
                    }
                    if(key==='courseId'){
                        html.push('<p style="display:inline-block;font-size: 17px;word-spacing: 7px;letter-spacing: 2px;margin: 4px 18px 4px 0;"><b>' + "课程Id" + ':</b><b style="color: #1d6fa6"> ' + value + ';</b></p>');
                    }
                    if(key==='currentUnitPrice'){
                        html.push('<p style="display:inline-block;font-size: 17px;word-spacing: 7px;letter-spacing: 2px;margin: 4px 18px 4px 0;"><b>' + "当前价格" + ':</b><b style="color: #1d6fa6"> ' + value + '元;</b></p>');
                    }
                    if(key==='totalPrice'){
                        html.push('<p style="display:inline-block;font-size: 17px;word-spacing: 7px;letter-spacing: 2px;margin: 4px 18px 4px 0;"><b>' + "实际价格" + ':</b><b style="color: #1d6fa6"> ' + value + '元;</b></p>');
                    }
                    if(key==='createTime'){
                        html.push('<p style="display:inline-block;font-size: 17px;word-spacing: 7px;letter-spacing: 2px;margin: 4px 18px 4px 0;"><b>' + "创建时间" + ':</b><b style="color: #1d6fa6"> ' + value + ';</b></p>');
                    }
                }
            });
        });
        return html.join('');
    }

//初始化子表格(无线循环)
    var InitSubTable = function (index, row, $detail) {
        subRes = row.order.orderNo;
        var cur_table = $detail.html('<table></table>').find('table');
        $(cur_table).bootstrapTable({
            url: basePath+"order_item/detail.do",//子表的异步加载URL
            method: 'get',
            search: false,
            pagination: false,
            paginationLoop: false,
            queryParams : function(params) {//子表加载过程中的参数
                return { orderNo : row.order.orderNo }
            },
            ajaxOptions: { orderNo : row.order.orderNo },
            clickToSelect: true,
            uniqueId: "id",
            pageSize: 10,
            pageList: [10, 25],
            responseHandler: function(res) {
                return {
                    "total": res.data.length,//总页数
                    "rows": res.data.orderItemDtoList   //数据
                };
            },
            columns: [{
                checkbox: true
            }, {
                field: 'id',
                title: '订单序号'
            }, {
                field: 'orderItemDtoList.projectId',
                title: '项目ID'
            }, {
                field: 'orderItemDtoList.projectName',
                title: '项目名'
            }, {
                field: 'orderItemDtoList.courseId',
                title: '课程ID'
            }, {
                field: 'orderItemDtoList.totalPrice',
                title: '价格'
            } ]

        });
    };
});


function responseHandler1(res) {
   // res.total = sonRes[0].orderCartDto.orderItemDtoList.length;//总页数
    //res.rows = sonRes;  //数据
    return {
        "total": res.orderCartDto.orderItemDtoList.length,//总页数
        "rows": res   //数据
    }
}

function queryParams(params) {  //bootstrapTable自带参数
    var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        pageSize : params.pageSize,   //页面大小
        pageNum : params.pageNumber,  //页码
        sort : params.sort,  //排序列名
        sortOrder : params.order,//排位命令（desc，asc）
        orderNo : $('#txt_search_order_no').val(),
        userId : $('#txt_search_user_id').val(),
        id : $('#txt_search_id').val(),
        status : $('#txt_search_status').val(),
        paymentType : $('#txt_search_payment').val()
    };
    return temp;
}

//todo 目前不需要
function idFormatter(index, row) {
    return [
        '<a class="btn btn-link" target="_blank" href='+row.order.id+'"../../../admin/user/search-user.html?id=">'+row.order.id+'</a>'
    ].join('');
}

function  paymentTypeFormatter(value, row, index) {
    if(value === 1){
        return '<span class="label label-success">在线支付</span>';
    }else if(value === 2){
        return '<span class="label label-success">现金</span>';
    }else if(value === 3){
        return '<span class="label label-default">刷卡</span>';
    }
}

function  statusFormatter(value, row, index) {
    if(value === 10){
        return '<span class="label label-success">未付款</span>';
    }else if(value === 20){
        return '<span class="label label-success">已付款</span>';
    }else if(value === 50){
        return '<span class="label label-default">交易成功</span>';
    }else if(value === 60){
        return '<span class="label label-default">交易关闭</span>';
    }else {
        return '<span class="label label-default">已取消</span>';
    }
}

function actionFormatter(value, row, index) {
    var html = [];
    //console.info(row.activityStatus);
    if (row.order.status===10){
        html.push('<button id="btn_edit" type="button" class="btn btn-primary btn-sm" onclick="payFun('+row.order.orderNo+')">',
            '<span class="icon-edit" aria-hidden="true"></span>支付</button>');
    }
    if (row.order.status===20){
        html.push('<button id="btn_edit" type="button" class="btn btn-primary btn-sm" onclick="paySuccessFun('+row.order.orderNo+')">',
            '<span class="icon-edit" aria-hidden="true"></span>交易结束</button>');
    }
    html.push('<button id="btn_edit" type="button" class="btn btn-primary btn-sm" onclick="cancelFun('+row.order.orderNo+","+row.order.userId+')">',
            '<span class="icon-edit" aria-hidden="true"></span>交易关闭</button>');

    /*html.push('<button id="btn_delete" type="button" class="btn btn-primary btn-sm" onclick="deleteCourseFun('+row.courseId+')">',
        '<span class="icon-edit" aria-hidden="true"></span>删除</button>');
*/
    return html.join('');
}


function queryBtnFun(){
    $("#table").bootstrapTable('refresh');
}




//拼装表单数据
function buildReqData1(id){
    return JSON.stringify({
        id : id
    });
}


function payFun(id) {
    var actionUrl = basePath+"manage/order/pay.do";
    $.ajax({
        url:actionUrl,
        dataType: "json",           //接受数据格式
        data:{
            orderNo : id
        },
        type:"POST",
        async : false,
        success:function(data){
            if (data.status === 0) {
                JqueryConfirm.successConfirm(data.msg);
            } else if (data.status === 1) {
                JqueryConfirm.errorConfirm(data.msg);
            }
            queryBtnFun();
        },
        error:function(data){
            JqueryConfirm.errorConfirm(data.msg);
            queryBtnFun();
        }
    })
}

function paySuccessFun(id) {
    var actionUrl = basePath+"manage/order/pay_success.do";
    $.ajax({
        url:actionUrl,
        dataType: "json",           //接受数据格式
        data:{
            orderNo : id
        },
        type:"POST",
        async : false,
        success:function(data){
            if (data.status === 0) {
                JqueryConfirm.successConfirm(data.msg);
            } else if (data.status === 1) {
                JqueryConfirm.errorConfirm(data.msg);
            }
            queryBtnFun();
        },
        error:function(data){
            JqueryConfirm.errorConfirm(data.msg);
            queryBtnFun();
        }
    })
}


function cancelFun(id,userId) {
    var actionUrl = basePath+"manage/order/cancel.do";
    $.ajax({
        url:actionUrl,
        dataType: "json",           //接受数据格式
        data:{
            userId : userId,
            orderNo : id
        },
        type:"GET",
        async : false,
        success:function(data){
            if (data.status === 0) {
                JqueryConfirm.successConfirm(data.msg);
            } else if (data.status === 1) {
                JqueryConfirm.errorConfirm(data.msg);
            }
            queryBtnFun();
        },
        error:function(data){
            JqueryConfirm.errorConfirm(data.msg);
            queryBtnFun();
        }
    })
}

