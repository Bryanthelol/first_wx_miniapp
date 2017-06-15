// pages/setting/setting.js
var app = getApp()
Page( {
  /**
   * 页面的初始数据
   */
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ( options ) {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo( function ( userInfo ) {
      //更新数据
      that.setData( {
        userInfo: userInfo
      } )
    } )
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo( {
      url: '../logs/logs'
    } )
  },
  // 测试接口 wx.showToast
  tapView: function ( event ) {
    wx.showToast( {
      title: "成功",
      icon: "success",
      duration: 2000
    } )
  },
  // 测试接口 wx.showModal
  tapView1: function ( event ) {
    wx.showModal( {
      title: "测试一下",
      content: "确认要删除当前信息吗？",
      success: function ( res ) {
        console.log( res );
        if ( res.confirm === true ) {
          // delete ....
        }
      }
    } )
  }
} )
