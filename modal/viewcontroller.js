const userModal=require('./../modal/userModal');
var crypto = require('crypto');
var viewcontroller={
    coupon:function (req,res) {
        userModal.coupon(function (err,data) {
            // console.log(data)
            if(req.session.user){
                res.render('coupon.html',{data})
            }else {
                var user='未登录'
                res.render('coupon.html',{data,user})
            }


            // }else {
            //
            // }
        })
    },
    coupons_overdue:function (req,res) {
        var sessions = req.session.user[0].id
        userModal.coupons_overdue(sessions,function (err,data){
            // console.log('优惠券',data)
            res.send(data)
        })
    },
    logindo:function (req,res) {
        var ueser = req.body.user_account
        var poswd = req.body.user_password
        console.log(req.body)
        userModal.logindo(ueser,poswd,function (err,data) {
            if(data.length>0){
                res.session.user=data[0]
                res.render('coupon.html')
            }
        })
    }
}
module.exports = viewcontroller