var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// 사용자 
// 회원가입
router.post('/register', async function (req, res) {

  // 회원가입 중복 체크
  var alreadyUser = await User.findOne({
    where: {
      email: req.body.email,
      nickname: req.body.nickname
    }
  })

  if (alreadyUser != null) {
    res.json({
      result: "fail",
      message: "이미 존재하는 이메일과 닉네임입니다."
    })
    return  // 밑에 있는 코드 실행 x
  }

  //console.log(alreadyUser)

  var result = await User.create(req.body)
  res.json({
    result: "ok"
  })

});

// 로그인
router.post("/login", async function (req, res) {

  // 로그인 데이터 일치여부 체크
  var user = await User.findOne({
    attributes: ["email", "nickname"],

    where: {
      email: req.body.email,
      password: req.body.password
    }
  })

  if (user == null) {
    res.json({
      result: "fail",
      message: "이메일 또는 비밀번호가 잘못되었습니다."
    })
    return
  }

  // 사용자 세션 
  req.session.user = user

  res.json({
    result: "ok",
    user: user
  })

})

// 로그아웃
router.post('/logout', async (req, res) => {
  //로그아웃 했을때
  req.session.destroy()
  res.json({
    result: "ok"
  })
})

// 로그인 사용자 정보
router.post('/info', async (req, res) => {
  //로그인 되어있을 때
  if (req.session.user) {
    res.json({
      result: "ok",
      user: req.session.user
    })
  }
  else {
    res.json({
      result: "fail"
    })
  }
})

// 프로필 정보
router.post('/profile', async (req, res) => {
  //console.log(req.session.user)
  var profile = await User.findOne({
    attributes: ["email", "nickname", "bankType", "bankNumber"],
    where: {
      email: req.session.user.email
    }
  })

  //console.log(profile)

  res.json({
    profile: profile
  })

})


// 수정
router.post("/modify", async (req, res) => {

  if (!req.session.user) {
    return res.json({
      result: "fail",
      msg: "로그인이 필요합니다."
    })
  }


  var user = await User.findOne({
    where: {
      email: req.body.email
    },
  })
  console.log(user.password)
  if (req.body.show == true && user.password != req.body.password) {
    return res.json({
      res: "fail",
      msg: "비밀번호다름"
    })
  }

  // 로그인된 사용자와 수정하려는 사용자가 같은지 확인
  if (user.email == req.session.user.email) {
    await User.update({
      email: req.body.email,
      nickname: req.body.nickname,
      password: req.body.Newpassword,
      bankType: req.body.bankType,
      bankNumber: req.body.bankNumber
    }, {
      where: {
        email: req.body.email
      }
    })

    // var updateUser = await User.findOne({
    //   where: {
    //     email: req.body.email,
    //   },
    //   attributes: ["email", "nickname"],
    // })
    // console.log(updateUser)
    // 사용자 세션 
    // req.session.user = req.body.nickname
    // console.log(req.session.user)

    res.json({
      //updateUser: updateUser,
      result: "ok",
    })
  }
  // 수정하려는 사용자와 로그인 사용자가 같지 않음
  else {
    res.json({
      result: "fail",
      msg: "수정할 권한이 없습니다. "
    })
  }

})

module.exports = router;
