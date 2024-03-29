//保存cookie（添加）
//参数：
// 键
// 值
// 有效期:(单位：多少天)

function addCookie(key,value,dayCount,path,domain){
    let d = new Date();
    d.setDate(d.getDate()+dayCount);
    // document.cookie = "键=值;expires=过期时间点;path=能够访问该cookie文件路径;domain=哪个域名可以访问该cookie";
    //escape():编码
    let str =`${key}=${escape(value)};expires=${d.toGMTString()}`;
    if(path!=undefined){
        str +=`;path=${path}`;//;path=能够访问该cookie文件路径
    }
    if(domain!=undefined){
        str +=`;domain=${domain}`;//;domain=哪个域名可以访问该cookie
    }
    document.cookie = str;
}

//获取cookie（查询）根据键获取值
//参数：
// 键
//返回值：值（键对应的值）
function getCookie(key){
    //document.cookie的示例： usernamet=hi; username=jzm; userpass=123
    var str = unescape(document.cookie);//unescape:解码
    //1、分割成数组
    let  arr = str.split("; ");//arr=["unsrnamet=hi","username=jzm","userpass=123"];
    //2、循环arr
    for(let i in arr){
        if(arr[i].startsWith(key+"=")){
            let[,value]=arr[i].split("=");//["username","jzm"]
            return value;
        }
    }
    return null;
}

//删除cookie:(cookie不能直接删除，可以通过设置过期时间为过去，进行删除)
//参数：
//键
//返回值：无

function removeCookie(key){//removeCookie("username");
    addCookie(key,"",-1);
}
//修改的话：就用增加，只要键相同，就会覆盖。