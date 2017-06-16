//index.js
//获取应用实例
var that;
var currentTag;
var currentStart;

Page( {
  data: {
    tags: [ '小说', '社科', '天文', '数学', '工具书', '杂志',
    '杂志', '杂志', '杂志' ],
    books: []
  },
  // 点击标签切换到相应页面事件
  changeTag: function ( event ) {
    loadBooks( event.currentTarget.dataset.tag, 0 );
  },
  // 点击列表进入详情页的事件
  showDetail: function ( event ) {
    wx.navigateTo( {
      url: '/pages/index/detail?id=' + event.currentTarget.dataset.id
    } )
  },
  onLoad: function () {
    that = this;
    // 第一次调用的时候，默认加载tags的第一项
    loadBooks( that.data.tags[ 0 ], 0 );
  },
  onShow: function () {

  },
  onPullDownRefresh: function () {
    loadBooks( currentTag );

  },
  onReachBottom: function () {
    wx.showNavigationBarLoading();
    loadBooks( currentTag, currentStart + 10 );
  }
} );

// 用request接口调用的豆瓣API，返回图书数据
function loadBooks( tagName, firstLoad ) {
  currentTag = tagName;
  currentStart = firstLoad;
  // 这个if条件的目的：当changeTag事件触发，传入0时，把books清空，
  // 因此避免上一个标签的图书列表直接拼接到这个被切换标签的图书列表上
  if ( firstLoad === 0 ) {
    that.setData( {
      books: []
    } )
  }

  wx.showNavigationBarLoading();
  wx.request( {
    url: 'https://api.douban.com/v2/book/search',
    data: {
      start: firstLoad,
      tag: tagName,
      count: 10
    },
    method: 'GET',
    success: function ( res ) {
      that.setData( {
        books: that.data.books.concat( res.data.books )
      } );
      console.log( res.data.books );
    },
    complete: function () {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }
  } )
};;
