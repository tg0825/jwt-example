var express = require('express');
var router = express.Router();

var users = require(appRoot + '/users');
var jwt = require('jsonwebtoken');
var jwtSecret = '123';

function getToken(id) {
    var token = jwt.sign({
        id: id
    }, jwtSecret);
    return token;
}

// middleware api를 사용하려면 기본적을 인증을 타야 함
router.use(function (req, res, next) {
    var token = req.get('Authorization');
    
    if (typeof token !== 'undefined') {
        var decoded = jwt.verify(token, jwtSecret);
        var user = users.find(function (data) {
            var user = data.id === decoded.id;
            return user;
        });
        req.user = user;
    }
    
    next();
});

// 로그인
router.post('/login', function (req, res, next) {
    var user;
    if (req.body.phone && req.body.password) {
        var phone = req.body.phone;
        var password = req.body.password;
        user = users.find(function (u) {
            return u.phone === phone && u.password === password;
        });
    
        if (user) {
            var payload = {
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                id: user.id
            };
    
            // jwt 토큰 획득
            var token = jwt.sign(payload, jwtSecret);
            res.json({
                message: 'success',
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

// 회원 가입
router.post('/signup', function (req, res, next) {
    var localPhone = req.body.phone;
    var localPassword = req.body.password;
    
    var findConditionLocalUser = {
       email: localEmail
    }
    
    localSignup(localEmail, localPassword, function (err, savedUser) {
        if (err){
            res.json({
                type: false,
                data: "Error occured " + err
            });
        } else {
            res.json({
                type: true,
                data: savedUser,
                token: savedUser.jsonWebToken
            });
        } 
    });

    // 검색
    // users.findOne(findConditionLocalUser)
    //     .exec(function (err, user) {
    //         if (err){
    //             res.json({
    //                 type: false,
    //                 data: "Error occured " + err
    //             });
    //         } else if (user) {
    //             res.json({
    //                 type: false,
    //                 data: "Email already exists"
    //             });
    //         } else if(!user) {
    //             localSignup(localEmail, localPassword, function (err, savedUser) {
    //                if (err){
    //                     res.json({
    //                         type: false,
    //                         data: "Error occured " + err
    //                     });
    //                 } else {
    //                     res.json({
    //                         type: true,
    //                         data: savedUser,
    //                         token: savedUser.jsonWebToken
    //                     });
    //                 } 
    //             });
    //         }
    //     })
});

module.exports = router;
