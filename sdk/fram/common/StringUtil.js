define(function(require, exports, module)
{
	/**
	* 字符串处理工具类 v1.0
	* @author zhangzhenxing
	* @Date 2015-06-26
	*/

	/**
    * 数字字母组合正则
    * @return ture 验证通过 false 验证不通过
    */
    module.exports.isNumberOrLetter = function(str)
    {
        var regExp = new RegExp(/^[0-9a-zA-Z]*$/g);
        if(regExp.test(str)) return true;
        else return false;
    };
    /**
    * 数字校验
    * @param str 要检验的数字
    * @return ture 验证通过 false 验证不通过
    */
    module.exports.isNumber = function(str)
    {
        var regExp = new RegExp(/^[0-9]*$/g);
        if(regExp.test(str)) return true;
        else return false;
    };

    /**
    * 中文文字校验
    * @param str 要校验的数子
    * @return ture 验证通过 false 验证不通过
    */
    module.exports.isChineseChar = function(str)
    {
        var regExp =  new RegExp(/^[\u4e00-\u9fa5]+$/); 
        if(regExp.test(str)) return true;
        else return false;
    };
    /**
		* 格式化金额 ￥##,###,###.##
		* @param num 数值(Number或者String) 
		* @return 金额格式的字符串,如'1,234,567.4' 
		* @type String 
    */
    module.exports.formatCurrencyTenThou = function(num)
    {
    	num = num.toString().replace(/\$|\,/g,'');  
	    if(isNaN(num))  
	    num = "0";  
	    sign = (num == (num = Math.abs(num)));  
	    num = Math.floor(num*10+0.50000000001);  
	    cents = num%10;  
	    num = Math.floor(num/10).toString();  
	    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)  
	    num = num.substring(0,num.length-(4*i+3))+','+  
	    num.substring(num.length-(4*i+3));  
	    return (((sign)?'':'-') + num + '.' + cents);  
    };
});