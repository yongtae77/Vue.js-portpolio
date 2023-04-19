var express = require('express');
var router = express.Router();

// 가게 목록
router.post("/item", async (req, res) => {
    var market = await Category.findAll({
        include: [{
            model: Market,
            as: "markets",
            attributes: ["id", "name", "firstImage"]
        }]
        // attributes: ["id", "name", "category"]
    })
    res.json({
        market: market
    })
})

// 가게 상세
router.post("/detail", async (req, res) => {
    console.log(req.body)
    var market = await Market.findOne({
        where: {
            id: req.body.id
        },

        attributes: ["id", "name", "firstImage", "time", "mOrder", "deliveryPrice"]

    })

    res.json({
        market: market
    })

})

module.exports = router;
