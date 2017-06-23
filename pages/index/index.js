//index.js
//获取应用实例
var that;
var currentTag;
var currentStart;
var isLastPage;

Page( {
  data: {
    curTag: null,
    tags: [ '流行', '爱情', '小说', '商业', '历史', '科技', '哲学', '社科',
    '天文', '数学', '工具书', '生活', '编程' ],
    books: [],
    hideOrNot: true
  },
  // 点击标签切换到相应页面事件
  changeTag: function ( event ) {
    loadBooks( event.currentTarget.dataset.tag, 0 );
  },
  // 点击列表进入详情页的事件
  showDetail: function ( event ) {
    wx.navigateTo( {
      url: '/pages/index/detail?id=' + event.currentTarget.dataset.id
    } );
  },
  onLoad: function () {
    that = this;
    // 初始小程序时，获取缓存（如果有缓存的话）
    wx.getStorage( {
      key: 'tag',
      success: function ( res ) {
        loadBooks( res.data, 0 );
      },
      fail: function ( res ) {
        // 第一次调用的时候，默认加载tags的第一项
        loadBooks( that.data.tags[ 0 ], 0 );
      }
    } );
  },
  onShow: function () {

  },
  onPullDownRefresh: function () {
    loadBooks( currentTag );

  },
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    that.setData( {
      hideOrNot: !this.data.hideOrNot
    } )
    loadBooks( currentTag, currentStart + 5 );
  },
  onShareAppMessage: function () {
    return {
      title: '快来看看有啥你喜欢的书',
      path: '/pages/index/index',
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

// 用request接口调用的豆瓣API，返回图书数据
function loadBooks( tagName, firstLoad ) {
  currentTag = tagName;
  currentStart = firstLoad;

  // 保存用户此次点击标签到缓存
  wx.setStorageSync( 'tag', tagName );

  // 这个if条件的目的：当changeTag事件触发，传入0时，把books清空，
  // 因此避免上一个标签的图书列表直接拼接到这个被切换标签的图书列表上
  if ( firstLoad === 0 ) {
    // 每次加载第一页，重置这个变量
    isLastPage = false;
    that.setData( {
      books: [],
      // 绑定curTag的值，目的：给被选择的标签加上被选择时的样式
      curTag: tagName
    } )
  }
  // 如果达到最后一页则用return返回来停止加载
  if ( isLastPage === true ) {
    return;
  }

  wx.showNavigationBarLoading();
  wx.request( {
    url: 'https://api.douban.com/v2/book/search',
    data: {
      start: firstLoad,
      count: 5,
      tag: tagName
    },
    method: 'GET',
    header: {
      'content-type': 'text/html'
    },
    success: function ( res ) {
      // 判断是否达到最后一页
      if ( res.data.start + res.data.count >= res.data.total ) {
        isLastPage = true;
      }
      that.setData( {
        books: that.data.books.concat( res.data.books )
      } );
    },
    complete: function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      that.setData( {
        hideOrNot: true
      } )
    }
  } );
};
