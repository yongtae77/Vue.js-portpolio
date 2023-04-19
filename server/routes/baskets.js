var express = require('express');
var router = express.Router();
var asyncForEach = require("async-await-foreach")
var geolib = require("geolib")
var { Sequelize, Op } = require("sequelize")

// 장바구니

// 사용자별 장바구니 정보
router.post("/mybasket", async function (req, res) {

    var basketList = await Basket.findAll({
        where: {
            u_email: req.session.user.email,
        },
        include: [{
            model: Menu,
            as: "menus"
        }, {
            model: Market,
            as: "markets"
        }]

    })

    res.json({
        basketList: basketList,
    })
})

// 다른매장 메뉴가 이미있는경우 체크
router.post('/basket/check', async function (req, res) {
    var basket = await Basket.findOne({
        where: {
            u_email: req.session.user.email,
        }
    })
    res.json({
        result: "ok",
        basket: basket
    })
})

// 다른매장 메뉴가 이미있는경우 삭제
router.post('/basket', async function (req, res) {

    // 다른매장 메뉴가 이미있는경우
    var basket = await Basket.findOne({
        where: {
            u_email: req.session.user.email,
        }
    })
    if (basket != null) {
        if (basket.s_id != req.body.s_id) {
            await Basket.destroy({
                where: {
                    u_email: req.session.user.email,

                }
            })
        }
    }

    // 이미 담긴 메뉴인지 체크
    var alreadyBasket = await Basket.findOne({
        where: {
            u_email: req.session.user.email,
            s_id: req.body.s_id,
            m_id: req.body.m_id
        }
    })

    if (alreadyBasket != null) {
        //console.log(alreadyBasket.m_count, req.body.m_count)
        alreadyBasket.m_count += req.body.m_count
        await alreadyBasket.save()
        res.json({
            result: "ok"
        })

        return
    }
    else {
        var user = req.session.user.email
        req.body.u_email = user
        var result = await Basket.create(req.body)

        res.json({
            result: "ok"
        })
    }

});

// 장바구니 수량 추가 및 감소
router.post('/modify', async function (req, res) {

    // 이미 담긴 메뉴인지 체크
    var updateBasket = await Basket.findOne({
        where: {
            u_email: req.session.user.email,
            s_id: req.body.s_id,
            m_id: req.body.m_id
        }
    })

    if (updateBasket != null && updateBasket.u_email == req.session.user.email) {
        updateBasket.m_count = req.body.m_count
        result = await updateBasket.save()

        res.json({
            result: "ok",

        })
    }


});

// 장바구니 메뉴 삭제
router.post("/remove", async (req, res) => {

    var menu = await Basket.findOne({
        where: {
            u_email: req.session.user.email,
            s_id: req.body.s_id,
            m_id: req.body.m_id
        }
    })

    if (menu != null && menu.u_email == req.session.user.email) {

        var result = await Basket.destroy({
            where: {
                u_email: req.session.user.email,
                s_id: req.body.s_id,
                m_id: req.body.m_id,
            }
        })

        res.json({
            result: "ok"
        })

    }
    // 삭제하려는 게시물과 로그인 사용자가 같지 않음
    else {
        res.json({
            result: "fail",
            msg: "삭제할 권한이 없습니다. "
        })
    } console.log(result)

})

// 주문 체크(위치 저장 및 계좌 저장)
router.post('/order/check', async function (req, res) {
    var userBank = await User.findOne({
        where: {
            email: req.session.user.email,
        },
    })
    // console.log(userBank)

    if (userBank.bankType != null && userBank.bankNumber != null) {
        res.json({
            result: "ok",
            message: "계좌가 저장되어 있습니다."
        })
    }
    else {
        res.json({
            result: "fail",
            message: "계좌 정보를 추가해야 합니다."
        })
    }

})


