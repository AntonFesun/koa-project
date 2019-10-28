const mongoose = require('mongoose');
const config = require('config');
const crypto = require('crypto');

const adminSchema = new mongoose.Schema({
    login: {
        required: true,
        type: String
    },
    passwordHash: {
        required: true,
        type: String
    },
    salt: {
        type: String
    }
});

adminSchema.virtual('password')
    .set(function (password) {
        if(!password) {
            this.invalidate('password', 'Can not be empty');
        }

        if (password !== undefined) {
            if (password.length < 6) {
                this.invalidate('password', 'Password cannot be less then 6 symbols!');
            }
        }

        this._plainPasswod = password;

        if (password) {
            this.salt = crypto.randomBytes(config.get('crypto').hash.length).toString('base64');
            this.passwordHash = crypto.pbkdf2Sync(
                password,
                this.salt,
                config.get('crypto').hash.iterations,
                config.get('crypto').hash.length,
                'sha1'
            ).toString('base64');
        } else {
            this.salt = undefined;
            this.passwordHash = undefined;
        }
    })
    .get(function() {
        return this._plainPasswod;
    });

adminSchema.methods.checkPassword = function (password) {
    console.log(password);
    if (!password) return false;
    if (!this.passwordHash) return false;

    return crypto.pbkdf2Sync(
        password,
        this.salt,
        config.get('crypto').hash.iterations,
        config.get('crypto').hash.length,
        'sha1'
    ).toString('base64') === this.passwordHash;
};

module.exports = mongoose.model('Admin', adminSchema);
