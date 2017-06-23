//logs.js
var that;
var curPage;

Page( {
  data: {

  },
  navigateToDetail: function ( event ) {
    wx.navigateTo( {
      url: '/pages/index/detail?id=' + event.currentTarget.dataset.id
    } );
  },
  onLoad: function () {
    that = this;
  },
  onShow: function () {
    collections: getCollData( 1 );
  },
  onPullDownRefresh: function () {
    collections: getCollData( curPage + 1 );
    wx.stopPullDownRefresh();
  },
  onReachBottom() {
    collections: getCollData( curPage + 1 );
  }
} )

// 函数实现的功能：翻页，一次只加载10项
function getCollData( page ) {
  // 保存已翻过的页数，触发到底部事件时，加载当前页数再加一
  curPage = page;
  var collections = wx.getStorageSync( 'collections' ) || [];
  var length = 10;
  // page为页数，第一页的时候start为0，第二页start为1，以此类推
  var count = page * length;
  that.setData( {
    collections: collections.splice( 0, count )
  } )
};