// 장바구니 초기화 
router.post('/order/check/init', async function (req, res) {
    var initBasket = await Basket.findAll({
        where: {
            u_email: req.session.user.email,
        }
    })
    console.log(initBasket)
    if (initBasket != null && initBasket[0].u_email == req.session.user.email) {
        console.log("test")
        var result = await Basket.destroy({
            where: {
                u_email: req.session.user.email,
            }
        })

        res.json({
            result: "ok"
        })

    }
    // 삭제하려는 게시물과 로그인 사용자가 같지 않음
    else {
        res.json({
            result: "fail",
            msg: "삭제할 권한이 없습니다. "
        })
    }

})


// 주문하기
router.post('/order', async function (req, res) {
    var basketList = req.body
    if (basketList.length == 0) {
        return res.json({
            result: "fail",
            message: "장바구니가 비어있습니다"
        })
    }

    var userLocation = await Location.findOne({
        where: {
            u_email: req.session.user.email
        }
    })

    var order = await Order.create({
        marketId: basketList[0].s_id,
        lat: userLocation.lat,
        lng: userLocation.lng,
        address: userLocation.address,
        detailAddress: userLocation.detailAddress,
        userId: req.session.user.email
    })
    // 주문 내역 가져오기 (=대기중인)
    var requestorder = await Order.findOne({
        where: {
            userId: req.session.user.email,
            status: 1
        }
    })
    await asyncForEach(basketList, async basket => {
        console.log(basket)
        await OrderMenu.create({
            OrderId: order.id,
            menuId: basket.m_id,
            count: basket.m_count
        })

    })

    var bound = geolib.getBoundsOfDistance(
        { latitude: order.lat, longitude: order.lng },
        500
    )
    console.log(bound)
    console.log(bound[0].latitude, bound[1].latitude)

    //가까운 주문 묶어주기
    var orderList = await Order.findAll({
        where: {
            status: 1,
            marketId: order.marketId,
            id: {
                [Op.ne]: order.id
            },
            lat: {
                [Op.between]: [bound[0].latitude, bound[1].latitude]
            },
            lng: {
                [Op.between]: [bound[0].longitude, bound[1].longitude]
            }
        }
    })
    //근처에 주문이 없을경우
    if (orderList.length == 0) {
        var cluster = await Cluster.create()
        await cluster.addOrders(order)
    }
    else {
        await asyncForEach(orderList, async orderItem => {

            //이미클러스터에 들어가있는경우
            if (orderItem.clusterId) {
                var clusterCount = await Order.count({
                    where: {
                        clusterId: orderItem.clusterId,

                    }
                })
                //클러스터에 이미 3개이상의 주문이있을때
                if (clusterCount == 4) {
                    var newCluster = await Cluster.create()
                    await newCluster.addOrders(order)
                    var clusterOrderList = await Order.findAll({
                        where: {
                            clusterId: cluster.id
                        }
                    })
                    await asyncForEach(clusterOrderList, async orderItem => {
                        orderItem.status = 2
                        await orderItem.save()
                    })
                }
                else {
                    order.clusterId = orderItem.clusterId
                    await order.save()
                }
            }

        })
    }

    var clusterList = await Cluster.findAll({
        include: [{
            model: Order,
            as: 'orders',
            retured: true,
            where: {
                status: 1
            }
        }]
    })

    await asyncForEach(clusterList, async cluster => {
        if (cluster.orders.length >= 3) {
            await asyncForEach(cluster.orders, async order => {
                order.status = 2
                await order.save()
            })
        }
    })
    console.log(requestorder)
    res.json({
        requestorder: requestorder,
        result: "ok"
    })

})

// 나의 주문
router.get('/myorder', async function (req, res) {
    var orderList = await Order.findAll({
        include: [{
            model: Menu,
            as: "menus"
        }, {
            model: Market,
            as: "market"
        }],
        order: [["orderDate", "DESC"]]
    })
    res.json({
        result: "ok",
        orderList: orderList
    })
})



module.exports = router;