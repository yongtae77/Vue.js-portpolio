var express = require('express');
var router = express.Router();


// 가게 목록
router.post("/item", async (req, res) => {
    var market = await Category.findAll({
        include: [{
            model: Market,
            as: "markets",
            attributes: ["id", "name"]
        }]
        // attributes: ["id", "name", "category"]
    })
    res.json({
        market: market
    })
})

module.exports = router;
