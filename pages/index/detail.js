// pages/index/detail.js
var that;

Page( {

  /**
   * 页面的初始数据
   */
  data: {
    hideOrNot: true
  },
  // 点击收藏按钮后的绑定事件
  collectHandler: function ( event ) {
    // 收藏列表的数据类型为数组，这样才可以列表渲染
    var collections = wx.getStorageSync( 'collections' ) || [];
    // 从data-xx获得数据,存在event.currentTarget.dataset，它的结构本身就为一个对象，包含所需的数据
    // 把所需的数据以一本书为单位存入collections数组,每一本书的内容用对象存储
    collections.push( event.currentTarget.dataset );
    wx.setStorageSync( "collections", collections );
  },
  // form提交事件submit的对应处理函数
  saveContent: function ( event ) {
    if ( event.detail.value.readinglog.trim() === '' ) {
      wx.showModal( {
        title: "提示",
        content: "还没写呢！",
        showCancel: false,
        confirmText: "知道了！"
      } );
    } else {
      // 验证通过后，把通过form传入的数据存入缓存
      var comments = wx.getStorageSync( 'comments' );
      var id = event.currentTarget.dataset.id;
      var comment = event.detail.value.readinglog;
      if ( !comments ) {
        comments = {};
      }
      if ( !comments[ id ] ) {
        comments[ id ] = [];
      }
      comments[ id ].push( comment );
      wx.setStorageSync( 'comments', comments );
      refreshComments( id );
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function ( options ) {
    that = this;
    wx.request( {
      url: 'https://api.douban.com/v2/book/' + options.id,
      method: 'GET',
      success: function ( res ) {
        wx.setNavigationBarTitle( {
          title: '《' + res.data.title + '》详情'
        } )
        refreshComments( res.data.id )
        that.setData( {
          book: res.data
        } )
      }
    } );
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
    that.setData( {
      hideOrNot: false
    } )
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
} )

// 渲染心得列表
function refreshComments( id ) {
  var comments = wx.getStorageSync( 'comments' ) || {};
  that.setData( {
    autoClear: '',
    comments: comments[ id ] || []
  } );
}
