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

    locations = locations.map(item => {
      isMe = item === myLocation;
      item = calc(item, isMe);
      return item;
    })
    this.setData({
      points: locations
    })
    function calc(pos, isMe) {
      let { windowWidth, windowHeight } = app.globalData.system;
      let { lng, lat } = locations;

      let retoPos = {
        left: (180 + lng) / 360 * windowWidth,
        top: (180 - lat) / 360 * windowHeight,
        color: OTHER_COLOR,
        width: OTHER_WIDTH
      }
      if (isMe) {
        retoPos.color = MY_COLOR;
        retoPos.width = MY_WIDTH;
      }

      return retoPos;
    }
  }


})