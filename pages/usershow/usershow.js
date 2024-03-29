// pages/usershow/usershow.js
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

  goToEdit: function () {
    wx.redirectTo({
      url: '/pages/useredit/useredit',
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


  goToAddServ: function (e) {
    console.log(e)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/myactivities/myactivities`
    })
  },
  /**
   * Page initial data
   */ 
  data: {
    markers: [{
      iconPath: "/images/pin.png",
      id: 0,
      latitude: 31.2235,
      longitude: 121.4453,
      width: 25,
      height: 25
    }],
    polyline: [{
      points: [{
        longitude: 121.4453,
        latitude: 31.2235
      }, {
          longitude: 121.4453,
          latitude: 31.2235
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: 'https://image.flaticon.com/icons/svg/787/787535.svg',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
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
    wx.getStorage({
      key: 'loggedIn',
      success(res) {
        page.setData({
          userInfo: app.globalData.userInfo,
          login: res.data
        })
      }
    })
    wx.request({
      url: app.globalData.url + "users/" + `${app.globalData.userId}`,
      method: 'GET',
      success(res) {
        console.log(11, res)
        const user = res.data.user
        const noFavorites = res.data.user.favorited.length == 0
        page.setData({
          user: user,
          noFavorites: noFavorites
        });
        // console.log(10, user)
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