/**
 * 正则表达式汇总
 * amrirey 2018/04/14
 */
//正整数
var intRegex = /^[1-9]\d*$/;
//日期正则
var dateRegex = /\d{4}-\d{2}-\d{2}/;
//手机号验证规则
var mobileRegex = /^1\d{10}$/;
//10个汉字
var tenChineseRegex = /^[\u4e00-\u9fa5]{1,10}$/;
//20个汉字
var twentyChineseRegex = /^[\u4e00-\u9fa5]{1,20}$/;


//不可输入字符校验
var notEnterRegex = /["'<>\&%/]/;
//购买方名称，客户管理客户名称正则
var couponNameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9（）]{2,100}$/;
//购买方名称不能录入字符正则
var notGmfMcRegex = /^[<>\"'&%/]$/;
//纳税人识别号正则
var nsrsbhRegex = /^[0-9A-Z]{15,20}$/;
//货物名称
var goodsNameReg = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{1,100}\s*$/;
//规格型号
var specificationModelReg = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{1,20}\s*$/;
//单位验证
var unitReg = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{1,16}\s*$/;
//前8后8正数
var eightDecRegex = /^[0-9]{1,8}(\.[0-9]{1,8})?$/;
//前8后3验证规则
var threeDecRegex = /^(-?)[0-9]{1,8}(\.[0-9]{1,3})?$/;
//前8后2正数验证规则
var twoPosiDecRegex = /^[0-9]{1,8}(\.[0-9]{1,2})?$/;
//前8后2（正负数0）验证规则
var twoDecRegex = /^(-?)[0-9]{1,8}(\.[0-9]{1,2})?$/;
//8位整数验证规则
var eightIntRegex = /^[0-9]{1,8}$/;
//人名验证规则
var personalNameRegex = /^[A-Za-z\u4e00-\u9fa5]{1,10}$/;
//字符串校验，不限长度
var strRegex = /[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]/;
//1-100个字符验证规则
var one2HundredStrRegex = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{1,100}\s*$/;
//1-250个字符验证规则
var one2TwoHundredFortyStrRegex = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{1,250}\s*$/;
//1-20个字符校验规则
var one2TwentyStrRegex = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{1,20}\s*$/;
//1-32个字符校验规则
var one2ThirtyTwoStrRegex = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{1,32}\s*$/;
//1-40个字符校验规则
var one2FortyStrRegex = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{1,40}\s*$/;
//1-16个字符校验规则
var one2SixteenStrRegex = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{1,16}\s*$/;
//2-20个字符校验规则
var two2TwentyStrRegex = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{2,20}\s*$/;
//2-14个字符校验规则
var two2fourteenStrRegex = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{2,14}\s*$/;
//6-20个字符校验规则
var six2TwentyStrRegex = /^\s*[\u4e00-\u9fa5\w\s~!@%#$^*+='?\-\\/(){}\[\],\.\|《》、，。！{}·#￥……*（）——:：“”？【】；‘’`_;\"]{6,20}\s*$/;
//企业名称校验规则
var enterpriseNameRegex = /^[\u4e00-\u9fa5a-zA-Z0-9（）]{2,40}$/;
//纳税人识别号校验规则
var taxpayerNumRegex = /^[0-9A-Z]{15,20}$/;
//地址验证规则
var addressRegex = /^[\u4e00-\u9fa5\w\s-_——#()（）、]{1,50}$/;
//地址验证不可输入字符
var notAddressRegex = /^["'<>\&%/]$/;
//电话验证规则,手机号固话同时满足
//var mobileOrGhReg = /^(1\d{10})|(([0-9]{3,4}-)?([2-9][0-9]{6,7})+(-[0-9]{1,6})?)$/;
var mobileOrGhRegex = /^(1\d{10}|[0-9-—]{7,20})$/;
//固话验证规则
var ghRegex = /^[0-9-—]{7,20}$/;
//邮箱验证规则
var emailRegex = /^[A-Za-z0-9\u4e00-\u9fa5\._-]+@[\.a-zA-Z0-9_-]+$/;
//开户行验证规则
var bankNameRegex = /^[\u4e00-\u9fa5\w\s-_——#()（）、]{1,35}$/;
//银行账号验证规则
var bankAccountRegex = /^\d{8,30}$/;
//复核人验证规则
var fhrRegex = /^[A-Za-z\u4e00-\u9fa5]{1,10}$/;
//开票员姓名验证规则
var clerkNameRegex = /^[a-zA-Z\u4E00-\u9FA5]{2,8}$/;
//1-10位数字英文
var selfDefineCodeRegex = /^[a-zA-Z0-9]{1,10}$/;
//发票代码验证规则
var fpdmRegex = /^\d{12}$|^\d{10}$/;
//发票号码验证规则
var fphmRegex = /^\d{8}$/;

//中文和英文结合而且6-20字符
var loginUsernameRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;