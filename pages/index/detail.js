// pages/index/detail.js
var that;
// 为了分享函数获取图书id和title而生的中转变量
var bookId, bookTitle;

Page( {

  /**
   * 页面的初始数据
   */
  data: {
    hideOrNot: true,
    collectOrNot: false
  },
  // 点击收藏按钮后的绑定事件
  collectConfirm: function ( event ) {
    // 收藏列表的数据类型为数组，这样才可以列表渲染
    var collections = wx.getStorageSync( 'collections' ) || [];

    // 牺牲性能，保存冗余数据，方便查询
    var collections_id = wx.getStorageSync( 'collections_id' ) || [];

    // 从data-xx获得数据,存在event.currentTarget.dataset，
    // 它的结构本身就为一个对象，包含所需的数据
    // 把所需的数据以一本书为单位存入collections数组,每一本书的内容用对象存储
    collections.unshift( event.currentTarget.dataset );
    collections_id.unshift( event.currentTarget.dataset.id );
    wx.setStorageSync( 'collections', collections );
    wx.setStorageSync( 'collections_id', collections_id );
    this.setData( {
      collectOrNot: true
    } )
  },
  collectCancel: function ( event ) {
    var collections = wx.getStorageSync( 'collections' ) || [];
    var collections_id = wx.getStorageSync( 'collections_id' ) || [];
    var id = event.currentTarget.dataset.id;

    // 用indexOf，如果不存在会返回-1，存在即相应索引值
    var index = collections_id.indexOf( id );
    if ( index !== -1 ) {
      // 如果不等于-1，即存在，则删除相应数组
      collections.splice( index, 1 );
      collections_id.splice( index, 1 );
      wx.setStorageSync( 'collections', collections );
      wx.setStorageSync( 'collections_id', collections_id );
      this.setData( {
        collectOrNot: false
      } )
    }
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
    bookId = options.id;
    var books = wx.getStorageSync( 'books' ) || {};

    // 如果设置了缓存过期，这里也要加上缓存是否过期的判断
    if ( books[ bookId ] ) {
      renderDetail( books[ bookId ] );
    } else {
      wx.request( {
        url: 'https://api.douban.com/v2/book/' + bookId,
        method: 'GET',
        header: {
          'content-type': 'text/html'
        },
        success: function ( res ) {
          // 给books加上API返回的数据
          books[ bookId ] = res.data;

          // 把被赋予数据的books存入缓存
          wx.setStorageSync( 'books', books );
          renderDetail( res.data );
        }
      } );
    }
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
  onShareAppMessage: function ( event ) {
    return {
      title: '《' + bookTitle + '》强烈推荐！',
      path: '/pages/index/detail?id=' + bookId,
      success: function () {
        wx.showToast( {
          title: '转发成功',
          icon: 'success'
        } );
      },
      fail: function ( errRes ) {
        if ( errRes.errMsg === 'shareAppMessage:fail' ) {
          wx.showToast( {
            title: that.errRes.errMsg,
            icon: 'fail',
            duration: 6000
          } );
        }
      }
    };
  }
} );

// 渲染心得列表
function refreshComments( id ) {
  var comments = wx.getStorageSync( 'comments' ) || {};
  that.setData( {
    autoClear: '',
    comments: comments[ id ] || []
  } );
};

// 把渲染页面的代码提取出来
function renderDetail( data ) {
  bookTitle = data.title;
  wx.setNavigationBarTitle( {
    title: '《' + data.title + '》详情'
  } );
  var ids = wx.getStorageSync( 'collections_id' ) || [];
  refreshComments( data.id );
  that.setData( {
    book: data,

    // 用indexOf方法返回的值做判断，若不等于-1，则返回true，反之亦然
    collectOrNot: ids.indexOf( data.id ) !== -1
  } );
}
