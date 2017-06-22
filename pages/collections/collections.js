//logs.js

Page( {
  data: {

  },
  navigateToDetail: function ( event ) {
    wx.navigateTo( {
      url: '/pages/index/detail?id=' + event.currentTarget.dataset.id
    } );
  },
  onLoad: function () {

  },
  onShow: function () {
    this.setData( {
      collections: wx.getStorageSync( 'collections' ) || []
    } );
  },
  onPullDownRefresh: function () {
    this.setData( {
      collections: wx.getStorageSync( 'collections' ) || [],
    } );
    wx.stopPullDownRefresh();
  },
  onReachBottom() {

  }
} )

function getCollData( page ) {
  var collections = wx.getStorageSync( 'collections' ) || [];
  var length = 10;
  // page为页数，第一页的时候start为0，第二页start为1，以此类推
  var start = page * length;
  return collections.splice( 0, length );
}
