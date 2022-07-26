import express from 'express'
import passport from 'passport'
import crypto from 'crypto'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import User from "./../db_interact/user.js";
var router = express.Router();

//設定passport
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback",
        passReqToCallback: true
    },
    async function (req, res, accessToken, refreshToken, profile, done) {
        try {
            const user_email = profile._json.email;
            
            //使用email hash出使用者id
            const sha256Hasher = crypto.createHmac("sha256", secret);
            const user_id = sha256Hasher.update(user_email).digest('base64');

            //確認使用者是否存在database
            await User.authenticate(user_id)
                .then(results => {
                    if(results.length == 0) {
                        return done(null,
                            {
                                result: "USER_NOT_EXIST_IN_DB",
                                user_id: user_id,
                                channel: "GOOGLE",
                                channel_id: profile._json.sub,
                                email: profile._json.email,
                                username: profile._json.name
                            });
                    } else {
                        return done(null,
                            {
                                results: "USER_EXIST_IN_DB",
                                user_id: user_id,
                            });
                    }
                })
        } catch(err) {
            console.log(err);
            var response = {
                "success": false,
                "message": "註冊使用者失敗",
                "data": {}
            }
            res.status(400).json(response);
        }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
})

passport.deserializeUser(function (user, done) {
    done(null, user);
})

router.get('/google/login', passport.authenticate('google', {
    scope: [ 'email', 'profile' ],
}));

router.get('/google/callback', passport.authenticate('google', {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure"
}));

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

router.get('/google/success', isLoggedIn, (req, res) => {
    if(req.user.result === "USER_NOT_EXIST_IN_DB") {
        res.redirect("http://localhost:3000/callback/signup")
    } else {
        res.redirect("http://localhost:3000/login");
    }
})

router.get("/logout", (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("Goodbye!");
});


export default router;