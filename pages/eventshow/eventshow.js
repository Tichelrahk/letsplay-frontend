// pages/eventshow/eventshow.js
// pages/myactivities/myactivities.js
let app = getApp()
Page({
    data: {
 
  },

  joining: function () {
    
    const page = this
    const join = {}
    console.log(55, page.data.event.id)
    wx.request({
      url: app.globalData.url + `events/${page.data.event.id}/confirmations?user_id=${"1"}`,
      method: 'POST',
      data: join,
      success(res) {
        console.log(res)
      }
    })
  },
  /**
   * Page initial data

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // this.setData({
    //   event: getApp().globalData.events[parseInt(options.id) - 1]
    // })
    this.options = options
    console.log(2, options)
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function (options) {
    let page = this;
    console.log(1, page.options)

    wx.request({
      url: app.globalData.url+`events/${page.options.id}`,
      success(res) {

        console.log(res)
        const event = res.data.event

        // Update local data
        page.setData({
          event: event
        });

        console.log(event)

        wx.hideToast();
      }
    });
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})
