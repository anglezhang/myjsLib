define(function(require, exports, module)
{
    /**
     * 百度地图工具类 基于百度地图v2.x版本
     * 提供百度地图初始地图、初始信息方法
     * */
    var defaultCity = "西安";
    
    /**
     * @param {double} Longitude 经度
     * @param {double} Latitude 纬度
     * @param {int} mapLevel 地图级别
     * @param {string} divId 地图divID
     * @return {BMap} map返回百度地图对象
     * */
    module.exports.mapInit = function(Longitude,Latitude,mapLevel,divId)
    {
        var map = new BMap.Map(divId); 
        map.centerAndZoom(new BMap.Point(Longitude, Latitude), mapLevel);
        map.addControl(new BMap.MapTypeControl()); 
        map.setCurrentCity(defaultCity);
        map.enableScrollWheelZoom(false);
        return map;
    };
    
    /**
     * fun 获取经纬度后执行方法
     * eg : mapTool.getLatLongInf(function(long,lat)
     *       {
     *         alert("经度是" + long + ",纬度是" + lat);
     *        });
     * */
    module.exports.getLatLongInf = function(fun)
    {
        var Longitude = 0.0;
        var Latitude = 0.0;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r)
        {
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                var mk = new BMap.Marker(r.point);
                Longitude = r.point.lng;
                Latitude = r.point.lat;
                fun(Longitude,Latitude);
            }
            else {
                    alert('failed'+this.getStatus());
            }        
        },{enableHighAccuracy: true})
    };

    /**
    * @param map 百度地图对象
    * @param Longitude type{int} 经纬度
    * @param Latitude 经纬度
    * @param title title
    * @param info 消息框
    */
    module.exports.addMarker = function(map,Longitude,Latitude,title,info)
    {
        var markerPoint = new BMap.Point(Longitude, Latitude);
        var marker = new BMap.Marker(markerPoint);  //创建标注
        map.addOverlay(marker);    // 将标注添加到地图中
        var opts = {
            width: 200,    // 信息窗口宽度
            height: 60,     // 信息窗口高度
            title: title, // 信息窗口标题
            enableAutoPan: true //自动平移
        }
        var infoWindow = new BMap.InfoWindow(info, opts);  // 创建信息窗口对象
        marker.addEventListener("click", function () {
            map.openInfoWindow(infoWindow, markerPoint); //开启信息窗口
        });
    };

    /**
    * 添加点击事件
    * @param map 地图对象
    * @param fun(lng,lat)点击后对象函数
    */
    module.exports.addClickEvent = function(map,fun)
    {
        map.addEventListener('click',function(e)
        {
            fun(e.point.lng,e.point.lat);
        });
    };

    /**
    * 清除覆盖物
    */
    module.exports.clear = function(map)
    {
        map.clearOverlays();
    };
});