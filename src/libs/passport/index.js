const passport = require('koa-passport');
const CookieStrategy = require('passport-cookie');
const Admin = require('../../models/admin');

passport.use(require('./jwtStrategy'));
passport.use(require('./localStrategy'));
passport.use(new CookieStrategy({
        cookieName: 'auth',
        signed: true,
        passReqToCallback: true
    }, function(token, done) {
        Admin.findByToken({token: token}, function (err, user) {
            if (err) return done(err);
            if(!user) return done(null, false);
            return done(null, user);
        })
    }
));

module.exports = passport;
