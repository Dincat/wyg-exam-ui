const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const logout = function()
{
  getApp().globalData.token = '';
  getApp().globalData.isLog = false;
}

const checkLogin = function()
{
  let res = getApp().globalData.token ? true : false;
  let res1 = getApp().globalData.isLog;
  let res2 = res && res1;
  if (res2){
    let newTime=Math.round(new Date() / 1000);
    if (getApp().globalData.expiresTime < newTime) return false;
  }
  return res2;
}

const isWeixin =function () {
  return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
}

//从字典中，根据ID获取名称
const getDictName=function(dict,val){
  if(typeof(dict)=='undefined' || dict==null ||  dict.length<1 ) return "-";

  var dicName='-';
  for(var key in dict){
    if(key==val){
      dicName=dict[key];
      break;
    }
  }

  return dicName;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}


const dateTimeFormatter=function (date,fmt) {
  date = date || new Date().getTime();
  fmt=fmt||'yyyy-MM-dd HH:mm:ss';
  date = new Date(date);
  var  o  =   {
    "M+" :  date.getMonth()  +  1, // 月份
    "d+" :  date.getDate(), // 日
    "H+" :  date.getHours(), // 小时
    "m+" :  date.getMinutes(), // 分
    "s+" :  date.getSeconds(), // 秒
    "q+" :  Math.floor((date.getMonth()  +  3)  /  3), // 季度
    "S" :  date.getMilliseconds()   // 毫秒
  };
  if  (/(y+)/.test(fmt))  {
    fmt  =  fmt.replace(RegExp.$1,   (date.getFullYear()  +  "")     .substr(4  -  RegExp.$1.length));
  }
  for  ( var  k  in  o)
    if  (new  RegExp("("  +  k  +  ")").test(fmt))  {
      fmt  =  fmt.replace(RegExp.$1,   (RegExp.$1.length  ==  1)  ?  (o[k])       :  (("00"  +  o[k]).substr((""  +  o[k]).length)));
    }
  return  fmt;
}


module.exports = {
  formatTime,
  checkLogin: checkLogin,
  getDictName:getDictName,
  dateTimeFormatter:dateTimeFormatter,
  logout: logout,
  isWeixin:isWeixin
}
