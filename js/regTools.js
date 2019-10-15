
//正则封装
//参数：
//验证的类型（如：邮箱，用户名）
//待验证的字符串；
//返回值：true：验证通过；false：不通过
function check(type,str){
    switch(type){
        case "username":var reg = /^[a-zA-Z_]\w{5,14}$/;break;
        case "email":var reg = /^\w{3,16}@\w{2,16}\.(com|net|com.cn|cn)$/;break;
    }
    return reg.test(str);
    // if(reg.test(str)==true){
    //     return true;
    // }
    // return false;
}
