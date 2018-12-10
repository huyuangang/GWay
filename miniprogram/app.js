//app.js
App({
  onLaunch: function () {
    this.globalData = {};
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    wx.cloud.callFunction({
      name: 'login',
      success:(res) => {
        this.globalData.openid = res.result.openid
      }
    })
    // 获取位置信息
    wx.getLocation({
      success: function(res) {
        console.log(res);
        wx.cloud.callFunction({
          name: 'addLocation',
          data: {
            lat: res.latitude,
            lng: res.longitude
          }
        }).then(res => {
          console.log(res);
        }).catch(e => {
          console.log(e);
        })
      },
    })

    // 获取屏幕信息
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.system = {
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        };
      },
    })
  }
})
