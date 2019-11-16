const LocalStrategy = require('passport-local');
const Admin = require('../../models/admin');

const opts = {
    usernameField: 'login',
    passwordField: 'password',
    passReqToCallback: true,
    session: false
};

module.exports = new LocalStrategy(opts, (req, login, password, done) => {
        Admin.findOne( {login}, (err, admin) => {
            if(err) {
                return done(err);
            }
            if(!admin) {
                return done("You are not an admin", false);
            }
            if(!admin.checkPassword(password)) {
                return done("Incorrect password", false);
            }
            return done(null, admin);
        });
    });
