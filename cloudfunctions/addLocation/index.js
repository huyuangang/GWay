// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  let openid = event.userInfo.openId;
  await db.collection('location').where({
    openid
  }).remove();
  return new Promise((resolve, reject) => {
    let { lng, lat } = event;
    db.collection('location').add({
      data: {
        openid: event.userInfo.openId,
        lng,
        lat
      }
    }).then(res => {
      resolve({
        errno: 0,
        errmsg: 'ok'
      })
    }).catch(e => {
      reject(e);
    })
  })
}