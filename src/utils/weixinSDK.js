import wx from 'weixin-js-sdk'
import {getJsapiSignature} from '@/api/wechat/wxAuth'
import {isNotEmpty} from '@/utils/util'

const logoUrl = require("@/assets/img/logo.jpg");

/*
 * 微信分享
 * 获取微信加签信息
 * @param{data}:获取的微信加签
 * @param{shareData}:分享配置参数
 */
function doShare(data, shareData) {
  // var wx = require('weixin-js-sdk') || window['wx'];
  let appId = data.appId;
  let timestamp = data.timestamp;
  let nonceStr = data.nonceStr;
  let signature = data.signature;

  var configParam = {
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。（测试记得关掉）
    appId: appId, // 必填，公众号的唯一标识
    timestamp: timestamp, // 必填，生成签名的时间戳
    nonceStr: nonceStr, // 必填，生成签名的随机串
    signature: signature, // 必填，签名，见附录1
    jsApiList: [
      'checkJsApi',
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareAppMessage',
      'onMenuShareTimeline'
    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  };

  wx.config(configParam);

  wx.checkJsApi({
    jsApiList: [
      'checkJsApi',
      'updateAppMessageShareData',
      'updateTimelineShareData',
      'onMenuShareAppMessage',
      'onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,

    success: function (res) {
      // 以键值对的形式返回，可用的api值true，不可用为false
      // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
      console.log(res, 'checkJsApi')
    }
  });


  wx.ready(function () {
    //setTimeout(() => {}, 1000);

    //分享到朋友圈”及“分享到QQ空间”
    wx.updateTimelineShareData({
      title: shareData.title, // 分享标题
      link: shareData.url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareData.imgUrl, // 分享图标
      success: function (res) {
        // 设置成功
        console.log("设置分享朋友圈成功返回的信息为:", res);
      }
    });

    //“分享给朋友”及“分享到QQ”
    wx.updateAppMessageShareData({
      title: shareData.title, // 分享标题
      desc: shareData.description, // 分享描述
      link: shareData.url, // 分享链接 该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: shareData.imgUrl, // 分享图标
      success: function (res) {
        console.log("设置分享朋友成功返回的信息为:", res);
      }
    });


      //获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
      wx.onMenuShareTimeline({
        title: shareData.title, // 分享标题
        link: 'http://www.51shouyu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
        imgUrl: shareData.imgUrl, // 分享图标
        success: function (res) {
          console.log("onMenuShareTimeline设置分享朋友成功返回的信息为:", res);
        }
      });


      //获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
      wx.onMenuShareAppMessage({
        title: shareData.title, // 分享标题
        desc: shareData.description, // 分享描述
        link: 'http://www.51shouyu.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号 JS 安全域名一致
        imgUrl: shareData.imgUrl, // 分享图标
        type: 'link', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果 type 是music或video，则要提供数据链接，默认为空
        success: function (res) {
          console.log("onMenuShareAppMessage 设置分享朋友成功返回的信息为:", res);
        }
      });




  });


  wx.error(function (res) {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    console.log('验证失败返回的信息:', res);
  });
}


export const wexinShare = (shareData) => {

  var defaultImg = logoUrl;
  if (!isNotEmpty(shareData.imgUrl)) {
    if (defaultImg.indexOf(window.location.origin) < 0) {
      defaultImg = window.location.origin + logoUrl;
    }

    shareData.imgUrl = defaultImg;

    console.log(shareData.imgUrl);
  }


  var pageUrl = shareData.url;
  getJsapiSignature(pageUrl).then((res) => {
    doShare(res.data, shareData)
  })


}





























