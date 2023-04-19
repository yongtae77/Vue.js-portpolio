var express = require('express');
var router = express.Router();

// 위치 

// 위치 정보 가져오기 & update or create
router.post("/item", async function (req, res) {
    // 기존 위치 중복 체크
    var alreadyLocation = await Location.findOne({
        where: {
            u_email: req.session.user.email
        }
    })

    if (alreadyLocation != null) {
        await Location.update({
            name: req.body.name,
            lat: req.body.lat,
            lng: req.body.lng,
            address: req.body.address,
            detailAddress: req.body.detailAddress,
        }, {
            where: {
                u_email: req.session.user.email,
            }
        })
        res.json({
            result: "ok"
        })
        return
    }

    var body = req.body
    var user = req.session.user.email
    req.body.u_email = user

    console.log(body)
    Location.create(body).then(result => {
        res.json({
            result: "ok"
        })
    })
})

// 사용자별 위치 정보 가져오기
router.post('/info', async function (req, res) {

    var locationInfo = await Location.findOne({
        where: {
            u_email: req.session.user.email
        },
        attributes: ["address", "detailAddress"],
    })
    res.json({
        locationInfo: locationInfo
    })

    console.log(locationInfo)
});

// 로그인 사용자가 위치를 저장한 경우 
router.post('/check', async function (req, res) {
    // var user = await User.findOne({
    //     where: {
    //         email: req.body.email,
    //         password: req.body.password
    //     }
    // })
    console.log(req.body)
    var userLocation = await Location.findOne({
        where: {
            u_email: req.body.email,
        }
    })
    console.log(userLocation)

    if (userLocation != null) {
        res.json({
            //user: user,
            //userLocation: userLocation,
            result: "ok",
            message: "위치가 저장되어 있습니다."
        })
    }
    else {
        res.json({
            //user: user,
            result: "fail",
            message: "새로운 위치를 추가해야 합니다."
        })
    }

})
/*
//# 일단은 test로 거리 구하는 거 만들어 놓음 #//
router.get("/test", async function (req, res) {
    var locationList = await Location.findAll({
        where: {
            // 여기다가 비교하는 쿼리문 넣기
            lat: {
                [Op.between]: [37.57121636079161, 37.59816581931519] // 그러면 이 부분에서 배열로 가져와야 겠네, 지금은 임의로 넣은 거니
            },
            lng: {
                [Op.betewen]: [126.9086891903428, 126.94269684871924]
            }
        }
    })
    // location 목록에서 두 개 가져와서 비교하기
    res.json(locationList)
    for (var i = 0; i <= locationList.length; i++) { // 위치1
        var location1 = locationList[i]

        for (var j = i + 1; j < locationList.length; j++) { // 위치2
            var location2 = locationList[j]
            var distance = geolib.getDistance({
                latitude: location1.lat, // string으로 선언해놔서 number로 변경함 Number(location2.lng) --> 다시 Double로 변경
                longitude: location1.lng
            }, {
                latitude: location2.lat,
                longitude: location2.lng
            })
            // 위치1, 위치2, 위치1과 위치2 사이의 거리
            if (distance > 0) {
                console.log(location1.name, location2.name, distance)
            }
        }

    }
})
*/

module.exports = router;