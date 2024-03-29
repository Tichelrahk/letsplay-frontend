const app = getApp()
const AV = require('../../utils/av-weapp-min.js')
const config = require('../../keys')
// pages/useredit/useredit.js
Page({
 
  /**
   * Page initial data
   */

  formSubmit: function (e) {
    console.log(e.detail.value)
  },
  formReset: function () {
    console.log()
  },

    data: {
    },

  formSubmit: function (event) {
    const page = this
    const form = {}
    console.log(2, event);
    form.name = event.detail.value.name
    form.bio = event.detail.value.bio
    form.image = event.detail.value.profile_picture
    form.user_id = app.globalData.userId

    wx.request({
      url: app.globalData.url + `users/${app.globalData.userId}`,
      method: 'PUT',
      data: form,
      success(res) {
          console.log(555, res)
      }
    });
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

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
   * Lifecycle function--Called when page show
   */

  onShow: function () {
    let page = this;
    console.log(app.globalData.userId)
    wx.request({
      url: app.globalData.url + `users/${app.globalData.userId}`,
      success(res) {

        console.log(res)
        const user = res.data.user

        // Update local data
        page.setData({
          user: user
        });

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

  },

  uploadFn: function () {  
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        let tempFilePath = res.tempFilePaths[0];
        new AV.File('file-name', {
          blob: {
            uri: tempFilePath,
          },
        }).save().then(
          file => {
            console.log(1111, file.url())
            page.setData({ pic: file.url() })
          }
        ).catch(console.error);
      }
    }); 
  },

  })