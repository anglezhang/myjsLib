define(function (require, exports, module) {
    /**
    * ajax访问 
    * @param $ jquery 对象
    * @param url 访问url
    * @param success 访问成功后执行函数
    */
    module.exports.ajaxAction = function($,url,success,data)
    {
        $.ajax({
            dataType:'json'
            ,url:url
            ,data:data
            ,type: 'POST'
            ,async:true
            ,success:success
        });
    };

    module.exports.ajaxAsyncAction = function($,url,success,data)
    {
        $.ajax({
            dataType:'json'
            ,url:url
            ,data:data
            ,type: 'POST'
            ,async:false
            ,success:success
        });
    };
    /**
    *@描述 提交form表单
    *@param $ jquery对象
    *@param $form form对象
    *@param data 提交的数据 json 或者 object
    */
    module.exports.submitForm = function($,$form,data)
    {
        var action = $form.prop("action") + "?";
        for(k in data)
        {
            var value = data[k];
            action += k + "=" + value + "&";
        }
        if(action.indexOf("&") != -1)
        {
            action = action.substring(0,action.length-1);
        }
        $form.prop("action",action);
        $form.submit();
    };
});