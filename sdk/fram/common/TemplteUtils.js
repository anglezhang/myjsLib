define(function (require, exports, module) 
{
	/**
	*@描述 设置 template 函数
	*@param $ jquery对象
	*@param t 工具类
	*@param template 模版对象
	*/
	var setTemplateUtils = function($,t,template)
	{
		/**
		*@描述 添加 tempate方法
		*@param data 要操作的字符
		*@param str 需要被替换掉的字符
		*/
		template.helper('trimRepalaceAll',function(data,str)
		{
			var data = $.trim(data);
			if(data.indexOf(str) != -1)
			{
				return t.ReplaceAll(data,str,"");
			}else
			{
				return data;
			}
			
		});

		/**
		*@描述 对字符进行去空格操作
		*/
		template.helper('templateTrim',function(data)
		{
			var data = $.trim(data);
			
			return data;
		});

		/**
		*@描述 将分钟转化为 天 时 分
		*/
		template.helper('toDHM',function(data)
		{
			var minute = data - 0;
			var day = Math.floor(minute/1440);//天
			var hour = Math.floor((minute%1440)/60);//小时
			var minu = Math.floor((minute%1440)%60);//分钟
			var msg = '';
			if(day>0)
			{
				msg = day + '天' + hour + '小时' + minu + '分钟';
			}else if(hour > 0)
			{
				msg = hour + '小时' + minu + '分钟';
			}else if(minu > 0)
			{
				msg =  minu + '分钟';
			} 
			return msg;
		});

		//格式化日期
		template.helper('dateFormat', function (date, format) {
		    date = new Date(date);
		    var map = {
		        "M": date.getMonth() + 1, //月份 
		        "d": date.getDate(), //日 
		        "h": date.getHours(), //小时 
		        "m": date.getMinutes(), //分 
		        "s": date.getSeconds(), //秒 
		        "q": Math.floor((date.getMonth() + 3) / 3), //季度 
		        "S": date.getMilliseconds() //毫秒 
		    };
		    format = format.replace(/([yMdhmsqS])+/g, function(all, t){
		        var v = map[t];
		        if(v !== undefined){
		            if(all.length > 1){
		                v = '0' + v;
		                v = v.substr(v.length-2);
		            }
		            return v;
		        }
		        else if(t === 'y'){
		            return (date.getFullYear() + '').substr(4 - all.length);
		        }
		        return all;
		    });
		    return format;
		});

		/**
		*@描述 将数字格式化保留两位小数
		*/
		template.helper('numberFormat',function(data)
		{
			return t.ChangeTwoDecimalNumber(data);
		});
	};

	/**
	*@描述 设置 template 函数
	*@param $ jquery对象
	*@param t 工具类
	*@param template 模版对象
	*/
	module.exports.SetTemplateUtil = function($,t,template)
	{
		setTemplateUtils($,t,template);
	};
});