const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('config');
const Admin = require('../../models/admin');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: config.get('jwtSecret')
};

module.exports = new JwtStrategy(opts, (jwtPayload, done) => {
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