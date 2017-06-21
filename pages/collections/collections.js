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
} )
