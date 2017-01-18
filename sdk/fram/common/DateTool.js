define (function(require, exports, module)
{
    
	/**
    * 时间工具类 v1.0
    * @auther zhangzhenxing
	* 构造器 
	* @param d Date 类型的参数
	*/
    function DateTool(d)
    {
        this.date =  d;
        
        /**
         * 格式化日期 如 yyyy-mm-dd
         * @param fmatStr格式化字符串 yyyy-mm-dd
         * */
        this.format = function(fmatStr)
        {
            var str = fmatStr;   
            var Week = ['日','一','二','三','四','五','六'];  

            str=str.replace(/yyyy|YYYY/,this.date.getFullYear());   
            str=str.replace(/yy|YY/,(this.date.getYear() % 100)>9?(this.date.getYear() % 100).toString():'0' + (this.date.getYear() % 100));   

            str=str.replace(/MM/,(this.date.getMonth() + 1)>9?(this.date.getMonth() + 1).toString():'0' + (this.date.getMonth() + 1));   
            str=str.replace(/M/g,(this.date.getMonth() + 1));   

            str=str.replace(/w|W/g,Week[this.date.getDay()]);   

            str=str.replace(/dd|DD/,this.date.getDate()>9?this.date.getDate().toString():'0' + this.date.getDate());   
            str=str.replace(/d|D/g,this.date.getDate());   

            str=str.replace(/hh|HH/,this.date.getHours()>9?this.date.getHours().toString():'0' + this.date.getHours());   
            str=str.replace(/h|H/g,this.date.getHours());   
            str=str.replace(/mm/,this.date.getMinutes()>9?this.date.getMinutes().toString():'0' + this.date.getMinutes());   
            str=str.replace(/m/g,this.date.getMinutes());   

            str=str.replace(/ss|SS/,this.date.getSeconds()>9?this.date.getSeconds().toString():'0' + this.date.getSeconds());   
            str=str.replace(/s|S/g,this.date.getSeconds());   

            return str;   
        }

        /**
        * 根据字符串 初始化日期
        * @param fmtStr 格式化的字符串 如 201209091220
        */
        this.setDate = function(fmtStr)
        {
            var date = new Date();
            var year = parseInt(fmtStr.substring(0,4));
            var mouth = parseInt(fmtStr.substring(4,6))-1;
            var day = parseInt(fmtStr.substring(6,8));
            var hours = parseInt(fmtStr.substring(8,10));
            var minutes = parseInt(fmtStr.substring(10,12));
            date.setFullYear(year);
            date.setMonth(mouth);
            date.setDate(day);
            date.setHours(hours);
            date.setMinutes(minutes);
            return date;
        }
            
    }
    /**
     * @return 返回当前日期月份的天数
     * */
    this.getMouthDays = function()
    {
        //判断当前月多少天
        var m = this.data.getMonth() + 1;
        var mouthDays = 0;//当前月份天数
        if(m==2)
        {
            var y = this.date.getFullYear();
            mouthDays =  ((y % 4==0)&&(y%100!=100))||(y%400==0) ? 29:28;
        }
        else if(m==1||m==3||m==5||m==7||m==8||m==10||m==12)
        {
            mouthDays = 31;
        }
        else if(m==4||m==6||m==9||m==11)
        {
            mouthDays = 30;
        }
        return mouthDays;
    }
    module.exports = DateTool;
});