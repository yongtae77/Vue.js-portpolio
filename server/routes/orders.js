var express = require('express');
var router = express.Router();
var asyncForEach = require("async-await-foreach")
//var geolib = require("geolib")
//var { Sequelize, Op } = require("sequelize")

// 로그인된 사용자의 주문내역 불러오기(지금 대기중인 주문만)
router.post("/item", async (req, res) => {
    console.log(req.body)
    //대기 중
    var orderWait = await Order.findOne({
        where: {
            id: req.body.id,
            userId: req.session.user.email,
            status: 1
        }, include: [{
            model: Market,
            as: "market"
        }, {
            model: User,
            as: "user"
        }]

    })

    // 주문완료
    var orderOK = await Order.findOne({
        where: {
            id: req.body.id,
            userId: req.session.user.email,
            status: 2
        }, include: [{
            model: Market,
            as: "market"
        }, {
            model: User,
            as: "user"
        }]
    })

    var ordermenu = await OrderMenu.findAll({
        where: {
            OrderId: orderOK.id
        }, include: [{
            model: Menu,
            as: "menus"
        }]
    })
    //console.log(ordermenu)
    //var orderList = await Menu
    // await asyncForEach(ordermenu, async order => {
    //     //console.log(order)
    //     var ordermenuList = await Menu.findAll({
    //         where: {
    //             id: order.menuId
    //         }
    //     })
    //     console.log(ordermenuList)
    //     // res.json({
    //     //     //ordermenuList: ordermenuList,
    //     //     orderWait: orderWait,
    //     //     orderOK: orderOK,
    //     // })

    // })
    // var ordermenuList = await Menu.findAll({
    //     where: {
    //         id: ordermenu.menuId
    //     }
    // })
    //console.log(ordermenu)

    //console.log(ordermenu)
    // if (orderWait != null) {
    //     res.json({
    //         result: "fail",
    //         message: "진행중인 주문이 없습니다"
    //     })
    //     return
    // }

    // if (orderOk != null) {
    //     res.json({
    //         result: "ok",
    //         message: "주문 완료 되었습니다."
    //     })

    // }

    // //주문내역 중 가게이름, 배달비 불러오기(가게관련)
    // var marketInfo = await Market.findOne({
    //     where: {
    //         id: order.marketId
    //     }
    // })
    //console.log(orderWait)
    res.json({
        orderWait: orderWait,
        orderOK: orderOK,
        ordermenu: ordermenu
    })
})


// 로그인된 사용자의 주문내역 불러오기(메뉴관련)
router.post("/ordermenu", async (req, res) => {
    var order = await Order.findOne({
        where: {
            userId: req.session.user.email,
            status: 2
        }
    })

    // var ordermenu = await OrderMenu.findAll({
    //     where: {
    //         OrderId: order.id
    //     }
    // })

    // var menulist = await Menu.findAll({
    //     where: {
    //         id: ordermenu.menuId
    //     }
    // })
    //console.log(menulist)

    // res.json({
    //     order: order,
    //     ordermenuList: ordermenuList
    // })
})



module.exports = router;