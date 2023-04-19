var express = require('express');
var router = express.Router();


// // 메뉴 목록1
// router.post("/item", async (req, res) => {
//     var menu = await Market.findAll({
//         include: [{
//             model: Menu,
//             as: "menus",
//             attributes: ["id", "s_menu", "m_price", "m_introduce"]
//         }]
//         // attributes: ["id", "name", "category"]
//     })
//     res.json({
//         menu: menu
//     })
// })


// 메뉴 목록2
router.post("/item", async (req, res) => {
    var menu = await Menu.findAll({

        attributes: ["id", "s_menu", "m_price", "m_introduce", "m_image", "menu_id"]


    })

    res.json({
        menu: menu
    })


})

// // 메뉴 목록3
// router.post("/item", async (req, res) => {
//     var menu = await Market.findAll({
//         include: [{
//             model: Menu,
//             as: "menus",
//             attributes: ["id", "s_menu", "m_price", "m_introduce", "menu_id"]
//         }]
//         // attributes: ["id", "name", "category"]
//     })
//     res.json({
//         menu: menu
//     })
// })

// 메뉴 상세
// router.post("/info", async (req, res) => {
//     var id = req.body.id
//     var menu = await Menu.findOne({
//         where: {
//             id: id
//         },

//         attributes: ["id", "s_menu", "m_price", "m_introduce", "menu_id"]

//     })

//     var market = await Market.findOne({
//         where: {
//             id: req.body.id
//         },

//         attributes: ["mOrder", "deliveryPrice"]

//     })

//     res.json({
//         menu: menu,
//         market: market
//     })


// })
router.post("/info", async (req, res) => {

    var menu = await Market.findOne({
        include: [{
            model: Menu,
            as: "menus",
            attributes: ["id", "s_menu", "m_price", "m_introduce", "m_image", "menu_id"],
            where: {
                id: req.body.id
            }
        }]

    })

    res.json({
        menu: menu
    })


})

module.exports = router;