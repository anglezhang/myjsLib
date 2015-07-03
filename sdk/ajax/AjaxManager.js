define(function (require, exports, module) {
    /**
    * 描述：ajax访问
    * @auther zhangzhenxing
    * v1.0 主要管理ajax访问
    */
    var t = require("../fram/common/Tools");
    var config = require("../SysConfig");
    var cAjax = function (config, $) {
        this.url = config.url || "";
        this.async = config.async || true;
        this.cache = config.cache || false;
        this.complete = config.complete;
        this.data = config.data;
        this.dataType = config.dataType || "json";
        this.error = config.error;
        this.type = config.type || "post";
        this.success = config.success;
        this.contentType = config.contentType
                || "application/x-www-form-urlencoded; charset=utf-8";

        if (typeof cAjax._initialized === "undefined") {

            cAjax.prototype.doAction = function () {
                this.init();
            };

            cAjax.prototype.doStatusCode =
            {
                404: function () {
                    alert(404);
                },
                403: function () {
                    alert(403);
                },
                500: function () {
                    alert(500);
                },
                387: function () {
                    alert(387);
                }
            };
            cAjax.prototype.doBeforeSend = function () {
                // Console.debug("进行ajax请求");
            };
            cAjax.prototype.doComplete = function (XMLHttpRequest, textStatus) {
                // Console.debug("ajax请求完成");
            };
            cAjax.prototype.init = function () {
                $.ajax({
                    type: this.type,
                    url: this.url,
                    async: this.async,
                    cache: this.cache,
                    //complete : this.complete,
                    data: this.data,
                    dataType: this.dataType,
                    beforeSend: this.beforeSend || this.doBeforeSend(),
                    error: this.error,
                    statusCode: this.statusCode || this.doStatusCode,
                    success: this.success,
                    complete: this.complete || this.doComplete(),
                    contentType: this.contentType,
                    timeout: 100000000 //超时时间设置
                });
            };

            cAjax._initialized = true;
        }

    };

    //异步Ajax方法调用
    var createAction = function (url, success, data, error) {
        var config = {
            url: url,
            success: success,
            data: {
                dataJson: data
            },
            error: error
            , complete: 1000000
        };
        var c = new cAjax(config);
        c.doAction();
    };

    //同步Ajax方法调用，返回值智能判断
    //同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
    var createSynchronousAction = function (url, success, data, error) {
        var config = {
            url: url,
            async: false,
            data: {
                dataJson: data
            },
            success: success,
            error: error
            , complete: 1000000
        };
        var c = new cAjax(config);
        c.doAction();
    };

    //同步Ajax调用,返回JSON数据
    //同步请求将锁住浏览器，用户其它操作必须等待请求完成才可以执行。
    var createSynAction = function ($, url, success) {
        var result;
        $.ajax({
            dataType: 'json',
            url: url,
            async: false,
            type: 'post',
            success: function (data) {
                result = data;
            }
        , complete: 1000000
        });
        return result;
    };
    /**
    * @param $ jquery 
    * @param tData 提交的数据
    * @param success 成功回调函数
    */
    module.exports.baiduPlaceAction = function($,tData,success)
    {
        var baiduHost = "http://api.map.baidu.com/place/v2/";
        var tHost = baiduHost + tData.action;
        tData.ak = "n9INEz3snkZ6CzcW00qdoEbx";
        delete tData.action;
        
        $.support.cors = true;
        $.ajax({
            dataType: 'json'
            , url: tHost
            //, async: true
            , type: 'POST'
            , data: tData
           , success: success
            , timeout: 10000     //超时时间设置
            , error: function (jqXHR, textStatus, errorThrown) {

                t.error("AjaxManger.onError()\n"
                            + "     textStatus=" + textStatus + "\n"
                            + "     errorThrown=" + errorThrown);
                t.error("\n     tHost=" + tHost + "\n    tData=" + t.jsonToStr(tData));
            }
            , beforeSend: function () {

            }
        });

    };
    //异步调用Ajax方法
    module.exports.actionJSON = function ($, tData, success, root) {
        var tHost = "http://127.0.0.1:8080/" + tData.action;
        //alert(tHost);
        if (root !== undefined)
            tHost = root + tData.action;

        t.debug("\n         tData=" + tHost);
        var thatDate = tData;
        delete thatDate.action;
        jQuery.support.cors = true;
        $.ajax({
            dataType: 'json'
            , url: tHost
            //, async: true
            , type: 'POST'
            , data: thatDate
           , success: success
            , timeout: 10000     //超时时间设置
            , error: function (jqXHR, textStatus, errorThrown) {

                t.error("AjaxManger.onError()\n"
                            + "     textStatus=" + textStatus + "\n"
                            + "     errorThrown=" + errorThrown);
                t.error("\n     tHost=" + tHost + "\n    tData=" + t.jsonToStr(tData));
            }
            , beforeSend: function () {

            }
        });

    };
    /**
    * 描述:post提交方法
    * @param tDate 提交的数据
    * @param success 成功后执行方法
    */
     module.exports.postAction = function($,tData,success)
     {
        var url = tData.action;
        delete tData.action;
        $.post(url, tData, success);
     };

     /**
     * 提交数据
     * @param tData提交数据的集合
     * @param cltObj 控件
     */
     module.exports.submit = function($,tData,cltObj)
     {
        var ac = cltObj.attr("action") + "?";
        var url = tData.action;
        delete tData.action;
        for(var key in tData)
        {
            ac += key + "=" + tData[key] + "&";
        }
        ac = ac.substring(0,ac.length-1);
        t.debug("ac = " + ac )
        cltObj.attr("action",ac);
        cltObj.submit();
     };

     /**
     * 提交数据
     *@param tData 需要提交的数据
     *@param cltObj 控件
     */
    module.exports.submitNoKey = function($,tData,cltObj)
    {
        var ac = tData.action + "/";
        var url = tData.action;
        delete tData.action;
        for(var key in tData)
        {
            ac += tData[key] + "/";
        }
        ac = ac.substring(0,ac.length-1);
        t.debug("ac = " + ac )
        cltObj.attr("action",ac);
        cltObj.submit();
    };
});