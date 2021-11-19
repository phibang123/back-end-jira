const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { createUsersModel } = require('../Model/users.modal')


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'abcxyz'; //
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';

module.exports = (passport) =>
{
    passport.createUsersModel(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({_id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, jwt_payload);
            } else {
                return done(null, false);
                // or you could create a new account
            }
            
        });
    }));
}
