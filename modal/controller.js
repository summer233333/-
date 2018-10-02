//引入引入数据库的js
const userModal=require('./../modal/userModal');
var crypto = require('crypto');
const usefun={
    logindo:function (request,response) {
        const ueser =req.body.user_account;
        const cryptedPassword= req.body.user_password;
        function cryptPwd(password) {
            var md5 = crypto.createHash('md5');
            return md5.update(password).digest('hex');
        }

        var  poswd= cryptPwd(cryptedPassword);
         userModal.logindo(ueser,poswd,function (err,data) {
             if(!err){
                 if(data.length>0){
                     // console.log('my con')
                     req.session.user = data[0];
                     // response.redirect('/personalCenter1');
                 }else {
                     response.send('账号或密码错误');
                 }
             }else {
                 response.send('服务器出错');
             }
         })
    },
    coupons_available:function (req,res) {
        var sessions = req.session.user[0].id
        userModal.coupons_available(sessions,function (err,data){
            res.send(data)
        })
    },
    coupons_used:function (req,res) {
        var sessions = req.session.user[0].id
        userModal.coupons_used(sessions,function (err,data){
            res.send(data)
        })
    },
    coupons_overdue:function (req,res) {
        var sessions = req.session.user[0].id
        userModal.coupons_overdue(sessions,function (err,data){
            // console.log('优惠券',data)
            res.send(data)
        })
    },
    coupons_recycle:function (req,res) {
        var sessions = req.session.user[0].id
        userModal.coupons_recycle(sessions,function (err,data){
            // console.log('优惠券',data)
            res.send(data)
        })
    },
    delcoupons:function (req,res) {
        var sessions = req.session.user[0].id
        var delcouponsid = req.body.delid
        userModal.delcoupons(sessions,delcouponsid,function (err,data){
            // console.log('优惠券',data)
            res.send(data)
        })
    },
    couponid:function (req,res) {
        // console.log(req.session.user)
        if(req.session.user){
            var sessions = req.session.user[0].id
            var couponsid = req.body.data_couponid
            var coupondate = addDate(req.body.newdate,0)
            function addDate(date,days){
                var d=new Date(date);
                d.setDate(d.getDate()+days);
                var m=d.getMonth()+1;
                return d.getFullYear()+'-'+m+'-'+d.getDate();
            }
            userModal.couponidss(sessions,couponsid,function (err,data){
                // console.log('第一次',data)
                if(data.length>0){
                    userModal.couponids(sessions,couponsid,function (err,data){

                        if(data.length>0){
                            res.send('你已经领取过了')
                        }else {
                            userModal.coupondate(couponsid,function (err,data) {
                                var diqu=data[0].coupon_type
                                var zhuti = data[0].coupon_type_1
                                var miane = data[0].denomination
                                var coupondates = Number(data[0].data_cycle)
                                var coupondatess = addDate(coupondate,coupondates)
                                userModal.couponid(sessions, couponsid,coupondatess,coupondate,diqu,zhuti,miane, function (err, data) {
                                    userModal.couponidsss(sessions, couponsid, function (err, data) {
                                        userModal.couponid_remaining(couponsid, function (err, data) {
                                            var upde = data[0].coupon_remaining
                                            userModal.couponid_remainingg(upde, couponsid, function (err, data) {
                                                userModal.couponid_remaininggg(couponsid, function (err, data) {

                                                    res.send(data)
                                                })

                                            })
                                        })

                                    })

                                })
                            })
                        }
                    })
                }else {
                    res.send('积分不足')
                }
            })

        }else {
            res.send('请登录')
        }
    },
    couponpage:function (req,res) {
    var delcouponsid = req.body.couponpages
        // console.log(delcouponsid)
        userModal.couponpage(delcouponsid,function (err,data){
            res.send(data)
        })
    },

    // vue查询
    vuecreateloading:function (req,res) {
        var delcouponsid = req.body.id
        userModal.vuecreateloading(delcouponsid,function (err,data){
            res.send(data)
        })
    },
    //城市查询
    couponsearch:function (req,res) {
        // console.log(req.body)
        userModal.couponsearch(function (err,data) {
            // console.log(data);
            res.send(data)
        })
    },
    //查询功能
    couponsearchs:function (req,res) {
        console.log(req.body)
        var couponadress=req.body.couponadress
        var couponmessage=req.body.couponmessage
        userModal.couponsearchs(couponadress,couponmessage,function (err,data) {
            console.log('vue查询',data);
            res.send(data)
        })
    },
    usercoupons:function (req,res) {
        userModal.usercoupons(function (err,data) {
            // console.log(data);
            res.send(data)
        })
    },
    delcoupon:function (req,res) {
        console.log(req.body)
        var arr3 = []
        for( var key in req.body){
            arr3.push(req.body[key])
        }
        console.log('delyouhuiq',arr3)
        for( var w = 0 ; w < arr3.length ; w ++ ){
            userModal.delcoupon(arr3[w],function (err,data) {
                if(!err){
                    if(data.affectedRows>0){
                        res.send(data);
                    }
                }
                // console.log(data);

            })
        }

    },
    updatacoupon:function (req,res) {
        var arr3 = []
        for( var key in req.body){
            arr3.push(req.body[key])
        }
        var couponid=arr3[0]
        arr3.splice(0,1)
        arr3.push(couponid)
        console.log('123123',arr3)

        userModal.updatacoupon(arr3,function (err,data) {
            // console.log(data);
            res.send(data)
        })
    },
    //查询功能
    usercouponsearchs:function (req,res) {
        console.log('vue查询s',req.body)
        var couponadress=req.body.couponadress
        var couponmessage=req.body.couponmessage
        userModal.usercouponsearchs(couponadress,couponmessage,function (err,data) {
            console.log('vue查询s',data);
            res.send(data)
        })
    },
    //添加优惠券
    addcoupons:function (req,res) {
        var couponmessage=req.body
        var arr=[]
        for(var key in couponmessage){
            arr.push(couponmessage[key])
        }
        arr.splice(0,1)
        console.log(arr)
        userModal.addcoupon(arr,function (err,data) {
            res.send('添加成功')
        })
    },
    //后台登录
    adminlogin:function (req,res) {
        var admin=req.body.admin
        var password = req.body.password
        function cryptPwd(password) {
            var md5 = crypto.createHash('md5');
            return md5.update(password).digest('hex');
        }
        var  paswd= cryptPwd(password);
        userModal.adminlogin(admin,paswd,function (err,data) {
            res.send(data)
        })
    },
    //权限展示
    quanxian:function (req,res) {
        userModal.quanxian(function (err,data) {
            res.send(data)
            // console.log(data)
        })
    },
    quanxianupdata:function (req,res) {
        console.log(req.body)
        var id= req.body.id
        var quanxianzhi = req.body.quanxianzhi
        userModal.quanxianupdata(id,quanxianzhi,function (err,data) {
            res.send(data)
            // console.log(data)
        })
    },

    //移动端
    zhujiudian:function (req,res) {
        userModal.zhujiudian(function (err,data) {
            res.send(data)
        })
    }
}
module.exports=usefun;