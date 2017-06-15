//index.js
//获取应用实例
var that;

Page( {
  data: {
    tags: [ '小说', '社科', '天文', '数学', '工具书', '杂志',
    '杂志', '杂志', '杂志' ],
    books: []
  },
  // 点击标签切换到相应页面事件
  changeTag: function ( event ) {
    loadBooks( event.currentTarget.dataset.tag );
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
    loadBooks( that.data.tags[ 0 ] );
  },
  onShow: function () {

  },
} );

function loadBooks( tagName ) {
  wx.showNavigationBarLoading();
  wx.request( {
    url: 'https://api.douban.com/v2/book/search',
    data: {
      start: 0,
      tag: tagName,
      count: '20'
    },
    method: 'GET',
    success: function ( res ) {
      that.setData( {
        books: res.data.books
      } );
      console.log( res.data.books );
    },
    complete: function () {
      wx.hideNavigationBarLoading();
    }
  } )
};
