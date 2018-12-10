// miniprogram/pages/index/index.js
const app = getApp()
const MY_WIDTH = 10
const OTHER_WIDTH = 6
const MY_COLOR = 'rgb(255, 255, 255)'
const OTHER_COLOR = 'rgba(255, 255, 255, .8)'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    locations: null,
    points: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLocations();
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.cloud.callFunction({
    //   name: 'delLocation'
    // })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getLocations();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getLocations() {
    wx.cloud.callFunction({
      name: 'getLocations',
    }).then(res => {
      let result = res.result;
      this.setData({
        locations: result.data
      });
      this.calcPosition();

    }).catch(e => {
      console.error(e);
    })
  },

  calcPosition: function() {
    let openid = app.globalData.openid;
    let locations = this.data.locations;
    let myLocation = locations.find(item => item.openid === openid);
    console.log(myLocation)

    locations = locations.map(item => {
      item = calc(item, myLocation);
      return item;
    })
    this.setData({
      points: locations
    })
    function calc(other, my) {
      let { windowWidth, windowHeight } = app.globalData.system;

      if (other.lng === my.lng && other.lat === my.lat) {
        return {
          left: (windowWidth - MY_WIDTH) / 2,
          top: (windowHeight - MY_WIDTH) / 2,
          color: MY_COLOR,
          width: MY_WIDTH
        }
      } else {
        let disX = other.lng - my.lng, disY = other.lat - my.lat;
        disX = windowWidth * disX / 360;
        disY = windowHeight * disY / 360;
        return {
          left: (windowWidth - MY_WIDTH) / 2 + disX,
          top: (windowHeight - MY_WIDTH) / 2 + disY,
          color: OTHER_COLOR,
          width: OTHER_WIDTH
        }
      }
    }
  }


})