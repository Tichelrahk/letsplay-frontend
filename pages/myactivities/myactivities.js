const app = getApp()

Page({

  goToIndex: function () {
    wx.redirectTo({
      url: '/pages/eventsindex/eventsindex',
    })
  },

  goToBrowse: function () {
    wx.redirectTo({
      url: '/pages/activitynearby/activitynearby',
    })
  },

  goToAbout: function () {
    wx.redirectTo({
      url: '/pages/activitynearby/activitynearby',
    })
  },

  goToCreate: function () {
    wx.redirectTo({
      url: '/pages/createactivity/createactivity',
    })
  },

  goToProfile: function () {
    wx.redirectTo({
      url: '/pages/usershow/usershow',
    })
  },

  goToMyActivities: function () {
    wx.redirectTo({
      url: '/pages/myactivities/myactivities',
    })
  },


  goToEventsShow: function (event) {
    console.log(20, event)
    let id = event.currentTarget.dataset.id
    console.log(21, id)
    wx.navigateTo({
      url: `/pages/eventshow/eventshow?id=${id}`,
    })
  },

  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
  },
  /**
   * Page initial data
   */
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      },
    });
    wx.loadFontFace({
      family: "Kaushan Script",
      source: 'url("http://lc-dnc55p3h.cn-e1.lcfile.com/09e1fc0896d8febebfa9/KaushanScript-Regular.ttf")',
      success: (res) => {
        console.log('font load sucess', res)
      }
    });
    wx.getStorage({
      key: 'loggedIn',
      success(res) {
        that.setData({
          userInfo: app.globalData.userInfo,
          login: res.data
        })
      }
    })
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },


  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },

  updateUser: function (e) {
    const page = this
    const userId = app.globalData.userId

    const info = {
      name: e.detail.userInfo.nickName,

      profile_picture: e.detail.userInfo.avatarUrl,
      location: e.detail.userInfo.city
    }

    wx.request({
      url: app.globalData.url + `users/${userId}`,
      method: "PUT",
      data: info,
      success(res) {
        console.log(res)
        console.log(`Updated user ${userId}`)


        page.setData({ login: true })
        page.onShow()

      }
    })
  },

  logInUser: function () {
    wx.setStorage({
      key: "loggedIn",
      data: "true"
    })
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.logInUser()
    this.setData({
      userInfo: e.detail.userInfo
    })
    this.updateUser(e)
  },


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {
    const page = this
    console.log(app.globalData)
    wx.request({
      url: app.globalData.url + "users/" + `${app.globalData.userId}`,
      method: 'GET',
      success(res) {
        console.log(11, res)
        const user = res.data.user
        page.setData({
          user: user
        });
        console.log(10, user)
      }
    })
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





