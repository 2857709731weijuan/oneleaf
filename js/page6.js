
var map, geolocation,lat,lng;
//加载地图，调用浏览器定位服务
map = new AMap.Map('container', {
    resizeEnable: true
});
map.plugin('AMap.Geolocation', function() {
    geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition: 'RB'
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete); //返回定位信息
    AMap.event.addListener(geolocation, 'error', onError); //返回定位出错信息
});
//解析定位结果
function onComplete(data) {
    lat = data.position.lat;
    lng = data.position.lng;
}
//解析定位错误信息
function onError(data) {

}
function addMarker(lat,lng) {
    marker = new AMap.Marker({
        position: [lng, lat]
    });
    marker.setMap(map);
}

$('.store_info_img').click(function(event) {
    event.stopPropagation();
    var target = $(event.currentTarget);
    var src = target.attr("name");
    $('.shop_img').css("background-image",'url('+ src +')');
    $('.shop_img').removeClass('none');
});

$(".shopClose").click(function(){
    $('.shop_img').addClass('none');
    $('.shop_img').css("background-image",'url()');
})

$('.store_info').click(function(event) {
    removeMaker();
    event.stopPropagation();
    if(!$('.shop_img').hasClass('none')){
        !$('.shop_img').addClass('none');
    }
    $('.store_info').removeClass('sb');
    var target = $(event.currentTarget);
    var lat = $(target).attr('lat');
    var lng = $(target).attr('lng');
    $(target).addClass('sb');
    map.panTo([lng, lat]);
    addMarker(lat,lng);
});

$('.se1').change(function(){
    var text ='<option value="0">选择城市</option>';
    var data = [];
    var p1=$(this).children('option:selected').attr('data');
    data = p1.split(",");
    for (var i = 0; i < data.length; i++) {
        text += '<option value="'+ data[i] +'">'+ data[i] +'</option>';
    }
    $('.se2').html(text);
})

$('.store_search').click(function(event) {
    $('.store_info').removeClass('none');
    var arr = [];
    var se1 = $('.se1').val();
    var se2 = $('.se2').val();
    if(se1 == '0' || se2 == '0'){
        alert('请选择信息');
        return false;
    }
    var text = se1 + se2;
    removeMaker();
    $('.STR').each(function(){
        var str = $(this).text();
        if(str == text){
            arr.push(this);
            var lat = $(this).parent('.store_info').attr('lat'),
            lng = $(this).parent('.store_info').attr('lng');
            addMarker(lat,lng);
        }else{
            $(this).parent().addClass('none');
        }
    })

    var num = arr.length;
    $('.store_city').text(se1 + '（'+ num +'家专卖店）');

});

$('.store_near').click(function(){
    $.get("http://47.99.73.159/find/getnearshop?lat="+lat+"&lng="+lng,function(data){
        
        removeMaker();
        $('.store_info').addClass('none');
        var arr = [];
        var redata = data;
        for (var i = 0; i < redata.length; i++) {
            $('.store_info_name').each(function(){
                var text = $(this).text();
                if(text == redata[i]){
                    arr.push($(this).parent('.store_info'));
                    $(this).parent('.store_info').removeClass('none');
                    var lat = $(this).parent('.store_info').attr('lat'),
                        lng = $(this).parent('.store_info').attr('lng');
                    addMarker(lat,lng);
                }
            })
        }
        // for (var i = 0; i < arr.length; i++) {
            $('.store_list').append(arr)
        // }

        var num = arr.length;
        $('.store_city').text('您的附近有'+ num +'家专卖店');
	},"json");
});

function removeMaker(){
    var amapIcon = $('.amap-icon');
    amapIcon.each(function(){
        $(this).remove();
    })
}