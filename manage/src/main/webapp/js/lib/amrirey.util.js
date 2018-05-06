(function(){
	var utils = {
		compareTime:compareTime,
		getUrlParameters:getUrlParameters,
		obj2UrlParameters:obj2UrlParameters,
		formatNumber:formatNumber,
		getElementValueById:getElementValueById,
		convertMoneyToChinese:convertMoneyToChinese,
		makeClassRadio:makeClassRadio,
		resetRadio:resetRadio,
		makeClassMulti:makeClassMulti,
		resetMulti:resetMulti,
		convertArray2Obj:convertArray2Obj,
		getObjectType:getObjectType,
		arraysEqual:arraysEqual,
		handleUndefined:handleUndefined,
		checkInt:checkInt,
        timestampFormat: timestampFormat,
		isBlank: isBlank,
		getByteLength : getByteLength
	};
	window.$Utils = utils
	/**
	 * 判断日期，时间大小
	 *
	 * @param {Object}
	 *            startDate 起始日期
	 * @param {Object}
	 *            endDate 截止日期
	 * @param {Object}
	 *            canEq 是否可以相等
	 * @return true||false
	 */
	function compareTime(startDate, endDate, canEq) {
		var result = false;
		var allStartDate = null;
		var allStartDate = null;
		var startDateTemp = startDate.split(" ");
		var endDateTemp = endDate.split(" ");
		var arrStartDate = startDateTemp[0].split("-");
		var arrEndDate = endDateTemp[0].split("-");
		if (startDateTemp.length > 1 && endDateTemp.length > 1) {
			var arrStartTime = startDateTemp[1].split(":");
			var arrEndTime = endDateTemp[1].split(":");
			allStartDate = new Date(arrStartDate[0], parseInt(arrStartDate[1] - 1), arrStartDate[2], arrStartTime[0], arrStartTime[1], arrStartTime[2]);
			allEndDate = new Date(arrEndDate[0], parseInt(arrEndDate[1] - 1), arrEndDate[2], arrEndTime[0], arrEndTime[1], arrEndTime[2]);
		} else {
			allStartDate = new Date(arrStartDate[0], parseInt(arrStartDate[1] - 1), arrStartDate[2]);
			allEndDate = new Date(arrEndDate[0], parseInt(arrEndDate[1] - 1), arrEndDate[2]);
		}
		if (canEq) {
			if (allStartDate.getTime() > allEndDate.getTime()) {
				result = false;
			} else {
				result = true;
			}
		} else {
			if (allStartDate.getTime() >= allEndDate.getTime()) {
				result = false;
			} else {
				result = true;
			}
		}
		return result;
	}

	function formatNumber(num, precision, separator) {
		var parts;
		// 判断是否为数字
		if (!isNaN(parseFloat(num)) && isFinite(num)) {
			// 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
			// 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
			// 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
			// 的值变成了 12312312.123456713
			num = Number(num);
			// 处理小数点位数
			num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
			// 分离数字的小数部分和整数部分
			parts = num.split('.');
			// 整数部分加[separator]分隔, 借用一个著名的正则表达式
			parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

			return parts.join('.');
		}
		return NaN;
	}

	/**
	 * 获取url路径参数
	 * @returns {*}
	 */
	function getUrlParameters(){
		var query = location.search.substring(1);
		var entries = query.split("&");
		return Array.prototype.reduce.call(entries,function(obj,item){
			var param = item.split("=");
			obj[param[0]] = param[1];
			return obj;
		},{});
	}

	/**
	 * 将对象转换为url路径参数
	 * @param obj
	 * @return {string}
	 */
	function obj2UrlParameters(obj) {
		var str = "";
		for(key in obj){
			if(obj.hasOwnProperty(key) ) {
				str = str + key +"=" +obj[key]+"&";
			}
		}
		return str.substr(0,str.length-1);
	}

	function getElementValueById(id){
		return document.getElementById(id).value.trim();
	}

	/**
	 * 数字转化金额,推荐使用这个
	 * @param number
	 */
	function convertMoneyToChinese(money) {
		var decimalPoint, moneyUnit = "仟佰拾亿仟佰拾万仟佰拾圆角分", chineseMoney = "";
		if (/^(0|[1-9]\d*)(\.\d+)?$/.test(money)) {
			money = money + "00";
			decimalPoint = money.indexOf('.');
			if (decimalPoint >= 0) {
				money = money.substring(0, decimalPoint)
				+ money.substr(decimalPoint + 1, 2);
			}
			moneyUnit = moneyUnit.substr(moneyUnit.length - money.length);
			for (var i = 0; i < money.length; i++) {
				chineseMoney += '零壹贰叁肆伍陆柒捌玖'.charAt(money.charAt(i))
				+ moneyUnit.charAt(i);
			}
			return chineseMoney.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零")
				.replace(/零(万|亿|圆)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2")
				.replace(/^圆零?|零分/g, "").replace(/圆$/g, "圆整");
		}
	}

	/**
	 * 使具有targetClassname的元素具备单选的属性，当点击时，元素加上selectClassName
	 * @param targetClassname
	 * @param selectClassName
	 */
	function makeClassRadio(targetClassname,selectClassName) {
		$("."+targetClassname).bind('click', function () {
			$("."+targetClassname).removeClass(selectClassName);
			this.className += " "+selectClassName;
			//this.classList.add(selectClassName);
		})
	}
	/**
	 * 使具有targetClassname的元素具备多选的属性，当点击时，元素加上selectClassName
	 * @param targetClassname
	 * @param selectClassName
	 */
	function makeClassMulti(targetClassname,selectClassName) {
		$("."+targetClassname).bind('click', function () {
			/*if($(this)) {

			}
			$("."+targetClassname).removeClass(selectClassName);
			this.className += " "+selectClassName;*/
			//this.classList.add(selectClassName);
			$(this).toggleClass(selectClassName);
		})
	}

	/**
	 * 使具有targetClass的元素具备单选的属性，符合条件时，元素加上selectClass
	 * @param targetClass
	 * @param selectedClass
	 * @param value
	 * @return 返回选中的元素
	 */
	function resetRadio(targetClass,selectedClass,value){
		$("." + targetClass).removeClass(selectedClass);
		var filtered = Array.prototype.filter.call($("." + targetClass), function (item) {
			return item.dataset.value == value;
		});
		if (filtered.length >0 ) {
			filtered[0].className += " " + selectedClass;
		}
		return filtered;
	}
	/**
	 * 使具有targetClass的元素具备单选的属性，符合条件时，元素加上selectClass
	 * @param targetClass
	 * @param selectedClass
	 * @param value
	 * @return 返回选中的元素
	 */
	function resetMulti(targetClass,selectedClass,value){
		if(getObjectType(value)==="String"){
			value = value.split(",");
		}
		if (getObjectType(value)!=="Array") {
			throw "数据类型错误";
		}
		$("." + targetClass).removeClass(selectedClass);
		var filtered = Array.prototype.filter.call($("." + targetClass), function (item) {
			var targetValue = item.dataset.value;
            return value.some(function(item){
				return item == targetValue;
			})
		});
		filtered.forEach(function(item) {
			item.className += " " + selectedClass;
		})
		return filtered;
	}



	function getObjectType(item) {
		return Object.prototype.toString.call(item).slice(8, -1);
	}

	function copyArray(src) {
		var arr = [];
		src.forEach(function(item) {
			arr.push(item);
		})
		return arr;
	}

	/**
	 * 把数组按照指定的规则转换为obj<br/>
	 * convertRule:{
	 * 		mapKey:"mapKey",
	 * 		arrKeys:[
	 * 			{
	 * 				arrKey:"arrKey",
	 * 				convertRule:convertRule
	 * 			},
	 * 			...]
	 * 		}
	 * @param array
	 * @param convertRule
	 */
	function convertArray2Obj(array,convertRule) {
		var mapKey = convertRule.mapKey;
		if (array.length==0) {
			return;
		}
		var obj = {};
		array.forEach(function(item) {
			//键对应的值
			var mapValue = item[mapKey];
			obj[mapValue] = item;
			var arrKeys = convertRule.arrKeys;
			//为了处理item中有多个数组，所以arrKeys采用对象数组
			if(arrKeys.length) {
				arrKeys.forEach(function(arrKey) {
					//转换数组
					//获取规则中指定的item对象中要转换的数组
					var keyName = arrKey.arrKey;
					var arr = item[keyName];
					item[keyName] = convertArray2Obj(arr, arrKey.convertRule);
				})
			}
		});
		return obj;
	}

	function arraysEqual(a, b) {
		if (a === b) return true;
		if (a == null || b == null) return false;
		if (a.length != b.length) return false;

		// If you don't care about the order of the elements inside
		// the array, you should sort both arrays here.

		for (var i = 0; i < a.length; ++i) {
			if (a[i] !== b[i]) return false;
		}
		return true;
	}
	
	/**
	 * 处理值为undefined,null时页面展示问题
	 * @str 如果参数为undefined或null返回空字符串，如果不是返回其本身
	 */
	function handleUndefined(str){
		if(str == undefined || str == null || str == "null"){
			return "";
		}else{
			return str;
		}
	}
	
	/**
	 * 处理数字数据格式问题，小数位不足2位补0，小数位大于1位小于8位不做任何处理返回原值，小数位大于8位保留8位小数
	 */
	function checkInt(param){
	  var zeroToOneReg = /^[0-9]+(.[0-9]{0,1})?$/; 
	  var twoToSevReg = /^[0-9]+(.[0-9]{2,7})?$/; 
	  var eigthToMoreReg = /^[0-9]+(.[0-9]{8,25})$/;
	    if(zeroToOneReg.test(param)){
	       param = parseFloat(param).toFixed(2);
	    }else if(twoToSevReg.test(param)){
	      
	    }else if(eigthToMoreReg.test(param)){
	       param = parseFloat(param).toFixed(8);
	    }
	  return param;
	}

    /**
     * 和PHP一样的时间戳格式化函数
     * @param  {string} format    格式（Y-m-d H:i:s）
     * @param  {int}    timestamp 要格式化的时间 默认为当前时间
     * @return {string}           格式化的时间字符串
     */
    function timestampFormat(format, timestamp){
        var a, jsdate=((timestamp) ? new Date(timestamp*1000) : new Date());
        var pad = function(n, c){
            if((n = n + "").length < c){
                return new Array(++c - n.length).join("0") + n;
            } else {
                return n;
            }
        };
        var txt_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var txt_ordin = {1:"st", 2:"nd", 3:"rd", 21:"st", 22:"nd", 23:"rd", 31:"st"};
        var txt_months = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var f = {
            d: function(){return pad(f.j(), 2)},
            D: function(){return f.l().substr(0,3)},
            j: function(){return jsdate.getDate()},
            l: function(){return txt_weekdays[f.w()]},
            N: function(){return f.w() + 1},
            S: function(){return txt_ordin[f.j()] ? txt_ordin[f.j()] : 'th'},
            w: function(){return jsdate.getDay()},
            z: function(){return (jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5 >> 0},
            W: function(){
                var a = f.z(), b = 364 + f.L() - a;
                var nd2, nd = (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
                if(b <= 2 && ((jsdate.getDay() || 7) - 1) <= 2 - b){
                    return 1;
                } else{
                    if(a <= 2 && nd >= 4 && a >= (6 - nd)){
                        nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                        return date("W", Math.round(nd2.getTime()/1000));
                    } else{
                        return (1 + (nd <= 3 ? ((a + nd) / 7) : (a - (7 - nd)) / 7) >> 0);
                    }
                }
            },
            F: function(){return txt_months[f.n()]},
            m: function(){return pad(f.n(), 2)},
            M: function(){return f.F().substr(0,3)},
            n: function(){return jsdate.getMonth() + 1},
            t: function(){
                var n;
                if( (n = jsdate.getMonth() + 1) == 2 ){
                    return 28 + f.L();
                } else{
                    if( n & 1 && n < 8 || !(n & 1) && n > 7 ){
                        return 31;
                    } else{
                        return 30;
                    }
                }
            },
            L: function(){var y = f.Y();return (!(y & 3) && (y % 1e2 || !(y % 4e2))) ? 1 : 0},
            Y: function(){return jsdate.getFullYear()},
            y: function(){return (jsdate.getFullYear() + "").slice(2)},
            a: function(){return jsdate.getHours() > 11 ? "pm" : "am"},
            A: function(){return f.a().toUpperCase()},
            B: function(){
                var off = (jsdate.getTimezoneOffset() + 60)*60;
                var theSeconds = (jsdate.getHours() * 3600) + (jsdate.getMinutes() * 60) + jsdate.getSeconds() + off;
                var beat = Math.floor(theSeconds/86.4);
                if (beat > 1000) beat -= 1000;
                if (beat < 0) beat += 1000;
                if ((String(beat)).length == 1) beat = "00"+beat;
                if ((String(beat)).length == 2) beat = "0"+beat;
                return beat;
            },
            g: function(){return jsdate.getHours() % 12 || 12},
            G: function(){return jsdate.getHours()},
            h: function(){return pad(f.g(), 2)},
            H: function(){return pad(jsdate.getHours(), 2)},
            i: function(){return pad(jsdate.getMinutes(), 2)},
            s: function(){return pad(jsdate.getSeconds(), 2)},
            O: function(){
                var t = pad(Math.abs(jsdate.getTimezoneOffset()/60*100), 4);
                if (jsdate.getTimezoneOffset() > 0) t = "-" + t; else t = "+" + t;
                return t;
            },
            P: function(){var O = f.O();return (O.substr(0, 3) + ":" + O.substr(3, 2))},
            c: function(){return f.Y() + "-" + f.m() + "-" + f.d() + "T" + f.h() + ":" + f.i() + ":" + f.s() + f.P()},
            U: function(){return Math.round(jsdate.getTime()/1000)}
        };
        return format.replace(/[\\]?([a-zA-Z])/g, function(t, s){
            if( t!=s ){
                ret = s;
            } else if( f[s] ){
                ret = f[s]();
            } else{
                ret = s;
            }
            return ret;
        });
    }
    
    function isBlank(str) {
        if ((str === null || typeof(str) === 'undefined') || (typeof(str) === 'string' && str === '')) {
            return true;
        } else {
            return false;
        }
    }
    
    function getByteLength(str) {
  	  if (str) {
  	    str = str.toString();
  	    var byteLength = 0;
  	    var reg = /[\u4e00-\u9fa5（）“”？【】；￥、。！——｛｝《》]/;
  	    for (var i = 0, len = str.length; i < len; i++) {
  	      if (reg.test(str[i])) {
  	        byteLength += 2;
  	      } else {
  	        byteLength += 1;
  	      }
  	    }
  	    return byteLength;
  	  } else {
  	    return 0;
  	  }
   }

})();

//重写toFixed函数
Number.prototype.toFixed=function (d) { 
    var s=this+""; 
    if(!d)d=0; 
    if(s.indexOf(".")==-1)s+="."; 
    s+=new Array(d+1).join("0"); 
    if(new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+(d+1)+"})?)\\d*$").test(s)){
       var s="0"+RegExp.$2,pm=RegExp.$1,a=RegExp.$3.length,b=true;
       if(a==d+2){
            a=s.match(/\d/g); 
            if(parseInt(a[a.length-1])>4){
                for(var i=a.length-2;i>=0;i--){
                    a[i]=parseInt(a[i])+1;
                    if(a[i]==10){
                        a[i]=0;
                        b=i!=1;
                    }else break;
                }
            }
      s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");
     }if(b)s=s.substr(1); 
     return (pm+s).replace(/\.$/,"");
   }return this+"";
};


Date.prototype.format = function(format) {
       var date = {
              "M+": this.getMonth() + 1,
              "d+": this.getDate(),
              "h+": this.getHours(),
              "m+": this.getMinutes(),
              "s+": this.getSeconds(),
              "q+": Math.floor((this.getMonth() + 3) / 3),
              "S+": this.getMilliseconds()
       };
       if (/(y+)/i.test(format)) {
              format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
       }
       for (var k in date) {
              if (new RegExp("(" + k + ")").test(format)) {
                     format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
              }
       }
       return format;
};




