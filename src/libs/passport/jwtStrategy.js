const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('config');
const Admin = require('../../models/admin');

const cookiesExtractor = function(req) {
    let index = null;
    if (req && req.cookies.request.headers.cookie) {
        let token = req.cookies.request.headers.cookie;
        index = token.substr(10, token.length);
    }
    return index;
};

const opts = {
    jwtFromRequest: cookiesExtractor,
    secretOrKey: config.get('jwtSecret'),
};

module.exports = new JwtStrategy(opts, (jwtPayload, done) => {
    console.log(opts);
    console.log(jwtPayload);
    Admin.findById(jwtPayload.id, (err, admin) => {
        console.log(admin);
        if (err) {
            return done(err, false);
        }

        if (admin) {
            return done(null, admin);
        } else {
            return done(null, false);
        }
    });
});
