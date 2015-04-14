/**
 * Created by Administrator on 2015/4/14.
 */
var dollar=6.2;
function count(num){
    return num/dollar;
}
function count2(num){
    return num*dollar;
}

exports.dollorToChina=function(amount){
    return count2(amount);
}
exports.chinaToUS=function(amount){
    return count(amount);
}